import {
    SIGNUP_REQUEST,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    SIGNUP_INPUT_CHANGE
} from "actions/signup";

const initialState = {
    email: "",
    firstName: "",
    password: "",
    errors: {}
};

export default (state=initialState, action={}) => {
    switch (action.type) {

        case SIGNUP_REQUEST:
            return { ...state, isFetching: true, errors: {} };

        case SIGNUP_FAILED:
            return {
                ...state,
                errors: {  ...state.errors, message: action.message },
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.user,
                errors: {  ...state.errors, message: action.message },
            };

        case SIGNUP_INPUT_CHANGE:
            let { change } = action;
            if (change.hasOwnProperty("firstName")) {
                return {
                  ...state,
                  firstName: change.firstName ,
                  errors: { ...state.errors, firstName: "", message: "" },
                };
            }
            if (change.hasOwnProperty("email")) {
                return {
                  ...state,
                  email: change.email,
                  errors: { ...state.errors, email: "", message: "" },
                };
            }
            if (change.hasOwnProperty("password")) {
                return {
                  ...state,
                  password: change.password ,
                  errors: { ...state.errors, password: "", message: "" },
                };
            }

        default: return state;
    }
};
