import {render, screen} from '@testing-library/react';
import {RestaurantList} from '../RestaurantList';

describe('RestaurantList', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  let loadRestaurants;

  const renderWithProps = (propOverrides = {}) => {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      loading: false,
      restaurants,
      ...propOverrides,
    };
    loadRestaurants = props.loadRestaurants;

    render(<RestaurantList {...props} />);
  };

  it('loads restaurants on first render', () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the loading indicator while loading', () => {
    renderWithProps({loading: true});
    expect(screen.queryByTestId('loading-indicator')).not.toBeNull();
  });

  describe('when loading succeeds', () => {
    beforeEach(() => {
      renderWithProps();
    });

    it('does not display the loading indicator while not loading', () => {
      expect(screen.queryByTestId('loading-indicator')).toBeNull();
    });

    it('displays the restaurants', () => {
      expect(screen.queryByText('Sushi Place')).not.toBeNull();
      expect(screen.queryByText('Pizza Place')).not.toBeNull();
    });
  });

  describe('when loading fails', () => {
    beforeEach(() => {
      renderWithProps({loadError: true});
    });

    it('displays the error message', () => {
      expect(
        screen.queryByText('Restaurants could not be loaded.'),
      ).not.toBeNull();
    });
  });
});
