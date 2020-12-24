import React, { useState } from 'react';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, 
  IonPage, 
  IonButtons, 
  IonMenuButton,
  IonRow, 
  IonCol, 
  IonButton, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonText, 
  IonSelect, 
  IonSelectOption,
  IonDatetime,
  IonAlert
} from '@ionic/react';
import './Login.scss';
// import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps, withRouter } from 'react-router';
import { userRegister } from '../service/userService'
import { User } from '../models/User';



interface OwnProps extends RouteComponentProps {}

// interface DispatchProps {
//   setIsLoggedIn: typeof setIsLoggedIn;
//   setUsername: typeof setUsername;
// }

interface LoginProps extends OwnProps { }

const Register: React.FC<LoginProps> = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [gender, setGender] = useState('')
  const [birthday, setBirthday] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordConfirmError, setPasswordConfirmError] = useState(false)
  const [passwordInconsistentError, setpasswordInconsistentError] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const register = async (e: React.FormEvent) => {
    console.log('---->register')
    e.preventDefault();
    setFormSubmitted(true)
    if(!username) {
      setUsernameError(true)
      return
    }
    if(!password) {
      setPasswordError(true)
      return
    }
    if(!passwordConfirm) {
      setPasswordConfirmError(true)
      return
    }
    if (password !== passwordConfirm) {
      setpasswordInconsistentError(true)
      return
    }
    if(username && password) {
      // await setIsLoggedIn(true);
      // await setUsernameAction(username);
      const user: User = {
        id: null,
        username,
        password,
        avatar: '',
        gender,
        birthday: birthday.substring(0, 10),
        createTime: null,
        updateTime: null,
      }
      
      const responseData: any = await userRegister(user)
      console.log('---->responseData', responseData)
      if (responseData.code === 200) {
        history.push('/login', {direction: 'none'});
      } else {
        setAlertMessage(responseData.msg)
        setShowAlert(true)
      }
    
    }
  };

  return (
    <IonPage id="signup-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>注册</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={register}>
          <div className="avtar" ng-click="addPhoto();">
            <img ng-if="user.image!=1" src="/assets/icon/avatar.png"/>
          </div>

          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">用户名</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setUsername(e.detail.value!);
                setUsernameError(false);
              }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                请输入用户名
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">密码</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => {
                setPassword(e.detail.value!);
                setPasswordError(false);
              }}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                请输入密码
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">确认密码</IonLabel>
              <IonInput name="password" type="password" value={passwordConfirm} onIonChange={e => {
                setPasswordConfirm(e.detail.value!);
                setPasswordConfirmError(false);
              }}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordConfirmError && <IonText color="danger">
              <p className="ion-padding-start">
                请再次输入密码
              </p>
            </IonText>}

            {formSubmitted && passwordInconsistentError && <IonText color="danger">
              <p className="ion-padding-start">
                两次输入的密码不一致
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">性别</IonLabel>
              <IonSelect value={gender} placeholder="请选择" onIonChange={e => setGender(e.detail.value)}>
                <IonSelectOption value="female">女</IonSelectOption>
                <IonSelectOption value="male">男</IonSelectOption>
                <IonSelectOption value="secret">保密</IonSelectOption>
              </IonSelect>
            </IonItem>
           
            <IonItem>
              <IonLabel position="stacked" color="primary">出生日期</IonLabel>
              <IonDatetime placeholder="请选择" displayFormat="YYYY/MM/DD" value={birthday} onIonChange={e => setBirthday(e.detail.value!)}></IonDatetime>
            </IonItem>
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block" fill="solid">提交</IonButton>
            </IonCol>
          </IonRow>
        </form>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={'温馨提示'}
          message={alertMessage}
          buttons={['确定']}
        />
      </IonContent>

    </IonPage>
  );
}

export default withRouter(Register)
