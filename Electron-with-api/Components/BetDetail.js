const { ipcRenderer, remote } = require("electron");

ipcRenderer.on("get-bet-detail", function(event, betDetailJSON) {
  console.log(betDetailJSON);
  let betDetailHtml = document.getElementById("rpt-detail");
  betDetailHtml.innerHTML = "";
  let betDetail = JSON.parse(decodeURIComponent(betDetailJSON));
  let html = "";
  html += `
            <tr>
                <td rowspan="3" class="row-span">Account</td>
                <td>UserN</td>
                <td>${betDetail.userN}</td>
            </tr>
            <tr>
                <td>AccId</td>
                <td>${betDetail.accId}</td>
            </tr>
            <tr>
                <td>Ip Address</td>
                <td>${betDetail.ipAddress}</td>
            </tr>


            <tr>
                <td rowspan="12" class="row-span">Bet</td>
                <td>Company Name</td>
                <td>${betDetail.companyName}</td>
            </tr>
            <tr>
                <td>BetId</td>
                <td>${betDetail.betId}</td>
            </tr>
            <tr>
                <td>GameId</td>
                <td>${betDetail.gameId}</td>
            </tr>

            <tr>
                <td>Bet Code</td>
                <td>${betDetail.betCodeId}</td>
            </tr>
            <tr>
                <td>Number</td>
                <td>${betDetail.betNumbers}</td>
            </tr>
            <tr>
                <td>Status</td>
                <td>${betDetail.betStatus}</td>
            </tr>
            <tr>
                <td>Single Amount</td>
                <td>${betDetail.betAmtSingle}</td>
            </tr>
            <tr>
                <td>Total Amount</td>
                <td>${betDetail.betAmt}</td>
            </tr>
            <tr>
                <td>Odds</td>
                <td>${betDetail.odds}</td>
            </tr>
            <tr>
                <td>WinLoss Amount</td>
                <td>${betDetail.wlAmt}</td>
            </tr>
            <tr>
                <td>Bet On</td>
                <td>${betDetail.createdOn}</td>
            </tr>
            <tr>
                <td>Result On</td>
                <td>${betDetail.stopOn}</td>
            </tr>
    `;
  betDetailHtml.innerHTML = html;
});

document.querySelector(".close-window").addEventListener("click", function() {
  let currentWidow = remote.getCurrentWindow();
  currentWidow.close();
});
