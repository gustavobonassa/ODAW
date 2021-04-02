import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';

import { toast } from 'react-toastify';
import history from '../../../services/history';

import { signInSuccess } from './actions';

export function* signIn({ username, password }) {

    try {
        const response = yield call(api.post, `/sessions`, { username, password });

        if (response && response.status === 200) {

            const { token } = response.data;
            api.defaults.headers.Authorization = `Bearer ${token}`;

            yield put(signInSuccess(token));
            history.push("/dashboard")
        }
    } catch (err) {
        toast.error(err.response.data.error);
        return;
    }
}

export default all([
    takeLatest('@user/SIGNIN_REQUEST', signIn),
]);
