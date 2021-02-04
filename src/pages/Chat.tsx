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
	IonDatetime,
} from '@ionic/react';
import { 
	STRESS_VALUE,
	DOMAIN,
	FORMATE_TIME,
	SLEEP_QUALITY,
	REASONS_FOR_POOR_SLEEP,
	STRESS_QUALIFIER,
	OVERALL_DAY_STRESS,
	SLEEP_KNOWLEDGE,
	ACTIVITY_TYPE,
	ACTIVITY_ICON,
	SCENE_KNOWLEDGE,
	RANDOM_KNOWLEDGE
 } from '../utils/constants'
import React, { useState, useRef, useEffect, useMemo } from 'react';
import './css/Chat.css';
import { send } from 'ionicons/icons/index';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { formatDate, secondToTime, strToTimestamp } from '../utils/handleDate'
import { getSleepAnswer, getRasaAnswer } from '../service/chatService'
// import { getStressKnowledgeAboutSleep, getTodaySleepData, getSleepDataByDate } from '../service/knowledgeService'
import { connect } from '../data/connect';
import { getMetGreaterThan3Epochs, getOtherSleepScene, getHealthDataByDate, getIsChronicStress, getIsExerciseEnough, getIsHighIntensityExerciseEffectSleep, getMoveIQs, getActivities } from '../service/deviceService'
import { Spin } from 'antd';
import { secondToHourMinute, dateToString, getPrevDate, getNextDate, timestampToStr } from '../utils/handleDate'
import { NavLink } from "react-router-dom"
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
import { RouteComponentProps } from 'react-router';
import StressDetail from './StressDetail';

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

