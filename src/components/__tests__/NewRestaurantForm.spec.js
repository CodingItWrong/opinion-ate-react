import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import flushPromises from 'flush-promises';
import {NewRestaurantForm} from '../NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = 'Name is required';

  let createRestaurant;

  beforeEach(() => {
    createRestaurant = jest.fn().mockName('createRestaurant');
    render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  });

  describe('when filled in', () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();
      await userEvent.type(
        screen.getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );
      userEvent.click(screen.getByTestId('new-restaurant-submit-button'));

      return act(flushPromises);
    });

    it('calls createRestaurant with the name', () => {
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it('clears the name', () => {
      expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual('');
    });
  });

  describe('when empty', () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();

      userEvent.click(screen.getByTestId('new-restaurant-submit-button'));

      return act(flushPromises);
    });

    it('displays a validation error', () => {
      expect(screen.queryByText(requiredError)).not.toBeNull();
    });
  });
});
