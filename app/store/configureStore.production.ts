import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const enhancer = applyMiddleware(ReduxThunk);

function configureStore(initialState?: object) {
  return createStore(rootReducer, initialState, enhancer);
}

export default configureStore;
