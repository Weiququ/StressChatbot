/*
 * @Author: your name
 * @Date: 2021-05-17 19:03:39
 * @LastEditTime: 2021-05-19 02:17:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \StressChatbot\src\pages\SingleDay.tsx
 */

import React, { useEffect, useState, useMemo } from 'react';
import { 
	IonPopover,
	IonCard, 
	IonCardHeader, 
	IonCardContent, 
	IonHeader, 
	IonToolbar, 
	IonTitle, 
	IonContent, 
	IonPage, 
	IonButtons, 
	IonMenuButton, 
	IonBackButton, 
	IonModal,
	IonButton
} from '@ionic/react';
import { 
	STRESS_VALUE,
	FORMATE_TIME,
	ACTIVITY_TYPE,
	ACTIVITY_ICON,
 } from '../utils/constants'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入环形图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/legend';
import { secondToHourMinute, dateToString } from '../utils/handleDate'
import { getLatestDataService, getHealthDataByDate } from '../service/deviceService'
import { DOMAIN } from '../utils/constants'
import { connect } from '../data/connect';
import './css/SingleDay.css'
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { NavLink } from "react-router-dom"
import { formatDate, secondToTime, strToTimestamp, timestampToStr, getPrevDate, getNextDate, } from '../utils/handleDate'
import { Modal, Button, DatePicker, Slider, Radio, Input, Select } from 'antd';

interface StateProps {
	userId: number;
	dailyData: object;
	stressData: object;
	sleepData: object;
}

interface SingleDayProps extends StateProps, RouteComponentProps {}


