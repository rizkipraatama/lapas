import {
  SAVE_USER
} from '../constant/Actions';

import { me as UserMockData } from '../datamock'
// TODO: change user mock to real data
const INITIAL_STATE = {
  token: null,
  user: UserMockData,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SAVE_USER:
      return { ...state, token: action.payload.token, user: action.payload.user };
    default:
      return state;
  }
};