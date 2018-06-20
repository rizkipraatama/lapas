import { LOGIN_USER, LOGIN_FORM_IDLE } from "../constant/Actions";

const INITIAL_STATE = {
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, };
    case LOGIN_FORM_IDLE:
      return { ...state, loading: false, };
    default:
      return state;
  }
};