import {
  LOGIN_USER,
  LOGIN_FORM_IDLE,
  CREATE_USER,
  REGISTER_FORM_IDLE,
  SAVE_USER,
  DELETE_USER,
} from '../constant/Actions';
import { Alert, AsyncStorage } from "react-native";
import Navigation from '../services/Navigation';
import { change, reset, SubmissionError } from "redux-form";

import { formRequest } from "../services/Networking";

export const gettingAuth = () => {
  return async (dispatch) => {
    try {
      const auth = await AsyncStorage.getItem('auth');
      if (auth) {
        const { token, user } = JSON.parse(auth);
        setUserNavigateHome(dispatch, token, user);
      } else {
        Navigation.replaceWith('Login');
      }
    } catch (error) {
      console.tron.error(error);
      //Alert.alert("Penyimpanan AsyncStorage gagal!", "Kesalahan aplikasi atau hak akses storage dinonaktifkan");
    }
  }
}

export const loginUser = ({username, password}, dispatch, props) => {
  dispatch({type: LOGIN_USER});
  return formRequest('/Login/secret_login_url', 'POST', {username, password})
    .then((r) => {
      dispatch({type: LOGIN_FORM_IDLE });
      if (r.error == false) {
        const profile = JSON.parse(r.profile);        
        loginUserSuccess(dispatch, profile['access_token'], profile);
      } else {
        loginUserFail(dispatch, r.msg);
      }
    }).catch((e)=>{
      dispatch({type: LOGIN_FORM_IDLE });
      console.log(e);
    });
}

const loginUserFail = (dispatch, message) => {
  Alert.alert("Login Gagal", message);
  dispatch(change('Login', 'password', ''));
  //throw new SubmissionError({_error: message});
}

const loginUserSuccess = async (dispatch, token, user) => {
  try { 
    await AsyncStorage.setItem('auth', JSON.stringify({ token, user }));
    setUserNavigateHome(dispatch, token, user);
  } catch (error) {
    Alert.alert("Penyimpanan AsyncStorage gagal!", "Kesalahan aplikasi atau hak akses storage dinonaktifkan");
  }
};

const setUserNavigateHome = (dispatch, token, user) => {
  dispatch({ type: SAVE_USER, payload: { token, user } });
  dispatch(reset('Login'));
  Navigation.replaceWith('Home');
}

export const createUser = ({fullname, username, gender, password, address, nik, nohp}, dispatch, props) => {
  dispatch({type: CREATE_USER});
  return formRequest('/api/register', 'POST', {
    nama: fullname, username, password, alamat: address,
    nik, telepon: nohp, jenis_kelamin: gender
  }).then((r) => {
      dispatch({type: REGISTER_FORM_IDLE });
      if (!r.error) {
        createUserSuccess(dispatch);
      } else {
        createUserFailed(dispatch, r.error_message);
      }
    }).catch((error) => {
      dispatch({type: REGISTER_FORM_IDLE });
      console.tron.error(error);
    });
}

const createUserFailed = (dispatch, message) => {
  Alert.alert('Pendaftaran Gagal', message);
}

const createUserSuccess = (dispatch) => {
  dispatch(reset('Register'));
  Alert.alert(
    'Pendaftaran Berhasil', 
    'Silahkan login!',
    [
      { text: 'OK', onPress: () => { Navigation.replaceWith('Login'); } },
    ],
    { cancelable: false }
  );
}

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('auth');
      deleteUserNavigateLogin(dispatch);
    } catch (error) {
      Alert.alert("Penyimpanan AsyncStorage gagal!", "Kesalahan aplikasi atau hak akses storage dinonaktifkan");
    }
  };
}

const deleteUserNavigateLogin = (dispatch) => {
  dispatch({ type: DELETE_USER });
  Navigation.replaceWith('Login');
}

