/*
 * @Author: your name
 * @Date: 2021-05-17 19:03:39
 * @LastEditTime: 2021-05-17 19:14:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \StressChatbot\src\pages\SingleDay.tsx
 */

import React, { useEffect, useState } from 'react';
import { IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonBackButton } from '@ionic/react';
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
import './css/MyHealthData.scss'
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';


interface StressSummaryData {
	calendarDate: string,
	averageStressLevel: number,
	restStressDurationInSeconds: number,
	lowStressDurationInSeconds: number,
	mediumStressDurationInSeconds: number,
	highStressDurationInSeconds: number	
}

interface StateProps {
	userId: number;
	dailyData: object;
	stressData: object;
	sleepData: object;
}

interface SingleDayProps extends StateProps, RouteComponentProps {}


const SingleDay: React.FC<SingleDayProps> = ({ userId, history }) => {
	
	return (
		<IonPage id="SingleDay-page">
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton></IonMenuButton>
					</IonButtons>
					<IonTitle>单日数据
						<IonBackButton style={{ float: "right", marginRight: "10px"}} text="" defaultHref="/chat" />
					</IonTitle>
		
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>
						</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
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