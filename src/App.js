import React from "react";
import "./App.css";
import LoginForm from "./Components/Login/LoginPage";
import TopBar from "./Components/TopBar/TopBarComponent";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewLandingPage from "./Components/NewLanding/NewLanding"
import SSAnalytics from "./Components/SSAnalystics/SSAnalytics"
import EnterpriseDS from "./Components/EnterpriseDS/EnterpriseDS"
import MLScaleNewComponent from "./Components/NewML/NewML"
import RevenueAssurence from "./Components/RevenueAssurence/RevenueAssurence"
import Personalization from "./Components/Personalization/Personalization"
import Dash from "./Components/Dash/Dash"
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/HomePage" component={NewLandingPage} />
          {/* <Route exact path="/HomePage" component={LandingPage} /> */}
          <Route path="/DataMigration" component={TopBar} />
          <Route path="/SelfServiceAnalytics" component={SSAnalytics} />
          <Route path="/EnterpriseDS" component={EnterpriseDS} />
          <Route path="/MLScalePage" component={MLScaleNewComponent} />
          <Route path="/RevenueAssurence" component={RevenueAssurence} />
          <Route path="/Personalization" component={Personalization} />
          <Route path="/Dash" component={Dash} />
          Personalization
        </Switch>
      </Router>
    </div>
  );
}

export default App;
