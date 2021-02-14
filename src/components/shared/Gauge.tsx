import * as React from "react";

import * as echarts from 'echarts';
import { PropertyItem } from "../dashboardItem/DashboardItem";

interface GaugeProps {
    data: Array<PropertyItem>;
    name: string;
}


const Gauge: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {
    const gaugeRef: React.MutableRefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const styles = React.useMemo(() => ({ height: '100%' }), []);

    React.useEffect(() => {
        const gaugeChart = echarts.init(gaugeRef.current);
        const data = props.data?.map((property: PropertyItem) => ({ name: '', value: property.propertyValue }));

        const option = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            series: [{
                name: props.name,
                type: 'gauge',
                progress: {
                    show: true
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}'
                },
                data: data
            }]
        };

        option && gaugeChart.setOption(option);

    }, [gaugeRef.current]);

    return (
        <div className="gauge-graph" ref={gaugeRef} style={styles} />
    );
}

export default Gauge;
