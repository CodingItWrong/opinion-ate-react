import {loadRestaurantsPure} from './RestaurantScreen';

describe('RestaurantScreen', () => {
  describe('loadRestaurantsPure', () => {
    let api;
    let setRestaurants;
    let setLoading;
    let setLoadError;

    beforeEach(() => {
      setRestaurants = jest.fn().mockName('setRestaurants');
      setLoading = jest.fn().mockName('setLoading');
      setLoadError = jest.fn().mockName('setLoadError');
      api = {
        loadRestaurants: jest.fn().mockName('api.loadRestaurants'),
      };
    });

    function call() {
      loadRestaurantsPure({api, setRestaurants, setLoading, setLoadError});
    }

    describe('while loading', () => {
      beforeEach(() => {
        const doesNotResolve = new Promise(() => {});
        api.loadRestaurants.mockImplementation(doesNotResolve);
        call();
      });

      it('sets the loading flag', () => {
        expect(setLoading).toHaveBeenCalledWith(true);
      });

      it('clears the error flag', () => {
        expect(setLoadError).toHaveBeenCalledWith(false);
      });
    });

    describe('when loading succeeds', () => {
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ];

      beforeEach(() => {
        api.loadRestaurants.mockResolvedValue(records);
        call();
      });

      it('stores the restaurants', () => {
        expect(setRestaurants).toHaveBeenCalledWith(records);
      });

      it('clears the loading flag', () => {
        expect(setLoading).toHaveBeenCalledWith(false);
      });
    });

    describe('when loading fails', () => {
      beforeEach(() => {
        api.loadRestaurants.mockRejectedValue();
        return call();
      });

      it('sets an error flag', () => {
        expect(setLoadError).toHaveBeenCalledWith(true);
      });

      it('clears the loading flag', () => {
        expect(setLoading).toHaveBeenCalledWith(false);
      });
    });
  });
});
