import { AxiosError } from 'axios';
import * as Effects from 'redux-saga/effects';

import { AUTH_ACTIONS } from '../constants';
import { authUser } from '../api/authUser';
import { createAuthFailed, createAuthReceived } from '../actions/authActions';
import { RootState } from '../reducers/rootReducer';
import { AuthAction } from '../types';
import { createChangeModal } from '../actions/modalActions';

const { takeLatest, put, select, delay } = Effects;
const call: any = Effects.call;

function* authWorker({ payload }: AuthAction) {
  const { modalType } = yield select((state: RootState) => state.modal);
  const route = modalType === 'Sign up' ? 'signup' : 'signin';
  try {
    yield delay(2000)
    // const { data } = yield call(authUser, route, payload);
    yield put(createAuthReceived({id: 1, username: 'asdfasd', email: 'asdfasdf', createdAt: new Date()}));
    yield put(createChangeModal({ isOpen: false, modalType: '' }));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(createAuthFailed((error as AxiosError).message));
    } else console.log(error);
  }
}

export function* authWatcher() {
  yield takeLatest(AUTH_ACTIONS.AUTH_REQUESTED, authWorker);
}
