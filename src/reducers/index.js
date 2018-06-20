import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import LoginFormReducer from './LoginFormReducer';
import RegisterFormReducer from './RegisterFormReducer';
import { reducer as FormReducer } from 'redux-form';

export default combineReducers({
  auth: AuthReducer,
  form: FormReducer.plugin({
    Login: LoginFormReducer,
    Register: RegisterFormReducer,
  }),
});