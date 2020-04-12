import React from "react";
import { RouteComponentProps } from "react-router";

export default class Dashboard extends React.PureComponent<
  RouteComponentProps
> {
  componentDidMount() {
    console.log("Coming back to call us ", this.props);
  }

  render() {
    return <div className="dashboard-container">sefsfds</div>;
  }
}
