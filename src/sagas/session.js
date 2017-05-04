import { takeEvery, delay, takeLatest } from "redux-saga";
import { call, put, select, take, throttle, fork, cancel, cancelled, spawn } from "redux-saga/effects";
import { fetchApi } from 'utils/api-fetch'
import { browserHistory } from 'react-router'

import { addFlashMessage } from "actions/flashMessages";
import * as loginActions from "actions/login";
import * as userActions from "actions/user";

const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

function* refresh_token_process() {
  try {
    while (true) {
      const session = yield select(state => state.user);
      const duration = session.tokens.access.expiresIn

      yield call(delay, (duration - SESSION_TIMEOUT_THRESHOLD) * 1000)
      const payload = yield call(refreshToken, session);
      if(payload.user && payload.tokens){
        yield put(userActions.userLogin(payload));
      } else {
        yield put(userActions.userLogout());
      }
    }
  } finally {
    if (yield cancelled()) {
      browserHistory.push('/');
    }
  }
}

function* logout() {
  const session = yield select(state => state.user);
  yield call(revoke, session);
  yield put({ type: userActions.USER_LOGOUT });
}

const refreshToken = (session) => {
	if (!session.tokens || !session.user.id) {
		return Promise.reject();
	}

  return fetchApi('/users/auth/refresh', { token: session.tokens.refresh, user: session.user }, 'post', {
    Authorization: null,
  });

};

const revoke = (session) => {
  const tokens = Object.keys(session.tokens).map(tokenKey => ({
		type: session.tokens[tokenKey].type,
		value: session.tokens[tokenKey].value,
	}))
  const accessToken = session.tokens.access.value;
  return fetchApi('/users/auth/revoke', { tokens }, 'post', {
    Authorization: `Bearer ${accessToken}`,
  });
};

let refreshTask;

export function* watchSession() {
  while (true) {
    const action = yield take([ userActions.USER_SESSION_REFRESH_TOKEN, userActions.USER_LOGOUT_REQUEST ]);
    refreshTask = yield spawn(refresh_token_process);
    if(action.type === userActions.USER_LOGOUT_REQUEST) {
      yield fork(logout);
      yield cancel(refreshTask);
    }
  }
}
