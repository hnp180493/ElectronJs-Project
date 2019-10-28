const { globalShortcut } = require("electron");
const { sendBets } = require("./sender");
const handleWindow = require("./helper/window");

//f5 shortcut
// globalShortcut.register("F5", async function() {
//   handleWindow.getWindow().reload();
//   await sendBets();
//   handleWindow.getWindow().show();
// });

//Ctrl + R shortcut
globalShortcut.register("CommandOrControl+R", async function() {
  handleWindow.getWindow().reload();
  await sendBets();
  handleWindow.getWindow().show();
});
