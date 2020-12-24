/*
 * @Author: your name
 * @Date: 2020-11-25 19:18:30
 * @LastEditTime: 2020-12-02 11:07:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\data\dataApi.ts
 */

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const HAS_LOGGED_IN = 'hasLoggedIn';
const USER_ID = 'userId';
const USERNAME = 'username';
const AVATAR = 'avatar';
const GENDER = 'gender';
const BIRTHDAY = 'birthday';
const IS_BINDED_GARMIN = 'isBoundGarmin';

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: USER_ID }),
    Storage.get({ key: USERNAME }),
    Storage.get({ key: AVATAR }),
    Storage.get({ key: GENDER }),
    Storage.get({ key: IS_BINDED_GARMIN })])
  const isLoggedin = await response[0].value === 'true'
  const userId = await response[1].value 
  const usename = await response[2].value
  const avatar = await response[3].value || undefined
  const gender = await response[4].value || undefined
  const isBoundGarmin = await response[5].value === 'true'

  const data = {
    isLoggedin,
    userId,
    usename,
    avatar,
    gender,
    isBoundGarmin
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  console.log('----->setIsLoggedInData', isLoggedIn)
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setUserIdData = async (id?: number) => {
  if (!id) {
    await Storage.remove({ key: USER_ID });
  } else {
    await Storage.set({ key: USER_ID, value: id + ''});
  }
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}

export const setAvatarData = async (avatar?: string ) => {
  if (!avatar) {
    await Storage.remove({ key: AVATAR });
  } else {
    await Storage.set({ key: AVATAR, value: AVATAR});
  }
}

export const setGenderData = async (gender?: string) => {
  if (!gender) {
    await Storage.remove({ key: GENDER });
  } else {
    await Storage.set({ key: GENDER, value: gender});
  }
}

export const setIsBoundGarminData = async (isBoundGarmin: boolean) => {
  if (!isBoundGarmin) {
    await Storage.remove({ key: IS_BINDED_GARMIN });
  } else {
    await Storage.set({ key: IS_BINDED_GARMIN, value: JSON.stringify(isBoundGarmin)});
  }
}