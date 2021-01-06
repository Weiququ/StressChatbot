/*
 * @Author: your name
 * @Date: 2020-11-26 10:50:10
 * @LastEditTime: 2021-01-05 08:48:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\data\state.ts
 */
import { combineReducers } from './combineReducers.d';
import { userReducer } from './user/user.reducer';
import { DefaultAvatar } from '../utils/constants'

export const initialState: AppState = {
  user: {
    userId: -1,
    username: '',
    avatar: DefaultAvatar,
    isLoggedin: false,
    loading: false,
    isBoundGarmin: false
  }
};


export const reducers = combineReducers({
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;