export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_SESSION_REFRESH_TOKEN = "USER_SESSION_REFRESH_TOKEN";
export const USERS_FETCH_REQUEST = "USERS_FETCH_REQUEST";
export const USERS_FETCH_SUCCESS = "USERS_FETCH_SUCCESS";
// for login or signup
export const userLogin = (user) => ({
    type: USER_LOGIN,
    user
});

// for logout
export const userLogout = () => ({
    type: USER_LOGOUT_REQUEST
});

// for user session refesh token
export const userSessionRefreshToken = (user) => ({
    type: USER_SESSION_REFRESH_TOKEN,
    user
});

export const fetchUsers = () => ({
    type: USERS_FETCH_REQUEST,
});
