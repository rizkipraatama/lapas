import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import LoginFormReducer from './LoginFormReducer';
import RegisterFormReducer from './RegisterFormReducer';
import VisitReducer from './VisitReducer';
import { reducer as FormReducer } from 'redux-form';
import VisitFormReducer from './VisitFormReducer';

export default combineReducers({
  auth: AuthReducer,
  visit: VisitReducer,
  form: FormReducer.plugin({
    Login: LoginFormReducer,
    Register: RegisterFormReducer,
    Visit: VisitFormReducer,
  }),
});