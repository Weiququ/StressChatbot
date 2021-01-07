/*
 * @Author: your name
 * @Date: 2021-01-05 19:09:45
 * @LastEditTime: 2021-01-08 01:00:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \StressChatbot\src\service\knowledgeService.ts
 */
import * as Fetch from '../utils/request';
import { GarminApiUrl } from '../utils/constants';

 export const getStressKnowledgeAboutSleep = async (userId: number) => {
    const responseData: any = await Fetch.get( GarminApiUrl + 'sleep/knowledge?userId=' + userId);
    return responseData.data;
 }  


export const getTodaySleepData = async (userId: number) => {
   const responseData: any = await Fetch.get( GarminApiUrl + 'sleep/today?userId=' + userId);
   console.log('----------------->sleep', responseData.data)
   return responseData.data;
}

export const getSleepDataByDate = async (userId: number, date: string) => {
   const responseData: any = await Fetch.get( GarminApiUrl + 'sleep/byDate?userId=' + userId + '&' + 'date=' + date);
   console.log('----------------->sleep', responseData.data)
   return responseData.data;
}