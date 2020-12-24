/*
 * @Author: your name
 * @Date: 2020-11-25 16:58:47
 * @LastEditTime: 2020-12-02 11:13:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\data\user\user.reducer.ts
 */

import { UserActions } from './user.actions';
import { UserState } from './user.state';

export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case 'set-user-loading':
      return { ...state, loading: action.isLoading };
    case 'set-is-loggedin':
			return { ...state, isLoggedin: action.loggedIn };
		case 'set-user-id':
			return { ...state, id: action.userId };
		case 'set-username':
			return { ...state, username: action.username };
		case 'set-avatar':
			return { ...state, avatar: action.avatar };
		case 'set-gender':
			return { ...state, gender: action.gender };
		case 'set-isBoundGarmin':
			return {...state, isBoundGarmin: action.isBoundGarmin}
		default:
			return state
  }
}