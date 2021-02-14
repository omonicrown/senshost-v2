import * as React from "react";

import * as echarts from 'echarts';
import { PropertyItem } from "../dashboardItem/DashboardItem";

interface GaugeProps {
    data: Array<PropertyItem>;
}

const BarGraph: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {
    const chartRef: React.MutableRefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

    React.useEffect(() => {
        const barChart = echarts.init(chartRef.current);
        const xAxis: Array<string> = props.data?.filter((item: PropertyItem) => item.propertyName === "x-axis")
            .map((propertyItem: PropertyItem) => propertyItem.propertyValue);
        const yAxis: Array<string> = props.data?.filter((item: PropertyItem) => item.propertyName === "y-axis")
            .map((propertyItem: PropertyItem) => propertyItem.propertyValue);

        const option: echarts.EChartOption = {
            xAxis: {
                type: 'category',
                data: xAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: yAxis,
                type: 'bar'
            }]
        };
        if (option && typeof option === 'object') {
            option && barChart.setOption(option);
        }
    }, [chartRef.current, props.data]);

    const styles = React.useMemo(() => ({ height: '100%' }), []);

    return (
        <div className="bar-chart" ref={chartRef} style={styles} />
    );
}

export default BarGraph;
