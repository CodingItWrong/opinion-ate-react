import {combineReducers} from 'redux';
import {STORE_RESTAURANTS} from './actions';

const records = (state = [], action) => {
  switch (action.type) {
    case STORE_RESTAURANTS:
      return action.records;
    default:
      return state;
  }
};

const loading = () => true;

export default combineReducers({
  records,
  loading,
});
