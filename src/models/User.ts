/*
 * @Author: your name
 * @Date: 2020-10-25 21:11:36
 * @LastEditTime: 2021-01-02 12:16:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\models\Message.ts
 */
export interface User {
    userId: number | null
    username: string
    password: string
    avatar: string
    gender: string
    birthday: string
    createTime: Date | null
    updateTime: Date | null
}