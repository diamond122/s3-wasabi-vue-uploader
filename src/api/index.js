import StellarService from './stellar-service';
import WasabiService from './wasabi-service';
import CryptoService from './crypto-service';
import TimeUtil from '../utils/time';

const uploadToWasabi = async (file) => {
  const currentTime = TimeUtil.formatDate(new Date());
  await WasabiService.upload({
    Body: file,
    Key: currentTime
  });
};
const uploadToStellar = async (file) => {
  const memoHashHex = await CryptoService.getHashHex(file);

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
  const memoHashHex = await CryptoService.getHashHex(file);
  return memoHashHex;
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
export default {
  checkNetworkStatus,
  uploadFile,
  getRecentFiles,
  getStellarKeys,
  getFileHash,
  signFile,
  uploadToStellar,
  uploadToWasabi,
};