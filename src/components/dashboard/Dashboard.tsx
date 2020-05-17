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
          <div className="col-md-4 col-12 gadgetPanel">
            <Gauge type="rectangle" data={[0.6]} />
          </div>

          <div className="col-md-4 col-12 gadgetPanel">
            <Gauge type="circle" data={[0.5]} />
          </div>

          <div className="col-md-4 col-12 gadgetPanel">
            <Gauge type="tears" data={[0.3]} />
          </div>
        </div>
      </div>
    );
  }
}
