import * as React from "react";

import * as echarts from 'echarts';

interface GaugeProps {
    data: Array<number>;
}


const PieChart: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {
    const pieChartRef: React.MutableRefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const styles = React.useMemo(() => ({ height: '100%' }), []);

    const [options, setOptions] = React.useState<echarts.EChartOption>(null);


    React.useEffect(() => {
        const gaugeChart = echarts.init(pieChartRef.current);

        const option: any = {
            title: {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: '搜索引擎' },
                        { value: 735, name: '直接访问' },
                        { value: 580, name: '邮件营销' },
                        { value: 484, name: '联盟广告' },
                        { value: 300, name: '视频广告' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]

        };

        option && gaugeChart.setOption(option);

    }, [pieChartRef.current]);

    return (
        <div className="piechart-graph" ref={pieChartRef} style={styles} />
    );
}

export default PieChart;
