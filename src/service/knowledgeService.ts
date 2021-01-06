/*
 * @Author: your name
 * @Date: 2021-01-05 19:09:45
 * @LastEditTime: 2021-01-05 19:53:57
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