// import React, { Component } from 'react';
//  // 引入 ECharts 主模块
// // import echarts from 'echarts/lib/echarts';
// // import 'echarts/lib/chart/line';
// // import 'echarts/lib/component/markPoint'
// // import 'echarts/lib/component/tooltip';
// // import 'echarts/lib/component/title';
// // import 'echarts/lib/component/visualMap';

// import echarts from 'echarts/lib/echarts'
// //导入折线图
// import 'echarts/lib/chart/bar'
// // 引入提示框和标题组件
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/markPoint'
// import ReactEcharts from 'echarts-for-react'

//  import { secondToTime } from '../utils/handleDate'

// const stressData: number[] = []
// for (let i = 0; i < 160; i++) {
// 	stressData.push(Math.floor(Math.random() * 25) + 1)
// }
// for (let i = 0; i < 320; i++) {
// 	stressData.push(Math.floor(Math.random() * 101) - 1)
// }

// console.log('----->stressData', stressData)

// const xData: string[] = [];
// for(let i = 0; i < 480; i++) {
// 	const second = i * 180;
// 	xData.push(secondToTime(second));
// }

// console.log('--->xData', xData)

// export default class StressDetail extends Component<{}, {}> {
	
// 	initStressChart = () => {
// 		// @ts-ignore
// 		// const stressChart = echarts.init(document.getElementById('stressChart'));
// 		// stressChart.setOption({
// 		// 	title: {
// 		// 		text: '压力详情'
// 		// 	},
// 		// 	tooltip: {
// 		// 		trigger: 'axis'
// 		// 	},
// 		// 	xAxis: {
// 		// 		data: xData,
// 		// 		type: 'category',
// 		// 		axisTick:{
// 		// 			show:false,//去掉刻度值
// 		// 		},
// 		// 		boundaryGap: false,//设置为false后，x轴的起始点01和y轴的起始点0是同一个位置
// 		// 	},
// 		// 	yAxis: {
// 		// 		type: 'value',
// 		// 		splitLine: {
// 		// 			show: false
// 		// 		}
// 		// 	},
// 		// 	series: [
// 		// 		{
// 		// 			name: '压力详情',
// 		// 			type: 'line',
// 		// 			data: stressData
// 		// 		// 	markLine: {
// 		// 		// 		silent: true,
// 		// 		// 		data: [{
// 		// 		// 			yAxis: 25
// 		// 		// 		}, {
// 		// 		// 			yAxis: 50
// 		// 		// 		}, {
// 		// 		// 			yAxis: 75
// 		// 		// 		}, {
// 		// 		// 			yAxis: 100
// 		// 		// 		}]
// 		// 		// 	}
// 		// 		}
// 		// 	]
// 		// })
// 		var data = [21,25,27,12,22,21,25,27,12,22,42,32];
// 		let option = {
// 			title: {  //标题
// 					text: '折线图一',
// 					x: 'center',
// 					textStyle: { //字体颜色
// 							color: '#ccc'
// 					}
// 			},
// 			tooltip:{ //提示框组件
// 					trigger: 'axis'
// 			},
// 			xAxis: { //X轴坐标值
// 					data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
// 			},
// 			yAxis: {
// 					type: 'value' //数值轴，适用于连续数据
// 			},
// 			series : [
// 					{
// 							name:'订单量', //坐标点名称
// 							type:'bar', //线类型
// 							data:[1000, 1500, 2000, 3000, 2500, 1800, 1200] //坐标点数据
// 					}
// 			]
// 		}
// 		// @ts-ignore
// 		option.series[0].data = data;//赋值方法2，两种方法等效
// 		// @ts-ignore
// 		var chart2 = echarts.init(document.getElementById('stressChart'));
// 		// @ts-ignore
//     chart2.setOption(option);
// 	}
	
// 	constructor(props: any) {
// 		super(props)
// 	}

// 	componentDidMount() {
// 		this.initStressChart()
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<div id="stressChart" style={{ width: "350px", height: "350px" }}></div>
// 			</div>
// 		);
// 	}
// }

import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入折线图
import  'echarts/lib/chart/line';

class StressDetail  extends Component {
    componentDidMount() {
				// 基于准备好的dom，初始化echarts实例
				// @ts-ignore
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [520, 932, 901, 1934, 1290, 1330, 1320],
                type: 'line'
            }]       
        });
    }
    render() {
        return (
            <div id="main" style={{ width: 600, height: 400 }}></div>
        );
    }
}
export default StressDetail ;
