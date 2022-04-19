import {fireEvent, render, screen} from '@testing-library/react';
import {NewRestaurantFormDisplay} from '../NewRestaurantForm';

describe('NewRestaurantFormDisplay', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = 'Name is required';
  const serverError = 'The restaurant could not be saved. Please try again.';

  describe('with default values', () => {
    beforeEach(() => {
      render(<NewRestaurantFormDisplay name="" />);
    });

    it('starts the name field blank', () => {
      expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual('');
    });

    it('does not display a validation error', () => {
      expect(screen.queryByText(requiredError)).toBeNull();
    });

    it('does not display a server error', () => {
      expect(screen.queryByText(serverError)).toBeNull();
    });
  });

  it('displays the name in the name field', () => {
    render(<NewRestaurantFormDisplay name={restaurantName} />);
    expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(
      restaurantName,
    );
  });

  it('displays a validation error', () => {
    render(<NewRestaurantFormDisplay validationError />);
    expect(screen.queryByText(requiredError)).not.toBeNull();
  });

  it('displays a server error', () => {
    render(<NewRestaurantFormDisplay serverError />);
    expect(screen.queryByText(serverError)).not.toBeNull();
  });

  it('calls setName after editing the text field', () => {
    const setName = jest.fn().mockName('setName');
    render(<NewRestaurantFormDisplay name="" setName={setName} />);

    fireEvent.change(screen.getByPlaceholderText('Add Restaurant'), {
      target: {value: restaurantName},
    });

    expect(setName).toHaveBeenCalledWith(restaurantName);
  });

  it('calls the onSubmit prop when clicking add', () => {
    const handleSubmit = jest.fn().mockName('handleSubmit');
    render(
      <NewRestaurantFormDisplay
        name={restaurantName}
        onSubmit={handleSubmit}
      />,
    );
    fireEvent.click(screen.getByTestId('new-restaurant-submit-button'));
    expect(handleSubmit).toHaveBeenCalledWith();
  });
});
