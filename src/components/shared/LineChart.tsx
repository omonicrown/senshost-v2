import * as React from "react";

import 'echarts/lib/chart/line';
import { EChartOption } from "echarts";

import ReactEcharts from 'echarts-for-react';

interface GaugeProps {
    data: Array<number>;
}


interface ChartOption extends EChartOption {
    tooltip: {
        formatter: string
    },
    toolbox?: {
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        data: Array<string>
    },
    series: Array<
        {
            name: string,
            type: string,
            detail: Option,
            data: Array<number>,
            smooth: boolean
        }
    >
}

type Option = {
    [k: string]: any;
}

const LineChart: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {

    const [options, setOptions] = React.useState<ChartOption>({
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{
            name: 'LineGraph',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            detail: { formatter: '{value}%', fontSize: 20 },
            smooth: true
        }]
    });

    return (
        <ReactEcharts className="chart" option={options} />
    );
}

export default LineChart;
