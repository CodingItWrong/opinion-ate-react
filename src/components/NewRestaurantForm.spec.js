import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import flushPromises from 'flush-promises';
import {NewRestaurantForm} from './NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = 'Name is required';
  const serverError = 'The restaurant could not be saved. Please try again.';

  let createRestaurant;

  function renderComponent() {
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
      createRestaurant.mockResolvedValue();
      await userEvent.type(
        screen.getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );
      userEvent.click(screen.getByText('Add'));

      return act(flushPromises);
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
      createRestaurant.mockResolvedValue();

      userEvent.click(screen.getByText('Add'));

      return act(flushPromises);
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

      userEvent.click(screen.getByText('Add'));

      await userEvent.type(
        screen.getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );
      userEvent.click(screen.getByText('Add'));

      return act(flushPromises);
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

      await userEvent.type(
        screen.getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );
      userEvent.click(screen.getByText('Add'));

      return act(flushPromises);
    }

    it('displays a server error', async () => {
      await fillInForm();
      expect(screen.getByText(serverError)).toBeInTheDocument();
    });
  });
});
