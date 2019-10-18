const { BrowserWindow, app, ipcMain } = require("electron");
const { globalShortcut } = require("electron");

function main() {
  let mainWindow = new BrowserWindow({
    width: 1800,
    height: 1500,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(`${__dirname}/index.html`);

  //Before load window, get Bets data first
  mainWindow.once("ready-to-show", function() {
    mainWindow.show();
    getBets(mainWindow);
  });

  //submit form
  ipcMain.on("form-submit", function(event, formData) {
    getBets(mainWindow, formData);
  });

  //Open sub window
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
    let url = `${__dirname}\\Components\\BetDetail.html`;
    betDetailWindow.loadFile(url);
    betDetailWindow.once("ready-to-show", function() {
      betDetailWindow.webContents.send("get-bet-detail", betDetail);
      betDetailWindow.show();
    });
  });

  //f5 shortcut
  globalShortcut.register("F5", function() {
    mainWindow.reload();
    setTimeout(function() {
      getBets(mainWindow);
    }, 300);
  });

  //Ctrl + R shortcut
  globalShortcut.register("CommandOrControl+R", function() {
    mainWindow.reload();
    setTimeout(function() {
      getBets(mainWindow);
    }, 300);
  });
}

function getBets(mainWindow, params) {
  const { net } = require("electron");
  if (!params) {
    params = {
      companyCode: "",
      betCode: "",
      betStatus: "",
      betOn: ""
    };
  }

  params.pageNo = params.pageNo || 1;
  params.rowsPerPage = 15;

  //get data from api
  const request = net.request({
    method: "POST",
    url: "http://api.betwin8.com/api/game/get-bet-infor"
  });
  request.setHeader("content-type", "application/json charset=utf-8");
  request.setHeader("x-api-key", "zXETppKnKk");

  let body = "";
  request.on("response", response => {
    response.on("data", data => {
      body += data.toString("utf8");
    });
    response.on("end", () => {
      //send Bets data to client
      mainWindow.webContents.send("bets-data", body, params);
    });
  });

  request.write(JSON.stringify(params));
  request.end();
}

app.on("ready", main);

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
