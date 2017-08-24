import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const enhancer = applyMiddleware(thunk);

function configureStore(initialState?: object) {
  return createStore(rootReducer, initialState, enhancer);
}

export default configureStore;
