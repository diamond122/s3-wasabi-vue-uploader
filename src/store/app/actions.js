import Service from '../../api';
const uploadFile = async ({ commit }, file) => {
  await Service.uploadFile(file);
  await getRecentList({commit}, 4);
};
const getRecentList = async ({ commit }, count) => {
  // can't use MaxKeys when need to get recently uploaded objects
  const list = (await Service.getRecentFiles(/*count*/)).slice(0, count);
  commit('SET_RECENT_LIST', list);
};

export default {
  uploadFile,
  getRecentList,
};
