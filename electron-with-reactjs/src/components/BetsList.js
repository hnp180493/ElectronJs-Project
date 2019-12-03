import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const { ipcRenderer } = window.require("electron");
const moment = require("moment");

class BetsList extends Component {
  constructor() {
    super();
    this.state = {
      bets: []
    };
  }
  pageNo = 0;
  rowsPerPage = 15;
  componentDidMount() {
    let _this = this;

    ipcRenderer.on("bets-data", function(event, response) {
      let bets = response.betItems;
      let totalRows = response.totalRows;
      _this.setState(
        {
          bets: bets,
          pageCount: Math.ceil(totalRows / _this.rowsPerPage)
        },
        () => {
          _this.props.hideLoading();
        }
      );
    });
    document
      .getElementById("betTable")
      .addEventListener("click", function(evt) {
        let target = evt.target;
        if (target.tagName !== "TD") return;

        let tr = target.closest("tr");
        let betDetail = tr.dataset.betDetail;
        ipcRenderer.send("open-bet-detail", betDetail);
      });
  }
  handlePageClick = page => {
    this.props.showLoading();
    let pageNo = page.selected;
    this.pageNo = pageNo;
    let params = { ...this.props.params };
    params.pageNo = pageNo + 1;
    this.props.reloadPaging(false);
    ipcRenderer.send("form-submit", params);
  };
  showBetsList = () => {
    if (this.props.isReload) this.pageNo = 0;
    let order = +this.pageNo * this.rowsPerPage + 1;
    return this.state.bets.map((bet, index) => {
      let betJSON = encodeURIComponent(JSON.stringify(bet));
      let stopOnClass = "text-danger";
      if (new Date() > new Date(bet.stopOn)) {
        if (bet.betStatus === "B") {
          stopOnClass = "text-primary";
        } else {
          stopOnClass = "text-success";
        }
      }
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
      let isWinClass = "text-primary";
      let textWin = "Not Yet";
      if (bet.betStatus === "C") {
        textWin = "Cancel";
        isWinClass = "text-muted";
      }
      if (bet.betStatus === "S") {
        isWinClass = bet.wlAmt > 0 ? "text-success" : "text-danger";
        textWin = bet.wlAmt > 0 ? "Yes" : "No";
      }
      return (
        <tr data-bet-detail={betJSON} key={index}>
          <td>{order++}</td>
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
  render() {
    return (
      <table className="table table-bordered table-hover" id="betTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Bet Code</th>
            <th>Amount</th>
            <th>Number</th>
            <th>Status</th>
            <th>Is Win</th>
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
                  previousLabel={
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                  }
                  nextLabel={
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  }
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  forcePage={this.props.isReload ? 0 : this.pageNo}
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}
let mapStateToProps = state => {
  return {
    params: state.searchFormReducer.params,
    isReload: state.searchFormReducer.isReload
  };
};
let mapDistchToProps = dispatch => {
  return {
    reloadPaging: isReload => {
      dispatch({ type: "RELOAD_PAGING", isReload });
    },
    showLoading: () => {
      dispatch(showLoading());
    },
    hideLoading: () => {
      dispatch(hideLoading());
    }
  };
};

export default connect(mapStateToProps, mapDistchToProps)(BetsList);
