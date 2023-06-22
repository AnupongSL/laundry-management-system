const historyRepository = require("../repositories/history.repository");
const moment = require("moment");

exports.servGetHistoryAll = async () =>
  await historyRepository.repoGetHistoryAll();

exports.servGetHistoryDate = async (date) => {
  const time1 = moment(date);
  const time2 = moment(date);
  const timeIn = time1.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = time2.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });
  return await historyRepository.repoGetHistoryDate(timeIn, timeOut);
};

exports.servHistoryByName = async (c_name) =>
  await historyRepository.repoHistoryByName(c_name);

exports.servGetHistoryByUsername = async (c_username) =>
  await historyRepository.repoGetHistoryByUsername(c_username);

exports.servGetHistoryUsernameByDate = async (c_username, date) => {
  const time1 = moment(date);
  const time2 = moment(date);
  const timeIn = time1.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = time2.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });
  return await historyRepository.repoGetHistoryUsernameByDate(
    c_username,
    timeIn,
    timeOut
  );
};
exports.servAddHistoryWashing = async (c_name, c_username, w_id, w_type, price, timer) => {
  const newDate = new Date();
  const createat = newDate.setHours(newDate.getHours());
  const format1 = "HH:mm:ss";
  const dateTime1 = moment(createat).format(format1);
  const w_time = newDate.setMinutes(newDate.getMinutes() + timer);
  const dateTime2 = moment(w_time).format(format1);  
  return await historyRepository.repoAddHistoryWashing({
    c_name: c_name,
    c_username: c_username,
    w_id: w_id,
    time_start: dateTime1,
    time_stop: dateTime2,
    w_type: w_type,
    w_price: price,
    date: createat,
  });
};
// exports.servAddHistoryTimeout = async (w_id) => {
//   const newDate = new Date();
//   const createat = newDate.setHours(newDate.getHours());
//   const format1 = "HH:mm:ss";
//   const dateTime1 = moment(createat).format(format1);
//   console.log(dateTime1);
//   return await historyRepository.repoAddHistoryTimeout(w_id, {
//     time_stop: dateTime1,
//   });
// };
