import * as Rx from '../lib/rxjs.umd.min';
import { userSvc } from '../services/user';

const types = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO'
};

const states = {
  user$$: new Rx.BehaviorSubject(userSvc.getUserInfo())
};

const actions = {
  [types.UPDATE_USER_INFO] () {
    return 'laoming';
  }
};

function dispatch(action, args) {
  switch (action) {
    case types.UPDATE_USER_INFO:
      var newStates = actions[types.UPDATE_USER_INFO]();
      states.user$$.next(newStates);
      break;
  }
}

export { types, states, actions, dispatch };
