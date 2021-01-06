/*
 * @Author: your name
 * @Date: 2020-11-25 16:58:56
 * @LastEditTime: 2021-01-02 12:14:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\data\user\user.state.ts
 */
export interface UserState {
    isLoggedin: boolean;
    userId?: number
    username?: string; 
    loading: boolean;
    avatar?: string;
    gender?: string;
    isBoundGarmin: boolean;
};