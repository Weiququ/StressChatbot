/*
 * @Author: your name
 * @Date: 2020-11-22 19:38:03
 * @LastEditTime: 2020-12-14 19:25:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\utils\request.ts
 */
import { ApiUrl } from '../utils/constants'

// const request = async (url: string, data: object, method: string) => {
// 	if (url.substring(0, 4) !== 'http') {
// 		url = ApiUrl + '/' + url;
// 	}
// 	return new Promise((resolve, reject) => {
// 		fetch(url, {
// 			method: method,
// 			mode: 'cors',
// 			body: JSON.stringify({
// 					...data
// 			})
// 		}).then((res: any) => {
// 			console.log('---->res', res)
// 			if (res.ok) {
// 					// console.log('-----> res ok', res.json())
// 					return res.json()
// 			} else {
// 					// 服务器异常
// 					throw Error('')
// 			}
// 		}).then((resJson) => {
// 			console.log('---->resJson', resJson)
// 			resolve(resJson)
// 		}).catch((error) => {
// 			console.log('---->error', error)
// 		})
// 	})
// }

// export default request


const request = async (url: string, config: any) => {
	// if (url.substring(0, 4) !== 'http') {
	// 	url = ApiUrl + '/' + url;
	// }
	return new Promise((resolve, reject) => {
		fetch(url, config).then((res: any) => {
			console.log('---->res', res)
			if (res.ok) {
					// console.log('-----> res ok', res.json())
					return res.json()
			} else {
					// 服务器异常
					throw Error('')
			}
		}).then((resJson) => {
			console.log('---->resJson', resJson)
			resolve(resJson)
		}).catch((error) => {
			console.log('---->error', error)
		})
	})
}	


// GET请求
export const get = (url: string) => {
	console.log('--->get', url);
	return request(url, { 
		method: 'GET', 
		headers: {
			'content-type': 'application/json'
		},
		mode: 'cors'
	});
};

// POST请求
export const post = (url: string, data: any) => {
	console.log('--->post', url);
	if (url.substring(0, 4) !== 'http') {
		url = ApiUrl + '/' + url;
	}
	return request(url, {
		method: 'POST',
		body: JSON.stringify({...data}),
		headers: {
			'content-type': 'application/json'
		},
		mode: 'cors'
	});
};