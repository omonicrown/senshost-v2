import * as React from "react";
import { Loader } from "@sebgroup/react-components/dist/Loader";
import { AppRoute } from "../utils/functions";
import { Redirect, Switch, RouteComponentProps } from "react-router";

import RequireLogin from "./shared/requireLogin";


const NotFound: React.LazyExoticComponent<React.FunctionComponent<RouteComponentProps>>  =  React.lazy(() => import("./notFound/404"));
const Home: any  =  React.lazy(() => import("./home/Home"));

interface AppProps extends RouteComponentProps {}
export default class App extends React.PureComponent<{}, {}> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <div className="main-app-container">
        <React.Suspense fallback={<Loader toggle={true} />}>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <AppRoute path="/home" component={RequireLogin(Home)} props={this.props} />
            <AppRoute path="*" component={NotFound} props={this.props} />
          </Switch>
        </React.Suspense>
      </div>
    );
  }
}
