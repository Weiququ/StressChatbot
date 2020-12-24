import React,  { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppContextProvider } from './data/AppContext';
import Home from './pages/Home';
import Chat from './pages/Chat'
import Signup from './pages/Signup'
import Menu from './components/Menu';
import Login from './pages/Login';
import MyHealthData from './pages/MyHealthData';
import MyHealthDataGlass from './pages/MyHealthDataGlass';
import StressDetail from './pages/StressDetail';
import { connect } from './data/connect';
import { setIsLoggedIn, setUsername, loadUserData } from './data/user/user.actions';
import RedirectToLogin from './components/RedirectToLogin';
import BindDevice from './components/BindDevice';

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

interface StateProps {
}

interface DispatchProps {
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({ setIsLoggedIn, setUsername, loadUserData }) => {
  useEffect(() => {
    loadUserData();
    // eslint-disable-next-line
  }, []);

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
          />;
        }} />
        <Route path="/bindDevice" render={() => {
          return <BindDevice />;
        }} />
      <Route exact path="/myHealthData" component={MyHealthData} />
      <Route exact path="/stressDetail" component={StressDetail} />
      </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
  )
}

const IonicAppConnected = connect<{}, {}, DispatchProps>({
  mapDispatchToProps: { loadUserData, setIsLoggedIn, setUsername },
  component: IonicApp
});

export default App;
