import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonAlert } from '@ionic/react';
import './css/Login.scss';
import { setIsLoggedIn, setUsername, setAvatar, setUserId, setIsBoundGarmin } from '../data/user/user.actions';
import { RouteComponentProps } from 'react-router';
import { userLogin } from '../service/userService'
import { connect } from '../data/connect';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
  setUserId: typeof setUserId;
  setAvatar: typeof setAvatar;
  setIsBoundGarmin: typeof setIsBoundGarmin;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction, setUserId: setUserIdAction, setAvatar: setAvatarAction, setIsBoundGarmin: setIsBoundGarminAction}) => {
// const Login: React.FC<LoginProps> = ({ history }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
      return
    }
    if(!password) {
      setPasswordError(true);
      return
    }
    const responseData: any = await userLogin(username, password)
    //   history.push('/tabs/schedule', {direction: 'none'});
    if (responseData.code === 200) {
      const user = responseData.data?.user
      const isBoundGarmin = responseData.data?.isBoundGarmin
      await setIsLoggedIn(true)
      await setUserIdAction(user.id)
      await setUsernameAction(user.username)
      await setAvatarAction(user.avatar) 
      console.log('---->isBoundGarmin', isBoundGarmin)
      await setIsBoundGarminAction(isBoundGarmin)
      history.push('/chat', {direction: 'none'})
    } else {
      setAlertMessage(responseData.msg)
      setShowAlert(true)
    }
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>登录</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="login-logo">
          <img src="assets/icon/hygge.png" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={login} style={{marginTop: "0px"}}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">用户名</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
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
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                请输入密码
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block" fill="solid">登录</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block" fill="solid">注册</IonButton>
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
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername,
    setUserId,
    setAvatar,
    setIsBoundGarmin
  },
  component: Login
})
