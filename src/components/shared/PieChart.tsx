import * as React from "react";

import * as echarts from 'echarts';
import { PropertyItem } from "../dashboardItem/DashboardItem";

interface GaugeProps {
    data: Array<PropertyItem>;
    name: string;
}


const PieChart: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {
    const pieChartRef: React.MutableRefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const styles = React.useMemo(() => ({ height: '100%' }), []);

    React.useEffect(() => {
        const pieChart = echarts.init(pieChartRef.current);
        const data = props.data?.map((property: PropertyItem) => ({ name: property.propertyName, value: property.propertyValue }));

        const option: echarts.EChartOption = {
            title: {
                text: '',
                subtext: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'horizontal',
                left: 'bottom',
            },
            series: [
                {
                    name: props.name,
                    type: 'pie',
                    radius: '50%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]

        } as any;

        option && pieChart.setOption(option);

    }, [pieChartRef.current, props.data]);

    return (
        <div className="piechart-graph" ref={pieChartRef} style={styles} />
    );
}

export default PieChart;
