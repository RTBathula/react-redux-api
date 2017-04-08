import cookie from 'react-cookie'
import _ from 'underscore'


export const validateEmail = (email) => {
  let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return expr.test(email);
};

export const capitalizeFirstLetter = (txt) => {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
};

export const getTokenFromCookie = () => {
  let token = cookie.load('token');
  return token ? token : null;
};

export const setTokenInCookie = (token) => {
  cookie.save('token', token, { path: '/' });
};

export const removeTokenFromCookie = () => {
  cookie.remove('token', { path: '/' });
};

