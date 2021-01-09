import { 
	IonContent,
	IonHeader,
	IonPage, 
	IonTitle, 
	IonToolbar, 
	IonFooter, 
	IonItem, 
	IonInput, 
	IonIcon, 
	IonButton,
	IonButtons,
	IonMenuButton,
	IonModal,
	IonList,
	IonLabel,
	IonDatetime
} from '@ionic/react';
import React, { useState, useRef, useEffect } from 'react';
import './css/Chat.css';
import { send, server } from 'ionicons/icons/index';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { formatDate, secondToTime, strToTimestamp } from '../utils/handleDate'
import { getSleepAnswer, getRasaAnswer } from '../service/chatService'
import { getStressKnowledgeAboutSleep, getTodaySleepData, getSleepDataByDate } from '../service/knowledgeService'
import { connect } from '../data/connect';
import { DOMAIN } from '../utils/constants'
import { getLatestDataService } from '../service/deviceService'
import { Spin } from 'antd';
import { secondToHourMinute, dateToString } from '../utils/handleDate'

import 'antd/dist/antd.css';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入环形图
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/legend';
import 'echarts/lib/coord/cartesian/Grid';
import 'echarts/lib/coord/cartesian/Axis2D';
import { idText } from 'typescript';
import { timeStamp } from 'console';
import { RouteComponentProps } from 'react-router';

interface MyProps {
	messages: Message[];
	user: User;
	messageNum: number;
}

interface StressDetail {
	"summaryId" : string,
	"startTimeInSeconds" : number,
	"startTimeOffsetInSeconds" : number,
	"durationInSeconds" : number,
	"calendarDate" : string,
	"timeOffsetStressLevelValues": object
}

// const sleepData = {
// 	calendarDate: "2021-01-05",
// 	startTime: 1609777980,
// 	endTime: 1609804200
// }

interface ChatProps extends MyProps, RouteComponentProps { }

