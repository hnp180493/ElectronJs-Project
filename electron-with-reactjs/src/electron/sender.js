const handleWindow = require("./helper/window");
const getBets = require("./helper/fetchBets");

async function sendBets(params = {}) {
  let bets = await getBets(params);
  await new Promise(resolve => {
    setTimeout(resolve, 50);
  });
  handleWindow.getWindow().webContents.send("bets-data", bets);
}

module.exports = {
  sendBets
};
