import { takeEvery, delay } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { fetchApi, exceptionExtractError } from 'utils/api-fetch'
import * as signupActions from "actions/signup";

function* signup_process(action) {
    try {
        yield delay(1000); // simulate long db query
        const payload = yield call(
            postSignupUser,
            action.signupData
        );

        if(payload.user){
          yield put({ type: signupActions.SIGNUP_SUCCESS, user: payload.user, message: 'Signup Success' });
        } else {
          yield put({ type: signupActions.SIGNUP_FAILED, message: 'Signup Failed' });
        }
    } catch (e) {
      console.log(e);
    }
}

const postSignupUser = data => {
  return fetchApi("/users", data, 'post');
};

export function* watchSignupRequest() {
    yield* takeEvery( signupActions.SIGNUP_REQUEST, signup_process );
}
