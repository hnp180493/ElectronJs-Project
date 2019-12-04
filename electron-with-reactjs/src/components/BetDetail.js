import React, { Component, Fragment } from "react";
const { ipcRenderer, remote } = window.require("electron");
const moment = require("moment");

class BetDetail extends Component {
  constructor() {
    super();
    this.state = {
      betDetail: {}
    };
  }
  componentDidMount() {
    let _this = this;
    ipcRenderer.on("get-bet-detail", function(event, response) {
      let betDetail = JSON.parse(decodeURIComponent(response));
      _this.setState(
        {
          betDetail: betDetail
        }
      );
    });
  }
  closeBetDetail = () => {
    let currentWidow = remote.getCurrentWindow();
    currentWidow.close();
  };
  render() {
    let { betDetail } = this.state;
    return (
      <Fragment>
        <table className="table table-bordered table-hover" id="rpt-detail">
          <tbody>
            <tr>
              <td rowSpan="4" className="row-span">
                Account
              </td>
              <td>UserN</td>
              <td>{betDetail.userN}</td>
            </tr>
            <tr>
              <td>AccId</td>
              <td>{betDetail.accId}</td>
            </tr>
            <tr>
              <td>Agent</td>
              <td>{betDetail.agN}</td>
            </tr>
            <tr>
              <td>Ip Address</td>
              <td>{betDetail.ipAddress}</td>
            </tr>

            <tr>
              <td rowSpan="12" className="row-span">
                Bet
              </td>
              <td>Company Name</td>
              <td>{betDetail.companyName}</td>
            </tr>
            <tr>
              <td>BetId</td>
              <td>{betDetail.betId}</td>
            </tr>
            <tr>
              <td>GameId</td>
              <td>{betDetail.gameId}</td>
            </tr>

            <tr>
              <td>Bet Code</td>
              <td>{betDetail.betCodeId}</td>
            </tr>
            <tr>
              <td>Number</td>
              <td>{betDetail.betNumbers}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{betDetail.betStatus}</td>
            </tr>
            <tr>
              <td>Single Amount</td>
              <td>{betDetail.betAmtSingle}</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td>{betDetail.betAmt}</td>
            </tr>
            <tr>
              <td>Odds</td>
              <td style={{color: 'blue'}}>{betDetail.odds}</td>
            </tr>
            <tr>
              <td>WinLoss Amount</td>
              <td style={{color: '#983333', fontWeight: 'bold'}}>{betDetail.wlAmt}</td>
            </tr>
            <tr>
              <td>Bet On</td>
              <td>{moment(betDetail.createdOn).format("DD/MM/YYYY, hh:mm:ss A")}</td>
            </tr>
            <tr>
              <td>Result On</td>
              <td>{moment(betDetail.stopOn).format("DD/MM/YYYY, hh:mm:ss A")}</td>
            </tr>
          </tbody>
        </table>
        <i
          className="fa fa-window-close close-window"
          aria-hidden="true"
          onClick={this.closeBetDetail}
        />
      </Fragment>
    );
  }
}
export default BetDetail;
