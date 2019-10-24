const { globalShortcut } = require("electron");
const { sendBets } = require("./sender");
const handleWindow = require("./helper/window");

//f5 shortcut
globalShortcut.register("F5", function() {
  handleWindow.getWindow().reload();
  setTimeout(async function() {
    await sendBets();
  }, 150);
});

//Ctrl + R shortcut
globalShortcut.register("CommandOrControl+R", function() {
  handleWindow.getWindow().reload();
  setTimeout(async function() {
    await sendBets();
  }, 150);
});
