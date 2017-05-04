import { takeEvery, delay } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { fetchApi } from 'utils/api-fetch'
import * as userActions from "actions/user";

function* users_process(action) {
  try {
      yield delay(1000); // simulate long db query
      const session = yield select(state => state.user);
      const payload = yield call(fetchUsers, session);
      if(payload.users){
        yield put({ type: userActions.USERS_FETCH_SUCCESS, ...payload });
      }

  } catch (e) {
    console.log(e);
  }
}


const fetchUsers = session => {
    const accessToken = session.tokens.access.value;
    return fetchApi('/users', {}, 'get', {
      Authorization: `Bearer ${accessToken}`,
    });
};

export function* usersRequest() {
    yield* takeEvery( userActions.USERS_FETCH_REQUEST, users_process );
}
