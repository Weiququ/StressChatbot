/*
 * @Author: your name
 * @Date: 2020-10-26 01:25:00
 * @LastEditTime: 2021-01-18 13:30:49
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
	// return y + '-' + month + '-' + day +' '+ h +':'+ minute;  
	return y + '-' + month + '-' + '14 ' + h + ':' + minute;  
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

const secondToTime = (secondString: string) => {
	const second = parseInt(secondString)
	const hour1 = Math.floor(second / 3600);
	const minute1 = Math.round(second % 3600 / 60);
	const hour2 = Math.floor((second + 180) / 3600);
	const minute2 = Math.round((second + 180) % 3600 / 60);
	return hour1 + ':' + minute1.toString().padStart(2, '0') + '-' + hour2 + ':' + minute2.toString().padStart(2, '0');
}

//'2020-12-23' '180' to '2020-12-23 00:03'
// const handleDate = (calendarDate: string, timeOffset: string) => {
// 	const hour = Math.floor(parseInt(timeOffset) / 3600);
// 	const minute = Math.round(parseInt(timeOffset) % 3600 / 60);
// 	return calendarDate + " " + hour.pad()
// }

// 获取日期字符串：yyyy-MM-dd或者yyyy-MM-dd HH:mm:ss
const dateToString = (date: Date, format: String) => {
	let str = ''
	const year = date.getFullYear();
	const month = ((date.getMonth() + 1)+'').padStart(2, '0');
	const day = (date.getDate()+'').padStart(2, '0');

	if (format === "yyyy-MM-dd") {
		str += year + "-" + month + "-" + day;  
	} else {
		str += date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	}
	return str;
}
 
// 时间字符串转化为时间戳
const strToTimestamp = (dateStr: string) => {
	const date = new Date(dateStr);
	const timestamp = date.getTime() / 1000;
	return timestamp;
}

const getPrevDate = (dateStr: string) => {
	const timestamp = strToTimestamp(dateStr); //获取当前日期时间戳
	console.log("timestamp", timestamp)
  const before = timestamp - 60*60*24;//当前日期时间戳减去一天时间戳
	const beforeDate = new Date(before*1000);//将时间戳转化为Date对象
	console.log("timestamp", timestamp, before, beforeDate)
	
	return dateToString(beforeDate, "yyyy-MM-dd");
}


const getNextDate = (dateStr: string) => {
	const timestamp = strToTimestamp(dateStr); //获取当前日期时间戳
  const before = timestamp + 60*60*24;//当前日期时间戳减去一天时间戳
  const beforeDate = new Date(before*1000);//将时间戳转化为Date对象
	return dateToString(beforeDate, "yyyy-MM-dd");
}


export { formatDate, secondToHourMinute, secondToTime, dateToString, strToTimestamp, getPrevDate, getNextDate}