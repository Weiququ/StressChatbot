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
	IonAvatar,
	IonButtons,
	IonMenuButton,
	IonModal,
	IonList,
	IonLabel,
	IonDatetime
} from '@ionic/react';
import React, { useState, useRef, useEffect} from 'react';
import './css/Chat.css';
import { send } from 'ionicons/icons/index';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { formatDate, secondToTime } from '../utils/handleDate'
import { getSleepAnswer } from '../service/chatService'
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
import { color } from '@amcharts/amcharts4/core';

interface MyProps {
	messages: Message[];
	user: User;
	messgeNum: number;
}

const Chat: React.FC<MyProps> = ({ user }) => {

	// const stressDetail = {
	// 	"summaryId" : "x2fe5bde-5fe4bb00-c2c4",
	// 	"startTimeInSeconds" : 1608825600,
	// 	"startTimeOffsetInSeconds" : 28800,
	// 	"durationInSeconds" : 49860,
	// 	"calendarDate" : "2020-12-25",
	// 	"timeOffsetStressLevelValues" : {
	// 		"0" : -1,
	// 		"180" : -1,
	// 		"360" : -1,
	// 		"540" : -1,
	// 		"720" : -1,
	// 		"900" : -1,
	// 		"1080" : -1,
	// 		"1260" : -1,
	// 		"1440" : -1,
	// 		"1620" : -1,
	// 		"1800" : -1,
	// 		"1980" : -1,
	// 		"2160" : -1,
	// 		"2340" : -1,
	// 		"2520" : -1,
	// 		"2700" : -1,
	// 		"2880" : -1,
	// 		"3060" : -1,
	// 		"3240" : -1,
	// 		"3420" : -1,
	// 		"3600" : -1,
	// 		"3780" : -1,
	// 		"3960" : -1,
	// 		"4140" : -1,
	// 		"4320" : -1,
	// 		"4500" : -1,
	// 		"4680" : -1,
	// 		"4860" : -1,
	// 		"5040" : -1,
	// 		"5220" : -1,
	// 		"5400" : -1,
	// 		"5580" : -1,
	// 		"5760" : -1,
	// 		"5940" : -1,
	// 		"6120" : -1,
	// 		"6300" : -1,
	// 		"6480" : -1,
	// 		"6660" : -1,
	// 		"6840" : -1,
	// 		"7020" : -1,
	// 		"7200" : -1,
	// 		"7380" : -1,
	// 		"7560" : -1,
	// 		"7740" : -1,
	// 		"7920" : -1,
	// 		"8100" : -1,
	// 		"8280" : -1,
	// 		"8460" : -1,
	// 		"8640" : -1,
	// 		"8820" : -1,
	// 		"9000" : -1,
	// 		"9180" : -1,
	// 		"9360" : -1,
	// 		"9540" : -1,
	// 		"9720" : -1,
	// 		"9900" : -1,
	// 		"10080" : -1,
	// 		"10260" : -1,
	// 		"10440" : -1,
	// 		"10620" : -1,
	// 		"10800" : -1,
	// 		"10980" : -1,
	// 		"11160" : -1,
	// 		"11340" : -1,
	// 		"11520" : -1,
	// 		"11700" : -1,
	// 		"11880" : -1,
	// 		"12060" : -1,
	// 		"12240" : -1,
	// 		"12420" : -1,
	// 		"12600" : -1,
	// 		"12780" : -1,
	// 		"12960" : -1,
	// 		"13140" : -1,
	// 		"13320" : -1,
	// 		"13500" : -1,
	// 		"13680" : -1,
	// 		"13860" : -1,
	// 		"14040" : -1,
	// 		"14220" : -1,
	// 		"14400" : -1,
	// 		"14580" : -1,
	// 		"14760" : -1,
	// 		"14940" : -1,
	// 		"15120" : -1,
	// 		"15300" : -1,
	// 		"15480" : -1,
	// 		"15660" : -1,
	// 		"15840" : -1,
	// 		"16020" : -1,
	// 		"16200" : -1,
	// 		"16380" : -1,
	// 		"16560" : -1,
	// 		"16740" : -1,
	// 		"16920" : -1,
	// 		"17100" : -1,
	// 		"17280" : -1,
	// 		"17460" : -1,
	// 		"17640" : -1,
	// 		"17820" : -1,
	// 		"18000" : -1,
	// 		"18180" : -1,
	// 		"18360" : -1,
	// 		"18540" : -1,
	// 		"18720" : -1,
	// 		"18900" : -1,
	// 		"19080" : -1,
	// 		"19260" : -1,
	// 		"19440" : -1,
	// 		"19620" : -1,
	// 		"19800" : -1,
	// 		"19980" : -1,
	// 		"20160" : -1,
	// 		"20340" : -1,
	// 		"20520" : -1,
	// 		"20700" : -1,
	// 		"20880" : -1,
	// 		"21060" : -1,
	// 		"21240" : -1,
	// 		"21420" : -1,
	// 		"21600" : -1,
	// 		"21780" : -1,
	// 		"21960" : -1,
	// 		"22140" : -1,
	// 		"22320" : -1,
	// 		"22500" : -1,
	// 		"22680" : -1,
	// 		"22860" : -1,
	// 		"23040" : -1,
	// 		"23220" : -1,
	// 		"23400" : -1,
	// 		"23580" : -1,
	// 		"23760" : -1,
	// 		"23940" : -1,
	// 		"24120" : -1,
	// 		"24300" : -1,
	// 		"24480" : -1,
	// 		"24660" : -1,
	// 		"24840" : -1,
	// 		"25020" : -1,
	// 		"25200" : -1,
	// 		"25380" : -1,
	// 		"25560" : -1,
	// 		"25740" : -1,
	// 		"25920" : -1,
	// 		"26100" : -1,
	// 		"26280" : -1,
	// 		"26460" : -1,
	// 		"26640" : -1,
	// 		"26820" : -1,
	// 		"27000" : -1,
	// 		"27180" : -1,
	// 		"27360" : -1,
	// 		"27540" : -1,
	// 		"27720" : -1,
	// 		"27900" : -1,
	// 		"28080" : -1,
	// 		"28260" : -1,
	// 		"28440" : -1,
	// 		"28620" : -1,
	// 		"28800" : -1,
	// 		"28980" : -1,
	// 		"29160" : -1,
	// 		"29340" : -1,
	// 		"29520" : -1,
	// 		"29700" : -1,
	// 		"29880" : -1,
	// 		"30060" : -1,
	// 		"30240" : -1,
	// 		"30420" : -1,
	// 		"30600" : -1,
	// 		"30780" : -1,
	// 		"30960" : -1,
	// 		"31140" : 20,
	// 		"31320" : 12,
	// 		"31500" : 15,
	// 		"31680" : 22,
	// 		"31860" : 15,
	// 		"32040" : 15,
	// 		"32220" : 13,
	// 		"32400" : 11,
	// 		"32580" : 10,
	// 		"32760" : 10,
	// 		"32940" : 17,
	// 		"33120" : 15,
	// 		"33300" : 16,
	// 		"33480" : 12,
	// 		"33660" : 14,
	// 		"33840" : 19,
	// 		"34020" : 12,
	// 		"34200" : 19,
	// 		"34380" : 11,
	// 		"34560" : 9,
	// 		"34740" : 8,
	// 		"34920" : 6,
	// 		"35100" : 14,
	// 		"35280" : 9,
	// 		"35460" : 14,
	// 		"35640" : 15,
	// 		"35820" : 14,
	// 		"36000" : 11,
	// 		"36180" : 13,
	// 		"36360" : 11,
	// 		"36540" : 15,
	// 		"36720" : -2,
	// 		"36900" : -1,
	// 		"37080" : -1,
	// 		"37260" : 2,
	// 		"37440" : 5,
	// 		"37620" : 8,
	// 		"37800" : 12,
	// 		"37980" : 7,
	// 		"38160" : 14,
	// 		"38340" : 17,
	// 		"38520" : 12,
	// 		"38700" : 16,
	// 		"38880" : 12,
	// 		"39060" : 8,
	// 		"39240" : 17,
	// 		"39420" : 24,
	// 		"39600" : 9,
	// 		"39780" : 7,
	// 		"39960" : 5,
	// 		"40140" : 16,
	// 		"40320" : 15,
	// 		"40500" : 5,
	// 		"40680" : 8,
	// 		"40860" : 10,
	// 		"41040" : 5,
	// 		"41220" : 7,
	// 		"41400" : 5,
	// 		"41580" : 16,
	// 		"41760" : 15,
	// 		"41940" : 9,
	// 		"42120" : 12,
	// 		"42300" : 14,
	// 		"42480" : 4,
	// 		"42660" : 3,
	// 		"42840" : 8,
	// 		"43020" : 3,
	// 		"43200" : -1,
	// 		"43380" : -2,
	// 		"43560" : -1,
	// 		"43740" : -2,
	// 		"43920" : -1,
	// 		"44100" : 34,
	// 		"44280" : 45,
	// 		"44460" : 42,
	// 		"44640" : -1,
	// 		"44820" : 23,
	// 		"45000" : 15,
	// 		"45180" : -1,
	// 		"45360" : 19,
	// 		"45540" : 24,
	// 		"45720" : -1,
	// 		"45900" : 21,
	// 		"46080" : 16,
	// 		"46260" : 23,
	// 		"46440" : 24,
	// 		"46620" : 15,
	// 		"46800" : 21,
	// 		"46980" : 15,
	// 		"47160" : 17,
	// 		"47340" : 15,
	// 		"47520" : 10,
	// 		"47700" : 11,
	// 		"47880" : 15,
	// 		"48060" : 12,
	// 		"48240" : 6,
	// 		"48420" : 2,
	// 		"48600" : 7,
	// 		"48780" : 8,
	// 		"48960" : 2,
	// 		"49140" : -1,
	// 		"49320" : -1,
	// 		"49500" : -1,
	// 		"49680" : -1
	// 	}
	// }

	const stressDetail = {
		"summaryId" : "x2fe5bde-5fe21800-15180",
		"startTimeInSeconds" : 1608652800,
		"startTimeOffsetInSeconds" : 28800,
		"durationInSeconds" : 86400,
		"calendarDate" : "2020-12-23",
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
	const messagesRef = useRef(null);

	const welcomeMessage = 	{
		id: 2,
		date: formatDate(new Date()),
		userId: chatbot.id,
		username: chatbot.username,
		avatar: chatbot.avatar,
		text: ["您好，关于压力和睡眠的问题都可以问我哦~", "记录日常活动"]	
	}

	const [userMessageText, setUserMessageText] = useState<string>();
	const [messages, setMessages] = useState<Array<any>>([welcomeMessage]);
	const [messgeNum, setMessageNum] = useState<number>(0);
	const [showRecordModal, setShowRecordModal] = useState(false);
	const [showActivitiesModal, setShowActivitiesModal] = useState(false);
	
	const [textArray, setTextArray] = useState<Array<any>>([]);

	const sendMessage  = async (e: React.FormEvent) => {
		e.preventDefault();
		let userMessage = {
			id: messgeNum + 1,
			date: formatDate(new Date()),
			userId: user.id,
			username: user.username,
			avatar: user.avatar,
			text: userMessageText || ''
		}
		console.log('--->sendMessage', userMessage)
		// let newMessage = [...messages, userMessage];
		// setMessages(newMessage)
		setMessages(messages => [...messages, userMessage])
		setMessageNum(messgeNum => messgeNum + 1)
		let question = userMessageText
		setUserMessageText('')
		let responseMessage = {
			id: messgeNum + 1,
			date: formatDate(new Date()),
			userId: chatbot.id,
			username: chatbot.username,
			avatar: chatbot.avatar,
			text: '对不起，这个问题我还不会哦，你可以问我其他问题'
		}
		scrollToBottom()
		getSleepAnswer(question || '').then(data => {
			if (data && data.answer) {
				responseMessage.text = data.answer
			}
			setMessages(messages => [...messages, responseMessage])
			setMessageNum(messgeNum => messgeNum + 1)
			scrollToBottom()
		})
	}

	// /**滚到底部 */
  // const scrollToBottom = (int: number) => {
  //   setTimeout(() => {
  //     this.content.scrollToBottom(1);
  //   }, int);
	// }

	const scrollToBottom = () => {
		if (!messagesRef || !messagesRef.current) return;
		//window.scrollTo(0, this.messagesRef.current.offsetTop)
		// @ts-ignore
		messagesRef.current.scrollToBottom();
		//scrollIntoView({ behavior: "smooth" });
		console.log("ScrollToTheBottom");
	}
	
	const format = 'HH:mm';

	const handleMyStressDetail = () => {
		
	}

	// useEffect(() => {
	// 	// @ts-ignore
	// 	const stressDetailChart = echarts.init(document.getElementById('stressDetailChart'))
	// 	stressDetailChart.setOption({
	// 		title: {
	// 			text: '压力详情 ' + stressDetail.calendarDate,
	// 			left: 'center'
	// 		},
	// 		tooltip: {
	// 			trigger: 'axis',
	// 			axisPointer: {
	// 				type: 'shadow'
	// 			},
	// 			textStyle: {
	// 				fontSize: 8
	// 			},
	// 			formatter: (params: any) => {
	// 				console.log("---->params", params)
	// 				if (params[0].value === -10) {
	// 					return params[0].name + '<br/><br/>' 
	// 					+ params[0].marker + "活动中"
	// 				} else if (params[0].value === -1) {
	// 					return params[0].name + '<br/><br/>' 
	// 						+ "无法测量"
	// 				} else {
	// 					return params[0].name + '<br/><br/>' 
	// 						+ params[0].marker
	// 						+ params[0].seriesName + ' : ' + params[0].value+'<br/>'
	// 				}
	// 			},
	// 		},
	// 		xAxis: {
	// 			data: Object.keys(stressDetail.timeOffsetStressLevelValues).map(function (item) {
	// 				return secondToTime(item);
	// 			}),
	// 			// data: Object.keys(stressDetail.timeOffsetStressLevelValues)
	// 			axisLabel: {
	// 				show: true,
	// 				interval: 79,
	// 				formatter: (value: any, index: number) => {
	// 					// 格式化成月/日，只在第一个刻度显示年份
	// 					// var date = new Date(value);
	// 					// var texts = [(date.getMonth() + 1), date.getDate()];
	// 					// if (index === 0) {
	// 					// 		texts.unshift(date.getYear());
	// 					// }
	// 					return value.split('-')[0]
	// 				},
	// 			},
	// 			axisTick: {
	// 				show: true
	// 			},
	// 			offset: 0,
	// 			axisLine: {
	// 				onZero: false,
	// 				lineStyle: {
	// 					width: 1
	// 				}
	// 			}
	// 			// offset: 10
	// 		},
	// 		yAxis: {
	// 			name: '压力值',
	// 			min: -25,
	// 			max: 100,
	// 			interval: 25,
	// 			splitLine: { 
	// 				show: true, 
	// 				interval: (index: number, value: string) => {
	// 					if(index === 0) {
	// 						return false;
	// 					} else {
	// 						return true;
	// 					}
	// 				}
	// 			},//去除网格线
	// 			axisLabel: {
	// 				formatter: (value: any, index: number) => {
	// 					var Yshat = ['', 0, 25, 50, 75, 100]
	// 					value = Yshat[index];
	// 					return value;
	// 				},
	// 				// interval: (index: number, value: string) => {
	// 				// 	if(value === "-25") {
	// 				// 		return false;
	// 				// 	} else {
	// 				// 		return true;
	// 				// 	}
	// 				// }
	// 			}
	// 		},
	// 		toolbox: {
	// 			left: 'center',
	// 			feature: {
	// 				dataZoom: {
	// 					yAxisIndex: 'none'
	// 				},
	// 				restore: {},
	// 				saveAsImage: {}
	// 			}
	// 		},
	// 		visualMap: {
	// 			left: "center",                              //组件离容器左侧的距离,'left', 'center', 'right','20%'
	// 			top: "bottom",                                   //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
	// 			right: "auto",                               //组件离容器右侧的距离,'20%'
	// 			bottom: "auto",                              //组件离容器下侧的距离,'20%'
	// 			orient: "horizontal",                         //图例排列方向
	// 			textGap: 5, //文字到图标的距离
	// 			pieces: [
	// 			{
	// 				gt: 0,
	// 				lte: 25,
	// 				color: '#3399ff',
	// 				label: "0-25 放松",
	// 			}, {
	// 				gt: 25,
	// 				lte: 50,
	// 				color: '#f0c060',
	// 				label: "25-50 低",
	// 			}, {
	// 				gt: 50,
	// 				lte: 75,
	// 				color: '#f59e42',
	// 				label: "50-75 中",
	// 			}, {
	// 				gt: 75,
	// 				lte: 100,
	// 				color: '#f56642',
	// 				label: "75-100 高",
	// 			}, {
	// 				value: -10,
	// 				label: '活动中',
	// 				color: '#ADADAD',
	// 			}],
	// 		},
	// 		series: {
	// 			name: '压力值',
	// 			type: 'bar',
	// 			data: Object.values(stressDetail.timeOffsetStressLevelValues).map(function (item) {
	// 				if(item === -2) {
	// 					return -10
	// 				}	else {
	// 					return item;
	// 				}
	// 			}),
	// 			barWidth: 0.5
	// 			// markLine: {
	// 			// 	silent: true,
	// 			// 	data: [{
	// 			// 		yAxis: 25
	// 			// 	}, {
	// 			// 		yAxis: 50
	// 			// 	}, {
	// 			// 		yAxis: 75
	// 			// 	}, {
	// 			// 		yAxis: 100
	// 			// 	}]
	// 			// }
	// 		}
	// 	});
	// })

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
				{/* <div id="stressDetailChart" style={{width: "800px", height: "300px"}}></div> */}
				{messages && messages.map((message: Message, index: number) => ( 
					<div className="message-wrapper" key={index}>
						{ user.id !== message.userId &&
							<div>
								<img className="profile-pic left" src={chatbot.avatar} />
								<div className="chat-bubble left slide-left">
									<div className="message" style={{whiteSpace: "pre-line"}}>{message.text}
									{/* {message.text instanceof Array === true && message.text.map((text: string, index: number) => (
										<div>{text}</div>
									))} */}
									<br />
									<a href="/recordActivity">记录日常活动</a>
									<br />
									<a href="/stressDetail">查看我最近的压力详情</a>
									</div>
									<div className="message"> </div>
									<div className="message-detail left">
										<span>{message.date}</span>
									</div>
								</div>
							</div>
						}
						{ user.id === message.userId && 
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
									<IonInput name="username" type="text" onClick={() => setShowActivitiesModal(true)}>
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
  
export default Chat;

const chatbot = {
	id: 1,
	avatar: '/assets/icon/Chatbot-evolution-1 (3).png',
	username: 'Chatbot',
};

const user = {
	id: 2,
	avatar: '/assets/icon/user.jpeg',
	username: 'Mary',
	password: '',
	gender: 'secret',
	birthday: '',
	createTime: null,
	updateTime: null
};


Chat.defaultProps = {
	messages: [
	{
      id: 2,
      date: formatDate(new Date()),
      userId: chatbot.id,
      username: chatbot.username,
      avatar: chatbot.avatar,
      text: '你好，关于睡眠和压力的问题都可以问我哦'
    },
    {
      id: 2,
      date: formatDate(new Date()),
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      text: '我最近经常失眠，该怎么办呢'
    },
    {
      id: 3,
      date: formatDate(new Date()),
      userId: chatbot.id,
      username: chatbot.username,
      avatar: chatbot.avatar,
      text: '失眠可能是很多原因引起的，你最近心情怎么样呢，饮食怎么样呢，运动怎么样呢，压力大吗？学习或者工作上有什么烦恼吗？'
    },
    {
      id: 4,
      date: formatDate(new Date()),
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      text: '最近心情不太好，马上要考试了，压力比较大'
    },
    {
      id: 5,
      date: formatDate(new Date()),
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      text: 'what??'
    },
    {
      id: 6,
      date: formatDate(new Date()),
      userId: chatbot.id,
      username: chatbot.username,
      avatar: chatbot.avatar,
      text: 'yes!'
    }],
	user: user,
	messgeNum: 1,
}