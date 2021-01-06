/*
 * @Author: your name
 * @Date: 2020-11-25 16:58:31
 * @LastEditTime: 2021-01-02 11:54:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\data\user\user.action.ts
 */
import { getUserData, setIsLoggedInData, setUserIdData, setUsernameData, setAvatarData, setGenderData, setIsBoundGarminData } from '../dataApi';
import { UserState } from './user.state';
import { ActionType } from '../../utils/types';

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  console.log('------>loadUserData')
  dispatch(setLoading(true));
  const data = await getUserData();
  const {userId, username, gender, avatar, isLoggedin, isBoundGarmin } = data;
  console.log("---->data", userId, username, gender, avatar, isLoggedin, isBoundGarmin)
  // dispatch(setUserId(userId));
  // dispatch(setUsername(username));
  // dispatch(setGender(gender));
  // dispatch(setAvatar(avatar));
  // dispatch(setIsLoggedIn(isLoggedin));
  // dispatch(setIsBoundGarmin(isBoundGarmin));
  dispatch(setUserData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-user-loading',
  isLoading
} as const);

export const setUserData = (data: Partial<UserState>) => ({
  type: 'set-user-data',
  data
} as const);

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  // console.log('------>setIsLoggedIn', setIsLoggedIn)
  await setIsLoggedInData(loggedIn);
  return ({
    type: 'set-is-loggedin',
    loggedIn
  } as const)
};

export const setUserId = (userId?: number) => async (dispatch: React.Dispatch<any>) => {
  console.log('setUserId', userId)
  await setUserIdData(userId);
  console.log(userId)
  return ({
    type: 'set-user-id',
    userId
  } as const);
};

export const setUsername = (username?: any) => async (dispatch: React.Dispatch<any>) => {
  await setUsernameData(username);
  return ({
    type: 'set-username',
    username
  } as const);
};

export const setAvatar = (avatar?: string) => async (dispatch: React.Dispatch<any>) => {
  await setAvatarData(avatar);
  return ({
    type: 'set-avatar',
    avatar
  } as const);
};

export const setGender = (gender?: string) => async (dispatch: React.Dispatch<any>) => {
  await setGenderData(gender);
  return ({
    type: 'set-gender',
    gender
  } as const);
};  

export const setIsBoundGarmin = (isBoundGarmin: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setIsBoundGarminData(isBoundGarmin);
  return ({
    type: 'set-isBoundGarmin', 
    isBoundGarmin
  } as const);
};

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(false);
  dispatch(setUserId());
  dispatch(setUsername());
  dispatch(setAvatar());
  dispatch(setGender());
  dispatch(setIsBoundGarmin(false));
};


export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setUsername>
  | ActionType<typeof setUserId>
  | ActionType<typeof setAvatar>
  | ActionType<typeof setGender>
  | ActionType<typeof setIsBoundGarmin>
  | ActionType<typeof setUserIdData>