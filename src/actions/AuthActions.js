import {
  LOGIN_USER,
  LOGIN_FORM_IDLE,
  CREATE_USER,
  REGISTER_FORM_IDLE,
  SAVE_USER,
} from '../constant/Actions';
import { Alert } from "react-native";
import Navigation from '../services/Navigation';
import { change, reset, SubmissionError } from "redux-form";

// TODO: Ganti payload 'email' jadi username.
export const loginUser = ({username, password}, dispatch, props) => {
  dispatch({type: LOGIN_USER});
  return fetch('http://35.198.204.194:8000/api/authenticate', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
    // TODO: for now the correct username: ab@a.com, password: admin
    body: JSON.stringify({email: username, password}),
  })
  .then((response) => response.json())
  .then((r) => {
      dispatch({type: LOGIN_FORM_IDLE });
      if (r.token) {
        loginUserSuccess(dispatch, r.token);
      } else {
        loginUserFail(dispatch, r.message);
      }
  });
}

const loginUserFail = (dispatch, message) => {
  Alert.alert("Login Gagal", message);
  dispatch(change('Login', 'password', ''));
  //throw new SubmissionError({_error: message});
}

const loginUserSuccess = (dispatch, token) => {
  dispatch({ type: SAVE_USER, payload: token });
  dispatch(reset('Login'));
  Navigation.navigate('Utama');
}; 

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

