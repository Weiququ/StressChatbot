/*
 * @Author: your name
 * @Date: 2020-10-25 21:11:36
 * @LastEditTime: 2021-02-26 22:16:00
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
	text: any;
  items: any;
  image: string;
}
  