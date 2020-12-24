import React, { useEffect, useContext } from 'react';
import { IonRouterContext } from '@ionic/react';

interface RedirectToLoginProps {
  setIsLoggedIn: Function;
  setUsername: Function;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setUsername }) => {
  console.log('-----RedirectToLogin')
  const ionRouterContext = useContext(IonRouterContext);
  useEffect(() => {
    setIsLoggedIn(false);
    setUsername(undefined);
    ionRouterContext.push('/chat')
  }, [setIsLoggedIn, setUsername, ionRouterContext]);
  return null;
};

export default RedirectToLogin;
