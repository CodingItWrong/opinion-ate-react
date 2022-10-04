import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurantForm} from './NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = 'Name is required';
  const serverError = 'The restaurant could not be saved. Please try again.';

  let user;
  let createRestaurant;

  function renderComponent() {
    user = userEvent.setup();
    createRestaurant = jest.fn().mockName('createRestaurant');
    render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  }

  describe('initially', () => {
    it('does not display a validation error', () => {
      renderComponent();
      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });

    it('does not display a server error', () => {
      renderComponent();
      expect(screen.queryByText(serverError)).not.toBeInTheDocument();
    });
  });

  describe('when filled in', () => {
    async function fillInForm() {
      renderComponent();
      await user.type(
        screen.getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );
      await user.click(screen.getByText('Add'));
    }

    it('calls createRestaurant with the name', async () => {
      await fillInForm();
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it('clears the name', async () => {
      await fillInForm();
      expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual('');
    });

    it('does not display a validation error', async () => {
      await fillInForm();
      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });

    it('does not display a server error', async () => {
      await fillInForm();
      expect(screen.queryByText(serverError)).not.toBeInTheDocument();
    });
  });

  describe('when empty', () => {
    async function submitEmptyForm() {
      renderComponent();

      await user.click(screen.getByText('Add'));
    }

    it('displays a validation error', async () => {
      await submitEmptyForm();
      expect(screen.getByText(requiredError)).toBeInTheDocument();
    });

    it('does not call createRestaurant', async () => {
      await submitEmptyForm();
      expect(createRestaurant).not.toHaveBeenCalled();
    });
  });

  describe('when correcting a validation error', () => {
    async function fixValidationError() {
      renderComponent();
      createRestaurant.mockResolvedValue();

      await user.click(screen.getByText('Add'));

      await user.type(
        screen.getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );
      await user.click(screen.getByText('Add'));
    }

    it('clears the validation error', async () => {
      await fixValidationError();
      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });
  });

  describe('when the store action rejects', () => {
    async function fillInForm() {
      renderComponent();
      createRestaurant.mockRejectedValue();

      await user.type(
        screen.getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );
      await user.click(screen.getByText('Add'));
    }

    it('displays a server error', async () => {
      await fillInForm();
      expect(screen.getByText(serverError)).toBeInTheDocument();
    });

    it('does not clear the name', async () => {
      await fillInForm();
      expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(
        restaurantName,
      );
    });
  });

  describe('when retrying after the store rejects', () => {
    async function retrySubmittingForm() {
      renderComponent();
      createRestaurant.mockRejectedValueOnce().mockResolvedValueOnce();

      await user.type(
        screen.getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );
      await user.click(screen.getByText('Add'));

      await user.click(screen.getByText('Add'));
    }

    it('clears the server error', async () => {
      await retrySubmittingForm();
      expect(screen.queryByText(serverError)).not.toBeInTheDocument();
    });
  });
});
