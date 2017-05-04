import {
    SIGNUP_REQUEST,
    SIGNUP_FAILED,
    SIGNUP_INPUT_CHANGE
} from "actions/signup";

const initialState = {
    isFetching: false,
    email: "",
    password: "",
    pause: false,
    errors: {}
};

export default (state=initialState, action={}) => {
    switch (action.type) {

        case SIGNUP_REQUEST:
            return { ...state, isFetching: true, errors: {} };

        case SIGNUP_FAILED:
            return {
                ...state,
                isFetching: false,
                errors: action.errors,
                pause: true
            };

        case SIGNUP_INPUT_CHANGE:
            let { change } = action;
            if (change.hasOwnProperty("email")) {
                return {
                    ...state,
                    email: change.email,
                    errors: { ...state.errors, email: "" },
                    pause: false
                };
            }
            if (change.hasOwnProperty("password")) {
                return {
                    ...state,
                    password: change.password ,
                    errors: { ...state.errors, password: "" },
                    pause: false
                };
            }

        default: return state;
    }
};
