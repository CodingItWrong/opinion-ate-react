import {useState} from 'react';
import {connect} from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {createRestaurant} from '../store/restaurants/actions';

export function NewRestaurantForm({createRestaurant}) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    createRestaurant(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Add Restaurant"
        fullWidth
        variant="filled"
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
}

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
