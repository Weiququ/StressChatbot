/*
 * @Author: your name
 * @Date: 2020-10-25 21:11:36
 * @LastEditTime: 2020-11-22 20:19:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\models\Message.ts
 */
export interface User {
    id: number | null
    username: string
    password: string
    avatar: string
    gender: string
    birthday: string
    createTime: Date | null
    updateTime: Date | null
}