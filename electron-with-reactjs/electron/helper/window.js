const { BrowserWindow } = require("electron");
// import module from 'module';
let window = BrowserWindow; // Prevent window from being garbage collected

function getWindow() {
    return window;
}
function setWindow(w) {
    window = w;
}

module.exports = {
    getWindow,
    setWindow
}