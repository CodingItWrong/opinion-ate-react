import {useCallback, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RestaurantList from './RestaurantList';
import NewRestaurantForm from './NewRestaurantForm';
import api from '../api';

export async function loadRestaurantsPure({
  api,
  setRestaurants,
  setLoading,
  setLoadError,
}) {
  setLoadError(false);
  setLoading(true);
  try {
    const newRestaurants = await api.loadRestaurants();
    setRestaurants(newRestaurants);
  } catch {
    setLoadError(true);
  } finally {
    setLoading(false);
  }
}

export async function createRestaurantPure({
  api,
  name,
  restaurants,
  setRestaurants,
}) {
  const newRestaurant = await api.createRestaurant(name);
  setRestaurants([...restaurants, newRestaurant]);
}

export default function RestaurantScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const loadRestaurants = useCallback(() => {
    return loadRestaurantsPure({api, setRestaurants, setLoading, setLoadError});
  }, []);

  const createRestaurant = useCallback(
    async name => {
      return createRestaurantPure({
        api,
        name,
        restaurants,
        setRestaurants,
      });
    },
    [restaurants],
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <NewRestaurantForm createRestaurant={createRestaurant} />
        <RestaurantList
          restaurants={restaurants}
          loadRestaurants={loadRestaurants}
          loading={loading}
          loadError={loadError}
        />
      </CardContent>
    </Card>
  );
}
