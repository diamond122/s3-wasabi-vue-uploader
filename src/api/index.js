import StellarService from './stellar-service';
import WasabiService from './wasabi-service';
import CryptoService from './crypto-service';
const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    min = d.getMinutes(),
    sec = d.getSeconds();
  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);
  hour = ('0' + hour).slice(-2);
  min = ('0' + min).slice(-2);
  sec = ('0' + sec).slice(-2);

  return `${[year, month, day].join('-')} ${hour}:${min}:${sec}`;
};

const uploadFile = async (file) => {
  const memoHashHex = await CryptoService.getHashHex(file);

  await StellarService.upload(memoHashHex, file.size.toString())
    .catch((err) => {
      console.error('Stellar Error:', err);
      throw err;
    });
  const currentTime = formatDate(new Date());
  await WasabiService.upload({
    Body: file,
    Key: currentTime
  });
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
export default {
  checkNetworkStatus,
  uploadFile,
  getRecentFiles,
  getStellarKeys,
};