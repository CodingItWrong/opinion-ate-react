import {loadRestaurants, createRestaurant} from './actions';

describe('actions', () => {
  let api;
  let setLoading;
  let setLoadError;
  let setRestaurants;

  beforeEach(() => {
    api = {
      loadRestaurants: jest.fn().mockName('api.loadRestaurants'),
      createRestaurant: jest.fn().mockName('api.createRestaurant'),
    };
    setLoading = jest.fn().mockName('setLoading');
    setLoadError = jest.fn().mockName('setLoadError');
    setRestaurants = jest.fn().mockName('setRestaurants');
  });

  describe('loadRestaurants', () => {
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

  describe('createRestaurant', () => {
    const newRestaurantName = 'Sushi Place';
    const existingRestaurant = {id: 1, name: 'Pizza Place'};
    const responseRestaurant = {id: 2, name: newRestaurantName};

    function call() {
      const restaurants = [existingRestaurant];
      return createRestaurant({
        api,
        name: newRestaurantName,
        restaurants,
        setRestaurants,
      });
    }

    it('saves the restaurant to the server', () => {
      call();
      expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
    });

    describe('when save succeeds', () => {
      it('stores the returned restaurant in the store', async () => {
        api.createRestaurant.mockResolvedValue(responseRestaurant);
        await call();
        expect(setRestaurants).toHaveBeenCalledWith([
          existingRestaurant,
          responseRestaurant,
        ]);
      });
    });

    describe('when save fails', () => {
      it('rejects', () => {
        api.createRestaurant.mockRejectedValue();
        const promise = call();
        return expect(promise).rejects.toBeUndefined();
      });
    });
  });
});
