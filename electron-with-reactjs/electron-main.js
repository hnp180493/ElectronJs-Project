const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const glob = require("glob");
const handleWindow = require("./src/electron/helper/window");
const { sendBets} = require('./src/electron/sender');
let mainWindow = null;
function main() {
  mainWindow = new BrowserWindow({
    height: 1200,
    width: 1800,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  let url = isDev ? "http:localhost:3000/" : `file://${path.join(__dirname, '/build/index.html')}`;

  mainWindow.loadURL(url);

  mainWindow.once("ready-to-show", async() => {
    handleWindow.setWindow(mainWindow);
    loadElectronFile();
    await sendBets();
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
    handleWindow.setWindow(null);
  });
}

app.on("ready", main);

// Quit app when all of its windows have been closed
app.on("window-all-closed", () => {
  if (process.platform !== 'darwin') app.quit()
});

function loadElectronFile() {
  const files = glob.sync(path.join(__dirname, "./src/electron/*.js"));
  files.forEach(file => {
      require(file);
  });
}
