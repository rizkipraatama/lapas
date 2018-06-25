import { VISITATION, VISITATION_SUCC } from "../constant/Actions";

const INITIAL_STATE = {
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case VISITATION:
      return { ...state, loading: true, };
    case VISITATION_SUCC:
      return { ...state, loading: false, };
    default:
      return state;
  }
};