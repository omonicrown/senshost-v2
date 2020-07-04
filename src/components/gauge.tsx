import * as React from "react";

import 'echarts/lib/chart/gauge';
import { EChartOption } from "echarts";

import "echarts-liquidfill";
import ReactEcharts from 'echarts-for-react';

interface GaugeProps {
  type: "rectangle" | "tears" | "circle";
  data: Array<number>;
}

interface ChartOption {
  name: string;
  color?: string;
  properties: Option
}
type Option = {
  [k: string]: any;
}

const Gauge: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {

  const [selectedOption, setSelectedOption] = React.useState<Option>({});
  const [options, setOptions] = React.useState<Array<ChartOption>>([{
    name: "rectangle",
    properties: {
      series: [{
        type: 'liquidFill',
        data: [0.6],
        radius: '70%',
        backgroundStyle: {
          borderWidth: 2,
          borderColor: '#156ACF'
        },
        outline: {
          show: false
        },
        shape: 'rect'
      }]
    }
  },
  {
    name: "circle",
    properties: {
      series: [{
        type: 'liquidFill',
        data: [0.6],
        radius: '70%',
        outline: {
          show: false
        },
      }]
    }
  },
  {
    name: "tears", properties: {
      series: [{
        type: 'liquidFill',
        data: [0.6],
        radius: '90%',
        itemStyle: {
          shadowBlur: 0
        },
        backgroundStyle: {
          borderWidth: 2,
          borderColor: '#156ACF'
        },
        outline: {
          show: false
        },
        label: {
          shadowBlur: 0,
          fontSize: 30,
          position: ['50%', '45%']
        },
        shape: 'pin',
        center: ['50%', '40%']
      }]
    }
  }]);

  React.useEffect(() => {
    const option = options.find((option: ChartOption) => option.name === props.type);

    if (option) {
      setSelectedOption(option?.properties)
    }
  }, [options]);

  React.useEffect(() => {
    const updatedOptions: Array<ChartOption> = options.map((option: ChartOption) => {
      if (option.name === props.type) {
        return { ...option, properties: { ...option.properties, series: { ...option.properties.series, data: props.data } } };
      }

      return option;
    }, [props.type]);
    setOptions(updatedOptions);
  }, [props.type, props.data])

  return (
    <ReactEcharts className="chart" option={selectedOption} />

  );
}

export default Gauge;
