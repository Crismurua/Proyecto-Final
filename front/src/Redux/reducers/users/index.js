import {
  GET_USERS,
  GET_USER_DETAIL,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  USER_ONLINE,
  CURRENT_USER,
} from "../../actions/users/action-types.js";

const initialState = {
  users: [],
  userDetail: {},
  online: false,
  currentUser: null,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, { ...action.payload }],
      };
    case EDIT_USER:
      return {
        ...state,        
        users: state.users.map((u) => {
          if (u.id === action.payload.id) {
            return action.payload;
          } else {
            return u;
          }})
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
    case USER_ONLINE:
      return {
        ...state,
        online: !state.online,
      };
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
