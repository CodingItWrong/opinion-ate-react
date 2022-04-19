import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurantForm} from '../NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = 'Name is required';
  const serverError = 'The restaurant could not be saved. Please try again.';

  let createRestaurant;

  beforeEach(() => {
    createRestaurant = jest.fn().mockName('createRestaurant');
    render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  });

  it('submits the form when filled in', async () => {
    createRestaurant.mockResolvedValue();
    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByTestId('new-restaurant-submit-button'));

    expect(createRestaurant).toHaveBeenCalledWith(restaurantName);

    await waitFor(() =>
      expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(''),
    );
  });

  describe('when empty', () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();

      userEvent.click(screen.getByTestId('new-restaurant-submit-button'));
    });

    it('displays a validation error', () => {
      expect(screen.queryByText(requiredError)).not.toBeNull();
    });

    it('does not call createRestaurant', () => {
      expect(createRestaurant).not.toHaveBeenCalled();
    });
  });

  it('displays an error when the store action rejects', async () => {
    createRestaurant.mockRejectedValue();

    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByTestId('new-restaurant-submit-button'));

    await screen.findByText(serverError);

    // does not clear the name
    expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(
      restaurantName,
    );
  });
});
