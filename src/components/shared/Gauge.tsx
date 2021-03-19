import * as React from "react";

import * as echarts from 'echarts';
import { ItemChartProps } from "../dashboardItem/section/ItemChart";

interface GaugeProps {
    data: ItemChartProps;
}

const Gauge: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {
    const gaugeRef: React.MutableRefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const styles = React.useMemo(() => ({ height: '100%' }), []);

    React.useEffect(() => {
        const gaugeChart = echarts.init(gaugeRef.current);

        const option = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            series: [{
                name: props?.data?.name,
                type: 'gauge',
                min: props?.data?.min,
                max: props?.data?.max,
                progress: {
                    show: true
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}'
                },
                data: props?.data?.value
            }]
        };

        option && gaugeChart.setOption(option as any);

    }, [gaugeRef.current]);

    return (
        <div className="gauge-graph" ref={gaugeRef} style={styles} />
    );
}

export default Gauge;
