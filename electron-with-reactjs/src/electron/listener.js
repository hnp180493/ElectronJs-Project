const { ipcMain, BrowserWindow } = require("electron");
const { sendBets } = require("./sender");
const isDev = require("electron-is-dev");
const path = require("path");

ipcMain.on("form-submit", async (event, params) => {
  await sendBets(params);
});

ipcMain.on("open-bet-detail", function(event, betDetail) {
  let betDetailWindow = new BrowserWindow({
    width: 800,
    height: 800,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  let url = isDev ? "http:localhost:3000/#/bet-detail" : `file:///${path.join(__dirname, "../../build/index.html#/bet-detail")}`;
  if (!isDev) {
    url = url.replace(/\\/g, "/");
  }
  // file:///C:/Users/admin/Desktop/js/ELECTRON/ElectronJs-Project/electron-with-reactjs/build/index.html#/bet-detail

  console.log(url);
  betDetailWindow.loadURL(url);
  betDetailWindow.once("ready-to-show", function() {
    betDetailWindow.webContents.send("get-bet-detail", betDetail);
    betDetailWindow.show();
  });
});
