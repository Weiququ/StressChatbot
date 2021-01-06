import React, { useEffect, useContext } from 'react';
import { IonRouterContext } from '@ionic/react';
import { DefaultAvatar } from '../utils/constants'

interface RedirectToLoginProps {
  setIsLoggedIn: Function;
  setUsername: Function;
  setUserId: Function;
  setAvatar: Function;
  setGender: Function;
  setIsBoundGarmin: Function;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setUsername, setUserId, setAvatar, setGender, setIsBoundGarmin }) => {
  console.log('-----RedirectToLogin')
  const ionRouterContext = useContext(IonRouterContext);
  useEffect(() => {
    setIsLoggedIn(false);
    setUsername('');
    setUserId(-1);
    setAvatar(DefaultAvatar);
    setGender('secret');
    setIsBoundGarmin(false);
    ionRouterContext.push('/chat')
  }, [setIsLoggedIn, setUsername, setUserId, setAvatar, setGender, setIsBoundGarmin, ionRouterContext]);
  return null;
};

export default RedirectToLogin;
