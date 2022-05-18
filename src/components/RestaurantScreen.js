import {useCallback, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RestaurantList from './RestaurantList';
import NewRestaurantForm from './NewRestaurantForm';
import api from '../api';
import {loadRestaurants} from '../actions';

export default function RestaurantScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const loadRestaurantsCallback = useCallback(
    () => loadRestaurants({api, setRestaurants, setLoading, setLoadError}),
    [],
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <NewRestaurantForm />
        <RestaurantList
          loadRestaurants={loadRestaurantsCallback}
          restaurants={restaurants}
          loading={loading}
          loadError={loadError}
        />
      </CardContent>
    </Card>
  );
}
