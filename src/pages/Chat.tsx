import { 
	IonContent,
	IonHeader,
	IonPage, 
	IonTitle, 
	IonToolbar, 
	IonFooter, 
	IonItem, 
	IonInput, 
	IonIcon, 
	IonButton,
	IonAvatar,
	IonButtons,
	IonMenuButton
} from '@ionic/react';
import React, { useState, useRef} from 'react';
import './Chat.css';
import { send } from 'ionicons/icons/index';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { formatDate } from '../utils/handleDate'
import { getSleepAnswer } from '../service/chatService'
interface MyProps {
	messages: Message[];
	user: User;
	messgeNum: number;
}

const Chat: React.FC<MyProps> = ({ user }) => {
	
	const messagesRef = useRef(null);

	const welcomeMessage = 	{
		id: 2,
		date: formatDate(new Date()),
		userId: chatbot.id,
		username: chatbot.username,
		avatar: chatbot.avatar,
		text: '你好，关于睡眠和压力的问题都可以问我哦'
	}

	const [userMessageText, setUserMessageText] = useState<string>();
	const [messages, setMessages] = useState<Array<any>>([welcomeMessage]);
	const [messgeNum, setMessageNum] = useState<number>(0);

	const sendMessage  = async (e: React.FormEvent) => {
		e.preventDefault();
		let userMessage = {
			id: messgeNum + 1,
			date: formatDate(new Date()),
			userId: user.id,
			username: user.username,
			avatar: user.avatar,
			text: userMessageText || ''
		}
		console.log('--->sendMessage', userMessage)
		// let newMessage = [...messages, userMessage];
		// setMessages(newMessage)
		setMessages(messages => [...messages, userMessage])
		setMessageNum(messgeNum => messgeNum + 1)
		let question = userMessageText
		setUserMessageText('')
		let responseMessage = {
			id: messgeNum + 1,
			date: formatDate(new Date()),
			userId: chatbot.id,
			username: chatbot.username,
			avatar: chatbot.avatar,
			text: '对不起，这个问题我还不会哦，你可以问我其他问题'
		}
		scrollToBottom()
		getSleepAnswer(question || '').then(data => {
			if (data && data.answer) {
				responseMessage.text = data.answer
			}
			setMessages(messages => [...messages, responseMessage])
			setMessageNum(messgeNum => messgeNum + 1)
			scrollToBottom()
		})
	}

	// /**滚到底部 */
  // const scrollToBottom = (int: number) => {
  //   setTimeout(() => {
  //     this.content.scrollToBottom(1);
  //   }, int);
	// }

	const scrollToBottom = () => {
		if (!messagesRef || !messagesRef.current) return;
		//window.scrollTo(0, this.messagesRef.current.offsetTop)
		// @ts-ignore
		messagesRef.current.scrollToBottom();
		//scrollIntoView({ behavior: "smooth" });
		console.log("ScrollToTheBottom");
	}
	
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton></IonMenuButton>
					</IonButtons>
					<IonTitle>Health Chatbot</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen ref={messagesRef}>
				{messages && messages.map((message: Message, index: number) => (
					<div className="message-wrapper" key={index}>
						{ user.id !== message.userId &&
							<div>
								<img className="profile-pic left" src={chatbot.avatar} />
								<div className="chat-bubble left slide-left">
									<div className="message">{message.text}
									</div>
									<div className="message-detail left">
										<span>{message.date}</span>
									</div>
								</div>
							</div>
						}
						{ user.id === message.userId && 
							<div>
								<img className="profile-pic right" src={user.avatar}/>
								<div className="chat-bubble right slide-right">
									<div className="message">{message.text}
									</div>
									<div className="message-detail right">
										<span>{message.date}</span>
									</div>
								</div>
							</div> 
						}
						<div className="cf"></div>
						</div>
					))}
			</IonContent>
			<IonFooter>
				<form noValidate onSubmit={sendMessage}>
					<IonItem>
						<IonInput name="userMessage" value={userMessageText} placeholder="请输入您的问题" onIonChange={e => setUserMessageText(e.detail.value!)}></IonInput>
						<IonButton fill="clear" type="submit" ><IonIcon icon={send}></IonIcon></IonButton>	
					</IonItem>
				</form>
			</IonFooter>
		</IonPage>
	);
  };
  
export default Chat;

const chatbot = {
	id: 1,
	avatar: '/assets/icon/Chatbot-evolution-1 (3).png',
	username: 'Chatbot',
};

const user = {
	id: 2,
	avatar: '/assets/icon/user.jpeg',
	username: 'Mary',
	password: '',
	gender: 'secret',
	birthday: '',
	createTime: null,
	updateTime: null
};


Chat.defaultProps = {
	messages: [
	{
      id: 2,
      date: formatDate(new Date()),
      userId: chatbot.id,
      username: chatbot.username,
      avatar: chatbot.avatar,
      text: '你好，关于睡眠和压力的问题都可以问我哦'
    },
    {
      id: 2,
      date: formatDate(new Date()),
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      text: '我最近经常失眠，该怎么办呢'
    },
    {
      id: 3,
      date: formatDate(new Date()),
      userId: chatbot.id,
      username: chatbot.username,
      avatar: chatbot.avatar,
      text: '失眠可能是很多原因引起的，你最近心情怎么样呢，饮食怎么样呢，运动怎么样呢，压力大吗？学习或者工作上有什么烦恼吗？'
    },
    {
      id: 4,
      date: formatDate(new Date()),
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      text: '最近心情不太好，马上要考试了，压力比较大'
    },
    {
      id: 5,
      date: formatDate(new Date()),
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      text: 'what??'
    },
    {
      id: 6,
      date: formatDate(new Date()),
      userId: chatbot.id,
      username: chatbot.username,
      avatar: chatbot.avatar,
      text: 'yes!'
    }],
	user: user,
	messgeNum: 1,
}