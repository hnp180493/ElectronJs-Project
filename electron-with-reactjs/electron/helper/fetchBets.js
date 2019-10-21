const axios = require("axios");

async function getBets(params = {}) {
  params.pageNo = params.pageNo || 1;
  params.rowsPerPage = 15;
  let response = await axios({
    method: "post",
    url: "http://api.betwin8.com/api/game/get-bet-infor",
    headers: {
      "content-type": "application/json charset=utf-8",
      "x-api-key": "zXETppKnKk"
    },
    data: JSON.stringify(params)
  });
  return response.data.value;
}

module.exports = getBets;
