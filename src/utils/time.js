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

export default {
  formatDate,
};