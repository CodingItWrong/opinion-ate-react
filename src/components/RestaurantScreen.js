import {useCallback, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RestaurantList from './RestaurantList';
import NewRestaurantForm from './NewRestaurantForm';
import api from '../api';

export default function RestaurantScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const loadRestaurants = useCallback(async () => {
    setLoadError(false);
    setLoading(true);
    try {
      const newRestaurants = await api.loadRestaurants();
      setRestaurants(newRestaurants);
      setLoading(false);
    } catch {
      setLoadError(true);
    }
  }, []);

  const createRestaurant = useCallback(
    async name => {
      const newRestaurant = await api.createRestaurant(name);
      setRestaurants([...restaurants, newRestaurant]);
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
