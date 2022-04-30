import {combineReducers} from 'redux';
import {
  START_LOADING,
  STORE_RESTAURANTS,
  RECORD_LOADING_ERROR,
  ADD_RESTAURANT,
} from './actions';

function records(state = [], action) {
  switch (action.type) {
    case STORE_RESTAURANTS:
      return action.records;
    case ADD_RESTAURANT:
      return [...state, action.record];
    default:
      return state;
  }
}

function loading(state = false, action) {
  switch (action.type) {
    case START_LOADING:
      return true;
    case STORE_RESTAURANTS:
    case RECORD_LOADING_ERROR:
      return false;
    default:
      return state;
  }
}

function loadError(state = false, action) {
  switch (action.type) {
    case START_LOADING:
      return false;
    case RECORD_LOADING_ERROR:
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  records,
  loading,
  loadError,
});
