import {loadRestaurants} from './actions';

describe('actions', () => {
  describe('loadRestaurants', () => {
    let api;
    let setLoading;
    let setLoadError;
    let setRestaurants;

    beforeEach(() => {
      api = {
        loadRestaurants: jest.fn().mockName('api.loadRestaurants'),
      };
      setLoading = jest.fn().mockName('setLoading');
      setLoadError = jest.fn().mockName('setLoadError');
      setRestaurants = jest.fn().mockName('setRestaurants');
    });

    function call() {
      loadRestaurants({api, setLoading, setLoadError, setRestaurants});
    }

    describe('while loading', () => {
      beforeEach(() => {
        api.loadRestaurants.mockReturnValue(new Promise(() => {}));
        call();
      });

      it('sets the loading flag', () => {
        expect(setLoading).toHaveBeenCalledWith(true);
      });

      it('clears the load error flag', () => {
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
        expect(setLoading).toHaveBeenLastCalledWith(false);
      });
    });

    describe('when loading fails', () => {
      beforeEach(() => {
        api.loadRestaurants.mockRejectedValue();
        call();
      });

      it('sets the load error flag', () => {
        expect(setLoadError).toHaveBeenLastCalledWith(true);
      });

      it('clears the loading flag', () => {
        expect(setLoading).toHaveBeenLastCalledWith(false);
      });
    });
  });
});
