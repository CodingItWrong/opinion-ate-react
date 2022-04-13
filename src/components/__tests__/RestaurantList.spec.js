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
      restaurants,
      ...propOverrides,
    };
    loadRestaurants = props.loadRestaurants;

    render(<RestaurantList {...props} />);
  };

  it('displays the loading indicator while loading', () => {
    renderWithProps({loading: true});
    expect(screen.queryByTestId('loading-indicator')).not.toBeNull();
  });

  it('loads restaurants on first render', () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    renderWithProps();
    expect(screen.queryByText('Sushi Place')).not.toBeNull();
    expect(screen.queryByText('Pizza Place')).not.toBeNull();
  });
});
