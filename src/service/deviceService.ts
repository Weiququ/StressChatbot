/*
 * @Author: your name
 * @Date: 2020-11-26 20:35:55
 * @LastEditTime: 2020-12-15 08:39:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\service\deviceService.ts
 */
// import request from '../utils/request'
import * as Fetch from '../utils/request';
import { GarminApiUrl } from '../utils/constants'

export const bindDevice = async (userId: number, userName: string) => {
	console.log('---->deviceService bindDevice')
	const responseData = await Fetch.get( GarminApiUrl + '/auth/requestToken/' + userId + '/' + userName)
	// const responseData = await Fetch.get('http://localhost:8081/auth/requestToken/' + userId + '/' + userName)
	return responseData
}

export const getLatestDataService = async (userId: number, domain: string) => {
	const requestData = {
		userId,
		domain
	}
	const data = await Fetch.post( GarminApiUrl + '/data/latestData', requestData)
	console.log('---->getLasted data', data)
	return data
}