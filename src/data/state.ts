/*
 * @Author: your name
 * @Date: 2020-11-26 10:50:10
 * @LastEditTime: 2020-12-13 16:52:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\data\state.ts
 */
import { combineReducers } from './combineReducers.d';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  user: {
    isLoggedin: false,
    loading: false,
    username: '',
    id: -1,
    isBoundGarmin: false
  }
};

export const reducers = combineReducers({
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;