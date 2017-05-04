import { takeEvery, delay } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { browserHistory } from 'react-router'
import { fetchApi } from 'utils/api-fetch'

import { addFlashMessage } from "actions/flashMessages";
import * as loginActions from "actions/login";
import * as userActions from "actions/user";

function* login_process(action) {
  try {
    yield delay(1000);
    const payload = yield call( postLoginToAPI, action.loginData);
    if(payload.user && payload.tokens){
      yield put(userActions.userLogin(payload));
      yield put(userActions.userSessionRefreshToken(payload));
      browserHistory.push('/dashboard');
    } else {
      yield put(loginActions.loginFailed({message: 'Invalid email/password'}));
    }
  } catch (e) {
    yield put(loginActions.loginFailed({message: 'Invalid email/password'}));
  }
}


const postLoginToAPI = data => {
    const headers = {
      'Authorization': `Basic ${new Buffer(`${data.email}:${data.password}`).toString('base64')}`,
    }
    return fetchApi("/users/auth", {}, 'post', headers );
};

export function* watchLoginRequest() {
    yield* takeEvery( loginActions.LOGIN_REQUEST, login_process );
}
