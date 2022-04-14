import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurantForm} from '../NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';

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
    });

    it('calls createRestaurant with the name', () => {
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it('clears the name', () => {
      expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual('');
    });
  });
});
