import { 
  LOGIN_USER, 
  REGISTER_USER,
  AUTH_USER

} from "../actions/types";
const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, register: action.payload };
    case REGISTER_USER:
      return { ...state, loginSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default userReducer;
