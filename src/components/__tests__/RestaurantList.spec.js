import {render, screen} from '@testing-library/react';
import {RestaurantList} from '../RestaurantList';

describe('RestaurantList', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  let loadRestaurants;

  const renderWithProps = () => {
    loadRestaurants = jest.fn().mockName('loadRestaurants');

    render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />,
    );
  };

  beforeEach(() => {
    renderWithProps();
  });

  it('loads restaurants on first render', () => {
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    expect(screen.queryByText('Sushi Place')).not.toBeNull();
    expect(screen.queryByText('Pizza Place')).not.toBeNull();
  });
});
