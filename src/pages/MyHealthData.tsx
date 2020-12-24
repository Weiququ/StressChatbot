import React, { Component, useContext, useEffect, useState } from 'react';
import { IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonIcon } from '@ionic/react';
 // 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入环形图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/legend';
import { secondToHourMinute } from '../utils/handleDate'
import { addCircle } from 'ionicons/icons';
import { getLatestDataService } from '../service/deviceService'
import { DOMAIN } from '../utils/constants'
import { connect } from '../data/connect';

const stressData =  [
	{value: 20800, name: '休息'},
	{value: 6700, name: '低'},
	{value: 4350, name: '中'},
	{value: 2600, name: '高'}
]

const avgStress = 30;

const sleep = {
	"calendarDate" : "2020-11-25",  
  "durationInSeconds" : 28740,  
  "startTimeInSeconds" : 1606235580,
  "startTimeOffsetInSeconds" : 28800,
  "unmeasurableSleepInSeconds" : 5280,
  "deepSleepDurationInSeconds" : 5460,
  "lightSleepDurationInSeconds" : 15720,
  "remSleepInSeconds" : 2280,
  "awakeDurationInSeconds" : 1140
}

interface StressSummaryData {
	calendarDate: string,
	averageStressLevel: number,
	restStressDurationInSeconds: number,
	lowStressDurationInSeconds: number,
	mediumStressDurationInSeconds: number,
	highStressDurationInSeconds: number	
}

interface SleepData {
	calendarDate: string,  
  durationInSeconds: number,  
  startTimeInSeconds: number,
  startTimeOffsetInSeconds: number,
  unmeasurableSleepInSeconds: number,
  deepSleepDurationInSeconds: number,
  lightSleepDurationInSeconds: number,
  remSleepInSeconds: number,
  awakeDurationInSeconds: number
}

interface SleepKnowledgeObject {
  title: string,
  content: string                   
}

interface StateProps {
	userId: number;
	dailyData: object;
	stressData: object;
	sleepData: object;
}

interface MyHealthDataProps extends StateProps {}


