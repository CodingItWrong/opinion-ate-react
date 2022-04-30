import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

export default NewRestaurantForm;
