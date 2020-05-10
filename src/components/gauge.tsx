import * as React from "react";

import { AnalogTank } from "../utils/rectangleTank";


interface GaugeProps {
  type: "round" | "tower";
}

const Gauge: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {
  const ref: React.RefObject<SVGSVGElement> = React.createRef<SVGSVGElement>();
  const wrapperDiv: React.RefObject<HTMLDivElement> = React.createRef<
    HTMLDivElement
  >();
  // let gauge: Gauge;
  let analogueTank: AnalogTank;

  React.useEffect(() => {
    // gauge = new Gauge(ref?.current);

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
    // let options: Config = {
    //   tankType: "tower",
    //   fillValue: 55,
    //   fillUnit: "ft",
    //   supportLabelPadding: 5,
    //   frontFontColor: "#003B42",
    //   thresholds: thresholds,
    //   lookupTableValue: 1700,
    //   lookupTableValueUnit: "gal",
    //   lookupTableValueDecimal: 1,
    //   changeRateValueDecimal: 3,
    //   changeRateValueArrowEnabled: true,
    //   changeRateValue: "0.3",
    //   changeRateValueUnit: "gal/min",
    // };

    let options = {
      tankType: props.type,
      fillValue: 55,
      fillUnit: "ft",
      supportLabelPadding: 5,
      frontFontColor: "#003B42",
      thresholds: thresholds,
      lookupTableValue: 1700,
      lookupTableValueUnit: 'gal',
      lookupTableValueDecimal: 1,
      changeRateValueDecimal: 3,
      changeRateValueArrowEnabled: true,
      changeRateValue: 0.3,
      changeRateValueUnit: 'gal/min'
    }

    analogueTank = new AnalogTank(
      wrapperDiv?.current as HTMLDivElement,
      options as any
    );
  }, []);

  const style: React.CSSProperties = {
    height: "200px",
    width: "200px",
    position: "relative",
  };
  return (
    <div className="gauge-container d-flex align-items-center justify-content-center" style={{
      height: "70%",
      background: "#3b4655",
      marginTop: "1rem"
    }}>
      <div className="wrapper" ref={wrapperDiv} style={style} id="wrapper"></div>
    </div>
  );
}

export default Gauge;
