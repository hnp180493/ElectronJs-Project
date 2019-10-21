import React, { Component } from "react";
import ReactPaginate from "react-paginate";
const { ipcRenderer } = window.require("electron");
const moment = require("moment");

class BetsList extends Component {
  constructor() {
    super();
    this.state = {
      bets: []
    };
  }
  componentDidMount() {
    let _this = this;
    ipcRenderer.on("bets-data", function(event, response) {
      let bets = response.betItems;
      let totalRows = response.totalRows;
      _this.setState({
        bets: bets,
        pageCount: Math.ceil(totalRows / 15)
      });
    });
  }
  showBetsList = () => {
    return this.state.bets.map((bet, index) => {
      // let i = (+params.pageNo - 1) * params.rowsPerPage + 1;
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
        default:
          break;
      }
      let isWinClass = "text-muted";
      let textWin = "Not Yet";
      if (bet.betStatus === "S") {
        isWinClass = bet.wlAmt > 0 ? "text-success" : "text-danger";
        textWin = bet.wlAmt > 0 ? "Yes" : "No";
      }
      return (
        <tr data-bet-detail={betJSON} key={index}>
          <td>{index}</td>
          <td>{bet.userN}</td>
          <td>{bet.betCodeId}</td>
          <td>{bet.betAmt}</td>
          <td>{bet.betNumbers}</td>
          <td className={statusClass}>{bet.betStatus}</td>
          <td className={isWinClass}>{textWin}</td>
          <td>{bet.companyName}</td>
          <td>{moment(bet.createdOn).format("DD/MM/YYYY, hh:mm:ss A")}</td>
          <td className={stopOnClass}>
            {moment(bet.stopOn).format("DD/MM/YYYY, hh:mm:ss A")}
          </td>
        </tr>
      );
    });
  };
  handlePageClick = (page) =>{
    let pageNo = page.selected + 1;
    let params = {
      pageNo
    }
    console.log(params);
    ipcRenderer.send("form-submit", params);
  }
  render() {
    return (
      <table className="table table-bordered mt-5 table-hover" id="betTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>BetCode</th>
            <th>Amount</th>
            <th>Number</th>
            <th>Status</th>
            <th>IsWin</th>
            <th>Company Name</th>
            <th>Bet On</th>
            <th>Result On</th>
          </tr>
        </thead>
        
        <tbody id="betsData">{this.showBetsList()}</tbody>
        <tfoot>
          <tr>
            <td colSpan={14} className="footable-visible">
              <div className="text-center">
                <ReactPaginate
                  previousLabel={<i className='fa fa-chevron-left' aria-hidden='true'></i>}
                  nextLabel={<i className='fa fa-chevron-right' aria-hidden='true'></i>}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default BetsList;
