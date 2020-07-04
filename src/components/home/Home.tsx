import React from "react";
import { RouteComponentProps, Switch, Redirect } from "react-router";
import { AppRoute } from "../../utils/functions";
import { HomeRoutes } from "../../enums/routes";
import { History } from "history";

import SidebarComponent from "../shared/Sidebar";
import HeaderComponent from "../shared/Header";
import { AuthState } from "../../interfaces/states";
import { actionTypes } from "../../types";

import RequireLoginComponent from "../shared/RequireLogin";

const Dashboard: any = React.lazy(() => import("../devices/Devices"));

export interface SharedProps {
  history?: History;
  authState?: AuthState;
  actions?: actionTypes;
}

interface HomeProps extends RouteComponentProps {

}
interface HomeStates {
  toggle: boolean;
}

export default class Home extends React.PureComponent<HomeProps, HomeStates> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      toggle: false
    }
  }

  onToggle = (e: React.MouseEvent<SVGElement, MouseEvent>, value?: boolean) => {
    this.setState({ toggle: value || !this.state.toggle });
  }

  render() {
    return (
      <div className="home-container container-fluid">
        <div className="row no-gutters">
          <HeaderComponent />
        </div>
        <div className="row no-gutters main-body">
          <SidebarComponent onToggle={this.onToggle} toggle={this.state.toggle} />
          <main className={"main-container col" + (this.state.toggle ? " sidemenu-opened" : " sidemenu-closed")} role="main">
            <div className="inner-bar"></div>
            <div className="main-holder">
              <div className="container">
                <Switch>
                  <Redirect
                    exact
                    from="/home"
                    to={HomeRoutes.Dashboard.toString()}
                  />
                  <AppRoute
                    path={HomeRoutes.Dashboard.toString()}
                    component={RequireLoginComponent(Dashboard)}
                    props={this.props}
                  />
                </Switch>
              </div>

              <footer className="footer-container">
                Copyright © 2019 Senshost. All rights reserved.
              </footer>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
