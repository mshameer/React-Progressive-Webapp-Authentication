export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_INPUT_CHANGE = "LOGIN_INPUT_CHANGE";

export const loginRequest = (loginData) => ({
    type: LOGIN_REQUEST,
    loginData
});

export const loginFailed = (errors) => ({
    type: LOGIN_FAILED,
    errors
});

export const loginInputChange = (change) => ({
    type: LOGIN_INPUT_CHANGE,
    change
});
