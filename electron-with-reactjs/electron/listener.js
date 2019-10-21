const { ipcMain } = require("electron");
const { sendBets } = require("./sender");

ipcMain.on("form-submit", async (event, params) => {
  await sendBets(params);
});
