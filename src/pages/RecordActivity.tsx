import { 
	IonContent,
	IonHeader,
	IonPage, 
	IonTitle, 
	IonToolbar, 
	IonFooter, 
	IonItem, 
	IonInput, 
	IonButton,
	IonButtons,
	IonMenuButton,
	IonList,
	IonLabel,
  IonRow,
  IonBackButton
} from '@ionic/react';
import React, { useState, useEffect} from 'react';
import { Modal, Button, DatePicker, Slider, Radio, Input, Select } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
// import './font/iconfont.css'
import './font/font.css'
import './css/RecordActivity.css'
//at.alicdn.com/t/font_2293480_w6d4jwqpqn.js
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

const { Option, OptGroup } = Select;

interface MyProps {
}

interface RecordActivityProps extends MyProps, RouteComponentProps {}

const RecordActivity: React.FC<RecordActivityProps> = ({ history}) => {
  const location: any = useLocation()

  console.log(location)
  
  const date = location?.state?.date || ''
  const time  = location?.state?.time || ''
  const start = date + " " + time.split("-")[0]
  const end = date + " " + time.split("-")[1]
  console.log(start === "2020-12-29 0:21")
  console.log(end)
  const [activity, setActivity] = useState<any>({})
  const [duration, setDuration] = useState("00:00")
  // const [startTime, setStartTime] = useState(moment(start))
  // const [endTime, setEndTime] = useState(moment(end))
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [isAddModalvisible, setIsAddModalvisible] = useState(false)
  const [activityId, setActivityId] = useState()
  const [isActivityIconModalvisible, setIsActivityIconModalvisible] = useState(false)
  const [addActivity, setAddActivity] = useState<any>(null);

  const iconSrcs = [
    "https://at.alicdn.com/t/font_2293480_inrhiuz2g4.js", //日常活动
    "https://at.alicdn.com/t/font_2294526_b18e4ui0j6d.js", //美食
    "https://at.alicdn.com/t/font_2294525_xpzqs5p0gih.js", //运动
    "https://at.alicdn.com/t/font_2294524_f5ctuu4682c.js", //娱乐
    "https://at.alicdn.com/t/font_2294530_egcmsjkf8zs.js", //出行
    "https://at.alicdn.com/t/font_2294899_pyws8ilhh5i.js",  //工作学习
    "https://at.alicdn.com/t/font_2294900_htmckme5vbj.js", //家庭
  ]

  useEffect(()=> {
    iconSrcs.map((item) => {
      const script = document.createElement("script")
      script.src = item
      script.async = true
      
      document.body.appendChild(script)
    })
  }, [])

	const [isModalVisible, setIsModalVisible] = useState(false);

	const format = 'HH:mm';

	const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddModalCancel = () => {
    setIsAddModalvisible(false);
  };

  const onClickActivity = (evet: any, activity: any) => {
    console.log("activity", activity)
    setActivity(activity)
    handleOk();
  }

  const onChangeStartTime = (date: any, dateString: string) => {
    if(moment(endTime).valueOf() < moment(startTime).valueOf()) {
      alert("开始时间不能晚于结束时间")
      return
    }
    // moment(time).valueOf();
    console.log('--->date', date);
    console.log('--->dateString', dateString);
    setStartTime(date)
  }

  const onChangeEndTime = (date: any, dateString: string) => {
    if(moment(endTime).valueOf() < moment(startTime).valueOf()) {
      alert("结束时间不能早于开始时间")
      return
    }
    setEndTime(date)
  }

  const handleSelectChange = () => {
    console.log('aa')
  }

  const onClickAddActivity = () => {
    setIsAddModalvisible(true);
    setActivity(null);
    // @ts-ignore
    setActivityId("");
  }
  
  const handleActivityIconModalCancel = () => {
    setIsActivityIconModalvisible(false);
  }

  useEffect(() => {
    if (startTime && endTime) {   
      const startTimestamp  = Math.floor(moment(startTime).valueOf() / 1000) * 1000
      const endTimestamp  = Math.floor(moment(endTime).valueOf() / 1000) * 1000
      const time = endTimestamp - startTimestamp;
      const hour = Math.floor(time / 1000 / 3600);
      const minute = Math.floor(time / 1000 / 60) - hour * 60;
      const duration = (hour + "").padStart(2, '0') + ":" + (minute + "").padStart(2, '0')
      console.log(duration);
      setDuration(duration);
    }
  }, [startTime, endTime])

  const onClickAddActivityIcon = (evet: any, activity: any) => {
    setAddActivity(activity)
    setIsActivityIconModalvisible(false)
  }

	const activities = [
    {
      "icon_id": "7219974",
      "name": "吃饭",
      "font_class": "chifan",
      "unicode": "e680",
      "unicode_decimal": 59008
    },
    {
      "icon_id": "268166",
      "name": "喝咖啡",
      "font_class": "kafei",
      "unicode": "e67e",
      "unicode_decimal": 59006
    },
    {
      "icon_id": "8963666",
      "name": "喝酒",
      "font_class": "hejiu",
      "unicode": "e62b",
      "unicode_decimal": 58923
    },
    {
      "icon_id": "9748285",
      "name": "睡觉",
      "font_class": "shuijue",
      "unicode": "e616",
      "unicode_decimal": 58902
    },
    {
      "icon_id": "11772338",
      "name": "听音乐",
      "font_class": "lingtingyinle",
      "unicode": "e624",
      "unicode_decimal": 58916
    },
    {
      "icon_id": "1270329",
      "name": "开车",
      "font_class": "kaiche",
      "unicode": "e604",
      "unicode_decimal": 58884
    },
    {
      "icon_id": "598002",
      "name": "开会",
      "font_class": "huiyikaihuitaolun",
      "unicode": "e651",
      "unicode_decimal": 58961
    },
    {
      "icon_id": "1928960",
      "name": "写作",
      "font_class": "xiezuo",
      "unicode": "e620",
      "unicode_decimal": 58912
    },
    {
      "icon_id": "2265204",
      "name": "乘公共交通",
      "font_class": "gonggongjiaotong",
      "unicode": "e625",
      "unicode_decimal": 58917
    },
    {
      "icon_id": "3623413",
      "name": "考试",
      "font_class": "kaoshi",
      "unicode": "e655",
      "unicode_decimal": 58965
    },
    {
      "icon_id": "4415453",
      "name": "打电话",
      "font_class": "dianhua",
      "unicode": "e63e",
      "unicode_decimal": 58942
    },
    {
      "icon_id": "4442178",
      "name": "上课",
      "font_class": "tubiao-",
      "unicode": "e629",
      "unicode_decimal": 58921
    },
    {
      "icon_id": "8835335",
      "name": "工作",
      "font_class": "gongzuo",
      "unicode": "e661",
      "unicode_decimal": 58977
    },
    {
      "icon_id": "12052248",
      "name": "演讲",
      "font_class": "yanjiang",
      "unicode": "e650",
      "unicode_decimal": 58960
    },
    {
      "icon_id": "13942550",
      "name": "打游戏",
      "font_class": "wanshouji1",
      "unicode": "e600",
      "unicode_decimal": 58880
    },
    {
      "icon_id": "14439156",
      "name": "运动",
      "font_class": "yundong",
      "unicode": "e60a",
      "unicode_decimal": 58890
    },
    {
      "icon_id": "15282759",
      "name": "看电影",
      "font_class": "kandianying",
      "unicode": "e6d5",
      "unicode_decimal": 59093
    },
    {
      "icon_id": "15722804",
      "name": "阅读",
      "font_class": "yuedu",
      "unicode": "e607",
      "unicode_decimal": 58887
    },
    {
      "icon_id": "18456560",
      "name": "购物",
      "font_class": "gouwu",
      "unicode": "e601",
      "unicode_decimal": 58881
    }
  ]

  const marks = {
    0: "放松",
    20: "压力低",
    40: "压力中等",
    100: "压力高"
  }

  const activityIcons = [
    {
      "id": "2293193",
      "name": "工作学习",
      "font_family": "iconfont",
      "css_prefix_text": "icon-",
      "description": "",
      "glyphs": [
        {
          "icon_id": "1003939",
          "name": "邮件",
          "font_class": "youjian",
          "unicode": "e631",
          "unicode_decimal": 58929
        },
        {
          "icon_id": "1672144",
          "name": "报纸",
          "font_class": "baozhi",
          "unicode": "e600",
          "unicode_decimal": 58880
        },
        {
          "icon_id": "1265565",
          "name": "电脑",
          "font_class": "diannao",
          "unicode": "e610",
          "unicode_decimal": 58896
        },
        {
          "icon_id": "4725097",
          "name": "出差",
          "font_class": "chucha",
          "unicode": "e622",
          "unicode_decimal": 58914
        },
        {
          "icon_id": "8331809",
          "name": "开会",
          "font_class": "kaihui",
          "unicode": "e697",
          "unicode_decimal": 59031
        },
        {
          "icon_id": "10109066",
          "name": "写",
          "font_class": "xie",
          "unicode": "e60f",
          "unicode_decimal": 58895
        },
        {
          "icon_id": "18459111",
          "name": "实验",
          "font_class": "shiyan",
          "unicode": "e6cf",
          "unicode_decimal": 59087
        }
      ]
    },          
    {
      "id": "2294524",
      "name": "娱乐",
      "font_family": "iconfont",
      "css_prefix_text": "icon",
      "description": "",
      "glyphs": [
        {
          "icon_id": "3781712",
          "name": "吉他",
          "font_class": "jita",
          "unicode": "e630",
          "unicode_decimal": 58928
        },
        {
          "icon_id": "4741195",
          "name": "手柄",
          "font_class": "shoubing",
          "unicode": "e609",
          "unicode_decimal": 58889
        },
        {
          "icon_id": "4741201",
          "name": "国际象棋",
          "font_class": "guojixiangqi",
          "unicode": "e60e",
          "unicode_decimal": 58894
        },
        {
          "icon_id": "4741261",
          "name": "象棋",
          "font_class": "che",
          "unicode": "e610",
          "unicode_decimal": 58896
        },
        {
          "icon_id": "4741262",
          "name": "风筝",
          "font_class": "fengzheng",
          "unicode": "e611",
          "unicode_decimal": 58897
        },
        {
          "icon_id": "4741266",
          "name": "话筒",
          "font_class": "huatong",
          "unicode": "e612",
          "unicode_decimal": 58898
        },
        {
          "icon_id": "4741270",
          "name": "拼图",
          "font_class": "pintu",
          "unicode": "e613",
          "unicode_decimal": 58899
        },
        {
          "icon_id": "4741271",
          "name": "魔方",
          "font_class": "mofang",
          "unicode": "e614",
          "unicode_decimal": 58900
        },
        {
          "icon_id": "4741273",
          "name": "头戴式耳机",
          "font_class": "toudaishierji",
          "unicode": "e615",
          "unicode_decimal": 58901
        },
        {
          "icon_id": "10505806",
          "name": "架子鼓",
          "font_class": "jiazigu1",
          "unicode": "e60c",
          "unicode_decimal": 58892
        },
        {
          "icon_id": "15927198",
          "name": "旅行",
          "font_class": "lvhang",
          "unicode": "e6c9",
          "unicode_decimal": 59081
        },
        {
          "icon_id": "17659293",
          "name": "钢琴",
          "font_class": "gangqin",
          "unicode": "e607",
          "unicode_decimal": 58887
        }
      ]
    },    
    {
      "id": "2294587",
      "name": "家庭",
      "font_family": "iconfont",
      "css_prefix_text": "icon-",
      "description": "",
      "glyphs": [
        {
          "icon_id": "166428",
          "name": "爪爪_遛狗",
          "font_class": "zhuazhualiugou",
          "unicode": "e621",
          "unicode_decimal": 58913
        },
        {
          "icon_id": "2486288",
          "name": "小孩",
          "font_class": "xiaohai1",
          "unicode": "e600",
          "unicode_decimal": 58880
        },
        {
          "icon_id": "4512398",
          "name": "做饭",
          "font_class": "zuofan",
          "unicode": "e728",
          "unicode_decimal": 59176
        },
        {
          "icon_id": "5044542",
          "name": "鱼缸",
          "font_class": "yugang",
          "unicode": "e605",
          "unicode_decimal": 58885
        },
        {
          "icon_id": "5171376",
          "name": "洗澡",
          "font_class": "xizao",
          "unicode": "e61c",
          "unicode_decimal": 58908
        },
        {
          "icon_id": "5832662",
          "name": "vacation",
          "font_class": "vacation",
          "unicode": "e699",
          "unicode_decimal": 59033
        },
        {
          "icon_id": "5832664",
          "name": "feeding-bottle",
          "font_class": "feeding-bottle",
          "unicode": "e69a",
          "unicode_decimal": 59034
        },
        {
          "icon_id": "5832696",
          "name": "pregnant",
          "font_class": "pregnant",
          "unicode": "e6a9",
          "unicode_decimal": 59049
        },
        {
          "icon_id": "5931593",
          "name": "打扫卫生",
          "font_class": "dasaoweisheng",
          "unicode": "e630",
          "unicode_decimal": 58928
        },
        {
          "icon_id": "10314533",
          "name": "洗手间",
          "font_class": "xishoujian",
          "unicode": "e62b",
          "unicode_decimal": 58923
        },
        {
          "icon_id": "11925789",
          "name": "猫",
          "font_class": "weibiaoti-",
          "unicode": "e609",
          "unicode_decimal": 58889
        }
      ]
    },
    {
      "id": "2294526",
      "name": "美食",
      "font_family": "iconfont",
      "css_prefix_text": "icon",
      "description": "",
      "glyphs": [
        {
          "icon_id": "3961616",
          "name": "火锅",
          "font_class": "huoguo",
          "unicode": "e612",
          "unicode_decimal": 58898
        },
        {
          "icon_id": "61553",
          "name": "烧烤",
          "font_class": "shaokao",
          "unicode": "e616",
          "unicode_decimal": 58902
        },
        {
          "icon_id": "3902916",
          "name": "冰棍",
          "font_class": "binggun",
          "unicode": "e601",
          "unicode_decimal": 58881
        },
        {
          "icon_id": "5675873",
          "name": "水果 (1)",
          "font_class": "shuiguo",
          "unicode": "e604",
          "unicode_decimal": 58884
        },
        {
          "icon_id": "14771884",
          "name": "冰淇淋",
          "font_class": "bingqilin",
          "unicode": "e61e",
          "unicode_decimal": 58910
        },
        {
          "icon_id": "14771886",
          "name": "饼干",
          "font_class": "binggan",
          "unicode": "e61f",
          "unicode_decimal": 58911
        },
        {
          "icon_id": "14771891",
          "name": "包子",
          "font_class": "baozi",
          "unicode": "e620",
          "unicode_decimal": 58912
        },
        {
          "icon_id": "14771895",
          "name": "奶茶",
          "font_class": "naicha",
          "unicode": "e621",
          "unicode_decimal": 58913
        },
        {
          "icon_id": "14771896",
          "name": "啤酒",
          "font_class": "pijiu",
          "unicode": "e622",
          "unicode_decimal": 58914
        },
        {
          "icon_id": "14771902",
          "name": "吐司面包",
          "font_class": "tusimianbao",
          "unicode": "e623",
          "unicode_decimal": 58915
        },
        {
          "icon_id": "14771903",
          "name": "私房菜",
          "font_class": "sifangcai",
          "unicode": "e624",
          "unicode_decimal": 58916
        },
        {
          "icon_id": "14771909",
          "name": "芝士蛋糕",
          "font_class": "zhishidangao",
          "unicode": "e625",
          "unicode_decimal": 58917
        },
        {
          "icon_id": "14771914",
          "name": "纸杯蛋糕",
          "font_class": "zhibeidangao",
          "unicode": "e626",
          "unicode_decimal": 58918
        },
        {
          "icon_id": "14771918",
          "name": "中餐",
          "font_class": "zhongcan",
          "unicode": "e627",
          "unicode_decimal": 58919
        }
      ]
    },
    {
      "id": "2294525",
      "name": "运动",
      "font_family": "iconfont",
      "css_prefix_text": "icon",
      "description": "",
      "glyphs": [
        {
          "icon_id": "15614205",
          "name": "bicycle",
          "font_class": "bicycle",
          "unicode": "e959",
          "unicode_decimal": 59737
        },
        {
          "icon_id": "15614206",
          "name": "baseball",
          "font_class": "baseball",
          "unicode": "e95a",
          "unicode_decimal": 59738
        },
        {
          "icon_id": "15614207",
          "name": "bowling",
          "font_class": "bowling",
          "unicode": "e95b",
          "unicode_decimal": 59739
        },
        {
          "icon_id": "15614218",
          "name": "skipping-rope",
          "font_class": "skipping-rope",
          "unicode": "e95c",
          "unicode_decimal": 59740
        },
        {
          "icon_id": "15614220",
          "name": "tennis",
          "font_class": "tennis",
          "unicode": "e95d",
          "unicode_decimal": 59741
        },
        {
          "icon_id": "15614224",
          "name": "dumbbell",
          "font_class": "dumbbell",
          "unicode": "e95e",
          "unicode_decimal": 59742
        },
        {
          "icon_id": "15614225",
          "name": "sailing-ship",
          "font_class": "sailing-ship",
          "unicode": "e95f",
          "unicode_decimal": 59743
        },
        {
          "icon_id": "15614227",
          "name": "ping-pong-racket",
          "font_class": "ping-pong-racket",
          "unicode": "e960",
          "unicode_decimal": 59744
        },
        {
          "icon_id": "15614231",
          "name": "skates",
          "font_class": "skates",
          "unicode": "e961",
          "unicode_decimal": 59745
        },
        {
          "icon_id": "13015021",
          "name": "瑜伽",
          "font_class": "yuqie",
          "unicode": "e600",
          "unicode_decimal": 58880
        },
        {
          "icon_id": "11433198",
          "name": "游泳",
          "font_class": "youyong",
          "unicode": "e704",
          "unicode_decimal": 59140
        },
        {
          "icon_id": "10204026",
          "name": "足球",
          "font_class": "zuqiu",
          "unicode": "e623",
          "unicode_decimal": 58915
        }
      ]
    },
    {
      "id": "2294530",
      "name": "出行",
      "font_family": "iconfont",
      "css_prefix_text": "icon",
      "description": "",
      "glyphs": [
        {
          "icon_id": "1726904",
          "name": "出行",
          "font_class": "CgpQVFeNruASZGAAACjuwVRk",
          "unicode": "e607",
          "unicode_decimal": 58887
        },
        {
          "icon_id": "2965898",
          "name": "出行",
          "font_class": "chuhang",
          "unicode": "e629",
          "unicode_decimal": 58921
        },
        {
          "icon_id": "4178609",
          "name": "出行",
          "font_class": "chuhang1",
          "unicode": "e762",
          "unicode_decimal": 59234
        },
        {
          "icon_id": "6368812",
          "name": "出行",
          "font_class": "chuhang2",
          "unicode": "e604",
          "unicode_decimal": 58884
        },
        {
          "icon_id": "6544389",
          "name": "出行",
          "font_class": "chuhang3",
          "unicode": "e60f",
          "unicode_decimal": 58895
        },
        {
          "icon_id": "7062554",
          "name": "出行",
          "font_class": "feiji",
          "unicode": "e60c",
          "unicode_decimal": 58892
        }
      ]
    }        
  ]

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton></IonMenuButton>
					</IonButtons>
					<IonTitle>记录日常活动
            <IonBackButton style={{ float: "right", marginRight: "10px"}} text="" defaultHref="/chat" />
          </IonTitle>
          
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
					<IonContent>
        		<form noValidate>
							<IonList>
								<IonItem>
									<IonLabel>活动</IonLabel>
                
									{/* <IonInput className="activityInput" name="activityInput" type="text" value={activity.name} placeholder="请选择活动" onClick={() => showModal()}>
                    <span role="img" className="activityImgSpan"> 
                      <svg className="icon" aria-hidden="true">
                        <use xlinkHref={"#icon" + activity.font_class}></use>
                      </svg>
                    </span>
                    
									</IonInput> */}
                  <Select 
                    style={{ width: 300, height: 40 }} 
                    onChange={handleSelectChange}
                    listHeight={500}
                    value={activityId}>
                    {activities && activities.map((item)=>{
                      return (
                        <Option value={item.icon_id}>
                          <div className="activityDiv" onClick={(e) => onClickActivity(e, item)}>
                            <svg className="icon" aria-hidden="true">
                              <use xlinkHref={"#icon" + item.font_class}></use>
                            </svg>
                            <span style={{paddingLeft: "10px"}}>{item.name}</span>
                          </div>
                        </Option>
                      )
                    })}
                    <Option value="-1">
                      {/* <div className="addDiv" onClick={()=>setIsAddModalvisible(true)}> */}
                      <div className="addDiv" onClick={onClickAddActivity}>
                        <img className="addImg" src="assets/icon/add.png"></img>
                        <a style={{paddingLeft: "10px"}}>其他</a>
                      </div>
                    </Option>
                </Select>
            		</IonItem>
								<IonItem>
									<IonLabel>开始时间</IonLabel>
									{/* <TimePicker defaultValue={moment('00:00', format)} format={format} /> */}
									<DatePicker
										format="YYYY-MM-DD HH:mm"
                    showTime={{ defaultValue: moment('0000-00-00 00:00', 'YYYY-MM-DD HH:mm') }}
                    value={startTime}
                    onChange={onChangeStartTime}
									/>
									{/* <IonDatetime display-format="h:mm A" picker-format="h:mm A" value=""></IonDatetime> */}
								</IonItem>
								<IonItem>
									<IonLabel>结束时间</IonLabel>
									<DatePicker
										format="YYYY-MM-DD HH:mm"
                    showTime={{ defaultValue: moment('0000-00-00 00:00', 'YYYY-MM-DD HH:mm')}} 
                    value={endTime}
                    onChange={onChangeEndTime}
									/>
									{/* <IonDatetime display-format="h:mm A" picker-format="h:mm A" value=""></IonDatetime> */}
								</IonItem>
                <IonItem>
									<IonLabel className="durationLable">累计时长</IonLabel>
                  <IonInput name="duration" className="duration" value={duration} disabled={true}></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel className="durationLable">感受到的压力</IonLabel>
                  <Radio.Group className="stressRadio">
                    <Radio value={1}>放松</Radio>
                    <Radio value={2}>压力低</Radio>
                    <Radio value={3}>压力中等</Radio>
                    <Radio value={4}>压力高</Radio>
                  </Radio.Group>
                </IonItem>
                {/* <div className="slider">
                  <span>感受到的压力</span>
                  <Slider
                    defaultValue={20} 
                    dots={true}
                    step={20} 
                    marks={marks}
                    min={0}
                    max={100} />
                </div> */}
               
							</IonList>
						</form>
            <IonRow className="submitRow">
              <IonButton className="submitButton" type="submit" expand="block" fill="solid">提交</IonButton>
            </IonRow>
					</IonContent>
        
			</IonContent>
      <Modal 
        title="请选择活动" 
        visible={isModalVisible} 
        onCancel={handleCancel} 
        okText=""
        footer={[
          // 定义右下角按钮的地方
          <Button key="取消" onClick={handleCancel}>取消</Button>]}>
        <div className="modalBody">
          {/* {activities && activities.map((item)=>{
            return (
              <div className="activity" onClick={(e) => onClickActivity(e, item)}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref={"#icon" + item.font_class}></use>
                </svg>
                <div>{item.name}</div>
              </div>
            )
          })} */}
          <div className="addDiv" onClick={()=>setIsAddModalvisible(true)}>
            <img className="addImg" src="assets/icon/add.png"></img>
            <a>其他</a>
          </div>
        </div>
      </Modal>
      <Modal 
        title="自定义活动" 
        visible={isAddModalvisible} 
        onCancel={handleAddModalCancel} 
        okText="">
          <div className="addActivityModalBody">
            <div className="activityName">
              <span>活动名称：</span>
              <Input className="activityNameInput" style={{width: 200}}/>
            </div>
            <div className="activityIcon">
              <span>活动图标：</span>
              <div className="iconDiv" onClick={() => setIsActivityIconModalvisible(true)}>
                {addActivity
                  ? <svg className="icon" aria-hidden="true">
                      <use xlinkHref={"#icon" + addActivity.font_class}></use>
                    </svg>
                  : <img className="addIcon" src="assets/icon/add_blue.png"></img>
                }
              </div>
            </div>
              {/* <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleSelectChange}>
              
                {activities && activities.map((item)=>{
                  return (
                    <Option value={item.icon_id}>
                      <div className="activity" onClick={(e) => onClickActivity(e, item)}>
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref={"#icon" + item.font_class}></use>
                        </svg>
                        <div>{item.name}</div>
                      </div>
                    </Option>
                  )
                })}
              </Select> */}
              {/* // <Select
              //   defaultValue="lucy"
              //   style={{ width: 300, marginLeft: "10px"}}
              //   onChange={handleSelectChange}
              // >
              //   <OptGroup label="家庭">
              //     <Option value="jack"> <svg className="icon" aria-hidden="true">
              //     <use xlinkHref={"#iconkafei"}></use>
              //   </svg></Option>
              //     <Option value="lucy">Lucy</Option>
              //   </OptGroup>
              //   <OptGroup label="">
              //     <Option value="Yiminghe">yiminghe</Option>
              //   </OptGroup>
              // </Select> */}
          </div>
      </Modal>
      <Modal 
        title="选择活动图标" 
        visible={isActivityIconModalvisible} 
        // visible={true} 
        onCancel={handleActivityIconModalCancel} 
        okText=""
        footer={[
          // 定义右下角按钮的地方
          <Button key="取消" onClick={handleActivityIconModalCancel}>取消</Button>]}>
          <div className="activityIconsBody">
            {activityIcons && activityIcons.map((activities) => 
              <div className = "oneTypeActivities">
                <div className="title">{activities.name}</div>
                <div className="content">
                  {activities && activities.glyphs.map((item) =>
                    <div className="activityIconDiv" onClick={(e) => onClickAddActivityIcon(e, item)}>
                      <svg className="icon" aria-hidden="true">
                        <use xlinkHref={"#icon" + item.font_class}></use>
                      </svg>
                      {/* <div>{item.name}</div> */}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
      </Modal>
			<IonFooter>
			</IonFooter>
		</IonPage>
	);
};
  
export default RecordActivity;


RecordActivity.defaultProps = {
}