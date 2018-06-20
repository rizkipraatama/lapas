import { CREATE_USER, REGISTER_FORM_IDLE } from "../constant/Actions";

const INITIAL_STATE = {
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CREATE_USER:
      return { ...state, loading: true, };
    case REGISTER_FORM_IDLE:
      return { ...state, loading: false, };
    default:
      return state;
  }
};