const SingleDay: React.FC<SingleDayProps> = ({ userId, history }) => {

  // const [dailyData, setDailyData] = useState<any>({}); 
  // const [sleepData, setSleepData] = useState<any>();
  const [nextSleepStartTime, setNextSleepStartTime] = useState(null);
  const [activities, setActivities] = useState<Array<any>>();
	// const [moveIQs, setMoveIQs] = useState<Array<any>>();
  const [isHasStressData, setIsHasStressData] = useState(true);
  const [stressDate, setStressDate] = useState(dateToString(new Date(), "yyyy-MM-dd"));
	const [showModal, setShowModal] = useState(false);
	const [stateTime, setStateTime] = useState('');	//某个要标注的状态的时刻

  // const showStressChartByDate = async (date: string, isPreNext: boolean) => {
	// 	// TODO: userId记得改回来'
	// 	// user.userId = 11
	// 	if (user.userId! < 0) {
	// 		history.push('/login', {direction: 'none'})
	// 		return;
	// 	}

	// 	setStressChartLoading(true)
	// 	const asyncFetchData = async (theDate: string) => {
			
	// 		//获取一整天的每日摘要数据
	// 		const fetchDailyData: any = await getHealthDataByDate(user?.userId!, DOMAIN.DAILY, theDate); 
	// 		const dailyData = fetchDailyData?.data?.data || null;
	// 		setDailyData(dailyData);


	// 		// 获取每日摘要
	// 		const fetchActivities: any = await getActivities(user?.userId!, theDate); 
	// 		const activities = fetchActivities.data?.activities || [];
	// 		setActivities(activities);

	// 		//获取一整天的压力数据
	// 		const fetchStressData: any = await getHealthDataByDate(user?.userId!, DOMAIN.STRESS, theDate);	
	// 		const stressData = fetchStressData.data?.data || null;
	// 		if (!stressData) {
	// 			return false; 
	// 		}
	// 		setStressDetail(stressData);

	// 		//获取一整天的睡眠数据
	// 		const fetchSleepData: any = await getHealthDataByDate(user.userId!, DOMAIN.SLEEP, theDate);
	// 		const sleepData = fetchSleepData.data?.data || {};
	// 		const nextSleepStartTime = fetchSleepData.data?.nextSleepStartTime;
	// 		setNextSleepStartTime(nextSleepStartTime);
	// 		setSleepData(sleepData);
		
	// 		return true;
	// 	}
		
	// 	const hasData = await asyncFetchData(date);
	// 	setStressChartLoading(false);	
	// 	setIsHasStressData(hasData);
	// }

  const dailyData = {
    activeKilocalories: 263,
    activeTimeInSeconds: 7157,
    activityStressDurationInSeconds: 9060,
    activityType: "WALKING",
    averageHeartRateInBeatsPerMinute: 80,
    averageStressLevel: 32,
    bmrKilocalories: 1301,
    calendarDate: "2021-05-14",
    distanceInMeters: 4815,
    durationInSeconds: 86400,
    floorsClimbed: 1,
    floorsClimbedGoal: 10,
    highStressDurationInSeconds: 2880,
    intensityDurationGoalInSeconds: 9000,
    lowStressDurationInSeconds: 9600,
    maxHeartRateInBeatsPerMinute: 129,
    maxStressLevel: 97,
    mediumStressDurationInSeconds: 13740,
    minHeartRateInBeatsPerMinute: 55,
    moderateIntensityDurationInSeconds: 0,
    restStressDurationInSeconds: 37920,
    restingHeartRateInBeatsPerMinute: 62,
    startTimeInSeconds: 1620921600,
    startTimeOffsetInSeconds: 28800,
    steps: 6981,
    stepsGoal: 6350,
    stressDurationInSeconds: 26220,
    stressQualifier: "balanced",
    summaryId: "x2feb47a-609d4d00-15180-6"
  }
	
  const stressDetail = {
    calendarDate: "2021-05-14",
    durationInSeconds: 86400,
    startTimeInSeconds: 1620921600,
    startTimeOffsetInSeconds: 28800,
    summaryId: "x2feb47a-609d4d00-15180",
		"timeOffsetStressLevelValues" : {
			"0" : -1,
			"180" : -1,
			"360" : 24,
			"540" : 17,
			"720" : 9,
			"900" : 25,
			"1080" : 21,
			"1260" : 22,
			"1440" : 22,
			"1620" : -1,
			"1800" : -2,
			"1980" : -1,
			"2160" : 17,
			"2340" : 22,
			"2520" : 24,
			"2700" : 22,
			"2880" : 18,
			"3060" : 13,
			"3240" : 17,
			"3420" : 19,
			"3600" : 20,
			"3780" : 24,
			"3960" : 19,
			"4140" : 18,
			"4320" : 22,
			"4500" : 25,
			"4680" : -1,
			"4860" : 20,
			"5040" : 14,
			"5220" : 21,
			"5400" : 19,
			"5580" : 19,
			"5760" : 21,
			"5940" : 22,
			"6120" : 23,
			"6300" : 19,
			"6480" : 20,
			"6660" : 20,
			"6840" : 24,
			"7020" : 25,
			"7200" : 24,
			"7380" : 24,
			"7560" : 25,
			"7740" : 25,
			"7920" : 25,
			"8100" : 24,
			"8280" : 24,
			"8460" : 24,
			"8640" : 24,
			"8820" : 24,
			"9000" : 25,
			"9180" : 25,
			"9360" : 29,
			"9540" : 14,
			"9720" : 17,
			"9900" : 26,
			"10080" : 24,
			"10260" : 13,
			"10440" : 25,
			"10620" : 25,
			"10800" : 24,
			"10980" : 25,
			"11160" : 24,
			"11340" : 24,
			"11520" : 24,
			"11700" : 25,
			"11880" : 24,
			"12060" : 24,
			"12240" : 24,
			"12420" : 24,
			"12600" : 24,
			"12780" : 24,
			"12960" : 24,
			"13140" : 24,
			"13320" : 24,
			"13500" : 24,
			"13680" : 23,
			"13860" : 24,
			"14040" : 25,
			"14220" : 20,
			"14400" : 18,
			"14580" : 22,
			"14760" : 22,
			"14940" : 20,
			"15120" : 24,
			"15300" : 19,
			"15480" : 18,
			"15660" : 20,
			"15840" : 24,
			"16020" : 18,
			"16200" : 17,
			"16380" : 22,
			"16560" : 23,
			"16740" : 21,
			"16920" : 23,
			"17100" : 23,
			"17280" : 20,
			"17460" : 13,
			"17640" : 10,
			"17820" : 14,
			"18000" : 13,
			"18180" : 20,
			"18360" : 24,
			"18540" : 15,
			"18720" : 33,
			"18900" : -1,
			"19080" : 23,
			"19260" : 8,
			"19440" : 20,
			"19620" : 24,
			"19800" : 21,
			"19980" : -1,
			"20160" : -1,
			"20340" : 20,
			"20520" : 14,
			"20700" : 4,
			"20880" : -1,
			"21060" : 13,
			"21240" : 16,
			"21420" : 23,
			"21600" : 13,
			"21780" : 15,
			"21960" : 15,
			"22140" : 15,
			"22320" : 18,
			"22500" : 12,
			"22680" : -1,
			"22860" : 17,
			"23040" : 17,
			"23220" : 16,
			"23400" : 21,
			"23580" : 22,
			"23760" : 22,
			"23940" : 15,
			"24120" : 21,
			"24300" : 18,
			"24480" : 17,
			"24660" : 19,
			"24840" : 17,
			"25020" : 20,
			"25200" : -1,
			"25380" : -1,
			"25560" : -1,
			"25740" : -1,
			"25920" : -1,
			"26100" : 21,
			"26280" : 17,
			"26460" : 22,
			"26640" : 23,
			"26820" : 24,
			"27000" : 24,
			"27180" : 23,
			"27360" : 22,
			"27540" : 22,
			"27720" : 12,
			"27900" : 18,
			"28080" : 19,
			"28260" : 18,
			"28440" : 23,
			"28620" : 22,
			"28800" : 20,
			"28980" : 19,
			"29160" : 20,
			"29340" : 23,
			"29520" : 21,
			"29700" : 12,
			"29880" : 22,
			"30060" : 21,
			"30240" : 22,
			"30420" : 20,
			"30600" : 21,
			"30780" : 20,
			"30960" : 17,
			"31140" : 16,
			"31320" : 14,
			"31500" : 17,
			"31680" : 16,
			"31860" : 20,
			"32040" : 19,
			"32220" : 23,
			"32400" : 25,
			"32580" : 24,
			"32760" : 23,
			"32940" : 17,
			"33120" : -1,
			"33300" : -2,
			"33480" : 39,
			"33660" : 21,
			"33840" : 14,
			"34020" : 18,
			"34200" : 17,
			"34380" : 84,
			"34560" : -1,
			"34740" : 47,
			"34920" : 52,
			"35100" : 26,
			"35280" : -1,
			"35460" : -1,
			"35640" : 6,
			"35820" : 6,
			"36000" : 21,
			"36180" : 19,
			"36360" : 24,
			"36540" : 25,
			"36720" : 16,
			"36900" : 18,
			"37080" : 8,
			"37260" : 9,
			"37440" : 15,
			"37620" : 18,
			"37800" : 15,
			"37980" : 17,
			"38160" : 23,
			"38340" : 24,
			"38520" : 22,
			"38700" : 15,
			"38880" : 49,
			"39060" : 26,
			"39240" : 5,
			"39420" : 5,
			"39600" : 16,
			"39780" : 15,
			"39960" : 12,
			"40140" : -2,
			"40320" : -2,
			"40500" : -1,
			"40680" : 37,
			"40860" : -2,
			"41040" : -2,
			"41220" : 67,
			"41400" : 53,
			"41580" : 61,
			"41760" : 46,
			"41940" : 33,
			"42120" : -1,
			"42300" : 25,
			"42480" : 7,
			"42660" : 9,
			"42840" : 8,
			"43020" : 8,
			"43200" : 0,
			"43380" : 2,
			"43560" : 3,
			"43740" : -1,
			"43920" : 7,
			"44100" : 45,
			"44280" : 19,
			"44460" : 37,
			"44640" : 48,
			"44820" : 34,
			"45000" : 33,
			"45180" : 25,
			"45360" : 25,
			"45540" : 13,
			"45720" : 17,
			"45900" : 3,
			"46080" : 1,
			"46260" : 1,
			"46440" : 15,
			"46620" : 25,
			"46800" : 43,
			"46980" : 71,
			"47160" : 48,
			"47340" : 42,
			"47520" : 25,
			"47700" : 23,
			"47880" : 49,
			"48060" : 33,
			"48240" : 23,
			"48420" : 68,
			"48600" : 31,
			"48780" : -1,
			"48960" : 41,
			"49140" : 30,
			"49320" : -1,
			"49500" : 24,
			"49680" : -1,
			"49860" : -2,
			"50040" : -1,
			"50220" : 22,
			"50400" : 28,
			"50580" : 37,
			"50760" : 39,
			"50940" : 32,
			"51120" : 27,
			"51300" : 24,
			"51480" : 22,
			"51660" : 43,
			"51840" : 37,
			"52020" : 37,
			"52200" : 17,
			"52380" : 21,
			"52560" : 31,
			"52740" : -1,
			"52920" : 31,
			"53100" : 24,
			"53280" : 23,
			"53460" : 24,
			"53640" : 34,
			"53820" : 46,
			"54000" : 44,
			"54180" : 36,
			"54360" : 13,
			"54540" : 4,
			"54720" : 25,
			"54900" : 43,
			"55080" : 25,
			"55260" : 22,
			"55440" : 23,
			"55620" : 17,
			"55800" : 18,
			"55980" : 25,
			"56160" : 22,
			"56340" : 53,
			"56520" : 19,
			"56700" : 24,
			"56880" : 24,
			"57060" : 31,
			"57240" : 25,
			"57420" : 18,
			"57600" : 13,
			"57780" : 18,
			"57960" : 17,
			"58140" : 23,
			"58320" : 21,
			"58500" : 13,
			"58680" : 10,
			"58860" : 23,
			"59040" : 23,
			"59220" : 13,
			"59400" : 5,
			"59580" : 5,
			"59760" : -1,
			"59940" : 22,
			"60120" : 20,
			"60300" : 16,
			"60480" : 22,
			"60660" : 14,
			"60840" : 51,
			"61020" : 18,
			"61200" : 16,
			"61380" : 9,
			"61560" : 5,
			"61740" : 15,
			"61920" : 15,
			"62100" : 17,
			"62280" : 16,
			"62460" : 17,
			"62640" : 16,
			"62820" : 11,
			"63000" : -2,
			"63180" : -2,
			"63360" : -1,
			"63540" : -1,
			"63720" : 38,
			"63900" : 40,
			"64080" : 52,
			"64260" : 70,
			"64440" : 64,
			"64620" : 58,
			"64800" : 46,
			"64980" : 38,
			"65160" : 34,
			"65340" : 51,
			"65520" : 20,
			"65700" : 23,
			"65880" : 23,
			"66060" : 24,
			"66240" : 25,
			"66420" : 16,
			"66600" : -1,
			"66780" : 12,
			"66960" : 34,
			"67140" : 14,
			"67320" : 38,
			"67500" : 23,
			"67680" : 16,
			"67860" : 12,
			"68040" : 15,
			"68220" : 19,
			"68400" : 19,
			"68580" : 19,
			"68760" : 16,
			"68940" : 19,
			"69120" : 13,
			"69300" : 15,
			"69480" : 31,
			"69660" : 25,
			"69840" : 25,
			"70020" : 28,
			"70200" : 25,
			"70380" : 37,
			"70560" : 31,
			"70740" : 23,
			"70920" : -1,
			"71100" : -1,
			"71280" : 32,
			"71460" : 84,
			"71640" : 34,
			"71820" : 25,
			"72000" : 16,
			"72180" : 5,
			"72360" : 4,
			"72540" : 5,
			"72720" : 5,
			"72900" : 32,
			"73080" : 26,
			"73260" : -1,
			"73440" : 24,
			"73620" : 18,
			"73800" : 18,
			"73980" : 12,
			"74160" : 20,
			"74340" : 19,
			"74520" : 12,
			"74700" : 21,
			"74880" : 20,
			"75060" : 14,
			"75240" : -1,
			"75420" : -2,
			"75600" : 5,
			"75780" : 8,
			"75960" : 14,
			"76140" : 47,
			"76320" : 21,
			"76500" : 15,
			"76680" : 19,
			"76860" : 8,
			"77040" : 12,
			"77220" : 16,
			"77400" : 9,
			"77580" : 5,
			"77760" : 3,
			"77940" : 2,
			"78120" : 2,
			"78300" : 4,
			"78480" : 3,
			"78660" : 12,
			"78840" : 17,
			"79020" : 9,
			"79200" : 9,
			"79380" : 9,
			"79560" : 15,
			"79740" : 25,
			"79920" : 17,
			"80100" : 10,
			"80280" : 10,
			"80460" : 6,
			"80640" : 5,
			"80820" : 10,
			"81000" : 15,
			"81180" : 8,
			"81360" : 8,
			"81540" : 5,
			"81720" : 7,
			"81900" : 14,
			"82080" : 10,
			"82260" : 3,
			"82440" : 3,
			"82620" : 3,
			"82800" : 3,
			"82980" : 9,
			"83160" : 6,
			"83340" : -1,
			"83520" : 54,
			"83700" : 5,
			"83880" : 10,
			"84060" : 11,
			"84240" : 18,
			"84420" : 16,
			"84600" : 11,
			"84780" : 20,
			"84960" : 23,
			"85140" : 14,
			"85320" : 14,
			"85500" : -1,
			"85680" : 61,
			"85860" : 22,
			"86040" : -1,
			"86220" : 8
		}
	}

  const sleepData = {
    awakeDurationInSeconds: 60,
    calendarDate: "2021-05-14",
    deepSleepDurationInSeconds: 1740,
    durationInSeconds: 26280,
    lightSleepDurationInSeconds: 17100,
    remSleepInSeconds: 7440,
    sleepLevelsMap: {},
    startTimeInSeconds: 1620917400,
    startTimeOffsetInSeconds: 28800,
    summaryId: "x2feb47a-609d3c98-66a8",
    timeOffsetSleepSpo2: {},
    unmeasurableSleepInSeconds: 0,
    validation: "ENHANCED_TENTATIVE"
  }

  const moveIQs = [
    {
      activityType: "walking",
      calendarDate: "2021-05-14",
      durationInSeconds: 660,
      offsetInSeconds: 28800,
      startTimeInSeconds: 1620978240,
      summaryId: "x2feb47a-609e2a40walking294"
    },
    {
      activityType: "walking",
      calendarDate: "2021-05-14",
      durationInSeconds: 1380,
      offsetInSeconds: 28800,
      startTimeInSeconds: 1620952260,
      summaryId: "x2feb47a-609dc4c4walking564"
    }
  ]


  //入睡时间
	let sleepStartTime = useMemo(() => {
		if (!sleepData || !stressDetail) return null;
		const calendarDate = stressDetail?.calendarDate;
		const todayTimeStamp = strToTimestamp(calendarDate + ' 00:00:00');
    // @ts-ignore
		const sleepStartTime = sleepData.startTimeInSeconds < todayTimeStamp ? todayTimeStamp : sleepData.startTimeInSeconds;
		return sleepStartTime
	}, [sleepData, stressDetail])
	

	//入睡时间在压力图中对应的下标
	let sleepStartIndex = useMemo(() => {
		if (!sleepStartTime) return -1;
		const calendarDate = stressDetail?.calendarDate;
		const todayTimeStamp = strToTimestamp(calendarDate + ' 00:00:00');
		const stressKeys = Object.keys(stressDetail!.timeOffsetStressLevelValues);
		const sleepStartIndex = Math.floor((sleepStartTime - todayTimeStamp - parseInt(stressKeys[0])) / 180);
		return sleepStartIndex
	}, [sleepStartTime])


	//睡醒时间
	let sleepEndTime = useMemo(() => {
		if (!sleepData || !stressDetail) return null;
    // @ts-ignore
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
  

  const initStressPie = () => {
		if(JSON.stringify(dailyData) === '{}' || !dailyData) return
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

		const allDuration = dailyData.restStressDurationInSeconds + dailyData.lowStressDurationInSeconds + dailyData.mediumStressDurationInSeconds + dailyData.highStressDurationInSeconds;
		const proportionMap = new Map();
		stressData.forEach(item=>{
			proportionMap.set(item.name, Math.floor(item.value / allDuration * 100) + '%');
		})

		const stressPieId = "stressPie";
		let stressPieDiv = document.getElementById(stressPieId);
		let stressPie;
		if (stressPieDiv) {
			stressPie = echarts.init(stressPieDiv);
		} else {
			const stressPieList = document.getElementsByClassName('stressPie');
			if (stressPieList.length > 0) {
				 const lastStressPie = stressPieList[stressPieList.length-1] as HTMLElement;
				 stressPie = echarts.init(lastStressPie);
			} else {
				return;
			}		
		}

		stressPie.setOption({
			tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%'
			},
			color:["#42c5f5", "#f0c060", "#f59e42", "#f56642"],
			// @ts-ignore
			legend: {
				orient: 'vertical',
				right: 6,
				bottom: 0,
				data: ['放松', '低', '中', '高'],
				formatter: (name) => {
					let lists = [];
					lists.push(name + ': ' + secondToHourMinute(target.get(name)) + '  ' + proportionMap.get(name));
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
					radius: ['60%', '78%'],	 // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
					center: ['22%', '60%'],	 // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
					label: {
						show: true,
						position: 'center',
						formatter: '均值'+ avgStress,
						fontSize: 12
					},
					data: stressData
				}
			]
		})
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
		const chartId = "stressDetailChart";
		let stressBarDiv = document.getElementById(chartId);
		let stressDetailChart;
		if (stressBarDiv) {
			stressDetailChart = echarts.init(stressBarDiv);
		} else {
			const stressBarList = document.getElementsByClassName('stressDetailChart');
			if (stressBarList.length > 0) {
				 const lastStressBar = stressBarList[stressBarList.length-1] as HTMLElement;
				 stressDetailChart = echarts.init(lastStressBar);
			} else {
				return;
			}		
		}

		stressDetailChart.setOption({
			tooltip: {
				enterable: true,
				 // item 图形触发， axis 坐标轴触发， none 不触发
				trigger: 'axis',
				axisPointer: {
					type: 'line',
				},
				textStyle: {
					fontSize: 12,
					lineHeight: 48,
				},
				hideDelay: 100,
				// triggerOn: 'click',
				confine: true, 
				appendToBody: true,
				// alwaysShowContent: true, 	//鼠标离开区域不消失
				formatter: (params: any) => {
					let item;
					if (params instanceof Array) {
						item = params[0]
					} else {
						item = params
					}
					const value = item.value;	//压力值
					const index = item.dataIndex;
					// console.log('index index', index)
          if (value === -10) {
						return item.name + '<br/><br/>' 
							+ item.marker + "活动中"
					} else if (value === -1) {
						return item.name + '<br/><br/>' 
							+ "无法测量"
					}	else {
						return item.name + '<br/><br/>' 
							+ item.marker
							+ item.seriesName + ' : ' + value + '<br/>'
					}
				},
			},
			grid: {
				left: 30
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
              // @ts-ignore
							return '{fallASleepValue|} '+ timestampToStr(sleepStartTime, FORMATE_TIME.HOUR_MINUTE);
						} else if(index === sleepEndIndex) {
							// @ts-ignore
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
				offset: -33,
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
			dataZoom: [
				{   // 这个dataZoom组件，也控制x轴。
						type: 'slider', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
						start: 0,      // 左边在 10% 的位置。
						end: 100,         // 右边在 60% 的位置。
						height: 15,
						xAxisIndex: [0]
				},
				{   // 这个dataZoom组件，也控制x轴。
					type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
					start: 0,      // 左边在 10% 的位置。
					end: 100,         // 右边在 60% 的位置。
					xAxisIndex: [0]
			}
			],
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
				bottom: "0%",                              //组件离容器下侧的距离,'20%'
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

		stressDetailChart.on('click', function (params) { 
			console.log('click', params)
			setShowModal(true)
			// @ts-ignore
			const time = stressDate + " " +  params.name
			setStateTime(time)
	 	})

	}

  initStressPie();
  initStressBar();

  
	const showStressPre = () => {
		const prevDate = getPrevDate(stressDate);
		setStressDate(prevDate)
		// showStressChartByDate(prevDate, true);
	}

	
	const showStressNext = () => {
		const nextDate = getNextDate(stressDate);
		setStressDate(nextDate)
		// showStressChartByDate(nextDate, true);
	}

  const [showPopover, setShowPopover] = useState<{open: boolean, event: Event | undefined}>({
    open: false,
    event: undefined,
  });
  
	return (
		<IonPage id="SingleDay-page">
      <IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton></IonMenuButton>
					</IonButtons>
					<IonTitle>单日数据
					</IonTitle>
          <IonBackButton style={{ float: "right", marginRight: "10px"}} text="" defaultHref="/chat" />
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard>
					<IonCardHeader>
            <div className="date">
              <NavLink className="nav" to="#" onClick={() => showStressPre()}><img src="/assets/icon/arrow-left-filling.png"/> </NavLink>
              {/* <div className="curDate">{dailyData?.calendarDate || ''}</div> */}
              <div className="curDate">{stressDate || ''}</div>
              <NavLink className="nav" to="#" onClick={() => showStressNext()}><img src="/assets/icon/arrow-right-filling.png"/> </NavLink>
            </div>
					</IonCardHeader>
					<IonCardContent>
              {/* <Spin spinning={stressChartLoading}> */}
                <div className="stressDetailContent">
                    {isHasStressData && <>
                      {/* <div className="stressPie" id={"stressPie" + message.id}></div> */}
                      <div className="stressPie" id={"stressPie"}></div>
                      <div className="tips">
                          <div className="">1.压力水平处于0至25表示休息状态，26至50表示低压力水平，51至75表示中等压力水平，76至100表示高压力水平。</div>
                          <div className="">2. 柱状图支持双指或缩放条缩放。手指触碰柱状图时有些时间段会显示压力知识，比如睡醒后、运动后、一天的最后等。</div>
                      </div>
                      <div className="label">
                        <IonPopover
                          css-class="labelPopover"
                          isOpen={showPopover.open}
                          event={showPopover.event}
                          onDidDismiss={e => setShowPopover({open: false, event: undefined})}
                        >
                          <p className="popoverContent">进入标注模式后，可点击图中某个时间点进行选择，将您对应的状态或活动记录在图表上。</p>
                        </IonPopover>
                        <img className="helpIcon" src="/assets/icon/help.png" onClick={(e) => setShowPopover({open: true, event: e.nativeEvent})}></img>
                        <div className="labelTitle">状态标注</div>
                        <img className="labelIcon" src="/assets/icon/write2.png"></img>
                      </div>
                      {/* <div className="stressDetailChart" id={"stressDetailChart" + message.id}></div>	 */}
                      <div className="stressDetailChart" id={"stressDetailChart"}></div>	
                    </>}
                    {!isHasStressData &&
                      <div>
                        {/* <div style={{textAlign: "center", fontWeight: "bold"}}>{stressDate}</div> */}
                        <div>暂无数据，请到Garmin connect App中同步</div>
                      </div>
                    }
                  </div>
              {/* </Spin> */}
							<IonModal isOpen={showModal} cssClass='my-modal' animated={false}>
								<IonHeader>
									<div className="header">
										<p className="modalTitle">状态标注</p>
										<IonButton className="modalButton" color="primary" onClick={() => setShowModal(false)} fill="outline">
											<img className="stateConfirm" src="/assets/icon/yes.png" onClick={() => setShowModal(false)}></img>
										</IonButton>
										<IonButton className="modalButton" color="primary" onClick={() => setShowModal(false)} fill="outline">
											<img className="modalClose" src="/assets/icon/close.png"></img>
										</IonButton>
									</div>
									<div className="stateTime"> {stateTime} </div>
								</IonHeader>
								<IonContent class="modalContent">
									<Radio.Group className="stateRadio">
											<Radio className="radio" value={1}><img src="/assets/icon/eat.png"/></Radio>
											<Radio className="radio" value={2}><img src="/assets/icon/walk.png"/></Radio>
											<Radio className="radio" value={3}><img src="/assets/icon/run.png"/></Radio>
											<Radio className="radio" value={4}><img src="/assets/icon/cycling.png"/></Radio>
											<Radio className="radio" value={5}><img src="/assets/icon/cycling.png"/></Radio>
											<Radio className="radio" value={6}><img src="/assets/icon/cycling.png"/></Radio>
									</Radio.Group>
								</IonContent>
							</IonModal>
					</IonCardContent> 
				</IonCard>
			</IonContent>
		</IonPage>
	);
}

export default connect<{}, StateProps, {}>({
	// @ts-ignore
  mapStateToProps: (state) => ({
    userId: state.user.userId,
  }),
  component: SingleDay
})