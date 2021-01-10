import * as React from "react";

import 'echarts/lib/chart/graph';
import { EChartOption } from "echarts";

import "echarts-liquidfill";
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
    series: Array<
        {
            name: string,
            type: string,
            detail: Option,
            data: Array<Option>
        }
    >
}

type Option = {
    [k: string]: any;
}

const BarGraph: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {

    const [options, setOptions] = React.useState<ChartOption>({
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
                name: 'First Gauge',
                type: 'bar',
                detail: { formatter: '{value}%', fontSize: 20 },
                data: [{ value: 50, name: 'Test' }, { value: 20, name: 'Test Data 2' }]
            }
        ]
    });

    return (
        <ReactEcharts className="chart" option={options} />
    );
}

export default BarGraph;
