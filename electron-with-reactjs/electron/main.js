const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const glob = require("glob");
const handleWindow = require("./helper/window");
const os = require("os");

let mainWindow = null;
function main() {
  console.log("test");
  mainWindow = new BrowserWindow({
    height: 1200,
    width: 1800,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    isDev ? "http:localhost:3000/" : path.join(__dirname, "index.html")
  );
  mainWindow.once("ready-to-show", () => {
    handleWindow.setWindow(mainWindow);
    loadElectronFile();
    mainWindow.show();
    //open extension in chrome
    if (isDev) {
      mainWindow.webContents.openDevTools();

      BrowserWindow.addDevToolsExtension(
        path.join(
          os.homedir(),
          "/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.2.0_0"
        )
      );
    }
  });

  // mainWindow.on("closed", () => {
  //   handleWindow.setWindow(null);
  // });
}

app.on("ready", main);

// Quit app when all of its windows have been closed
// app.on("window-all-closed", () => {
//   app.quit();
// });

// // On app activation (e.g. when clicking dock icon), re-create BrowserWindow if necessary
// app.on(
// 	"activate",
// 	async () => {
// 		if (!getWindow()) {
// 			setWindow(await createWindow());
// 		}
// 	},
// );

function loadElectronFile() {
  const files = glob.sync(path.join(__dirname, "/*.js"));
  files.forEach(file => {
    console.log(file);
    if (!file.includes("main.js")) {
      require(file);
    }
  });
}
