/*
 * @Author: your name
 * @Date: 2020-10-25 21:11:36
 * @LastEditTime: 2020-11-23 09:19:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\models\Message.ts
 */
export interface Message {
  id: number;
  date: string;
  userId: number;
	username: string;
	avatar: string;
	text: string;
}
  