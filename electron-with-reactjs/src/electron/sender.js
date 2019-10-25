const handleWindow = require("./helper/window");
const getBets = require("./helper/fetchBets");

async function sendBets(params = {}) {
  let bets = await getBets(params);
  handleWindow.getWindow().webContents.send("bets-data", bets);
}

module.exports = {
  sendBets
};
