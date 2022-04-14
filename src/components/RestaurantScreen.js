import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RestaurantList from './RestaurantList';
import NewRestaurantForm from './NewRestaurantForm';

const RestaurantScreen = () => (
  <Card>
    <CardContent>
      <Typography variant="h5">Restaurants</Typography>
      <NewRestaurantForm />
      <RestaurantList />
    </CardContent>
  </Card>
);

export default RestaurantScreen;
