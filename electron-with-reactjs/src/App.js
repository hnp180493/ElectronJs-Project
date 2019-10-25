import React from "react";
import SearchForm from "./components/SearchForm";
import BetsList from "./components/BetsList";
import BetDetail from "./components/BetDetail";
import { HashRouter, Switch, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";

function Bets() {
  return (
    <div className="bet-list-container">
      <SearchForm />
      <BetsList />
    </div>
  );
}
function App() {
  return (
    <div>
      <LoadingBar />

      <HashRouter>
        <Switch>
          <Route exact path="/" component={Bets} />
          <Route path="/bet-detail" component={BetDetail} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
