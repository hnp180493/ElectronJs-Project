const axios = require("axios");

async function getBets(params = {}) {
  params.pageNo = params.pageNo || 1;
  params.rowsPerPage = 15;

  params.GameId = params.GameId || 0;
  params.BetId = params.BetId || 0;
  console.log(JSON.stringify(params));
  try {
    let response = await axios({
      method: "post",
      url: "http://api.betwin8.com/api/game/get-bet-infor",
      // url: "http://192.168.0.11:7023/api/Game/get-bet-infor",
      headers: {
        "content-type": "application/json charset=utf-8",
        "x-api-key": "zXETppKnKk"
      },
      data: JSON.stringify(params)
    });
    return response.data.value;
  } catch (error) {
    console.log(error.response);
  }
}

module.exports = getBets;
