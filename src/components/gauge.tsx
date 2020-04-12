import * as React from "react";
import logo from "./logo.svg";
import "./App.css";

import * as d3 from "d3";

import { Gauge } from "../utils/cirlcleGauge";
import { AnalogTank, Config } from "../utils/rectangleTank";

function App() {
  const ref: React.RefObject<SVGSVGElement> = React.createRef<SVGSVGElement>();
  const wrapperDiv: React.RefObject<HTMLDivElement> = React.createRef<
    HTMLDivElement
  >();
  let gauge: Gauge;
  let analogueTank: AnalogTank;

  React.useEffect(() => {
    gauge = new Gauge(ref?.current);

    let thresholds = [
      {
        name: "Alarm High",
        value: 90,
        type: "High",
        alarm: true,
      },
      {
        name: "Pump On",
        value: 55,
        type: "High",
        alarm: false,
      },
      {
        name: "Pump On",
        value: 40,
        type: "Low",
        alarm: false,
      },
      {
        name: "Alarm Low",
        value: 10,
        type: "Low",
        alarm: true,
      },
    ];
    let options: Config = {
      tankType: "tower",
      fillValue: 55,
      fillUnit: "ft",
      supportLabelPadding: 5,
      frontFontColor: "#003B42",
      thresholds: thresholds,
      lookupTableValue: 1700,
      lookupTableValueUnit: "gal",
      lookupTableValueDecimal: 1,
      changeRateValueDecimal: 3,
      changeRateValueArrowEnabled: true,
      changeRateValue: "0.3",
      changeRateValueUnit: "gal/min",
    };
    analogueTank = new AnalogTank(
      wrapperDiv?.current as HTMLDivElement,
      options as any
    );
  }, []);

  const style: React.CSSProperties = {
    backgroundColor: "#2d4e5a",
    height: "200px",
    width: "200px",
    position: "relative",
  };
  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="main-container">
        <svg
          id="fillgauge1"
          width="97%"
          height="250"
          onClick={() => {
            gauge?.NewValue();
          }}
          ref={ref}
        ></svg>

        <div className="wrapper" ref={wrapperDiv} style={style}></div>
      </main>
    </div>
  );
}

export default App;
