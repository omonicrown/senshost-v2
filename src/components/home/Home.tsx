import React from "react";
import { RouteComponentProps, Switch, Redirect } from "react-router";
import { Image } from "@sebgroup/react-components/dist/Image";
import { AppRoute } from "../../utils/functions";
import { HomeRoutes, AppRoutes } from "../../enums/routes";

const Dashboard: any = React.lazy(() => import("../dashboard/Dashboard"));

export default class Home extends React.PureComponent<RouteComponentProps, {}> {
  render() {
    return (
      <div className="home-container">
        <div className="header-container">
          <div className="container-fluid">
            <Image
              src={require("../../assets/images/logo-inner.png")}
              useImgTag={true}
              width="150px"
              height="60px"
              onClick={() => {
                this.props?.history?.push(AppRoutes.Home.toString());
              }}
            />
          </div>
        </div>
        <aside className="left-side-container">
          <div className="container-fluid"></div>
        </aside>
        <main className="main-container">
          <div className="main-holder">
            <div className="container-fluid ">
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
            <div className="container-fluid">
              Copyright © 2019 Senshost. All rights reserved.
            </div>
          </footer>
        </main>
      </div>
    );
  }
}
