import React,  { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppContextProvider } from './data/AppContext';
import Chat from './pages/Chat'
import Signup from './pages/Signup'
import Menu from './components/Menu';
import Login from './pages/Login';
import SingleDay from './pages/SingleDay';
import MyHealthData from './pages/MyHealthData';
import StressDetail from './pages/StressDetail';
import RecordActivity from './pages/RecordActivity';
import { connect } from './data/connect';
import { setIsLoggedIn, setUsername, loadUserData, setUserId, setAvatar, setGender, setIsBoundGarmin } from './data/user/user.actions';
import RedirectToLogin from './components/RedirectToLogin';
import BindDevice from './components/BindDevice';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/index.css'

interface StateProps {
}

interface DispatchProps {
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
  setUserId: typeof setUserId;
  setAvatar: typeof setAvatar;
  setGender: typeof setGender;
  setIsBoundGarmin: typeof setIsBoundGarmin;
}

const App: React.FC = () => {

  return (
    <AppContextProvider>
      <ConfigProvider locale={zhCN}>
        <IonicAppConnected />
      </ConfigProvider>
    </AppContextProvider>
  );
};

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({ loadUserData, setIsLoggedIn, setUsername, setUserId, setAvatar, setGender, setIsBoundGarmin }) => {
  useEffect(() => {
    loadUserData();
    // eslint-disable-next-line
  }, []);

  const headItem = document.head;
  let oMeta = document.createElement('meta');
  oMeta.setAttribute('name','viewport');
  oMeta.setAttribute('content','width=device-width, initial-scale=1');
  headItem.appendChild(oMeta)
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            {/* <Route path="/home" component={Home} exact={true} /> */}
            <Route exact path="/" render={() => <Redirect to="/chat" />} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route path="/logout" render={() => {
              return <RedirectToLogin
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
                setUserId={setUserId}
                setAvatar={setAvatar}
                setGender={setGender}
                setIsBoundGarmin={setIsBoundGarmin}
              />;
            }} />
            <Route path="/bindDevice" render={() => {
              return <BindDevice />;
            }} />
            <Route exact path="/myHealthData" component={MyHealthData} />
            <Route exact path="/stressDetail" component={StressDetail} />
            <Route exact path="/recordActivity" component={RecordActivity} />
            <Route exact path="/singleDay" component={SingleDay} />
            {/* <Route exact path="/multiDay" component={MultiDay} />
            <Route exact path="/annotationSettings" component={AnnotationSettings} /> */}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}

const IonicAppConnected = connect<{}, {}, DispatchProps>({
  mapDispatchToProps: { loadUserData, setIsLoggedIn, setUsername, setUserId, setAvatar, setGender, setIsBoundGarmin },
  component: IonicApp
});

export default App;
