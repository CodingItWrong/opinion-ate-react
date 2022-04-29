import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import api from '../api';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(api)),
);

export default store;
