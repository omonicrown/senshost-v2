import * as React from "react";

import { EChartOption } from "echarts";

import "echarts-liquidfill";
import ReactEcharts from 'echarts-for-react';
import { PropertyItem } from "../dashboardItem/DashboardItem";

interface GaugeProps {
  type: "rectangle" | "tears" | "circle";
  data: Array<PropertyItem>;
  name: string;
}

interface ChartOption extends EChartOption {
  name: string;
  color?: Array<string>;
  properties: Option
}
type Option = {
  [k: string]: any;
}

const Tank: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {

  const [selectedOption, setSelectedOption] = React.useState<Option>({});
  const [options, setOptions] = React.useState<Array<ChartOption>>([{
    name: "rectangle",
    properties: {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [{
        type: 'liquidFill',
        name: props.name,
        data: [0.9],
        detail: { formatter: '{value * 100}%' },
        radius: '100%',
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
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [{
        type: 'liquidFill',
        data: [0.6],
        name: props.name,
        detail: { formatter: '{value * 100}%' },
        radius: '100%',
        outline: {
          show: false
        },
      }]
    }
  },
  {
    name: "tears",
    properties: {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [{
        type: 'liquidFill',
        detail: { formatter: '{value * 100}%' },
        data: [0.6],
        radius: '100%',
        name: props.name,
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
        const capacityItem: PropertyItem = props.data?.find((property: PropertyItem) => property.propertyName === "capacity");
        const valueItem: PropertyItem = props.data?.find((property: PropertyItem) => property.propertyName === "value");
        const data: number = (Number(valueItem?.propertyValue) / Number(capacityItem?.propertyValue));
        return { ...option, properties: { ...option.properties, series: { ...option.properties.series, data: [data || 0] }} };
      }

      return option;
    }, [props.type]);

    setOptions(updatedOptions);
  }, [props.type, props.data, props.name])

  return (
    <ReactEcharts className="chart" option={selectedOption} />
  );
}

export default Tank;