const Chat: React.FC<ChatProps> = ({ user, history }) => {
	console.log('chat user', user);
	const messagesRef = useRef(null);

	const welcomeMessage = 	{
		id: 2,
		date: formatDate(new Date()),
		userId: chatbot.id,
		username: chatbot.username,
		avatar: chatbot.avatar,
		// text: ["您好，关于压力和睡眠的问题都可以问我哦~", "记录日常活动"]	
		text: ["您好，关于压力的定义、症状、常见的产生原因、类型、缓解方法、检测机制都可以问我哦~"]	
	}

	const [userMessageText, setUserMessageText] = useState<string>();
	const [messages, setMessages] = useState<Array<any>>([welcomeMessage]);
	const [messageNum, setMessageNum] = useState<number>(0);
	const [showRecordModal, setShowRecordModal] = useState(false);
	const [stressDetail, setStressDetail] = useState<StressDetail>();
	const [stressChartLoading, setStressChartLoading] = useState(true);
	const [sleepData, setSleepData] = useState<any>();
	const [exerciseIndex, setExerciseIndex] = useState<Array<any>>();
	const [eatIndex, setEatIndex] = useState<Array<any>>();
	const [dailyData, setDailyData] = useState<any>({}); 
	const [sleepChartData,  setSleepChartData] = useState<any>();
	const [sleepChartLoading, setSleepChartLoading] = useState(true);

	const sendMessage  = async (e: React.FormEvent) => {
		e.preventDefault();
		let userMessage = {
			id: messageNum + 1,
			date: formatDate(new Date()),
			userId: user.userId,
			username: user.username,
			avatar: user.avatar,
			text: userMessageText || ''
		}
		console.log('--->sendMessage', userMessage)
		// let newMessage = [...messages, userMessage];
		// setMessages(newMessage)
		setMessages(messages => [...messages, userMessage])
		setMessageNum(messageNum => messageNum + 1)
		let question = userMessageText
		setUserMessageText('')
		let responseMessage = {
			id: messageNum + 1,
			date: formatDate(new Date()),
			userId: chatbot.id,
			username: chatbot.username,
			avatar: chatbot.avatar,
			text: '对不起，这个问题我还不会哦，你可以问我其他问题'
		}
		scrollToBottom()
		// getSleepAnswer(question || '').then(data => {
		// 	if (data && data.answer) {
		// 		responseMessage.text = data.answer
		// 	}
		// 	setMessages(messages => [...messages, responseMessage])
		// 	setMessageNum(messgeNum => messgeNum + 1)
		// 	scrollToBottom()
		// })

		getRasaAnswer(question || '').then(data => {
			console.log(data)
			const {recipient_id, text} = data
			
			if (data && data.text) {
				responseMessage.text = text
			}
			setMessages(messages => [...messages, responseMessage])
			setMessageNum(messageNum => messageNum + 1)
			scrollToBottom()
		})
	}

	/* 滚到底部 */
	const scrollToBottom = () => {
		if (!messagesRef || !messagesRef.current) return;
		//window.scrollTo(0, this.messagesRef.current.offsetTop)
		// @ts-ignore
		messagesRef.current.scrollToBottom();
		//scrollIntoView({ behavior: "smooth" });
		console.log("ScrollToTheBottom");
	}
	
	useEffect(() => {
		// @ts-ignore
		// user.userId = 11
		if(user && user.userId >= 0) {
			// @ts-ignore
			getStressKnowledgeAboutSleep(user.userId).then(data => {
				console.log('---->data', data)
				const sleepStressInsights = data.sleepStressInsights;
				console.log('sleepStressInsights', Object.values(sleepStressInsights))
				const len = Object.values(sleepStressInsights).length;
				if(len > 0) {
					const index = Math.floor((Math.random() * len));	//随机选择一条
					let responseMessage = {
						id: messageNum + 1,
						date: formatDate(new Date()),
						userId: chatbot.id,
						username: chatbot.username,
						avatar: chatbot.avatar,
						text: Object.values(sleepStressInsights)[index]
					}
					setMessages(messages => [...messages, responseMessage])
					setMessageNum(messageNum => messageNum + 1)
					scrollToBottom()
				}
			})
		}
	},[])


	const initStressPieChart = () => {
		if(JSON.stringify(dailyData) === '{}' || !dailyData) return
		console.log('---->dailyData', dailyData)
		const stressData = [];
		// @ts-ignore
		stressData.push({'value': dailyData.restStressDurationInSeconds,  name: '放松'});
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

		const stressPieId = "stressPie" + messageNum;
		
		// @ts-ignore
		const stressPie = echarts.init(document.getElementById(stressPieId))

		stressPie.setOption({
			title: {
				// @ts-ignore
				text: dailyData?.calendarDate || '',
				left: 'center',
				textStyle: {
					fontSize: 14,
					fontWeight: 'bolder',
					color: '#333'          // 主标题文字颜色
				},
			},

      // title: {
      //   text: '压力比例',
      //   left: '75',
      //   top: 'bottom',
      //   textStyle: {
      //     fontSize: 12
      //   }
      // },
			tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%'
			},
			color:["#42c5f5", "#f0c060", "#f59e42", "#f56642"],
			// @ts-ignore
			legend: {
				orient: 'vertical',
				right: 0,
				bottom: 0,
				data: ['放松', '低', '中', '高'],
				formatter: (name) => {
					let lists = [];
					lists.push(name + ': ' + secondToHourMinute(target.get(name)))
					return lists
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
					center: ['50%', '60%'],	 // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
					label: {
						show: true,
						position: 'center',
						formatter: '均值'+ avgStress,
						fontSize: 13
					},
					data: stressData
				}
			]
		})
	} 


	const initStressDetailChart = () => {
		console.log("stressDetail", stressDetail)
		if(JSON.stringify(stressDetail) === '{}' || !stressDetail) return
		const calendarDate = stressDetail.calendarDate;
		const timeStamp = strToTimestamp(calendarDate + ' 00:00:00');

		console.log(sleepData.startTime, timeStamp, sleepData.startTime - timeStamp)
		const startIndex = sleepData.startTime < timeStamp ? 0: Math.floor((sleepData.startTime - timeStamp) / 180);
		const endIndex = Math.floor((sleepData.endTime - timeStamp) / 180); 

		const chartId = "stressDetailChart" + messageNum;
			// @ts-ignores
		const stressDetailChart = echarts.init(document.getElementById(chartId))
		stressDetailChart.setOption({
			// title: {
			// 	// @ts-ignore
			// 	text: stressDetail?.calendarDate || '',
			// 	left: 'center'
			// },
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				},
				textStyle: {
					fontSize: 8,
					lineHeight: 56,
				},
				formatter: (params: any) => {
					const value = params[0].value;
					console.log('exerciseIndex', exerciseIndex)
					console.log('eatIndex', eatIndex)
					const index = params[0].dataIndex;
					if (value === -10) {
						return params[0].name + '<br/><br/>' 
						+ params[0].marker + "活动中"
					} else if (value === -1) {
						return params[0].name + '<br/><br/>' 
							+ "无法测量"
					} else if (index >= startIndex && index <= endIndex) {
						if (value > 25) {
							return '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + 
							params[0].name + '<br/><br/>' 
							+ params[0].marker
							+ params[0].seriesName + ' : ' + value + '<br/><br/>' +
							'睡眠期间的压力值高，可能是因为白天运动过度、睡前饮酒过多、睡眠障碍等多方面原因造成的。请您关注自己的健康状况，放松身心，合理安排工作和休息时间。'
							+	'</div>'
						} else {
							return '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + 
							params[0].name + '<br/><br/>' 
							+ params[0].marker
							+ params[0].seriesName + ' : ' + value+'<br/><br/>' +
							'优质的睡眠能帮助您从白天的压力中恢复过来'
							+	'</div>' 
						}
					// @ts-ignore
					} else if (exerciseIndex?.indexOf(index) >= 0) {
						return '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + 
							params[0].name + '<br/><br/>' 
							+ params[0].marker
							+ params[0].seriesName + ' : ' + value + '<br/><br/>' 
							+ '<p>'+ '压力状态受自主神经系统控制，其中交感神经活跃程度的提高会提高压力水平。' + '<span style="color:red;">运动</span>会提高交感神经系统的活跃程度，导致运动结束后的一段时间内检测到的压力值升高。' + '</p>'
							// + "压力状态受自主神经系统控制，其中交感神经活跃程度的提高会提高压力水平，副交感神经活动程度的提高会降低压力水平。" + '<br/>' + "而自主神经系统的状态可以通过心率变异性(HRV)反映。运动会提高交感神经系统的活跃程度，导致运动结束后的一段时间内检测到的压力值升高。"
							+	'</div>' 
					// @ts-ignore
					} else if(eatIndex?.indexOf(index) >= 0) {
						return '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + 
						params[0].name + '<br/><br/>' 
						+ params[0].marker
						+ params[0].seriesName + ' : ' + value + '<br/><br/>' 
						+ '<p>'+ '研究表明酒精、咖啡、以及一些不健康的饮食（例如高碳水化合物、高脂或反式脂肪食物，常见于包装零食，烤货，块状人造黄油，膨化食品和快餐等）会降低HRV，导致压力值升高。' + '</p>'
						// + "压力状态受自主神经系统控制，其中交感神经活跃程度的提高会提高压力水平，副交感神经活动程度的提高会降低压力水平。" + '<br/>' + "而自主神经系统的状态可以通过心率变异性(HRV)反映。运动会提高交感神经系统的活跃程度，导致运动结束后的一段时间内检测到的压力值升高。"
						+	'</div>' 
					}
					else {
						return params[0].name + '<br/><br/>' 
							+ params[0].marker
							+ params[0].seriesName + ' : ' + value + '<br/>'
					} 
				},
			},
			xAxis: {
				// @ts-ignore
				data: Object.keys(stressDetail.timeOffsetStressLevelValues).map(function (item) {
					return secondToTime(item);
				}),
				// data: Object.keys(stressDetail.timeOffsetStressLevelValues)
				axisLabel: {
					show: true,
					// interval: 79,
					interval: 0,
					formatter: (value: any, index: number) => {
						// console.log('--->x', value, index)
						// console.log("index", startIndex, endIndex)
						if (index === startIndex) {
							return '{fallASleepValue|} '+ value.split('-')[0];
							// return '{fallASleepValue|}';
						} else if(index === endIndex) {
							return '{getUpValue|} ' + value.split('-')[0];
							// return '{getUpValue|}';
						} else if(index % 80 === 0) {
							return '\n\n\n' + value.split('-')[0]
						}
						return ''
					},
					rich: {
						fallASleepValue: {
							height: 15,
							align: 'center',
							backgroundColor: {
									image: '/assets/icon/sleep2.png'  	//这个warnImg是上面定义的图片var warnImg = "img/warn.png";
							}
						},
						getUpValue: {
							height: 15,
							align: 'center',
							backgroundColor: {
									image: '/assets/icon/getUp.png'  	//这个warnImg是上面定义的图片var warnImg = "img/warn.png";
							}
						}
					}
				},
				axisTick: {
					show: true,	//x轴刻度线
					interval: (index: number, value: string) => {
						if (index === startIndex || index === endIndex || index % 80 === 0) {
							return true;
						} else {
							return false;
						}
					}
				},
				// offset: 0,
				axisLine: {
					onZero: false,
					lineStyle: {
						width: 1
					}
				},
				offset: -35,
			},
			yAxis: {
				name: '压力值',
				min: -25,
				max: 100,
				interval: 25,
				splitLine: { 
					show: true, 
					interval: (index: number, value: string) => {
						if(index === 0) {
							return false;
						} else {
							return true;
						}
					}
				},//去除网格线
				axisLabel: {
					formatter: (value: any, index: number) => {
						var Yshat = ['', 0, 25, 50, 75, 100]
						value = Yshat[index];
						return value;
					},
				}
			},
			toolbox: {
				left: 'center',
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					restore: {},
					saveAsImage: {}
				}
			},
			visualMap: {
				left: "center",                              //组件离容器左侧的距离,'left', 'center', 'right','20%'
				top: "bottom",                                   //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
				right: "auto",                               //组件离容器右侧的距离,'20%'
				bottom: "auto",                              //组件离容器下侧的距离,'20%'
				orient: "horizontal",                         //图例排列方向
				textGap: 5, //文字到图标的距离
				pieces: [
					{
						gt: 0,
						lte: 25,
						color: '#3399ff',
						label: "放松",
					},
					{
						gt: 25,
						lte: 100,
						color: '#f0c060',
						label: "有压力"
					},
					{
						value: -10,
						label: '活动中',
						color: '#ADADAD',
					}
				],
			},
			series: {
				name: '压力值',
				type: 'bar',
				// @ts-ignore
				data: Object.values(stressDetail.timeOffsetStressLevelValues).map(function (item) {
					if(item === -2) {
						return -10
					}	else {
						return item;
					}
				}),
				barWidth: 0.5,
			}
		});

		stressDetailChart.dispatchAction({
			type: 'showTip',
			// 屏幕上的 x 坐标
			x: 10,
			// 屏幕上的 y 坐标
			y: 10,
			// 本次显示 tooltip 的位置。只在本次 action 中生效。
			// 缺省则使用 option 中定义的 tooltip 位置。
		})

	}

	const initSleepChart = () => {
		console.log('---->initSleepChart', sleepChartData)
		if(JSON.stringify(sleepChartData) === '{}' || !sleepChartData) {
			return;
		}
		console.log('---->sleepChartData', sleepChartData)
		const chartData = [
			{value: sleepChartData.deepSleepDurationInSeconds, name: '深睡期'},
			{value: sleepChartData.lightSleepDurationInSeconds, name: '浅睡期'},
			{value: sleepChartData.remSleepInSeconds, name: '快速眼动睡眠'},
			{value: sleepChartData.awakeDurationInSeconds, name: '清醒'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
		]
	
		const target = new Map();
		chartData.forEach(((item: any) =>{
			target.set(item.name, item.value)
		}))

		const chartId = "sleepPie" + messageNum;
		// @ts-ignores
		const sleepPie = echarts.init(document.getElementById(chartId))

		sleepPie.setOption({
			animation: false, // 取消动画
			title: {
				// @ts-ignore
				text: sleepChartData?.calendarDate || '',
				left: 'center',
				textStyle: {
					fontSize: 14,
					fontWeight: 'bolder',
					color: '#333'          // 主标题文字颜色
				},
			},
			tooltip: {
				trigger: 'item',
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
					center: ['50%', '60%'],	 // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
					// avoidLabelOverlap: false,
					label: {
						show: true,
						position: 'center',
						formatter: secondToHourMinute(sleepChartData.durationInSeconds),
						fontSize: 13
					},
					data: chartData
				}
			]
		})
		sleepPie.on('legendselectchanged',params => {
			sleepPie.setOption({
				// @ts-ignore
				legend:{selected:{[params.name]: true}}
			})
		})
		setSleepChartLoading(false);
	}

	const isMaybeEat = (index: any) => {
		// 11:00-1:00, 17:00:19:00
		// 220-260, 340-380
		if((index >= 220 && index < 260) || (index >= 340 && index < 380)) {
			return true;
		}
		return false;
	}


	const showStressDetailChart = () => {
		// TODO: userId记得改回来
		user.userId = 11
		// @ts-ignore
		if (user.userId < 0) {
			history.push('/login', {direction: 'none'})
			return;
		}
		// let message1 = {
		// 	id: messageNum + 1,
		// 	date: formatDate(new Date()),
		// 	userId: user.userId,
		// 	username: user.username,
		// 	avatar: user.avatar,
		// 	text: "查看我最近的压力详情"
		// }
		// setMessages(messages => [...messages, message1])
		// setMessageNum(messageNum => messageNum + 1)
		// scrollToBottom()
		setStressChartLoading(true)
		const asyncFetchData = async () => {

			// @ts-ignore
			const fetchDailyData: any = await getLatestDataService(user.userId, DOMAIN.DAILY);
			const dailyData = fetchDailyData.data?.latestData || null;
			setDailyData(dailyData);
			
			// @ts-ignore
			const fetchStressData: any = await getLatestDataService(user.userId, DOMAIN.STRESS);
			const stressData = fetchStressData.data?.latestData || null;
			setStressDetail(stressData);
		
			const date = stressData.calendarDate;
			// @ts-ignore		
			const fetchSleepData: any = await getSleepDataByDate(user.userId, date);
			const sleepData = fetchSleepData.sleepData || {};
			setSleepData(sleepData)
			console.log('=====>sleppData', sleepData);
		}

		let responseMessage = {
			id: messageNum + 1,
			date: formatDate(new Date()),
			userId: chatbot.id,
			username: chatbot.username,
			avatar: chatbot.avatar,
			text: "stressDetailChart"
		}
		setMessages(messages => [...messages, responseMessage])
		setMessageNum(messageNum => messageNum + 1)
		scrollToBottom()
		asyncFetchData();
	}


	const showSleepPie = () => {
		setSleepChartLoading(true);
		user.userId = 11
		// @ts-ignore
		if (user.userId < 0) {
			history.push('/login', {direction: 'none'})
			return;
		}
		const asyncFetchData = async () => {
			// @ts-ignore		
			const fetchSleepData: any = await getLatestDataService(user.userId, DOMAIN.SLEEP);
			const sleepData = fetchSleepData.data?.latestData || null;
			setSleepChartData(sleepData)
		}
		let responseMessage = {
			id: messageNum + 1,
			date: formatDate(new Date()),
			userId: chatbot.id,
			username: chatbot.username,
			avatar: chatbot.avatar,
			text: "sleepChart"
		}
		setMessages(messages => [...messages, responseMessage])
		setMessageNum(messageNum => messageNum + 1)
		scrollToBottom()
		asyncFetchData();
	}


	useEffect(() => {
		console.log('---->111 sleepChartData', sleepChartData)
		initSleepChart();
	}, [sleepChartData])


	useEffect(() => {

		if(!stressDetail || !sleepData || !dailyData) return;
		
		const stressArr: Array<number> = Object.values(stressDetail.timeOffsetStressLevelValues);

		const afterActivityUnable = [];
		// 标记-2与>=0的元素之间的所有元素
		for(let i = 0; i < stressArr.length; i++) {
			if(i > 0 && (stressArr[i-1] === -2 || afterActivityUnable.indexOf(i-1) >= 0) && stressArr[i] === -1) {
				afterActivityUnable.push(i);
			}
		}

		const exercise = [];
		let continuousNum = 0;
		for(let i = 0; i < stressArr.length; i++) {
			// @ts-ignore
			//可能是运动导致压力升高的规则：一个元素值为-2,其后连续1,2,3,4,5个元素的值大于25，则后面这5个元素都标记为受运动影响的压力升高
			console.log('continuousNum: ', continuousNum)
			if(continuousNum <= 4 && (i > 0 && ((afterActivityUnable.indexOf(i-1) >= 0 || stressArr[i-1] === -2 ) && stressArr[i] > 25) || (i > 1 && exercise.indexOf(i-1) >= 0 && stressArr[i] > 25))) {
				continuousNum++;
				exercise.push(i);
			} else {
				continuousNum = 0;
			}
		}
		console.log('exercise', exercise)
		setExerciseIndex(exercise)

		const eat = []; 
		for(let i = 0; i < stressArr.length; i++) {
			// @ts-ignore
			//可能是饮食导致压力升高的规则：不属于运动升高，时间范围在11:00-13:00,17：00-19:00，前一个元素的值为0-25，其后连续1,2,3个元素的值大于25，则后面这1或2或3个元素都标记为受饮食影响的值
			if(exercise.indexOf(i) >= 0 || stressArr[i] <= 25 || !isMaybeEat(i)) {
				continue;
			// 从放松->有压力
			// } else if((i > 0 && stressArr[i-1] >= 0 && stressArr[i-1] <= 25) || (i > 1 && eat.indexOf(i-1) >= 0) || (i > 2 && eat.indexOf(i-2) >= 0)) {
			// 有压力
		} else {
				eat.push(i);
			}                     
		}
		console.log('eat', eat)
		setEatIndex(eat);
		setStressChartLoading(false);	
	}, [stressDetail, sleepData, dailyData])


	useEffect(()=> {
		initStressPieChart()
		initStressDetailChart()
	}, [exerciseIndex, eatIndex])
	

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton></IonMenuButton>
					</IonButtons>
					<IonTitle>Health Chatbot</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen ref={messagesRef}>
			
				{messages && messages.map((message: Message, index: number) => ( 
					<div className="message-wrapper" key={index}>
						{ user.userId !== message.userId && 
							<div>
								<img className="profile-pic left" src={chatbot.avatar} />
								{ message.text !== "stressDetailChart" && message.text !== "sleepChart" && 
									<div className="chat-bubble left slide-left">
										<div className="message" style={{whiteSpace: "pre-line"}}>{message.text}
										{/* {message.text instanceof Array === true && message.text.map((text: string, index: number) => (
											<div>{text}</div>
										))} */}
										<br />
										{/* <a href="/recordActivity">记录日常活动</a> */}
										{/* <br /> */}
										{/* <a href="/stressDetail">查看我最近的压力详情</a> */}
										<a href="javascript:;" onClick={() => showStressDetailChart()}>查看最近的压力数据</a>
										<br/>
										<a href="javascript:;" onClick={() => showSleepPie()}>查看最近的睡眠数据</a>
										</div>
										<div className="message"> </div>
										<div className="message-detail left">
											<span>{message.date}</span>
										</div>
									</div>
								}
								{ message.text === "stressDetailChart" && 
									<div className="chat-bubble left slide-left">
										<Spin spinning={stressChartLoading}>
										  <div id={"stressPie" + message.id} style={{ width: "650px", height: "150px" }}></div>
											<div id={"stressDetailChart" + message.id} style={{width: "650px", height: "300px"}}></div>	
											<div className="message"> </div>
												<div className="message-detail left">
													<span>{message.date}</span>
											</div>	
										</Spin>
								  </div>
								}
								{ message.text === "sleepChart" && 
									<div className="chat-bubble left slide-left">
										<Spin spinning={sleepChartLoading}>
										  <div id={"sleepPie" + message.id} style={{ width: "650px", height: "150px" }}></div>
											<div className="message"> </div>
												<div className="message-detail left">
													<span>{message.date}</span>
											</div>	
										</Spin>
								  </div>
								}
							</div>
						}
						{ user.userId === message.userId && 
							<div>
								<img className="profile-pic right" src={user.avatar}/>
								<div className="chat-bubble right slide-right">
									<div className="message">{message.text}
									</div>
									<div className="message-detail right">
										<span>{message.date}</span>
									</div>
								</div>
							</div> 
						}
							<div className="cf"></div>
						</div>
					))}
			
				<IonModal isOpen={showRecordModal} cssClass='my-custom-class'>
					<p>记录日常活动</p>
					<IonContent>
        		<form noValidate>
							<IonList>
								<IonItem>
									<IonLabel position="stacked" color="primary">活动</IonLabel>
									<IonInput name="username" type="text">
									</IonInput>
            		</IonItem>
								<IonItem>
									<IonLabel>开始时间</IonLabel>
									<IonDatetime display-format="h:mm A" picker-format="h:mm A" value=""></IonDatetime>
								</IonItem>
								<IonItem>
									<IonLabel>结束时间</IonLabel>
									<IonDatetime display-format="h:mm A" picker-format="h:mm A" value=""></IonDatetime>
								</IonItem>
							</IonList>
						</form>
					</IonContent>
					<IonButton fill="clear" onClick={() => setShowRecordModal(false)}>Close Modal</IonButton>
				</IonModal>
			</IonContent>
			<IonFooter>
				<form noValidate onSubmit={sendMessage}>
					<IonItem>
						<IonInput name="userMessage" value={userMessageText} placeholder="请输入您的问题" onIonChange={e => setUserMessageText(e.detail.value!)}></IonInput>
						<IonButton fill="clear" type="submit" ><IonIcon icon={send}></IonIcon></IonButton>	
					</IonItem>
				</form>
			</IonFooter>
			
		</IonPage>
	);
};
	
