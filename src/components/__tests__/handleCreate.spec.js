import {handleCreate} from '../NewRestaurantForm';

describe('handleCreate', () => {
  const restaurantName = 'Sushi Place';
  const doesNotResolve = new Promise(() => {});

  let updateState;
  let createRestaurant;

  beforeEach(() => {
    updateState = jest.fn().mockName('updateState');
    createRestaurant = jest.fn().mockName('createRestaurant');
  });

  describe('when empty', () => {
    const state = {name: ''};

    beforeEach(() => {
      createRestaurant.mockResolvedValue();
      return handleCreate({state, updateState, createRestaurant});
    });

    it('sets a validation error and clears any server error', () => {
      expect(updateState).toHaveBeenCalledTimes(1);
      expect(updateState).toHaveBeenCalledWith({
        validationError: true,
        serverError: false,
      });
    });

    it('does not call createRestaurant', () => {
      expect(createRestaurant).not.toHaveBeenCalled();
    });
  });

  describe('when filled', () => {
    describe('initially', () => {
      const state = {name: restaurantName};

      beforeEach(() => {
        createRestaurant.mockReturnValue(doesNotResolve);

        // do not return/await
        handleCreate({state, updateState, createRestaurant});
      });

      it('clears errors', () => {
        expect(updateState).toHaveBeenCalledTimes(1);
        expect(updateState).toHaveBeenCalledWith({
          validationError: false,
          serverError: false,
        });
      });
    });

    describe('when the store action resolves', () => {
      const state = {name: restaurantName};

      beforeEach(() => {
        createRestaurant.mockResolvedValue();
        return handleCreate({state, updateState, createRestaurant});
      });

      it('calls createRestaurant with the name', () => {
        expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
      });

      it('clears the name and errors', () => {
        expect(updateState).toHaveBeenCalledTimes(2);
        expect(updateState).toHaveBeenCalledWith({
          name: '',
        });
      });
    });

    describe('when the store action rejects', () => {
      const state = {name: restaurantName};

      beforeEach(() => {
        createRestaurant.mockRejectedValue();
        return handleCreate({state, updateState, createRestaurant});
      });

      it('clears errors', () => {
        expect(updateState).toHaveBeenCalledTimes(2);
        expect(updateState).toHaveBeenCalledWith({
          serverError: true,
        });
      });
    });
  });
});
