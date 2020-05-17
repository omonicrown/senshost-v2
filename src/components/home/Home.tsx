import React from "react";
import { RouteComponentProps, Switch, Redirect } from "react-router";
import { AppRoute } from "../../utils/functions";
import { HomeRoutes } from "../../enums/routes";
import { History } from "history";

import SidebarComponent from "../shared/Sidebar";
import HeaderComponent from "../shared/Header";

const Dashboard: any = React.lazy(() => import("../dashboard/Dashboard"));

export interface SharedProps {
  history?: History;
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
          <main className={"main-container" + (this.state.toggle ? " sidemenu-opened" : " sidemenu-closed")} role="main">
            <div className="main-holder">
              <div className="container">
                <Switch>
                  <Redirect
                    exact
                    from="/home"
                    to={HomeRoutes.Dashboard.toString()}
                  />
                  <AppRoute
                    exact
                    path={HomeRoutes.Dashboard.toString()}
                    component={Dashboard}
                    props={this.props}
                  />
                </Switch>
              </div>
            </div>

            <footer className="footer-container">
              Copyright © 2019 Senshost. All rights reserved.
            </footer>
          </main>
        </div>
      </div>
    );
  }
}
