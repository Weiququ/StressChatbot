import React from 'react';
import { RouteComponentProps, useLocation, withRouter } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from '@ionic/react';
import { logIn, logOut, person, personAdd, watch, analytics } from 'ionicons/icons';

import { connect } from '../data/connect';
// import { connect } from 'react-redux'
import './Menu.css'

const routes = {
  unboundDevicePages: [
    { title: '绑定Garmin设备', path: '/bindDevice', icon: watch }
  ],
  boundDevicePages: [
    { title: '我的健康数据', path: '/myHealthData', icon: analytics },
    // { title: '解绑Garmin设备', path: '/unbindDevice', icon: watch }
  ],
  loggedInPages: [
    // { title: '个人资料', path: '/account', icon: person },
    { title: '退出', path: '/logout', icon: logOut }
  ],
  loggedOutPages: [
    { title: '登录', path: '/login', icon: logIn },
    { title: '注册', path: '/signup', icon: personAdd }
  ]
};
 
interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string
}
interface StateProps {
  isAuthenticated: boolean;
  isBoundGarmin: boolean;
}

interface DispatchProps {
  // setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ isAuthenticated, isBoundGarmin }) => {
// const Menu: React.FC<MenuProps> = () => {
  const location = useLocation();

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem detail={false} routerLink={p.path} routerDirection="none" className={location.pathname.startsWith(p.path) ? 'selected' : undefined}>
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>我的设备</IonListHeader>
          {isBoundGarmin ? renderlistItems(routes.boundDevicePages) : renderlistItems(routes.unboundDevicePages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>我的账号</IonListHeader>
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};


export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    isAuthenticated: state.user.isLoggedin,
    isBoundGarmin: state.user.isBoundGarmin
  }),
  component: withRouter(Menu)
})



//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
// export default connect(mapStateToProps, mapDispatchToProps)(Counter)

//将state.counter绑定到props的counter
// const mapStateToProps = (state: any) => {
//   console.log('---->mapStateToProps', mapStateToProps)
//   return {
//     isAuthenticated: state.user.isLoggedin 
//   }
// };

//将action的所有方法绑定到props上
// const mapDispatchToProps = (dispatch: any, ownProps: any) => {
//   return {
//     increment: (...args) => dispatch(actions.increment(...args)),
//     decrement: (...args) => dispatch(actions.decrement(...args))

//   }
// };

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
// export default connect(mapStateToProps, {})(withRouter(Menu))
