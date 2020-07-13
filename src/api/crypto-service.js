import Keys from '../api/keybase_keys';

const crypto = require('crypto');
const kbpgp = require('kbpgp');

const convertFile2JSON = (file) => {
  const fileData = {
    lastModified: file.lastModified,
    name: file.name,
    path: file.path,
    size: file.size,
    type: file.type
  };
  return JSON.stringify(fileData);
};
const getFileHashHex = async (file) => {
  const hash = crypto.createHash('sha256');
  hash.update(convertFile2JSON(file));
  return await hash.digest('hex');
};
const getRandomBytes = (length) => {
  return crypto.randomBytes(length);
};
const getHashHex = (raw) => {
  const hash = crypto.createHash('sha256');
  if (raw instanceof Object) {
    hash.update(JSON.stringify(raw));
  } else hash.update(raw);
  return hash.digest('hex');
};
const signFile = (file) => {
  return new Promise((resolve, reject) => kbpgp.KeyManager.import_from_armored_pgp({
    armored: Keys.alice_pgp_public_key
  }, (err, alice) => {
    if (!err) {
      const params = {
        msg: file,
        encrypt_for: alice
      };
      kbpgp.box(params, (err, signedStr, signedBuffer) => {
        if (!err) {
          resolve({signedStr, signedBuffer});
        } else {
          reject(err);
        }
      });
    } else {
      reject(err);
    }
  }));
};

export default {
  signFile,
  getFileHashHex,
  getRandomBytes,
  getHashHex,
};