import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import LoginFormReducer from './LoginFormReducer';
import RegisterFormReducer from './RegisterFormReducer';
import VisitFormReducer from './VisitFormReducer';
import UpdateProfileFormReducer from "./UpdateProfileFormReducer";
import UpdatePasswordFormReducer from "./UpdatePasswordFormReducer";

import VisitReducer from './VisitReducer';
import { reducer as FormReducer } from 'redux-form';
import PrisonerReducer from './PrisonerReducer';

export default combineReducers({
  auth: AuthReducer,
  prisoner: PrisonerReducer,
  visit: VisitReducer,
  form: FormReducer.plugin({
    Login: LoginFormReducer,
    Register: RegisterFormReducer,
    Visit: VisitFormReducer,
    UpdateProfile: UpdateProfileFormReducer,
    UpdatePassword: UpdatePasswordFormReducer,
  }),
});