const MyHealthData: React.FC<MyHealthDataProps> = ({ userId }) => {

	const [dailyData, setDailyData] = useState<any>({}); 
	// const [stressSummaryData, setStressSummaryData] = useState<StressSummaryData | undefined>();
	const [sleepData, setSleepData] = useState<any>({});

	const initStressChart = () => {
		if(JSON.stringify(dailyData) === '{}' || !dailyData) return
		console.log('---->dailyData', dailyData)
		const stressData = [];
		// @ts-ignore
		stressData.push({'value': dailyData.restStressDurationInSeconds,  name: '休息'});
		// @ts-ignore
		stressData.push({'value': dailyData.lowStressDurationInSeconds,  name: '低'});
		// @ts-ignore
		stressData.push({'value': dailyData.mediumStressDurationInSeconds,  name: '中'});
		// @ts-ignore
		stressData.push({'value': dailyData.highStressDurationInSeconds,  name: '高'});
		// @ts-ignore
		const avgStress = dailyData.averageStressLevel;
		
		const target = new Map();
		stressData.forEach((item=>{
			target.set(item.name, item.value)
		}))

		// @ts-ignore
		// const stressPieDiv = document.getElementById('stressPie')
		// if (!stressPieDiv) {
		// 	return;
		// } 
		// const stressPie = echarts.init(stressPieDiv);

		const stressPie = echarts.init(document.getElementById('stressPie'));

		stressPie.setOption({
      title: {
        text: '压力比例',
        left: '75',
        top: 'bottom',
        textStyle: {
          fontSize: 12
        }
      },
			tooltip: {
        trigger: 'item',
        // formatter: '{a} <br/>{b}: {c} ({d}%)'
        formatter: '{b}: {d}%'
			},
			color:["#42c5f5", "#f0c060", "#f59e42", "#f56642"],
			// @ts-ignore
			legend: {
				orient: 'vertical',
				right: 0,
				bottom: 0,
				data: ['休息', '低', '中', '高'],
				// padding:[50,0,0,0],
				// data: [{
				// 	name: '休息',
				// }],
				formatter: (name) => {
					let lists = [];
					console.log(target.get(name))
					lists.push(name + ': ' + secondToHourMinute(target.get(name)))
					return lists
					// return stressData.map(item=> name + ': ' + secondToHourMinute(item.value))
				},
				textStyle: {
					fontSize: 12,
				}
			},
			series: [
				{
					name: '压力',
					type: 'pie',
					radius: ['60%', '75%'],	 // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
					center: ['30%', '40%'],	 // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
					// avoidLabelOverlap: false,
					label: {
						show: true,
						position: 'center',
						formatter: '均值'+ avgStress,
						fontSize: 13
					},
					// emphasis: {
					// 	label: {
					// 		show: false,
					// 		fontSize: '20',
					// 		fontWeight: 'bold'
					// 	}
					// },
					// labelLine: {
					// 	show: true
					// },
					
					data: stressData
				}
			]
		})
	}

	const initSleepChart = () => {
		console.log('--->initSleepChart')
		if(JSON.stringify(sleepData) === '{}' || !sleepData) {
			return;
		}
		console.log('---->sleepData', sleepData)
		const sleepChartData = [
			{value: sleepData.deepSleepDurationInSeconds, name: '深睡期'},
			{value: sleepData.lightSleepDurationInSeconds, name: '浅睡期'},
			{value: sleepData.remSleepInSeconds, name: '快速眼动睡眠'},
			{value: sleepData.awakeDurationInSeconds, name: '清醒'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
		]

		// const sleepKnowledges = [
		// 	{title: '深睡期', content: '当您进入深度睡眠时，眼睛和肌肉运动会完全停止。心率和呼吸会减慢。此时很难被叫醒，即使被叫醒也是迷糊不清的状态。'},
		// 	{title: '浅睡期', content: '浅睡眠是睡眠的第一个阶段。眼球运动和肌肉活动在浅睡觉期减慢。这时您的身体已准备好进入深度睡眠。'},
		// 	{title: '快速眼动睡眠', content: 'REM(rapid eye movement，快速眼动)睡眠视为睡眠周期的最终阶段。通常人的梦都发生在快速眼动睡眠期。REM睡眠阶段倾向于开始时比较短，整个晚上会变长。'},
		// 	{title: '清醒', content: '一般而言，连续一整晚的睡眠对身体最好，即醒来时间非常短甚至没有。'},
		// ]

		// const randomIndex = Math.floor(Math.random() * sleepKnowledges.length);
		// // this.setSleepKnowledge(sleepKnowledges[randomIndex])
	
		
		const target = new Map();
		sleepChartData.forEach(((item: any) =>{
			target.set(item.name, item.value)
		}))

		// @ts-ignore
		const sleepPie = echarts.init(document.getElementById('sleepChart'))
		sleepPie.setOption({
			animation: false, // 取消动画
			title: {
				text: '睡眠比例',
				left: '75',
				top: 'bottom',
				textStyle: {
					fontSize: 12
				}
			},
			tooltip: {
				trigger: 'item',
				// formatter: '{a} <br/>{b}: {c} ({d}%)'
				formatter: '{b}: {d}%'
			},
			color:["#3366ff", "#66a3ff", "#ff9966", "#ffcc00"],
			// @ts-ignore
			legend: {
				orient: 'vertical',
				right: 0,
				bottom: 0,
				data: ['深睡期', '浅睡期', '快速眼动睡眠', '清醒'],
				formatter: (name) => {
					let lists = [];
					console.log(target.get(name))
					lists.push(name + ': ' + secondToHourMinute(target.get(name)))
					return lists
					// return stressData.map(item=> name + ': ' + secondToHourMinute(item.value))
				},
				textStyle: {
					fontSize: 12,
				}
			},
			series: [
				{
					name: '睡眠',
					type: 'pie',
					radius: ['60%', '75%'],	 // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
					center: ['30%', '40%'],	 // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
					// avoidLabelOverlap: false,
					label: {
						show: true,
						position: 'center',
						formatter: secondToHourMinute(sleepData.durationInSeconds),
						fontSize: 13
					},
					data: sleepChartData
				}
			]
		})
		sleepPie.on('legendselectchanged',params => {
			sleepPie.setOption({
				// @ts-ignore
				legend:{selected:{[params.name]: true}}
			})
		})
	}


	useEffect(() => {
		console.log('----->useEffect')

		const asyncFetchDailyData = async () => {
			// TODO: userId记得改回来
			// const fetchData: any = await getLatestDataService(userId, DOMAIN.STRESS);
			const fetchDailyData: any = await getLatestDataService(userId, DOMAIN.DAILY);
			const dailyData = fetchDailyData.data?.latestData || null;
			setDailyData(dailyData);
			const fetchSleepData: any = await getLatestDataService(userId, DOMAIN.SLEEP);
			const sleepData = fetchSleepData.data?.latestData || null;
			setSleepData(sleepData);
		
			// const stressData = await getLatestDataService(11, DOMAIN.STRESS);
		}
		asyncFetchDailyData();
	}, []);

	useEffect(() => {
		initStressChart();
	}, [dailyData])

	useEffect(() => {
		initSleepChart();
	}, [sleepData])
	
	
	return (
		<IonPage id="myHealthData-page">
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton></IonMenuButton>
					</IonButtons>
					<IonTitle>我的健康数据</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard>
					<IonCardHeader>
						{/* <IonCardSubtitle>压力</IonCardSubtitle> */}
						<IonCardTitle>压力</IonCardTitle>
					</IonCardHeader>

					<IonCardContent>
						<div id="stressPie" style={{ width: "350px", height: "150px" }}></div>
						<div style={{paddingTop: "10px", float: "left"}}>{ dailyData?.calendarDate || ''}</div>
						<div style={{paddingTop: "10px", textAlign: "right"}}>
							<IonIcon slot="start" icon={addCircle} color="medium" style={{width: "24px", height: "24px"}} />
						</div>
					</IonCardContent> 
				</IonCard>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>睡眠</IonCardTitle>
					</IonCardHeader>

					<IonCardContent>
							{/* <div id="sleepKnowledge" style={{ border: "0px solid", borderRadius: "5px", padding: "5px", margin: "5px"}}>
								<div id="title" style={{ fontWeight: 600, color: "#f25d3a" }}>{this.state.sleepKnowledge.title}</div>
								<div id="content">{this.state.sleepKnowledge.content}</div>
							</div> */}
							<div id="sleepChart" style={{ width: "350px", height: "150px" }}></div>
							<div style={{paddingTop: "10px"}}>{ sleepData?.calendarDate || ''}</div>
					</IonCardContent>

					{/* <IonPopover
						isOpen={this.state.showSleepPopover}
						cssClass='my-custom-class'
						onDidDismiss={e => this.setShowSleepPopover(false)}
					>
						<p>This is popover content</p>
					</IonPopover> */}
				</IonCard>
			</IonContent>
		</IonPage>
	);
}

export default connect<{}, StateProps, {}>({
	// @ts-ignore
  mapStateToProps: (state) => ({
    userId: state.user.id,
  }),
  component: MyHealthData
})



// class MyHealthData extends Component<{}, {userId: number, showSleepPopover: boolean, sleepKnowledge: SleepKnowledgeObject}> {

// 	context = useContext(AppContext);

//   constructor(props: any) {
//     // 必须在这里通过super调用父类的constructor
// 		super(props);
	
//     this.state = {
// 			userId: this.context.state.user.id || -1,
//       showSleepPopover: false,
//       sleepKnowledge: {title: '', content: ''}
//     }
//   }

//   setShowSleepPopover(showSleepPopover: boolean) {
//     this.setState({showSleepPopover: false});
//   }

//   setSleepKnowledge(sleepKnowledge: SleepKnowledgeObject) {
//     this.setState({sleepKnowledge});
//   }

// 	initStressChart = () => {
// 		const target = new Map();
// 		stressData.forEach((item=>{
// 			target.set(item.name, item.value)
// 		}))


// 		// @ts-ignore
// 		const stressPie = echarts.init(document.getElementById('stressPie'))
// 		stressPie.setOption({
//       title: {
//         text: '压力比例',
//         left: '75',
//         top: 'bottom',
//         textStyle: {
//           fontSize: 12
//         }
//       },
// 			tooltip: {
//         trigger: 'item',
//         // formatter: '{a} <br/>{b}: {c} ({d}%)'
//         formatter: '{b}: {d}%'
// 			},
// 			color:["#42c5f5", "#f0c060", "#f59e42", "#f56642"],
// 			// @ts-ignore
// 			legend: {
// 				orient: 'vertical',
// 				right: 0,
// 				bottom: 0,
// 				data: ['休息', '低', '中', '高'],
// 				// padding:[50,0,0,0],
// 				// data: [{
// 				// 	name: '休息',
// 				// }],
// 				formatter: (name) => {
// 					let lists = [];
// 					console.log(target.get(name))
// 					lists.push(name + ': ' + secondToHourMinute(target.get(name)))
// 					return lists
// 					// return stressData.map(item=> name + ': ' + secondToHourMinute(item.value))
// 				},
// 				textStyle: {
// 					fontSize: 12,
// 				}
// 			},
// 			series: [
// 				{
// 					name: '压力',
// 					type: 'pie',
// 					radius: ['60%', '75%'],	 // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
// 					center: ['30%', '40%'],	 // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
// 					// avoidLabelOverlap: false,
// 					label: {
// 						show: true,
// 						position: 'center',
// 						formatter: '均值'+ avgStress,
// 						fontSize: 13
// 					},
// 					// emphasis: {
// 					// 	label: {
// 					// 		show: false,
// 					// 		fontSize: '20',
// 					// 		fontWeight: 'bold'
// 					// 	}
// 					// },
// 					// labelLine: {
// 					// 	show: true
// 					// },
					
// 					data: stressData
// 				}
// 			]
// 		})
// 	}

// 	initStressGlass = () => {
//     am4core.useTheme(am4themes_animated);
//     // Themes end

//     let iconPath = "M256.814,72.75c0-26.898-10.451-52.213-29.43-71.277C226.444,0.529,225.17,0,223.84,0H87.712c-1.329,0-2.604,0.529-3.543,1.473c-18.978,19.064-29.43,44.379-29.43,71.277c0,50.615,37.414,92.654,86.037,99.922v108.88h-21.25c-8.271,0-15,6.729-15,15c0,8.271,6.729,15,15,15h72.5c8.271,0,15-6.729,15-15c0-8.271-6.729-15-15-15h-21.25v-108.88C219.399,165.404,256.814,123.365,256.814,72.75z M106.709,120.879c-1.234,1.083-2.765,1.615-4.285,1.615c-1.807,0-3.604-0.748-4.888-2.212c-13.153-14.986-18.888-34.832-15.733-54.451c0.571-3.543,3.902-5.956,7.45-5.385c3.544,0.57,5.955,3.905,5.386,7.45c-2.538,15.779,2.079,31.747,12.667,43.811C109.674,114.404,109.406,118.511,106.709,120.879z M144.351,136.662c-0.514,3.194-3.274,5.468-6.409,5.468c-0.343,0-0.69-0.027-1.041-0.083c-6.937-1.117-13.6-3.299-19.804-6.488c-3.193-1.641-4.451-5.559-2.811-8.752c1.641-3.194,5.563-4.451,8.752-2.81c4.985,2.562,10.345,4.317,15.929,5.215C142.511,129.782,144.922,133.118,144.351,136.662z";

//     let chart = am4core.create("chartdiv", am4charts.SlicedChart);
//     chart.paddingTop = am4core.percent(5);

//     chart.data = [{
//       "name": "高",
//       "value": 30,
//       "color": am4core.color("#f56642")
//     }, {
//       "name": "中",
//       "value": 50,
//       "color": am4core.color("#f59e42")
//     }, {
//       "name": "低",
//       "value": 200,
//       "color": am4core.color("#f5d442")
//     }, {
//       "name": "休息",
//       "value": 400,
//       "color": am4core.color("#42c5f5")
//     }];

//     let series = chart.series.push(new am4charts.PictorialStackedSeries());
//     series.dataFields.value = "value";
//     series.dataFields.category = "name";
//     // series.startLocation = 0.5
//     // series.endLocation = 0.85

//     series.slicesContainer.background.fill = am4core.color("#676767")
//     series.slicesContainer.background.fillOpacity = 0.2;

//     series.maskSprite.path = iconPath;

//     series.labelsContainer.width = am4core.percent(100);
//     series.alignLabels = true;
//     series.slices.template.propertyFields.fill = "color";
//     series.slices.template.propertyFields.stroke = "color";

// 		// 阴影
//     let gradientModifier = new am4core.LinearGradientModifier();
//     gradientModifier.lightnesses = [0.2, -0.6];
//     series.slices.template.fillModifier = gradientModifier;
//     series.slices.template.strokeModifier = gradientModifier;

//     // this makes the fills to start and end at certain location instead of taking whole picture
//     series.endLocation = 0.553;
//     series.startLocation = 0.1;
//     // this makes initial fill animation
//     series.hiddenState.properties.startLocation = 0.553;
//     series.ticks.template.locationX = 0.7;
//     series.labelsContainer.width = 120;

//     let sliderContainer = chart.createChild(am4core.Container);
//     sliderContainer.marginTop = am4core.percent(5);
//     sliderContainer.width = am4core.percent(80);
//     sliderContainer.align = "center";
//     sliderContainer.paddingRight = 120;


//     // let label = sliderContainer.createChild(am4core.Label);
//     // label.text = "move me!";
//     // label.dy = -40;
//     // label.isMeasured = false;

//     // let slider = sliderContainer.createChild(am4core.Slider);
//     // slider.start = 0;
//     // slider.background.fill = am4core.color("#676767");
//     // slider.background.fillOpacity = 0.2;

//     // // doing it later for animation to finish
//     // setTimeout(initSlider, 1500);

//     // function initSlider(){
//     //     slider.events.on("rangechanged", function(){
//     //         series.startLocation = 0.1 + (0.553 - 0.1) * slider.start;
//     //         // @ts-ignore
//     //         series.dataItems.getIndex(0).value = (1 - slider.start) * 200;
//     //         slider.background.fill = new am4core.Color(am4core.colors.interpolate(am4core.color("#676767").rgb, am4core.color("#7b131c").rgb, slider.start));
//     //         slider.background.fillOpacity = 0.2 + slider.start * 0.8;

//     //         blurFilter.blur = slider.start * 5;
//     //     })
//     // }

//     let title = chart.createChild(am4core.Label);
//     // title.text = "Sorts of wine I drank today"
//     // title.text = "Sorts of wine I drank today"
//     // title.fontSize = 18;
//     // title.fill = am4core.color("#390511");
//     // title.isMeasured = false;
//     // title.x = am4core.percent(27);
//     // title.y = am4core.percent(0);
//     // title.horizontalCenter = "right";
// 		// title.fontWeight = "500";

//     let blurFilter = new am4core.BlurFilter();
//     blurFilter.blur = 0;
//     title.filters.push(blurFilter);
//     // @ts-ignore
//     // this.chart = chart;
// 	}
	
// 	initStressPeople = () => {
// 		/* Chart code */
// 		// Themes begin
// 		am4core.useTheme(am4themes_animated);
// 		// Themes end

// 		let iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"

// 		let chart = am4core.create("stressPeopleDiv", am4charts.SlicedChart);
// 		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

// 		chart.data = [{
// 			"name": "休息",
// 			"value": 600,
// 			"fill": am4core.color("#f56642")
// 		}, {
// 			"name": "低",
// 			"value": 100,  
// 			"fill": am4core.color("#f59e42")
// 			// "fill": "#f59e42"
// 		}, {
// 			"name": "中",
// 			"value": 50,
// 			"fill": am4core.color("#f59e42")
// 		}, {
// 			"name": "高",
// 			"value": 30,
// 			"fill": am4core.color("#f56642")
// 		}];

// 		// chart.data = [{
// 		// 	"name": "高",
// 		// 	"value": 30,
// 		// 	"fill": am4core.color("#f56642")
// 		// }, {
// 		// 	"name": "中",
// 		// 	"value": 50,
// 		// 	"fill": am4core.color("#f59e42")
// 		// }, {
// 		// 	"name": "低",
// 		// 	"value": 200,
// 		// 	"fill": am4core.color("#f5d442")
// 		// }, {
// 		// 	"name": "休息",
// 		// 	"value": 400,
// 		// 	"fill": am4core.color("#42c5f5")
// 		// }];

// 		let series = chart.series.push(new am4charts.PictorialStackedSeries());
// 		series.dataFields.value = "value";
// 		series.dataFields.category = "name";
// 		series.alignLabels = true;

// 		series.maskSprite.path = iconPath;
// 		series.ticks.template.locationX = 1;
// 		series.ticks.template.locationY = 0.5;

// 		series.labelsContainer.width = 200;

// 		// chart.legend = new am4charts.Legend();
// 		// chart.legend.position = "left";
// 		// chart.legend.valign = "bottom";
// 		// @ts-ignore
// 		// this.chart = chart;
//   }
  
// 	initSleepChart = () => {

// 		const sleepData = [
// 			{value: sleep.deepSleepDurationInSeconds, name: '深睡期'},
// 			{value: sleep.lightSleepDurationInSeconds, name: '浅睡期'},
// 			{value: sleep.remSleepInSeconds, name: '快速眼动睡眠'},
// 			{value: sleep.awakeDurationInSeconds, name: '清醒'},
// 		]

// 		const sleepKnowledges = [
// 			{title: '深睡期', content: '当您进入深度睡眠时，眼睛和肌肉运动会完全停止。心率和呼吸会减慢。此时很难被叫醒，即使被叫醒也是迷糊不清的状态。'},
// 			{title: '浅睡期', content: '浅睡眠是睡眠的第一个阶段。眼球运动和肌肉活动在浅睡觉期减慢。这时您的身体已准备好进入深度睡眠。'},
// 			{title: '快速眼动睡眠', content: 'REM(rapid eye movement，快速眼动)睡眠视为睡眠周期的最终阶段。通常人的梦都发生在快速眼动睡眠期。REM睡眠阶段倾向于开始时比较短，整个晚上会变长。'},
// 			{title: '清醒', content: '一般而言，连续一整晚的睡眠对身体最好，即醒来时间非常短甚至没有。'},
// 		]

// 		const randomIndex = Math.floor(Math.random() * sleepKnowledges.length);
// 		this.setSleepKnowledge(sleepKnowledges[randomIndex])
	
		
// 		const target = new Map();
// 		sleepData.forEach((item=>{
// 			target.set(item.name, item.value)
// 		}))

// 		// @ts-ignore
// 		const sleepPie = echarts.init(document.getElementById('sleepChart'))
// 		sleepPie.setOption({
// 			animation: false, // 取消动画
// 			title: {
// 				text: '睡眠比例',
// 				left: '75',
// 				top: 'bottom',
// 				textStyle: {
// 					fontSize: 12
// 				}
// 			},
// 			tooltip: {
// 				trigger: 'item',
// 				// formatter: '{a} <br/>{b}: {c} ({d}%)'
// 				formatter: '{b}: {d}%'
// 			},
// 			color:["#3366ff", "#66a3ff", "#ff9966", "#ffcc00"],
// 			// @ts-ignore
// 			legend: {
// 				orient: 'vertical',
// 				right: 0,
// 				bottom: 0,
// 				data: ['深睡期', '浅睡期', '快速眼动睡眠', '清醒'],
// 				formatter: (name) => {
// 					let lists = [];
// 					console.log(target.get(name))
// 					lists.push(name + ': ' + secondToHourMinute(target.get(name)))
// 					return lists
// 					// return stressData.map(item=> name + ': ' + secondToHourMinute(item.value))
// 				},
// 				textStyle: {
// 					fontSize: 12,
// 				}
// 			},
// 			series: [
// 				{
// 					name: '睡眠',
// 					type: 'pie',
// 					radius: ['60%', '75%'],	 // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
// 					center: ['30%', '40%'],	 // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
// 					// avoidLabelOverlap: false,
// 					label: {
// 						show: true,
// 						position: 'center',
// 						formatter: secondToHourMinute(sleep.durationInSeconds),
// 						fontSize: 13
// 					},
// 					data: sleepData
// 				}
// 			]
// 		})
// 		sleepPie.on('legendselectchanged',params => {
// 		sleepPie.setOption({
// 			// @ts-ignore
// 			legend:{selected:{[params.name]: true}}
// 		})
// 		console.log('--->params', params)
// 		// alert('legendselectchanged');
// 		// this.setShowSleepPopover(true);
// 		})
// 	}
	
// 	componentDidMount() {  //当图表切换的时候，重新执行
//     this.initStressChart();
// 		this.initStressGlass();
//     this.initStressPeople();
// 		this.initSleepChart();
// 		getLatestData(this.state.userId, DOMAIN.DAILY);
// 	}


// 	render() {
// 		return (
// 			<IonPage id="myHealthData-page">
// 				<IonHeader>
// 					<IonToolbar>
// 						<IonButtons slot="start">
// 							<IonMenuButton></IonMenuButton>
// 						</IonButtons>
// 						<IonTitle>我的健康数据</IonTitle>
// 					</IonToolbar>
// 				</IonHeader>
// 				<IonContent>
// 					<IonCard>
// 						<IonCardHeader>
// 							{/* <IonCardSubtitle>压力</IonCardSubtitle> */}
// 							<IonCardTitle>压力</IonCardTitle>
// 						</IonCardHeader>
	
// 						<IonCardContent>
// 							<div id="stressPie" style={{ width: "350px", height: "150px" }}></div>
// 							<div style={{paddingTop: "10px", float: "left"}}>2020-12-06</div>
// 							<div style={{paddingTop: "10px", textAlign: "right"}}>
// 								<IonIcon slot="start" icon={addCircle} color="medium" style={{width: "24px", height: "24px"}} />
// 							</div>
// 						</IonCardContent> 
// 					</IonCard>
// 					<IonCard>
//             <IonCardHeader>
//               {/* <IonCardSubtitle>压力</IonCardSubtitle> */}
//               <IonCardTitle>压力</IonCardTitle>
//             </IonCardHeader>
  
//             <IonCardContent>
//                 <div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
//                 <div style={{paddingTop: "10px"}}>2020-12-06</div>
// 								{/* <IonIcon slot="start" icon={addCircle} color="medium" /> */}
//             </IonCardContent>
//           </IonCard>
// 					<IonCard>
//             <IonCardHeader>
//               {/* <IonCardSubtitle>压力</IonCardSubtitle> */}
//               <IonCardTitle>压力</IonCardTitle>
//             </IonCardHeader>
  
//             <IonCardContent>
//                 <div id="stressPeopleDiv" style={{ width: "100%", height: "300px" }}></div>
//                 <div>2020-12-06</div>
//             </IonCardContent>
//           </IonCard>
// 					<IonCard>
// 						<IonCardHeader>
// 							{/* <IonCardSubtitle>压力</IonCardSubtitle> */}
// 							<IonCardTitle>睡眠</IonCardTitle>
// 						</IonCardHeader>
	
// 						<IonCardContent>
//                 <div id="sleepKnowledge" style={{ border: "0px solid", borderRadius: "5px", padding: "5px", margin: "5px"}}>
//                   <div id="title" style={{ fontWeight: 600, color: "#f25d3a" }}>{this.state.sleepKnowledge.title}</div>
//                   <div id="content">{this.state.sleepKnowledge.content}</div>
//                 </div>
// 								<div id="sleepChart" style={{ width: "350px", height: "150px" }}></div>
// 								<div style={{paddingTop: "10px"}}>2020-12-06</div>
// 						</IonCardContent>

//             <IonPopover
//               isOpen={this.state.showSleepPopover}
//               cssClass='my-custom-class'
//               onDidDismiss={e => this.setShowSleepPopover(false)}
//             >
//               <p>This is popover content</p>
//             </IonPopover>
// 					</IonCard>
// 				</IonContent>
// 			</IonPage>
// 		);
// 	}
// }


// export default MyHealthData;