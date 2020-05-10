import React from "react";
import { RouteComponentProps } from "react-router";

import Gauge from "../gauge";

export default class Dashboard extends React.PureComponent<
  RouteComponentProps
  > {
  componentDidMount() {
    console.log("Coming back to call us ", this.props);
  }

  render() {
    return (
      <div className="dashboard-container">

        <div className="row">
          <div className="col-md-3 col-12 gadgetPanel">
            <Gauge type="tower" />
          </div>

          <div className="col-md-3 col-12 gadgetPanel">
            <Gauge type="round" />
          </div>
        </div>
      </div>
    );
  }
}
