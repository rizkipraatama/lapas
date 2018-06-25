import { VISIT_PRISONER, VISIT_FORM_IDLE } from "../constant/Actions";

const INITIAL_STATE = {
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case VISIT_PRISONER:
      return { ...state, loading: true, };
    case VISIT_FORM_IDLE:
      return { ...state, loading: false, };
    default:
      return state;
  }
};