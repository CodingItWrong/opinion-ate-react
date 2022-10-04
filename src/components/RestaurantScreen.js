import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RestaurantList from './RestaurantList';
import NewRestaurantForm from './NewRestaurantForm';

export default function RestaurantScreen() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <NewRestaurantForm />
        <RestaurantList />
      </CardContent>
    </Card>
  );
}
