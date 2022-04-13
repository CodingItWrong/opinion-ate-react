import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import api from '../api';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(api)),
);

export default store;
