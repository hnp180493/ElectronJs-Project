const { ipcRenderer } = require("electron");
//Get Bets data from server and load to view
ipcRenderer.on("bets-data", function(event, betsJson, params) {
  // let bets = JSON.parse(betsJson);
  let bets = JSON.parse(betsJson);
  bets = bets.value;
  global.totalRows = bets.totalRows;
  let bodies = document.querySelector("#betTable tbody");
  bodies.innerHTML = "";
  let i = (+params.pageNo - 1) * params.rowsPerPage + 1;
  for (let bet of bets.betItems) {
    let betJSON = encodeURIComponent(JSON.stringify(bet));
    let stopOnClass =
      new Date() > new Date(bet.stopOn) ? "text-success" : "text-danger";
    let statusClass = "";
    switch (bet.betStatus) {
      case "S":
        statusClass = "text-success";
        break;
      case "B":
        statusClass = "text-primary";
        break;
      case "C":
        statusClass = "text-muted";
        break;
      case "I":
        statusClass = "text-danger";
        break;
    }
    let isWinClass = "text-muted";
    let textWin = "Not Yet";
    if (bet.betStatus === "S") {
      isWinClass = bet.wlAmt > 0 ? "text-success" : "text-danger";
      textWin = bet.wlAmt > 0 ? "Yes" : "No";
    }

    let html = `
            <tr data-bet-detail=${betJSON}>
                <td>${i++}</td>
                <td>${bet.userN}</td>
                <td>${bet.betCodeId}</td>
                <td>${bet.betAmt}</td>
                <td>${bet.betNumbers}</td>
                <td class=${statusClass}>${bet.betStatus}</td>
                <td class=${isWinClass}>${textWin}</td>
                <td>${bet.companyName}</td>
                <td>${moment(bet.createdOn).format(
                  "DD/MM/YYYY, hh:mm:ss A"
                )}</td>
                <td class=${stopOnClass}>
                    ${moment(bet.stopOn).format("DD/MM/YYYY, hh:mm:ss A")}
                </td>
            </tr>
        `;
    bodies.insertAdjacentHTML("beforeend", html);
  }
  if (params.isLoadNewPaging == undefined || params.isLoadNewPaging === true) {
    Pagination.loadPaging();
  }
});

//submit
document.getElementById("searchForm").addEventListener("submit", function(evt) {
  evt.preventDefault();
  sendParams();
});

//paging click
document.getElementById("pagination").addEventListener("click", function(evt) {
  let target = evt.target;
  if (target.tagName !== "A") return;
  let pageNo = Pagination.page;
  if (target.id === "previousBtn") {
    sendParams(pageNo, false);
    return;
  }

  if (target.id === "nextBtn") {
    sendParams(pageNo, false);
    return;
  }
  sendParams(pageNo, false);
});

//Click a bet to get Bet detail
document.getElementById("betTable").addEventListener("click", function(evt) {
  let target = evt.target;
  if (target.tagName != "TD") return;
  let tr = target.closest("tr");
  let betDetail = tr.dataset.betDetail;
  ipcRenderer.send("open-bet-detail", betDetail);
});

function sendParams(pageNo = 1, isLoadNewPaging = true) {
  //Convert formData to object
  let params = Object.fromEntries(
    new FormData(document.querySelector("#searchForm"))
  );
  params.rowsPerPage = global.pageSize;
  params.pageNo = pageNo;
  params.isLoadNewPaging = isLoadNewPaging;

  params.BetId = params.BetId || 0;
  params.GameId = params.GameId || 0;
  ipcRenderer.send("form-submit", params);
}
