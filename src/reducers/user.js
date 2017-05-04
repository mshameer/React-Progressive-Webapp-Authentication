import {
    USER_LOGIN,
    USER_LOGOUT,
    USERS_FETCH_SUCCESS,
} from "actions/user";

const initialState = {
    isAuthenticated: false,
    user: null,
    tokens: {},
};

export default (state=initialState, action={}) => {
    switch (action.type) {
      case USER_LOGIN:
        const { user, tokens } = action.user;
        const foTokens = tokens.reduce((prev, item) => ({ ...prev, [item.type]: item }), {});
        return { ...state, user, tokens: foTokens, isAuthenticated: true };
      case USER_LOGOUT:
        return {  ...state, user: null, tokens: {}, isAuthenticated: false };
      case USERS_FETCH_SUCCESS:
        return { ...state, users: action.users };
      default: return state;
    }
};
