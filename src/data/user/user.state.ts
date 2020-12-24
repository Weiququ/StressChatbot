/*
 * @Author: your name
 * @Date: 2020-11-25 16:58:56
 * @LastEditTime: 2020-12-02 11:07:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\data\user\user.state.ts
 */
export interface UserState {
    isLoggedin: boolean;
    id?: number
    username?: string; 
    loading: boolean;
    avatar?: string;
    gender?: string;
    isBoundGarmin: boolean;
};