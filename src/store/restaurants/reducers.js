import {combineReducers} from 'redux';
import {START_LOADING, STORE_RESTAURANTS} from './actions';

const records = (state = [], action) => {
  switch (action.type) {
    case STORE_RESTAURANTS:
      return action.records;
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case STORE_RESTAURANTS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  records,
  loading,
});