export default connect<{}, MyProps, {}>({
	// @ts-ignore
  mapStateToProps: (state) => ({
    user: state.user,
  }),
  component: Chat
})


// export default Chat;

const chatbot = {
	id: -2,
	avatar: '/assets/icon/Chatbot-evolution-1 (3).png',
	username: 'Chatbot',
};

// const user = {
// 	id: 2,
// 	avatar: '/assets/icon/default.png',
// 	username: 'Mary',
// 	gender: 'secret',
// 	birthday: '',
// 	createTime: null,
// 	updateTime: null
// };


// Chat.defaultProps = {
// 	messages: [
// 	{
//       id: 2,
//       date: formatDate(new Date()),
//       userId: chatbot.id,
//       username: chatbot.username,
//       avatar: chatbot.avatar,
//       text: '你好，关于睡眠和压力的问题都可以问我哦'
//     },
//     {
//       id: 2,
//       date: formatDate(new Date()),
//       userId: user.id,
//       username: user.username,
//       avatar: user.avatar,
//       text: '我最近经常失眠，该怎么办呢'
//     },
//     {
//       id: 3,
//       date: formatDate(new Date()),
//       userId: chatbot.id,
//       username: chatbot.username,
//       avatar: chatbot.avatar,
//       text: '失眠可能是很多原因引起的，你最近心情怎么样呢，饮食怎么样呢，运动怎么样呢，压力大吗？学习或者工作上有什么烦恼吗？'
//     },
//     {
//       id: 4,
//       date: formatDate(new Date()),
//       userId: user.id,
//       username: user.username,
//       avatar: user.avatar,
//       text: '最近心情不太好，马上要考试了，压力比较大'
//     },
//     {
//       id: 5,
//       date: formatDate(new Date()),
//       userId: user.id,
//       username: user.username,
//       avatar: user.avatar,
//       text: 'what??'
//     },
//     {
//       id: 6,
//       date: formatDate(new Date()),
//       userId: chatbot.id,
//       username: chatbot.username,
//       avatar: chatbot.avatar,
//       text: 'yes!'
//     }],
// 	user: user,
// 	messgeNum: 1,
// }