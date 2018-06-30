import { UPDATE_PROFILE, UPDATE_PROFILE_FORM_IDLE } from "../constant/Actions";

const INITIAL_STATE = {
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_PROFILE:
      return { ...state, loading: true, };
    case UPDATE_PROFILE_FORM_IDLE:
      return { ...state, loading: false, };
    default:
      return state;
  }
};