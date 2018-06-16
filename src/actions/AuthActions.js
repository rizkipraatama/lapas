import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';
import { Alert } from 'react-native';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER});
    fetch('http://35.198.204.194:8000/api/authenticate', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    })
    .then((response) => response.json())
    .then((r) => {
        if (r.token) {
          loginUserSuccess(dispatch, r.token);
        } else {
          loginUserFail(dispatch);
        }
    });
  }
}

const loginUserFail = (dispatch) => {
  dispatch({type: LOGIN_USER_FAIL});
}

const loginUserSuccess = (dispatch, token) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: token
  });
  Alert.alert('Authenticated', `Token: ${token}`, [{text: 'OK', onPress: () => {}}])
};