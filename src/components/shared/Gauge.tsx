import * as React from "react";

import * as echarts from 'echarts';

interface GaugeProps {
    data: Array<number>;
}


const Gauge: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {
    const gaugeRef: React.MutableRefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const styles = React.useMemo(() => ({ height: '100%' }), []);

    const [options, setOptions] = React.useState<echarts.EChartOption>(null);


    React.useEffect(() => {
        const gaugeChart = echarts.init(gaugeRef.current);

        const option = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            series: [{
                name: 'Pressure',
                type: 'gauge',
                progress: {
                    show: true
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}'
                },
                data: [{
                    value: 50,
                    name: 'SCORE'
                }]
            }]
        };

        option && gaugeChart.setOption(option);

    }, [gaugeRef.current]);

    return (
        <div className="gauge-graph" ref={gaugeRef} style={styles} />
    );
}

export default Gauge;
