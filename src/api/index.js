import StellarService from './stellar-service';
import WasabiService from './wasabi-service';
import TimeUtil from '../utils/time';
import CryptoService from './crypto-service';

const uploadToWasabi = async (file) => {
  const currentTime = TimeUtil.formatDate(new Date());
  await WasabiService.upload({
    Body: file,
    Key: currentTime
  });
};
const uploadToStellar = async (file) => {
  const memoHashHex = await CryptoService.getFileHashHex(file);

  await StellarService.upload(memoHashHex, file.size.toString())
    .catch((err) => {
      console.error('Stellar Error:', err);
      throw err;
    });
};
const uploadFile = async (file) => {
  await uploadToStellar(file);
  await uploadToWasabi(file);
};

const getFileHash = async (file) => {
  return await CryptoService.getFileHashHex(file);
};

const getRecentFiles = (count) => {
  return WasabiService.getRecentFiles(count);
};

const checkNetworkStatus = async () => {
  return await StellarService.checkNetworkStatus();
};
const getStellarKeys = () => {
  return StellarService.getKeys();
};
const signFile = (file) => {
  return CryptoService.signFile(file);
};
const pushFile = async (fileMeta, fileData) => {
  const nonce = CryptoService.getRandomBytes(16);
  const attachment = {
    nonce: nonce.toString('hex'),
    transaction: {
      note: fileData,
    }
  };
  const memoHashHex = await CryptoService.getFileHashHex(fileMeta);
  const attachMemo = await CryptoService.getHashHex(attachment);
  console.log('attachment:', attachment);

  return await StellarService.attachFile(attachment, attachMemo, memoHashHex, fileMeta.size.toString())
    .catch((err) => {
      console.error('Stellar Error:', err);
      throw err;
    });
};
export default {
  checkNetworkStatus,
  uploadFile,
  getRecentFiles,
  getStellarKeys,
  getFileHash,
  signFile,
  uploadToWasabi,
  pushFile,
};