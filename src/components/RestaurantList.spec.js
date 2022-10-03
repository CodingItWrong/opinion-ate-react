import {render, screen} from '@testing-library/react';
import {RestaurantList} from './RestaurantList';

describe('RestaurantList', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  let loadRestaurants;

  function renderComponent(propOverrides = {}) {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      restaurants,
      ...propOverrides,
    };
    loadRestaurants = props.loadRestaurants;

    render(<RestaurantList {...props} />);
  }

  it('displays the loading indicator while loading', () => {
    renderComponent({loading: true});
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('loads restaurants on first render', () => {
    renderComponent();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    renderComponent();
    expect(screen.getByText('Sushi Place')).toBeInTheDocument();
    expect(screen.getByText('Pizza Place')).toBeInTheDocument();
  });
});
