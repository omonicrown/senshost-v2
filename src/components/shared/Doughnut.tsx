import * as React from "react";

import * as echarts from 'echarts';
import { PropertyItem } from "../dashboardItem/DashboardItem";

interface GaugeProps {
    data: Array<PropertyItem>;
    name: string;
}


const Doughnut: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {
    const doughnutRef: React.MutableRefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const styles = React.useMemo(() => ({ height: '100%' }), []);

    React.useEffect(() => {
        const doughnutChart = echarts.init(doughnutRef.current);
        const data = props.data?.map((property: PropertyItem) => ({ name: property.propertyName, value: property.propertyValue }));
        const option: any = {
            title: {
                text: '',
                subtext: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: props.name,
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '10',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };

        option && doughnutChart.setOption(option);

    }, [doughnutRef.current, props.data, props.name]);

    return (
        <div className="doughnut-graph" ref={doughnutRef} style={styles} />
    );
}

export default Doughnut;
