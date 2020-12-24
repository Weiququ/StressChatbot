/*
 * @Author: your name
 * @Date: 2020-10-26 16:36:40
 * @LastEditTime: 2020-11-26 20:32:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\service\chatService.ts
 */
import { constants } from 'buffer'
import { ApiUrl } from '../utils/constants'

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

// export const getSleepAnswer = async (question: string) => {
//     fetch('http://localhost:5000/answer', {
//         method: 'POST',
//         mode: 'cors',
//         body: JSON.stringify({
//             question
//         })
//     })
// }