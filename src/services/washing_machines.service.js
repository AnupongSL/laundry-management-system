const washingRepository = require("../repositories/washing_machines.repository");

exports.servGetWashingMachineAll = async () =>
  await washingRepository.repoGetWashingMachineAll();

exports.servGetWashingMachineNumber = async (id) =>
  await washingRepository.repoGetWashingMachineNumber(id);

exports.servByMachineID = async (w_id) =>
  await washingRepository.repoByMachineID(w_id);

exports.servAddWashingMachine = async (dataMachine, file) =>
  await washingRepository.repoAddWashingMachine({
    ...dataMachine,
    w_image: file ? file.filename : "",
  });

exports.servUpdateWashingMachine = async (id) => {
  return await washingRepository.repoUpdateWashingMachine(id, {
    w_status: 1,
  });
};
exports.servUpdateWashingMachine2 = async (id) => {
  return await washingRepository.repoUpdateWashingMachine(id, {
    w_status: 0,
  });
};