interface SleepQuality {
	"sleepDuration": number,
	"awakenings": number,
	"fallBackAsleep": number,
	"REMSleepDuration": number,
	"DeepSleepDuration": number
}

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
	const [afterExerciseIndex, setAfterExerciseIndex] = useState<Array<any>>();
	const [dailyData, setDailyData] = useState<any>({}); 
	const [sleepChartData,  setSleepChartData] = useState<any>();
	const [sleepChartLoading, setSleepChartLoading] = useState(true);
	const [isHasStressData, setIsHasStressData] = useState(true);
	const [isHasSleepData, setIsHasSleepData] = useState(true);
	// const [isHasStressDataMap, setIsHasStressDataMap] = useState(new Map());
	const [stressDate, setStressDate] = useState(dateToString(new Date(), "yyyy-MM-dd"));
	const [nextSleepStartTime, setNextSleepStartTime] = useState(null);
	const [wakeUp15MinutesIndex, setWakeUp15MinutesIndex] = useState<Array<any>>();
	const [overallDayStress, setOverallDayStress] = useState('');
	const [digestionIndex, setDigestionIndex] = useState<Array<any>>();
	const [isChronicStress, setIsChronicStress] = useState(false);
	const [isExerciseEnough, setIsExerciseEnough] = useState(false);
	const [isShorterSleepTimeAndHigherWorkStress, setIsShorterSleepTimeAndHigherWorkStress] = useState(false);
	const [isLongerSleepTimeAndLowerWorkStress, setIsLongerSleepTimeAndLowerWorkStress] = useState(false);
	const [isRelaxLongerDuringSleep, setIsRelaxLongerDuringSleep] = useState(false);
	const [isHighIntensityExerciseEffectSleep, setIsHighIntensityExerciseEffectSleep] = useState(false);
	const [workStressIndex, setWorkStressIndex] = useState<Array<any>>();
	const [sleepDate, setSleepDate] = useState(dateToString(new Date(), "yyyy-MM-dd"));
	const [activities, setActivities] = useState<Array<any>>();
	const [moveIQs, setMoveIQs] = useState<Array<any>>();
	// const [epochs, setEpochs] = useState<Array<any>>();
	// const [indexWithScene, setIndexWithScene] = useState<Array<any>>(); //带有场景的index数组，

	const ref = useRef({ wakeUp15MinutesIndex, afterExerciseIndex});
	

	//入睡时间
	let sleepStartTime = useMemo(() => {
		console.log('--->sleepData, stressDetail', sleepData, stressDetail)
		if (!sleepData || !stressDetail) return null;
		const calendarDate = stressDetail?.calendarDate;
		const todayTimeStamp = strToTimestamp(calendarDate + ' 00:00:00');
		const sleepStartTime = sleepData.startTimeInSeconds < todayTimeStamp ? todayTimeStamp : sleepData.startTimeInSeconds;
		return sleepStartTime
	}, [sleepData, stressDetail])
	

	//入睡时间在压力图中对应的下标
	let sleepStartIndex = useMemo(() => {
		console.log('--->sleepStartTime', sleepStartTime)
		if (!sleepStartTime) return -1;
		const calendarDate = stressDetail?.calendarDate;
		const todayTimeStamp = strToTimestamp(calendarDate + ' 00:00:00');
		const stressKeys = Object.keys(stressDetail!.timeOffsetStressLevelValues);
		const sleepStartIndex = Math.floor((sleepStartTime - todayTimeStamp - parseInt(stressKeys[0])) / 180);
		console.log('--->sleepStartIndex 1', sleepStartIndex)
		return sleepStartIndex
	}, [sleepStartTime])


	//睡醒时间
	let sleepEndTime = useMemo(() => {
		if (!sleepData || !stressDetail) return null;
		const sleepEndTime = sleepData.startTimeInSeconds + sleepData.durationInSeconds + sleepData.awakeDurationInSeconds;
		return sleepEndTime;
	}, [sleepData, stressDetail])


	//睡醒时间在压力图中对应的下标
	let sleepEndIndex = useMemo(() => {
		if (!sleepEndTime) return -1;
		const calendarDate = stressDetail?.calendarDate;
		const todayTimeStamp = strToTimestamp(calendarDate + ' 00:00:00');
		const stressKeys = Object.keys(stressDetail!.timeOffsetStressLevelValues);

		for (let i = 0; i < stressKeys.length; i++) {
			if (sleepEndTime >= (todayTimeStamp + parseInt(stressKeys[i])) && sleepEndTime < (todayTimeStamp + parseInt(stressKeys[i]) + 180)) {
				return i;
			}
		}	
	}, [sleepEndTime])


	let activitiesMap = useMemo(() => {
		if(!moveIQs || !activities || !stressDetail) return null;
		let map = new Map;
		const calendarDate = stressDetail?.calendarDate;
		const todayTimeStamp = strToTimestamp(calendarDate + ' 00:00:00');
		const stressKeys = Object.keys(stressDetail!.timeOffsetStressLevelValues);
		for (let moveIQ of moveIQs) {
			const startTimeInSeconds = moveIQ.startTimeInSeconds;
			const durationInSeconds = moveIQ.durationInSeconds;
			const activityType = moveIQ.activityType;
			for (let i = 0; i < stressKeys.length; i++) {
				if (startTimeInSeconds >= (todayTimeStamp + parseInt(stressKeys[i])) && startTimeInSeconds < (todayTimeStamp + parseInt(stressKeys[i]) + 180)) {
					const startIndex = i;
					const endIndex = startIndex + Math.floor(durationInSeconds / 180) 
					const middleIndex = Math.floor((startIndex + endIndex) / 2) 
					map.set(middleIndex, { activityType, startIndex, endIndex });
					break;
				}
			}	
		}
		for (let activity of activities) {
			const startTimeInSeconds = activity.startTimeInSeconds;
			const durationInSeconds = activity.durationInSeconds;
			const activityType = activity.activityType;
			for (let i = 0; i < stressKeys.length; i++) {
				if (startTimeInSeconds >= (todayTimeStamp + parseInt(stressKeys[i])) && startTimeInSeconds < (todayTimeStamp + parseInt(stressKeys[i]) + 180)) {
					const startIndex = i;
					const endIndex = startIndex + Math.floor(durationInSeconds / 180) 
					const middleIndex = Math.floor((startIndex + endIndex) / 2) 
					map.set(middleIndex, { activityType, startIndex, endIndex });
					break;
				}
			}	
		}
		return map;
	}, [moveIQs, activities, stressDetail])


	let randomKnowledge = useMemo(() => {
		if(!stressDetail) return [];
		const randomKnowledgeList = [];
		const stressValues = Object.values(stressDetail!.timeOffsetStressLevelValues);
		const noLabledIndex = [];
		for (let i = sleepEndIndex! + 6; i < stressValues.length-5; i++) {
			if((!wakeUp15MinutesIndex || wakeUp15MinutesIndex!.indexOf(i) < 0) && (!afterExerciseIndex || afterExerciseIndex!.indexOf(i) < 0) 
			&& (!digestionIndex || digestionIndex!.indexOf(i) < 0) && (!workStressIndex || workStressIndex!.indexOf(i) < 0)) {
				noLabledIndex.push(i);
			}
		}
		console.log('--->noLabledIndex', noLabledIndex);
		let num = 0;
		let temp = [];
		let startIndex = -1, endIndex = -1;
		for (let i = 0; i < noLabledIndex.length; i++) {
			if(num === 0 && stressValues[noLabledIndex[i]] > 0) {
				startIndex = noLabledIndex[i];
				num++;
			} else if(stressValues[noLabledIndex[i]] <= 0 || (i > 1 && (noLabledIndex[i] - noLabledIndex[i-1]) > 1)) {
				endIndex = noLabledIndex[i];
				if(num >= 5) {
					const middleIndex = Math.floor((startIndex + endIndex) / 2);
					temp.push([middleIndex - 2, middleIndex - 1, middleIndex, middleIndex + 1, middleIndex + 2]);
				}
				num = 0;
			} else {
				num++;
			}
		}

		let randomIndexList = [];
		while(randomIndexList.length < temp.length && randomIndexList.length < 3) {
			let num = Math.floor(Math.random() * temp.length)
			if (randomIndexList.indexOf(num) == -1) {
				randomIndexList.push(num)
				randomKnowledgeList.push(temp[num])
			}
		}
		console.log('--->randomKnowledgeList', randomKnowledgeList)
		return randomKnowledgeList;
	}, [stressDetail, wakeUp15MinutesIndex, afterExerciseIndex, digestionIndex, workStressIndex])

	// const [stressDataArray, setStressDateArray] = useState<Array<any>>();

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
		// @ts-ignore
		messagesRef.current.scrollToBottom();
	}
	
	// useEffect(() => {
	// 	// @ts-ignore
	// 	user.userId = 11
	// 	if(user && user.userId >= 0) {
	// 		// @ts-ignore
	// 		getStressKnowledgeAboutSleep(user.userId).then(data => {
	// 			console.log('---->data', data)
	// 			const sleepStressInsights = data.sleepStressInsights;
	// 			console.log('sleepStressInsights', Object.values(sleepStressInsights))
	// 			const len = Object.values(sleepStressInsights).length;
	// 			if(len > 0) {
	// 				const index = Math.floor((Math.random() * len));	//随机选择一条
	// 				let responseMessage = {
	// 					id: messageNum + 1,
	// 					date: formatDate(new Date()),
	// 					userId: chatbot.id,
	// 					username: chatbot.username,
	// 					avatar: chatbot.avatar,
	// 					text: Object.values(sleepStressInsights)[index]
	// 				}
	// 				setMessages(messages => [...messages, responseMessage])
	// 				setMessageNum(messageNum => messageNum + 1)
	// 				scrollToBottom()
	// 			}
	// 		})
	// 	}
	// },[])


	const initStressPie = () => {
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

		console.log('--->stressPieId', messageNum)
		// const stressPieId = "stressPie" + messageNum;
		const stressPieId = "stressPie";
		
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


	const getStressTips = (item: any) => {
		const value = item.value;	//压力值
		const index = item.dataIndex;
		if(value === -10) {
			return '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + 
				item.name + '<br/><br/>' 
				+ item.marker + "活动中" + '<br/><br/>' 
		} else if(value === -1) {
			return '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + 
				item.name + '<br/><br/>' 
				+ "无法测量" + '<br/><br/>' 
		} else {
			return '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + 
				item.name + '<br/><br/>' 
				+ item.marker
				+ item.seriesName + ' : ' + value + '<br/><br/>'
		}
	}


	const initStressBar = () => {
		if(JSON.stringify(stressDetail) === '{}' || !stressDetail) return
		const calendarDate = stressDetail.calendarDate;
		const todayTimeStamp = strToTimestamp(calendarDate + ' 00:00:00');
		const stressKeys = Object.keys(stressDetail.timeOffsetStressLevelValues);
		let nextSleepStartIndex = -1;
		if (nextSleepStartTime) {
			// @ts-ignore
			nextSleepStartIndex = Math.floor((nextSleepStartTime - todayTimeStamp - parseInt(stressKeys[0])) / 180);
		}
		let sleepQuality: any;
		if(sleepData) {
			sleepQuality = getSleepQuality();
		} 
		// const chartId = "stressDetailChart" + messageNum;
		const chartId = "stressDetailChart";
		// @ts-ignores
		const stressDetailChart = echarts.init(document.getElementById(chartId))

		stressDetailChart.setOption({
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
					const value = params[0].value;	//压力值
					const index = params[0].dataIndex;
					let sleepQualityText;
					if (sleepQuality && sleepQuality.length > 0) {
						sleepQualityText = sleepQuality[0]
					}
					
					if (index < 5 && isChronicStress) {
						return getStressTips(params[0]) 
						+ SCENE_KNOWLEDGE.CHRONIC_STRESS
						+	'</div>'
					} else if(index < 5 && !isExerciseEnough) {
						return getStressTips(params[0]) 
						+ SCENE_KNOWLEDGE.A_WEEK_EXERCISE_IS_NOT_ENOUGH
						+	'</div>'
					} else if (isHighIntensityExerciseEffectSleep && wakeUp15MinutesIndex?.indexOf(index)! >= 0) {
						return getStressTips(params[0]) 
						+ SCENE_KNOWLEDGE.IS_HIGH_INTENSITY_EXERCISE_EFFECT_SLEEP
						+	'</div>'
					} else if (wakeUp15MinutesIndex?.indexOf(index)! >= 0 ) {	//睡醒之后的十五分钟内
						if(sleepQuality[0] === SLEEP_QUALITY.BAD) {
							console.log('--->reasons', sleepQuality[1])
							const reason = sleepQuality[1][Math.floor(Math.random() * sleepQuality[1].length)]; 
							// @ts-ignore
							sleepQualityText = sleepQualityText.replace('[原因]', reason);
						}
						// console.log('--->sleepQualityText', sleepQualityText)
						return getStressTips(params[0]) 
						+ sleepQualityText
						+	'</div>'
					} else if (afterExerciseIndex?.indexOf(index)! >= 0) {	//运动后压力升高的十五分钟内
						return getStressTips(params[0])
						+ SCENE_KNOWLEDGE.AFTER_EXERCISE
						+	'</div>'
					} else if (digestionIndex?.indexOf(index)! >= 0) {	//可能的消化时间
						return getStressTips(params[0])
						+ SCENE_KNOWLEDGE.DIGESTION
						+	'</div>'
					} else if (stressKeys.length - index <= 5) {	//一整天结束的最后15分钟
						return getStressTips(params[0])
						+ overallDayStress
						+	'</div>'
					} else if (isRelaxLongerDuringSleep && index > sleepStartIndex && index < sleepEndIndex! && value > 0 && value <= 25) {
						return getStressTips(params[0])
						+ SCENE_KNOWLEDGE.MORE_RELAX_TIME_DURING_SLEEP
						+	'</div>'
					} else if (isShorterSleepTimeAndHigherWorkStress && workStressIndex?.indexOf(index)! > 0) {
						return getStressTips(params[0])
						+ SCENE_KNOWLEDGE.SLEEP_SHORTER_DIURNAL_STRESS_HIGHER
						+	'</div>'
					} else if (isLongerSleepTimeAndLowerWorkStress && workStressIndex?.indexOf(index)! > 0) {
						return getStressTips(params[0])
						+ SCENE_KNOWLEDGE.SLEEP_LONGER_DIURNAL_STRESS_LOWER
						+	'</div>'
					// @ts-ignore
					} else if ([].concat.apply([], randomKnowledge).indexOf(index) >= 0) {
						for (let i = 0; i < randomKnowledge.length; i++) {
							if(randomKnowledge[i].indexOf(index) >= 0) {
								return getStressTips(params[0])
									+  RANDOM_KNOWLEDGE[i]
									+ '</div>'
							}
						}
						return params[0].name + '<br/><br/>' 
							+ params[0].marker
							+ params[0].seriesName + ' : ' + value + '<br/>'
					} else if (value === -10) {
						return params[0].name + '<br/><br/>' 
							+ params[0].marker + "活动中"
					} else if (value === -1) {
						return params[0].name + '<br/><br/>' 
							+ "无法测量"
					}	else {
						return params[0].name + '<br/><br/>' 
							+ params[0].marker
							+ params[0].seriesName + ' : ' + value + '<br/>'
						// const flag = Math.floor(Math.random() * 2);
						// if(index > sleepEndIndex! && flag && randomNum < RANDOM_KNOWLEDGE.length) {
						// 	console.log('--->index', index)
						// 	randomNum++;
						// 	return getStressTips(params[0])
						// 	+ RANDOM_KNOWLEDGE[randomNum] 
						// 	+ '</div>'
						// } else {
						// 	const i = Math.floor(Math.random() * RANDOM_KNOWLEDGE.length)
						// 	return getStressTips(params[0])
						// 	+ '</div>'
						// }
					}
				}
				// formatter: (params: any) => {
				// 	const value = params[0].value;
				// 	// console.log('exerciseIndex', exerciseIndex)
				// 	// console.log('eatIndex', eatIndex)
				// 	const index = params[0].dataIndex;
				// 	if (value === -10) {
				// 		return params[0].name + '<br/><br/>' 
				// 		+ params[0].marker + "活动中"
				// 	} else if (value === -1) {
				// 		return params[0].name + '<br/><br/>' 
				// 			+ "无法测量"
				// 	} else if (index >= sleepStartIndex && index <= sleepEndIndex) {
				// 		if (value > 25) {
				// 			return '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + 
				// 			params[0].name + '<br/><br/>' 
				// 			+ params[0].marker
				// 			+ params[0].seriesName + ' : ' + value + '<br/><br/>' +
				// 			'睡眠期间的压力值高，可能是因为白天运动过度、睡前饮酒过多、睡眠障碍等多方面原因造成的。请您关注自己的健康状况，放松身心，合理安排工作和休息时间。'
				// 			+	'</div>'
				// 		} else {
				// 			return '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + 
				// 			params[0].name + '<br/><br/>' 
				// 			+ params[0].marker
				// 			+ params[0].seriesName + ' : ' + value+'<br/><br/>' +
				// 			'优质的睡眠能帮助您从白天的压力中恢复过来'
				// 			+	'</div>' 
				// 		}
				// 	// @ts-ignore
				// 	} else if (exerciseIndex?.indexOf(index) >= 0) {
				// 		return '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + 
				// 			params[0].name + '<br/><br/>' 
				// 			+ params[0].marker
				// 			+ params[0].seriesName + ' : ' + value + '<br/><br/>' 
				// 			+ '<p>'+ '压力状态受自主神经系统控制，其中交感神经活跃程度的提高会提高压力水平。' + '<span style="color:red;">运动</span>会提高交感神经系统的活跃程度，导致运动结束后的一段时间内检测到的压力值升高。' + '</p>'
				// 			// + "压力状态受自主神经系统控制，其中交感神经活跃程度的提高会提高压力水平，副交感神经活动程度的提高会降低压力水平。" + '<br/>' + "而自主神经系统的状态可以通过心率变异性(HRV)反映。运动会提高交感神经系统的活跃程度，导致运动结束后的一段时间内检测到的压力值升高。"
				// 			+	'</div>' 
				// 	// @ts-ignore
				// 	} else if(eatIndex?.indexOf(index) >= 0) {
				// 		return '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + 
				// 		params[0].name + '<br/><br/>' 
				// 		+ params[0].marker
				// 		+ params[0].seriesName + ' : ' + value + '<br/><br/>' 
				// 		+ '<p>'+ '研究表明酒精、咖啡、以及一些不健康的饮食（例如高碳水化合物、高脂或反式脂肪食物，常见于包装零食，烤货，块状人造黄油，膨化食品和快餐等）会降低HRV，导致压力值升高。' + '</p>'
				// 		// + "压力状态受自主神经系统控制，其中交感神经活跃程度的提高会提高压力水平，副交感神经活动程度的提高会降低压力水平。" + '<br/>' + "而自主神经系统的状态可以通过心率变异性(HRV)反映。运动会提高交感神经系统的活跃程度，导致运动结束后的一段时间内检测到的压力值升高。"
				// 		+	'</div>' 
				// 	}
				// 	else {
				// 		return params[0].name + '<br/><br/>' 
				// 			+ params[0].marker
				// 			+ params[0].seriesName + ' : ' + value + '<br/>'
				// 	} 
				// },
			},
			xAxis: {
				data: Object.keys(stressDetail.timeOffsetStressLevelValues).map(function (item) {
					return secondToTime(item);
				}),
				axisLabel: {
					show: true,
					// interval: 79,
					interval: 0,
					formatter: (value: any, index: number) => {
						const activities = activitiesMap? Array.from(activitiesMap!.keys()) : [];
						if (index === sleepStartIndex) {
							return '{fallASleepValue|} '+ timestampToStr(sleepStartTime, FORMATE_TIME.HOUR_MINUTE);
						} else if(index === sleepEndIndex) {
							return '{getUpValue|} ' + timestampToStr(sleepEndTime, FORMATE_TIME.HOUR_MINUTE);
						} else if(index === nextSleepStartIndex) {
							return '{fallASleepValue|} '+ timestampToStr(nextSleepStartTime!, FORMATE_TIME.HOUR_MINUTE);
						} else if(activities!.indexOf(index) >= 0) {
							const activityType = activitiesMap?.get(index).activityType.toLowerCase();
							if (activityType === ACTIVITY_TYPE.WALKING) {
								return '{walking|}'
							} else if (activityType === ACTIVITY_TYPE.RUNNING) {
								return '{running|}'
							} else if (activityType === ACTIVITY_TYPE.CYCLING) {
								return '{cycling|}'
							} else if (activityType === ACTIVITY_TYPE.FITNESS_EQUIPMENT) {
								return '{fitness_equipment|}'
							}
						}	else if(index % 80 === 0) {
							return '\n\n\n' + value.split('-')[0]
						} 
						return ''
					},
					rich: {
						fallASleepValue: {
							height: 15,
							align: 'center',
							lineHeight: 30,
							backgroundColor: {
								image: '/assets/icon/sleep2.png'  	
							}
						},
						getUpValue: {
							height: 15,
							align: 'center',
							lineHeight: 30,
							backgroundColor: {
								image: '/assets/icon/getUp.png'  	
							}
						},
						walking: {
							height: 15,
							align: 'center',
							lineHeight: 30,
							backgroundColor: {
								image: ACTIVITY_ICON.WALKING  	
							}
						},
						running: {
							height: 15,
							align: 'center',
							lineHeight: 30,
							backgroundColor: {
								image: ACTIVITY_ICON.RUNNING  	
							}
						},
						cycling: {
							height: 15,
							align: 'center',
							lineHeight: 30,
							backgroundColor: {
								image: ACTIVITY_ICON.CYCLING  	
							}
						},
						fitness_equipment: {
							height: 30,
							align: 'center',
							lineHeight: 30,
							backgroundColor: {
								image: ACTIVITY_ICON.FITNESS_EQUIPMENT  	
							}
						}
					}
				},
				axisTick: {
					show: true,	//x轴刻度线
					interval: (index: number, value: string) => {
						if (index === sleepStartIndex || index === sleepEndIndex || index % 80 === 0) {
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
					if(item === STRESS_VALUE.ACTIVITY) {
						return -10
					}	else {
						return item;
					}
				}),
				barWidth: 0.5,
				// markLine: {
				// 	data: [{
				// 		name: 'Y 轴值为 100 的水平线',
				// 		yAxis: 50
				// 	}]
				// }
			}
		});

		stressDetailChart.dispatchAction({
			type: 'showTip',
			// 屏幕上的 x 坐标
			x: 10,
			// 屏幕上的 y 坐标
			y: 10,
		})

	}


	const initSleepPie = () => {
		if(JSON.stringify(sleepChartData) === '{}' || !sleepChartData) {
			return;
		}
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
		// const chartId = "sleepPie" + messageNum;
		const chartId = "sleepPie";
		// @ts-ignores
		const sleepPie = echarts.init(document.getElementById(chartId))

		sleepPie.setOption({
			animation: false, // 取消动画
			title: {
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
			// color:["#3366ff", "#66a3ff", "#ff9966", "#ffcc00"],
			color: ["#3366ff", "#66a3ff", "#D43ECF", "#FBA6CD"],
			// @ts-ignore
			legend: {
				orient: 'vertical',
				right: 20,
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


	const sleepLabels = ['--', '深睡期', '浅睡期', '快速眼动睡眠', '清醒']


	const initSleepBar = () => {
		console.log('---->initSleepChart', sleepChartData)
		if(JSON.stringify(sleepChartData) === '{}' || !sleepChartData) {
			return;
		}
		const sleepLevelsMap = sleepChartData.sleepLevelsMap;
		// @ts-ignore
		const unmeasurableArray = sleepLevelsMap.unmeasurable || []; //0
		// @ts-ignore
		const deepArray = sleepLevelsMap.deep || [];	//1
		// @ts-ignore
		const lightArray = sleepLevelsMap.light || []; //2
		// @ts-ignore
		const remArray = sleepLevelsMap.rem || []; //3
		// @ts-ignore
		const awakeArray = sleepLevelsMap.awake || [];	//4

		const sleepTimesList = [];
		const sleepValueList = [];

		const sleepValueMap = new Map();
		for(let item of unmeasurableArray) {
			for(let i = item.startTimeInSeconds; i <= item.endTimeInSeconds; i++) {
				sleepValueMap.set(i, 0);
			}
		}
		for(let item of deepArray) {
			for(let i = item.startTimeInSeconds; i <= item.endTimeInSeconds; i++) {
				sleepValueMap.set(i, 1);
			}
		}
		for(let item of lightArray) {
			for(let i = item.startTimeInSeconds; i <= item.endTimeInSeconds; i++) {
				sleepValueMap.set(i, 2);
			}
		}
		for(let item of remArray) {
			for(let i = item.startTimeInSeconds; i <= item.endTimeInSeconds; i++) {
				sleepValueMap.set(i, 3);
			}
		}
		for(let item of awakeArray) {
			for(let i = item.startTimeInSeconds; i <= item.endTimeInSeconds; i++) {
				sleepValueMap.set(i, 4);
			}
		}
	
		var sleepValueArrayObj = Array.from(sleepValueMap);
		sleepValueArrayObj.sort(function(a,b) { return a[0] - b[0] })

		for(let i = 0; i < sleepValueArrayObj.length; i = i + 60) {
			// sleepTimesList.push(timestampToStr(item[0], 'yyyy-MM-dd'));
			sleepTimesList.push(sleepValueArrayObj[i][0]);
			sleepValueList.push(sleepValueArrayObj[i][1]);
		}
		console.log(sleepTimesList, sleepValueList)

		// const chartId = "sleepBar" + messageNum;
		const chartId = "sleepBar";
			// @ts-ignores
		const sleepBar = echarts.init(document.getElementById(chartId))

		sleepBar.setOption({
			xAxis: {
				type: 'category',
				data: sleepTimesList.map((item) => {
					return timestampToStr(item, FORMATE_TIME.HOUR_MINUTE) || ''
				}),
				axisLabel: {
					show: true,
					interval: 0,
					formatter: (value: any, index: number) => {
						if (index === 0) {
							return '{fallASleepValue|} '+ value;
						} else if(index === sleepValueList.length - 1) {
							return '{getUpValue|} ' + value;
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
					show: false,	//x轴刻度线
				},
			},
			yAxis: {
				type: 'value',
				//去除网格线
				axisLabel: {
					formatter: (value: any, index: number) => {
						value =  ['', '深睡期', '浅睡期', '快速眼动睡眠', '清醒'][index];
						return value;
					},
				}
			},
			grid: {
				left: 80
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				},
				textStyle: {
					fontSize: 12,
					lineHeight: 56,
				},
				formatter: (params: any) => {
					const value = params[0].value;
					const index = params[0].dataIndex;
					// return params[0].name + '<br/>' 
					// + params[0].marker + sleepLabels[value]
					const lable = '<div style="max-width: 200px; line-height: 15px; display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' + params[0].name + '<br/><br/>' + params[0].marker + sleepLabels[value];
					if (value === 0) {
						return lable + '<br/><br/>' + SLEEP_KNOWLEDGE.UNMEASURABLE + '</div>'
					} else if (value === 1) {
						return lable + '<br/><br/>' + SLEEP_KNOWLEDGE.DEEP	+ '</div>'			
					} else if (value === 2) {
						return lable + '<br/><br/>' + SLEEP_KNOWLEDGE.LIGHT + '</div>'
					} else if (value === 3) {
						return lable + '<br/><br/>' + SLEEP_KNOWLEDGE.REM + '</div>'
					} else {
						return lable + '<br/><br/>' + SLEEP_KNOWLEDGE.AWAKE + '</div>'
					}
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
					// {
					// 	value: 0,
					// 	color: '#5470c6',
					// 	label: "深睡期",
					// },
					{
						value: 1,
						color: '#3366ff',
						label: "深睡期"
					},
					{
						value: 2,
						label: '浅睡期',
						color: '#66a3ff',
					},
					{
						value: 3,
						label: '快速眼动期',
						color: '#D43ECF',
					},
					{
						value: 4,
						label: '醒来',
						color: '#FBA6CD',
					}
					// ["#3366ff", "#66a3ff", "#D43ECF", "#FBA6CD"]
					// ['深睡期', '浅睡期', '浅睡期', '浅睡期'],
					// ["#5470c6", "#3366ff", "#66a3ff", "#ff9966", "#ffcc00"];
				],
			},
			series: [{
				data: sleepValueList,
				type: 'bar',
				barWidth: 2,
				barGap:'0%',/*多个并排柱子设置柱子之间的间距*/
				barCategoryGap:'0%',/*多个并排柱子设置柱子之间的间距*/
			}]
		})
	}


	const isMaybeMealtime = (calendarDate: string, timestamp: number) => {
		// 11:00-13:00, 17:00-19:00
		// 220-260, 340-380
		// console.log('---->strToTimestamp', timestamp, " ", strToTimestamp(calendarDate + " 11:00:00") )
		if((timestamp >= strToTimestamp(calendarDate + " 11:00:00")  && timestamp <= strToTimestamp(calendarDate + " 13:00:00")) 
		|| (timestamp >= strToTimestamp(calendarDate + " 17:00:00")  && timestamp <= strToTimestamp(calendarDate + " 19:00:00"))) {
			return true;
		}
		return false;
	}


	const isMaybeWorkTime = (calendarDate: string, timestamp: number) => {
		if((timestamp >= strToTimestamp(calendarDate + " 09:00:00")  && timestamp <= strToTimestamp(calendarDate + " 11:00:00")) 
		|| (timestamp >= strToTimestamp(calendarDate + " 13:00:00")  && timestamp <= strToTimestamp(calendarDate + " 17:00:00"))) {
			return true;
		}
		return false;
	}


	const showStressChartByDate = async (date: string, isPreNext: boolean) => {
		// TODO: userId记得改回来'
		// user.userId = 11
		if (user.userId! < 0) {
			history.push('/login', {direction: 'none'})
			return;
		}

		setStressChartLoading(true)
		const asyncFetchData = async (theDate: string) => {
			//获取高强度运动是否影响了睡眠
			const fetchIsHighIntensityExerciseEffectSleep: any = await getIsHighIntensityExerciseEffectSleep(user.userId!, theDate);
			const result = fetchIsHighIntensityExerciseEffectSleep.data?.result || false;
			setIsHighIntensityExerciseEffectSleep(result);

			//获取是否有慢性压力
			const fetchIsChronicStress: any = await getIsChronicStress(user.userId!, theDate);	
			const chronicStress = fetchIsChronicStress.data?.isChronicStress || false;
			console.log('--->123 isChronicStress', chronicStress)
			setIsChronicStress(chronicStress);
		
		  // 获取一周的运动量是否足够，由周一改为过去七天
			// if(new Date(date + " 00:00:00").getDay() === 1) {
				const fetchIsExerciseEnough: any = await getIsExerciseEnough(user.userId!, theDate);	
				const isExerciseEnough = fetchIsExerciseEnough.data?.isExerciseEnough || false;
				setIsExerciseEnough(isExerciseEnough);
			// } else {
			// 	setIsExerciseEnough(true);
			// }
			
			// //获取是否有睡眠时长变短影响白天的工作压力源的情况，17：00之后再获取
			// const nowTime = new Date();
			// if(nowTime.getHours() >= 17 || strToTimestamp(date) < strToTimestamp(dateToString(nowTime, 'yyyy-MM-dd'))) {
			// 	const fetchIsShorterSleepTimeAndHigherWorkStress: any = await getIsShorterSleepTimeAndHigherWorkStress(user.userId!, theDate);
			// 	const isShorterSleepTimeAndHigherWorkStress = fetchIsShorterSleepTimeAndHigherWorkStress.data?.result || false;
			// 	setIsShorterSleepTimeAndHigherWorkStress(isShorterSleepTimeAndHigherWorkStress);
			// } 
			
			// //获取是否睡眠期间的放松时间有变长
			// const fetchIsRelaxLongerDuringSleep: any = await getIsRelaxLongerDuringSleep(user.userId!, theDate);
			// const isRelaxLongerDuringSleep = fetchIsRelaxLongerDuringSleep.data?.result || false;
			// console.log('isRelaxLongerDuringSleep', isRelaxLongerDuringSleep)
			// setIsRelaxLongerDuringSleep(isRelaxLongerDuringSleep);


			const fetchSleepOtherScene: any = await getOtherSleepScene(user.userId!, theDate);
			const isShorterSleepTimeAndHigherWorkStress = fetchSleepOtherScene.data?.result?.isShorterSleepTimeAndHigherWorkStress || false;
			const isLongerSleepTimeAndLowerWorkStress = fetchSleepOtherScene.data?.result?.isLongerSleepTimeAndLowerWorkStress || false;
			const isRelaxLongerDuringSleep = fetchSleepOtherScene.data?.result?.isRelaxLongerDuringSleep || false;
			setIsShorterSleepTimeAndHigherWorkStress(isShorterSleepTimeAndHigherWorkStress);
			setIsLongerSleepTimeAndLowerWorkStress(isLongerSleepTimeAndLowerWorkStress);
			setIsRelaxLongerDuringSleep(isRelaxLongerDuringSleep);
			
			//获取一整天的每日摘要数据
			const fetchDailyData: any = await getHealthDataByDate(user?.userId!, DOMAIN.DAILY, theDate); 
			const dailyData = fetchDailyData?.data?.data || null;
			setDailyData(dailyData);

			// 获取自动检测的活动数据
			const fetchMoveIQ: any = await getMoveIQs(user.userId!, theDate);
			const moveIQs = fetchMoveIQ.data?.moveIQ || [];
			console.log('---->moveIQs', moveIQs)
			setMoveIQs(moveIQs);

			// //获取met>=3.0的epochs
			// const fetchEpochs: any = await getMetGreaterThan3Epochs(user.userId!, theDate);
			// const epochs = fetchEpochs.data?.metGreaterThan3Epochs || [];
			// setEpochs(epochs);

			// 获取每日摘要
			const fetchActivities: any = await getActivities(user?.userId!, theDate); 
			const activities = fetchActivities.data?.activities || [];
			setActivities(activities);

			//获取一整天的压力数据
			const fetchStressData: any = await getHealthDataByDate(user?.userId!, DOMAIN.STRESS, theDate);	
			const stressData = fetchStressData.data?.data || null;
			if (!stressData) {
				return false; 
			}
			setStressDetail(stressData);

			//获取一整天的睡眠数据
			const fetchSleepData: any = await getHealthDataByDate(user.userId!, DOMAIN.SLEEP, theDate);
			const sleepData = fetchSleepData.data?.data || {};
			const nextSleepStartTime = fetchSleepData.data?.nextSleepStartTime;
			setNextSleepStartTime(nextSleepStartTime);
			setSleepData(sleepData);
		
			return true;
		}

		const id = messageNum + 1;
		if (!isPreNext) {
			let responseMessage = {
				id,
				date: formatDate(new Date()),
				userId: chatbot.id,
				username: chatbot.username,
				avatar: chatbot.avatar,
				text: "stressDetailChart",
			}
			setMessageNum(messageNum => id)
			setMessages(messages => [...messages, responseMessage])	
			scrollToBottom()
		}
		
		const hasData = await asyncFetchData(date);
		setStressChartLoading(false);	
		setIsHasStressData(hasData);
	}


	const showStressDetailChart = () => {
		const date = dateToString(new Date(), "yyyy-MM-dd");
		// showStressChartByDate('2021-01-29', false);
		// setStressDate('2021-01-29')
		showStressChartByDate(date, false);
	}


	// const showSleepPie = () => {
	// 	setSleepChartLoading(true);
	// 	user.userId = 11
	// 	// @ts-ignore
	// 	if (user.userId < 0) {
	// 		history.push('/login', {direction: 'none'})
	// 		return;
	// 	}
	// 	const asyncFetchData = async () => {
	// 		// @ts-ignore		
	// 		const fetchSleepData: any = await getLatestDataService(user.userId, DOMAIN.SLEEP);
	// 		// const fetchSleepData: any = await getHealthDataByDate(user.userId, DOMAIN.SLEEP, );
	// 		const sleepData = fetchSleepData.data?.latestData || null;
	// 		setSleepChartData(sleepData)
	// 	}
	// 	let responseMessage = {
	// 		id: messageNum + 1,
	// 		date: formatDate(new Date()),
	// 		userId: chatbot.id,
	// 		username: chatbot.username,
	// 		avatar: chatbot.avatar,
	// 		text: "sleepChart"
	// 	}
	// 	setMessages(messages => [...messages, responseMessage])
	// 	setMessageNum(messageNum => messageNum + 1)
	// 	scrollToBottom()
	// 	asyncFetchData();
	// }

	const showSleepChartByDate = async (date: string, isPreNext: boolean) => {
		setSleepChartLoading(true);
		// user.userId = 11
		// @ts-ignore
		if (user.userId < 0) {
			history.push('/login', {direction: 'none'})
			return;
		}

		const asyncFetchData = async () => {
			// @ts-ignore		
			const fetchSleepData: any = await getHealthDataByDate(user.userId, DOMAIN.SLEEP, date);
			const sleepChartData = fetchSleepData.data?.data || null;
			if (!sleepChartData) { 
				setSleepChartLoading(false);
				return false;
			}
			setSleepChartData(sleepChartData);
			return true;
		}

		const id = messageNum + 1;
		console.log('messageNum', id)
		if (!isPreNext) {
			setMessageNum(messageNum => id)
			let responseMessage = {
				id,
				date: formatDate(new Date()),
				userId: chatbot.id,
				username: chatbot.username,
				avatar: chatbot.avatar,
				text: "sleepChart"
			}
			setMessages(messages => [...messages, responseMessage])
			scrollToBottom()
		}
		const hasSleepData = await asyncFetchData();
		setIsHasSleepData(hasSleepData)
	}


	const showStressPre = () => {
		const prevDate = getPrevDate(stressDate);
		setStressDate(prevDate)
		showStressChartByDate(prevDate, true);
	}

	
	const showStressNext = () => {
		const nextDate = getNextDate(stressDate);
		setStressDate(nextDate)
		showStressChartByDate(nextDate, true);
	}


	const showSleepPre = () => {
		const prevDate = getPrevDate(sleepDate);
		setSleepDate(prevDate)
		showSleepChartByDate(prevDate, true);
	}


	const showSleepNext = () => {
		const nextDate = getNextDate(sleepDate);
		setSleepDate(nextDate)
		showSleepChartByDate(nextDate, true);
	}
	

	const getSleepQuality = () => {
		const sleepDuration = sleepData.durationInSeconds - sleepData.unmeasurableSleepInSeconds;
		console.log('--->sleepData', sleepData)
		console.log('unmeasurableSleepDurationInSeconds', sleepData.unmeasurableSleepInSeconds)
		const awakenings = sleepData.sleepLevelsMap?.awake?.length;
		const fallBackAsleepArray = sleepData.sleepLevelsMap?.awake?.map((item: any) =>
			item.endTimeInSeconds - item.startTimeInSeconds
		)
		const remSleepDuration = sleepData.remSleepInSeconds;
		const deepSleepDuration = sleepData.deepSleepDurationInSeconds;
		const remPercentage = remSleepDuration / sleepDuration;
		const deepPercentage = deepSleepDuration / sleepDuration; 
		const reasonsPoor = [];
		if(sleepDuration >= 7*60*60 && sleepDuration <= 9*60*60 && awakenings <= 1 && (!fallBackAsleepArray || fallBackAsleepArray.length === 0 || fallBackAsleepArray[0] <= 20 * 60) 
			&& remPercentage >= 0.21 && remPercentage <= 0.3 && deepPercentage >= 0.16 && deepPercentage <= 0.2) {
			return [SLEEP_QUALITY.GOOD];
		}
		console.log('---->sleepDuration', sleepDuration)
		if(sleepDuration < 5*60*60) {		
			reasonsPoor.push(REASONS_FOR_POOR_SLEEP.SLEEP_SHORT);
		}
		if (awakenings >= 4) {
			reasonsPoor.push(REASONS_FOR_POOR_SLEEP.AWAKENINGS_TOO_MUCH);
		}
		if (fallBackAsleepArray && fallBackAsleepArray.length > 0 && fallBackAsleepArray.some((item: number) => item >= 41*60)) {
			reasonsPoor.push(REASONS_FOR_POOR_SLEEP.FALLBACK_TOO_LONG)
		}
		if (deepPercentage <= 0.05) {
			reasonsPoor.push(REASONS_FOR_POOR_SLEEP.DEEP_TOO_LITTLE)
		}
		if (remPercentage >= 0.41) {
			reasonsPoor.push(REASONS_FOR_POOR_SLEEP.REM_TOO_MUCH)
		} 
		if (reasonsPoor.length > 0) {
			return [SLEEP_QUALITY.BAD, reasonsPoor];
		} else {
			return [SLEEP_QUALITY.JUSTSOSO];
		}
	}


	useEffect(() => {
		if(isHasSleepData) {
			initSleepPie();
			initSleepBar();
		}
	}, [sleepChartData, isHasSleepData])


	// useEffect(() => {
	// 	console.log('useEffect test', stressDetail, sleepData, dailyData)
	// 	if(!stressDetail || !sleepData || !dailyData) return;
		
	// 	const stressArr: Array<number> = Object.values(stressDetail.timeOffsetStressLevelValues);
	// 	const afterActivityUnable = [];

	// 	for(let i = 0; i < stressArr.length; i++) {
	// 		if(i > 0 && (stressArr[i-1] === -2 || afterActivityUnable.indexOf(i-1) >= 0) && stressArr[i] === -1) {
	// 			afterActivityUnable.push(i);
	// 		}
	// 	}

	// 	const exercise = [];
	// 	let continuousNum = 0;
	// 	for(let i = 0; i < stressArr.length; i++) {
	// 		// @ts-ignore
	// 		//可能是运动导致压力升高的规则：一个元素值为-2,其后连续1,2,3,4,5个元素的值大于25，则后面这5个元素都标记为受运动影响的压力升高
	// 		// console.log('continuousNum: ', continuousNum)
	// 		if(continuousNum <= 4 && (i > 0 && ((afterActivityUnable.indexOf(i-1) >= 0 || stressArr[i-1] === -2 ) && stressArr[i] > 25) || (i > 1 && exercise.indexOf(i-1) >= 0 && stressArr[i] > 25))) {
	// 			continuousNum++;
	// 			exercise.push(i);
	// 		} else {
	// 			continuousNum = 0;
	// 		}
	// 	}
	// 	console.log('exercise', exercise)
	// 	setAfterExerciseIndex(exercise)

	// 	const eat = []; 
	// 	for(let i = 0; i < stressArr.length; i++) {
	// 		// @ts-ignore
	// 		//可能是饮食导致压力升高的规则：不属于运动升高，时间范围在11:00-13:00,17：00-19:00，前一个元素的值为0-25，其后连续1,2,3个元素的值大于25，则后面这1或2或3个元素都标记为受饮食影响的值
	// 		if(exercise.indexOf(i) >= 0 || stressArr[i] <= 25 || !isMaybeEat(i)) {
	// 			continue;
	// 		// 从放松->有压力
	// 		// } else if((i > 0 && stressArr[i-1] >= 0 && stressArr[i-1] <= 25) || (i > 1 && eat.indexOf(i-1) >= 0) || (i > 2 && eat.indexOf(i-2) >= 0)) {
	// 		// 有压力
	// 	} else {
	// 			eat.push(i);
	// 		}                     
	// 	}
	// 	console.log('eat', eat)
	// 	setEatIndex(eat);
	// 	// setStressChartLoading(false);	
	// }, [stressDetail, sleepData, dailyData])

	
	// setWakeUp15MinutesIndex
	useEffect(()=> {
		if(!sleepEndIndex) return;
		if(sleepEndIndex === -1) {
			setWakeUp15MinutesIndex([]);
			return;
		}
		const stressValues = Object.values(stressDetail!.timeOffsetStressLevelValues);
		let wakeUp15Minutes = [];	
		for(let i = 0; i < 5; i++) {
			// if(stressValues[sleepEndIndex + i] > 0) {
			wakeUp15Minutes.push(sleepEndIndex + i);
			// }
		}
		setWakeUp15MinutesIndex(wakeUp15Minutes);
		console.log('wakeUp15Minutes', wakeUp15Minutes);
	}, [sleepEndIndex])


	// setAfterExerciseIndex
	useEffect(()=> {
		if(!stressDetail) return;
		if(stressDetail.calendarDate !== stressDate) return;
		const stressValues = Object.values(stressDetail!.timeOffsetStressLevelValues);
		const moveIQAndActivityList =  activitiesMap? Array.from(activitiesMap!.values()) : [];
		let activityIndexList = [];
		for(let item of moveIQAndActivityList) {
			for (let i = item.startIndex; i <= item.endIndex; i++) {
				activityIndexList.push(i);
			}
		}
		console.log('--->activityIndexList', activityIndexList)
		const afterActivityUnable = [];	//活动后的无法测量，最多连续5个
		let continuousNum = 0;
		for(let i = 0; i < stressValues.length; i++) {
			if(continuousNum < 5 && i >= 1 && (stressValues[i-1] === STRESS_VALUE.ACTIVITY || afterActivityUnable.indexOf(i-1) >= 0) && stressValues[i] === STRESS_VALUE.UNMEASURABLE) {
				continuousNum++;
				afterActivityUnable.push(i);
			} else {
				continuousNum = 0;
			}
		}
		console.log('afterActivityUnable', afterActivityUnable)
		// const exercise = [];
		// continuousNum = 0;
		// for(let i = 0; i < stressValues.length; i++) {
		// 	// @ts-ignore
		// 	//可能是运动导致压力升高的规则：一个元素值为-2,其后连续1,2,3,4,5个元素的值大于25，则后面这5个元素都标记为受运动影响的压力升高，允许这连续的五个值之间有一个-1
		// 	// console.log('continuousNum: ', continuousNum)
		// 	if(continuousNum <= 4 && ((i > 0 && (afterActivityUnable.indexOf(i-1) >= 0 || stressValues[i-1] === STRESS_VALUE.ACTIVITY && activityIndexList.indexOf(stressValues[i-1]) >= 0)) 
		// 	|| (i > 1 && exercise.indexOf(i-1) >= 0)
		//   || (i > 2 && exercise.indexOf(i-2) >= 0 && stressValues[i-1] === STRESS_VALUE.UNMEASURABLE))
		// 	 && stressValues[i] > 25) {
		// 		continuousNum++;
		// 		exercise.push(i);
		// 	} else if (i > 1 && exercise.indexOf(i-1) >= 0 && stressValues[i] === -1) {
		// 		continuousNum++;
		// 	} else {
		// 		continuousNum = 0;
		// 	}
		// }

		let activityList = [];	//保存可能的活动index
		for(let i = 0; i < stressValues.length;) {
			if((i === 0 || stressValues[i-1] !== STRESS_VALUE.ACTIVITY) && stressValues[i] === STRESS_VALUE.ACTIVITY) {
				const activityStartIndex = i;
				let activityEndIndex = -1;
				let j;
				for(j = i + 1; j < stressValues.length; j++) {
					if(afterActivityUnable.indexOf(j) >= 0 || stressValues[j] === STRESS_VALUE.ACTIVITY) {
						continue;
					} else if(stressValues[j] > 25) {
						activityEndIndex = j - 1;
						break;
					} else {
						break;
					}
				}
				i = j + 1;
				if (activityEndIndex >= activityStartIndex) {
					activityList.push({activityStartIndex, activityEndIndex})
				}
			} else {
				i++;
			}
		}
	
		//判断可能的活动时间段是否属于moveIQ或者activities中的活动, activityIndexList
		const afterActivityIndex = [];
	
		for(let activity of activityList) {
			for (let index = activity.activityStartIndex; index <= activity.activityEndIndex; index++) {
				if(activityIndexList.indexOf(index) >= 0 || (activity.activityEndIndex - activity.activityStartIndex) >= 5) {
					const afterActivityStartIndex = activity.activityEndIndex + 1;
					// exercise.push(afterActivityStartIndex)
					let continuousNum = 1;
					for(let i = afterActivityStartIndex; i < stressValues.length; i++) {
						if(continuousNum <= 5 && stressValues[i] > 25) {
							afterActivityIndex.push(i);
							continuousNum++;
						} else if (continuousNum > 5 || stressValues[i] > 0) {
							break;
						}
					}
				}	
			}
		}
		console.log('---->afterActivityIndex', afterActivityIndex)
		setAfterExerciseIndex(afterActivityIndex)
		// for (let index of afterActivityIndex) {
		// 	indexWithScene![index] = SCENE_NUMBER.AFTER_EXERCISE;
		// }
		// setIndexWithScene(indexWithScene)
	}, [stressDetail])

	
	
	// setOverallDayStress 一整天压力情况
	useEffect(()=> {	
		if(!dailyData) return;
		const stressQualifier = dailyData?.stressQualifier;
		const steps = dailyData?.steps;	//步数
		const stepsGoal = dailyData?.stepsGoal;	 //目标步数
		const moderateIntensityDurationInSeconds = dailyData?.moderateIntensityDurationInSeconds; //中等强度活动秒数
		const vigorousIntensityDurationInSeconds = dailyData?.vigorousIntensityDurationInSeconds;  //高强度活动秒数
		const intensityDurationGoal = dailyData?.intensityDurationGoalInSeconds / 7; //一天的目标活动秒数
		const intensityDuration = moderateIntensityDurationInSeconds + vigorousIntensityDurationInSeconds * 2;
		if (stressQualifier === STRESS_QUALIFIER.CALM || stressQualifier === STRESS_QUALIFIER.CALM_AWAKE || stressQualifier === STRESS_QUALIFIER.BALANCED || stressQualifier === STRESS_QUALIFIER.BALANCED_AWAKE) {
			setOverallDayStress(OVERALL_DAY_STRESS.CALM_OR_BALANCED);
		}	else if(stressQualifier === STRESS_QUALIFIER.STRESSFUL || stressQualifier === STRESS_QUALIFIER.STRESSFUL_AWAKE 
			|| stressQualifier === STRESS_QUALIFIER.VERY_STRESSFUL || stressQualifier === STRESS_QUALIFIER.VERY_STRESSFUL_AWAKE) {

			if (steps >= stepsGoal || intensityDuration >= intensityDurationGoal) {
				setOverallDayStress(OVERALL_DAY_STRESS.ENOUGH_EXERCISE_STRESSFUL);
			} else {
				setOverallDayStress(OVERALL_DAY_STRESS.INADEQUATE_EXERCISE_STRESSFUL);
			}
		} else {
			setOverallDayStress('');
		}
	}, [stressDetail, dailyData])


	// setDigestionIndex 11:00-13:00，17:00-19:00之间压力值升高，从<=25变成>25，并且>25至少持续15分钟
	useEffect(()=> {
		if(!stressDetail || stressDetail.calendarDate !== stressDate) return;
		const calendarDate = stressDetail.calendarDate;
		const stressValues = Object.values(stressDetail!.timeOffsetStressLevelValues);
		const stressKeys = Object.keys(stressDetail!.timeOffsetStressLevelValues);
		let digestion = [];
		for(let i = 0; i < stressValues.length; i++) {
			const timestamp = stressDetail.startTimeInSeconds + parseInt(stressKeys[i]);
			if(isMaybeMealtime(calendarDate, timestamp) &&  i >= 1 && stressValues[i-1] >= 1 && stressValues[i-1] <= 25 && stressValues[i] > 25) {
				let isDigestion = true;
				for(let j = 1; j < 5; j++) {
					if ((i + j) > stressValues.length || (stressValues[i+j] >=1 && stressValues[i+j] <= 25) || stressValues[i+j] === STRESS_VALUE.ACTIVITY) {
						isDigestion = false;
						break;
					}
				}
				if (isDigestion) {
					for(let j = 0; j < 5; j++) {
						digestion.push(i + j);
					}
				}
			}
		}
		setDigestionIndex(digestion);
	}, [stressDetail])



	// setWorkStressIndex 白天的工作压力，9:00-11:00, 13:00-17:00非运动引起的持续压力较高
	useEffect(()=> {
		if(!stressDetail || stressDetail.calendarDate !== stressDate) return;
		const calendarDate = stressDetail.calendarDate;
		const stressValues = Object.values(stressDetail!.timeOffsetStressLevelValues);
		const stressKeys = Object.keys(stressDetail!.timeOffsetStressLevelValues);
		let newWorkStressIndex: Array<number> = [];
		let num = 0;
		// let startIndex = 1000000;
		// for(let i = 0; i < stressValues.length; i++) {
		// 	const timestamp = stressDetail.startTimeInSeconds + parseInt(stressKeys[i]);
		// 	if(isMaybeWorkTime(calendarDate, timestamp) && afterExerciseIndex?.indexOf(i)! < 0 && stressValues[i] > 25) {
		// 		if ((i === 0 || newWorkStressIndex.indexOf(i) < 0) && num === 0) {
		// 			startIndex = i;
		// 			num++;
		// 		} else {
		// 			num++;
		// 		}
		// 	} else {
		// 		if((i - startIndex) >= 5 && (i - startIndex) > newWorkStressIndex.length) {
		// 			for(let j = startIndex; j < i; j++) {
		// 				newWorkStressIndex.push(j);
		// 			}
		// 			startIndex = 1000000;
		// 			num = 0
		// 			}
		// 	}
		// }
		let highStressInterval = [];
		for (let i = 0; i < stressValues.length; i++) {
			const timestamp = stressDetail.startTimeInSeconds + parseInt(stressKeys[i]);
			let startIndex = 1000000;
			if(isMaybeWorkTime(calendarDate, timestamp) && afterExerciseIndex?.indexOf(i)! < 0 && stressValues[i] > 25 && (i === 0 || stressValues[i-1] <= 25 || afterExerciseIndex?.indexOf(i-1)! >= 0)) {
				startIndex = i;
			}
			let endIndex = startIndex;
			for (; endIndex < stressValues.length; endIndex++) {
				if(stressValues[endIndex] < 25) {
					endIndex--;
					highStressInterval.push({startIndex, endIndex})
					break;
				}
			}
		}

		let maxInterval = -1;
		let startIndex = -1;
		let endIndex = -1;
		for(let interval of highStressInterval) { 
			if((interval.endIndex - interval.startIndex) > maxInterval) {
				maxInterval = interval.endIndex - interval.startIndex + 1;
				startIndex = interval.startIndex;
				endIndex = interval.endIndex;
			}
		}
		if(maxInterval > 10) {
			startIndex = Math.floor((startIndex + endIndex) / 2) - 2;
			endIndex = startIndex + 9;
		} 
		for (let i = startIndex; i <= endIndex; i++) {
			newWorkStressIndex.push(i)
		}
		console.log('highStressInterval', highStressInterval)
		console.log('newWorkStressIndex', newWorkStressIndex)
		setWorkStressIndex(newWorkStressIndex);
	}, [afterExerciseIndex])
	

	useEffect(()=> {
		let { wakeUp15MinutesIndex: prevWakeUp15MinutesIndex, afterExerciseIndex: prevAfterExerciseIndex } = ref.current
		console.log('更新前：', prevWakeUp15MinutesIndex, prevAfterExerciseIndex)
		console.log('更新后：', wakeUp15MinutesIndex, afterExerciseIndex)
		// setTimeout(()=>{
		// }, 1000)
		if (isHasStressData) {
			initStressPie()
			initStressBar()
		}
	}, [wakeUp15MinutesIndex, afterExerciseIndex, digestionIndex, isHasStressData, isRelaxLongerDuringSleep, workStressIndex])
	

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton></IonMenuButton>
					</IonButtons>
					<IonTitle>压力小助手</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen ref={messagesRef}>
			{/* <div id="sleepBar" style={{width: "650px", height: "300px", marginTop: "100px"}}></div> */}
				{messages && messages.map((message: Message, index: number) => ( 
					<div className="message-wrapper" key={index}>
						{ user.userId !== message.userId && 
							<div>
								<img className="profile-pic left" src={chatbot.avatar} />
								{ message.text !== "stressDetailChart" && message.text !== "sleepChart" && 
									<div className="chat-bubble left slide-left">
										<div className="message" style={{whiteSpace: "pre-line"}}>{message.text}
										<br/>
										
										<a href="javascript:void(0)" onClick={() => showStressDetailChart()}>查看今天的压力数据</a>
										{/* <NavLink to="#" onClick={() => showStressDetailChart()}>查看今天的压力数据</NavLink> */}
										<br/>
										{/* <NavLink to="#" onClick={() => showSleepPie()}>查看今天的睡眠数据</NavLink> */}
										{/* <a href="javascript:void(0)" onClick={() => showSleepPie()}>查看今天的睡眠数据</a> */}
										<a href="javascript:void(0)" onClick={() => showSleepChartByDate(dateToString(new Date(), "yyyy-MM-dd"), false)}>查看今天的睡眠数据</a>
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
											<div className="stressDetailContent">
												<div>
													{/* {isHasStressDataMap.get(message.id) && <> */}
													{isHasStressData && <>
														{/* <div id={"stressPie" + message.id} style={{ width: "700px", height: "150px" }}></div> */}
														<div id="stressPie" style={{ width: "700px", height: "150px" }}></div>
														{/* <div id={"stressDetailChart" + message.id} style={{width: "700px", height: "300px"}}></div>	 */}
														<div id="stressDetailChart" style={{width: "700px", height: "300px"}}></div>	
													</>}
													{/* {!isHasStressDataMap.get(message.id) && */}
													{!isHasStressData &&
														<div>
															<div style={{textAlign: "center", fontWeight: "bold"}}>{stressDate}</div>
															<div>暂无数据，请到Garmin connect App中同步</div>
														</div>
													}
												</div>
												<div className="preNext">
													<NavLink className="nav" to="#" onClick={() => showStressPre()}>前一天 </NavLink><br />
													<NavLink className="nav" to="#" onClick={() => showStressNext()}>后一天</NavLink><br />
												</div>
												<div className="message"> </div>
													<div className="message-detail left">
													<span>{message.date}</span>
												</div>
											</div>
										</Spin>
									</div>
								}

								{ message.text === "sleepChart" && 
									<div className="chat-bubble left slide-left">
										<Spin spinning={sleepChartLoading}>
											{isHasSleepData && <>
											{/* <div id={"sleepPie" + message.id} style={{ width: "700px", height: "150px" }}></div> */}
											<div id="sleepPie" style={{ width: "700px", height: "150px" }}></div>
											{/* <div id={"sleepBar" + message.id} style={{width: "700px", height: "300px"}}></div> */}
											<div id="sleepBar" style={{width: "700px", height: "300px"}}></div>
											</>}
											{!isHasSleepData &&
												<div>
													<div style={{textAlign: "center", fontWeight: "bold"}}>{sleepDate}</div>
													<div>暂无数据，请到Garmin connect App中同步</div>
												</div>
											}
											<div className="preNext">
												<NavLink className="nav" to="#" onClick={() => showSleepPre()}>前一天 </NavLink><br />
												<NavLink className="nav" to="#" onClick={() => showSleepNext()}>后一天</NavLink><br />
											</div>
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


const chatbot = {
	id: -2,
	avatar: '/assets/icon/Chatbot-evolution-1 (3).png',
	username: 'Chatbot',
};

