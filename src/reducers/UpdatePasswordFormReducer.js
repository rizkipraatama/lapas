import { UPDATE_PASSWORD, UPDATE_PASSWORD_FORM_IDLE } from "../constant/Actions";

const INITIAL_STATE = {
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_PASSWORD:
      return { ...state, loading: true, };
    case UPDATE_PASSWORD_FORM_IDLE:
      return { ...state, loading: false, };
    default:
      return state;
  }
};