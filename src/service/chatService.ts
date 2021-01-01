/*
 * @Author: your name
 * @Date: 2020-10-26 16:36:40
 * @LastEditTime: 2021-01-01 20:37:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\service\chatService.ts
 */
import { constants } from 'buffer'
import { ApiUrl, RasaApiUrl } from '../utils/constants'

// const url = 'http://23.248.162.114/api'
// const url = 'http://47.100.27.214:8000'
export const getSleepAnswer = async (question: string) => {
	const response = await fetch(ApiUrl + '/answer', {
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify({
				question
		})
	})

	if(response.ok) {
		let json = await response.json();
		console.log(json)
		let data = json.data
		return data
	} else {
		console.log("HTTP-Error: " + response.status);
	}
	console.log('------>response', response)
}  


export const getRasaAnswer = async (question: string) => {
	const data = {
		"sender": "",
		"message": question
	}
	const response = await fetch(RasaApiUrl, {
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify(data)
	})
	if(response.ok) {
		let data = await response.json();
		return data[0]
	} else {
		console.log("HTTP-Error: " + response.status);
	}
	console.log('------>response', response)
}  


// export const getSleepAnswer = async (question: string) => {
//     fetch('http://localhost:5000/answer', {
//         method: 'POST',
//         mode: 'cors',
//         body: JSON.stringify({
//             question
//         })
//     })
// }