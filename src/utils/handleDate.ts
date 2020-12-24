import { number } from "@amcharts/amcharts4/core";

/*
 * @Author: your name
 * @Date: 2020-10-26 01:25:00
 * @LastEditTime: 2020-12-08 09:34:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\utils\handleDate.ts
 */
const formatDate = (date: Date) => {  
    let y = date.getFullYear();  
    let m = date.getMonth() + 1;  
    let month = m < 10 ? ('0' + m) : m;  
    let d = date.getDate();  
    let day = d < 10 ? ('0' + d) : d;  
    let h = date.getHours();  
    let mm = date.getMinutes();  
    let minute = mm < 10 ? ('0' + mm) : mm; 
    let ss = date.getSeconds();  
    let second = minute < 10 ? ('0' + ss) : ss;  
    return y + '-' + month + '-' + day +' '+ h +':'+ minute;  
};  

const secondToHourMinute = (second: number) => {
    const hour = Math.floor(second / 3600);
    const minute = Math.round(second % 3600 / 60);
    console.log(3722 % 3600 / 60)
    let res = '';
    if (hour !== 0) {
        res += hour + '小时';
    } 
    res += minute + '分钟';
    return res;
}

const secondToTime = (second: number) => {
    const hour1 = Math.floor(second / 3600);
    const minute1 = Math.round(second % 3600 / 60);
    const hour2 = Math.floor((second + 180) / 3600);
    const minute2 = Math.round((second + 180) % 3600 / 60);
    return hour1 + ':' + minute1.toString().padStart(2, '0') + '-' + hour2 + ':' + minute2.toString().padStart(2, '0');
}

export { formatDate, secondToHourMinute, secondToTime }