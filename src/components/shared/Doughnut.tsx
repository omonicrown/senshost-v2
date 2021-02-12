import * as React from "react";

import * as echarts from 'echarts';

interface GaugeProps {
    data: Array<number>;
}


const Doughnut: React.FunctionComponent<GaugeProps> = (props: GaugeProps): React.ReactElement<void> => {
    const doughnutRef: React.MutableRefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const styles = React.useMemo(() => ({ height: '100%' }), []);

    const [options, setOptions] = React.useState<echarts.EChartOption>(null);


    React.useEffect(() => {
        const gaugeChart = echarts.init(doughnutRef.current);

        const option: any = {
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: '访问来源',
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
                    data: [
                        { value: 1048, name: '搜索引擎' },
                        { value: 735, name: '直接访问' },
                        { value: 580, name: '邮件营销' },
                        { value: 484, name: '联盟广告' },
                        { value: 300, name: '视频广告' }
                    ]
                }
            ]
        };

        option && gaugeChart.setOption(option);

    }, [doughnutRef.current]);

    return (
        <div className="doughnut-graph" ref={doughnutRef} style={styles} />
    );
}

export default Doughnut;
