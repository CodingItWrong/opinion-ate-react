import {useEffect} from 'react';
import {connect} from 'react-redux';

export function RestaurantList({loadRestaurants, restaurants}) {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return (
    <ul>
      {restaurants.map(restaurant => (
        <li key={restaurant.id}>{restaurant.name}</li>
      ))}
    </ul>
  );
}

const mapStateToProps = state => ({
  restaurants: state.restaurants.records,
});

export default connect(mapStateToProps)(RestaurantList);
