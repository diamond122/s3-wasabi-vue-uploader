const crypto = require('crypto');

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
const getHashHex = async (file) => {
  const hash = crypto.createHash('sha256');
  hash.update(convertFile2JSON(file));
  return await hash.digest('hex');
};

export default {
  getHashHex,
};