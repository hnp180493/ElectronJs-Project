import React, { Component } from "react";
import { connect } from "react-redux";
const { ipcRenderer } = window.require("electron");
let Pikaday = require("pikaday");

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.fromDate = React.createRef();
    this.toDate = React.createRef();
  }
  componentDidMount() {
    let _this = this;
    new Pikaday({
      field: this.fromDate.current,
      format: "YYYY-MM-DD",
      onSelect: function(date) {
        _this.setState({
          FromDate: date
        });
      }
    });
    new Pikaday({
      field: this.toDate.current,
      format: "YYYY-MM-DD",
      onSelect: function(date) {
        _this.setState({
          ToDate: date
        });
      }
    });
  }
  onChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  };
  onSubmit = e => {
    e.preventDefault();
    let params = { ...this.state };
    this.props.sendParams(params);
    ipcRenderer.send("form-submit", params);
  };
  render() {
    return (
      <div className="container">
        <form id="searchForm" onSubmit={this.onSubmit}>
          <div className="form-row align-items-center">
            <div className="col-sm-3 my-1">
              <input
                type="text"
                className="form-control"
                placeholder="BetCode"
                name="BetCodeId"
                onChange={this.onChange}
              />
            </div>
            <div className="col-sm-3 my-1">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                name="BetStatus"
                onChange={this.onChange}
              />
            </div>
            <div className="col-sm-3 my-1">
              <input
                type="text"
                className="form-control"
                placeholder="Company Code"
                name="CompanyCode"
                onChange={this.onChange}
              />
            </div>
            <div className="col-sm-3 my-1">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="UserN"
                onChange={this.onChange}
              />
            </div>
            <div className="col-sm-3 my-1">
              <input
                type="text"
                className="form-control"
                placeholder="BetId"
                name="BetId"
                onChange={this.onChange}
              />
            </div>
            <div className="col-sm-3 my-1">
              <input
                type="text"
                className="form-control"
                placeholder="GameId"
                name="GameId"
                onChange={this.onChange}
              />
            </div>
            <div className="col-sm-3 my-1">
              <input
                type="text"
                className="form-control"
                placeholder="From Date"
                name="FromDate"
                id="fromDate"
                ref={this.fromDate}
              />
            </div>
            <div className="col-sm-3 my-1">
              <input
                type="text"
                className="form-control"
                placeholder="To Date"
                name="ToDate"
                id="toDate"
                ref={this.toDate}
              />
            </div>
            <div className="col-12 my-1">
              <button type="submit" className="btn btn-primary float-right">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    sendParams: (params) => {
      dispatch({type: "SEND_PARAMS_FORM", params})
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchForm);
