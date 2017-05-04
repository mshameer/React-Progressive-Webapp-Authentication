import 'babel-polyfill';
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "sagas";
import rootReducer from "reducers";
import { loadState, saveState } from "utils/local-storage";


const sagaMiddleware = createSagaMiddleware();


function throttle(callback, wait, context = this) {
  let timeout = null
  let callbackArgs = null

  const later = () => {
    callback.apply(context, callbackArgs)
    timeout = null
  }

  return function() {
    if (!timeout) {
      callbackArgs = arguments
      timeout = setTimeout(later, wait)
    }
  }
}

const configureStore = () => {

    const persistedState = loadState();
    const middlewares = [sagaMiddleware];
    const store = createStore(
        rootReducer,
        persistedState,
        compose(
            applyMiddleware(...middlewares),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    sagaMiddleware.run(rootSaga);

    store.subscribe(throttle(() => {
      saveState({
        user: store.getState().user
      })
    }, 1000))

    if (module.hot) {
      module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers').default;
        store.replaceReducer(nextRootReducer);
      });
    }

    return store;
};

export default configureStore;
