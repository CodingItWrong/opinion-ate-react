import {loadRestaurantsPure, createRestaurantPure} from './RestaurantScreen';

describe('RestaurantScreen', () => {
  const doesNotResolve = () => new Promise(() => {});

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

  describe('createRestaurantPure', () => {
    const newRestaurantName = 'Sushi Place';
    const existingRestaurant = {id: 1, name: 'Pizza Place'};
    const responseRestaurant = {id: 2, name: newRestaurantName};

    let api;
    let setRestaurants;

    beforeEach(() => {
      setRestaurants = jest.fn().mockName('setRestaurants');
      api = {
        createRestaurant: jest.fn().mockName('api.createRestaurant'),
      };
    });

    function call() {
      return createRestaurantPure({
        api,
        name: newRestaurantName,
        restaurants: [existingRestaurant],
        setRestaurants,
      });
    }

    it('saves the restaurant to the server', () => {
      api.createRestaurant.mockImplementation(doesNotResolve);
      call();

      expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
    });

    describe('when save succeeds', () => {
      beforeEach(() => {
        api.createRestaurant.mockResolvedValue(responseRestaurant);
        call();
      });

      it('adds the returned restaurant to the list', () => {
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
