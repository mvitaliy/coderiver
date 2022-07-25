import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

export default function Content() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const dataUrl = `https://jsonplaceholder.typicode.com/users`;

    axios.get(dataUrl)
      .then(
        (response) => {
          setIsLoaded(true);
          setUsers(response?.data);
        },
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      );
  }, [error, isLoaded]);

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }}>
                Add user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        No users for this project yet
      </Typography>
      <TableContainer
        // component={Paper}
      >
        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User details</TableCell>
              <TableCell>Company name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Distance</TableCell>
              <TableCell />
              <TableCell sx={{ position: 'absolute' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((item, index) => {
              if (!item) return null;

              const { id, name, username, email, phone, website, address, company } = item;

              return (
                <TableRow
                  key={index}
                  sx={{ position: 'relative', '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar src="avatar1.jpg" />
                    <Stack spacing={0.5}>
                      <Typography fontWeight={700}>{name}</Typography>
                      <Typography variant="body2" color="text.secondary">{address?.city}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography fontWeight={700}>{company?.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{company?.bs}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography fontWeight={700}>{email}</Typography>
                      <Typography variant="body2" color="text.secondary">{website}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip>Active account</Chip>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <EditIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ p: 0 }}>
                    <Link sx={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} component={RouterLink} to={`/${item?.id}`} state={{ from: item }} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
