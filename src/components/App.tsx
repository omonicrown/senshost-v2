import * as React from "react";
import { Loader } from "@sebgroup/react-components/dist/Loader";
import { AppRoute } from "../utils/functions";
import { Redirect, Switch, RouteComponentProps, withRouter } from "react-router";

import RequireLogin from "./shared/RequireLogin";
import { actionTypes } from "../types";
import NotificationHook from "./shared/NotificationHook";
import { AppRoutes } from "../enums/routes";


const NotFound: React.LazyExoticComponent<React.FunctionComponent<RouteComponentProps>> = React.lazy(() => import("./notFound/404"));
const Home: any = React.lazy(() => import("./home/Home"));
const Account: any = React.lazy(() => import("./account/Account"));


export interface SharedProps extends RouteComponentProps {
  actions: actionTypes;
}

class App extends React.PureComponent<{}, {}> {
  constructor(props: SharedProps) {
    super(props);
  }

  render() {
    console.log("The main props ar e ", this.props);
    return (
      <div className="main-app-container">
        <NotificationHook />
        <React.Suspense fallback={<Loader toggle={true} />}>
          <Switch>
            <AppRoute exact path="/" component={Account} props={this.props} />
            <AppRoute path={AppRoutes.Home} component={RequireLogin(Home)} props={this.props} />
            <AppRoute path={AppRoutes.Account} component={(Account)} props={this.props} />
            <AppRoute path="*" component={NotFound} props={this.props} />
          </Switch>
        </React.Suspense>
      </div>
    );
  }
}


export default withRouter<any, any>(App);