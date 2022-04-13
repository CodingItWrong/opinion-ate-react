import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import restaurantsReducer from '../restaurants/reducers';
import {loadRestaurants} from '../restaurants/actions';

describe('restaurants', () => {
  describe('loadRestaurants action', () => {
    describe('while loading', () => {
      it('sets a loading flag', () => {
        const api = {
          loadRestaurants: () => new Promise(() => {}),
        };

        const initialState = {};

        const store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        store.dispatch(loadRestaurants());

        expect(store.getState().loading).toEqual(true);
      });
    });

    describe('when loading succeeds', () => {
      it('stores the restaurants', async () => {
        const records = [
          {id: 1, name: 'Sushi Place'},
          {id: 2, name: 'Pizza Place'},
        ];

        const api = {
          loadRestaurants: () => Promise.resolve(records),
        };

        const initialState = {
          records: [],
        };

        const store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        await store.dispatch(loadRestaurants());

        expect(store.getState().records).toEqual(records);
      });
    });
  });
});
