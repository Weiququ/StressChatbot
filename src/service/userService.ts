/*
 * @Author: your name
 * @Date: 2020-11-22 18:35:05
 * @LastEditTime: 2020-12-01 16:13:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\service\userService.ts
 */
import { User } from '../models/User';
import * as Fetch from '../utils/request';


export const userRegister = async (user: User) => {
	// const responseData: any = await request('register', user, 'POST') 
	const responseData: any = await Fetch.post('register', user) 
	console.log('----->userRegister responseData', responseData)
	return responseData.data
}

export const userLogin = async (username: string, password: string) => {
	const data = {
		username,
		password
	}
	const responseData: any = await Fetch.post('login', data)
	// const responseData: any = await request('login', data, 'POST') 
	
	return responseData.data
}  

export const userLogout = async () => {
	const responseData = await Fetch.post('logout', null)
	return responseData
}