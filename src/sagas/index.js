import { fork } from "redux-saga/effects";
import { watchLoginRequest } from "sagas/login";
import { watchSignupRequest } from "sagas/signup";
import { watchSession } from "sagas/session"
import { usersRequest } from "sagas/users"

export default function* Root() {
    yield [
        fork(watchLoginRequest),
        fork(watchSignupRequest),
        fork(watchSession),
        fork(usersRequest),
    ];
}
