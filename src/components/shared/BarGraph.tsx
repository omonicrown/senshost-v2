import * as React from "react";

import * as echarts from 'echarts';

interface GaugeProps {
    data: Array<number>;
}

const BarGraph: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {
    const chartRef: React.MutableRefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

    const [options, setOptions] = React.useState<any>({
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

    React.useEffect(() => {
        const barChart = echarts.init(chartRef.current);

        const option: echarts.EChartOption = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        };
        if (option && typeof option === 'object') {
            console.log("Does it even set the props  ? ", barChart)
            option && barChart.setOption(option);
        }
    }, [chartRef.current]);

    const styles = React.useMemo(() => ({ height: '100%' }), []);

    return (
        <div className="bar-chart" ref={chartRef} style={styles} />
    );
}

export default BarGraph;
