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

export const gettingAuth = () => {
  return async (dispatch) => {
    try {
      const auth = await AsyncStorage.getItem('auth');
      if (auth) {
        const { token, user } = JSON.parse(auth);
        setUserNavigateHome(dispatch, token, user);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Penyimpanan AsyncStorage gagal!", "Kesalahan aplikasi atau hak akses storage dinonaktifkan");
    }
  }
}

export const loginUser = ({username, password}, dispatch, props) => {
  dispatch({type: LOGIN_USER});
  return fetch('http://pratamaserv.com/userLogin.php', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  })
  .then((response) => response.json())
  .then((r) => {
      dispatch({type: LOGIN_FORM_IDLE });
      if (r.error == false) {
        // TODO: Change user mock to real data
        token = "2323";
        loginUserSuccess(dispatch, token, r.user);
      } else {
        loginUserFail(dispatch, r.msg);
      }
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
  Navigation.navigate('Home');
}

export const createUser = ({fullname, username, email, password, address, nik, nohp}, dispatch, props) => {
  dispatch({type: CREATE_USER});
  return fetch('http://pratamaserv.com/insert_new_user.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: fullname,
      username,
      email,
      password,
      alamat: address,
      nik,
      nohp
    })
  })
  .then((response) => { 
    dispatch({type: REGISTER_FORM_IDLE });
    return response.json()
  })
  .then((responseJson) => {
    createUserSuccess(dispatch, responseJson);
  }).catch((error) => {
    createUserFailed(dispatch, error);
  });
}

const createUserFailed = (dispatch, message) => {
  Alert.alert('Pendaftaran Gagal', message);
}

const createUserSuccess = (dispatch) => {
  Alert.alert(
    'Pendaftaran Berhasil', 
    'Silahkan login!',
    [
      { text: 'OK', onPress: () => { Navigation.navigate('Login'); } },
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
  Navigation.navigate('Login');
}

