import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function PageUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = !!location?.state && location?.state;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([{}]);

  const { name, phone, website, address, company } = from || user[0];

  useEffect(() => {
    if (!from) {
      const dataUrl = `https://jsonplaceholder.typicode.com/users?id=${userId}`;

      axios.get(dataUrl)
        .then(
          (response) => {
            setIsLoaded(true);
            setUser(response?.data);
          },
          (error) => {
            setIsLoaded(false);
            setError(error);
          }
        );
    }
  }, [error, isLoaded]);

  const goBack = () => {
    navigate('/');
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Avatar src="avatar1.jpg" />
        <Typography gutterBottom variant="h3" component="h1">{name}</Typography>
        <Typography>{company?.catchPhrase}</Typography>
        <Box>
          <Typography>Address</Typography>
          <Typography>{`${ address?.street}, ${ address?.suite}`}</Typography>
          <Typography>{`${ address?.city}, ${ address?.zipcode}`}</Typography>
        </Box>
        <Box>
          <Typography>Phone</Typography>
          <Typography>{phone}</Typography>
        </Box>
        <Box>
          <Typography>Website</Typography>
          <Typography>{website}</Typography>
        </Box>
      </Box>
      <Button variant="contained" onClick={goBack}>Go back</Button>
    </>
  );
}
