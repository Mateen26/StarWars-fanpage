import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container, Typography, Grid, Box, Paper, CardContent } from '@material-ui/core';
import globalStyles from '../../globalStyles';
import { setLoading } from '../../store/loaderSlicer';
import { useDispatch } from 'react-redux';
import { DataContext } from './../../DataContext';
import CommonDialog from './../../Common/CommonDialog';
import { FetchData } from './../../Common/FetchData';

const StarShips = (props) => {
  const [ships, setShips] = useState([]);
  const [page, setPage] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const globalClasses = globalStyles();

  const type = "StarShips"

  const dispatch = useDispatch()

  const handleClickOpen = async (ship) => {
    dispatch(setLoading(true))

    setSelectedShip(ship);
    const result = await FetchData(ship);
    setData(result);
    setOpen(true);

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);

  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    loadData()
  }, []);


  const loadData = () => {
    dispatch(setLoading(true))

    try {
      axios.get('https://swapi.dev/api/starships')
        .then(response => {
          if (response?.status == 200) {
            setShips(response.data.results);
            setPage(response.data);
          }
          else {
            alert('Error Fetching Data From Api')
          }
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 500);
        })
        .catch(error => {
          console.log(error);
        })

    } catch (error) {
      console.log('error: ', error);

    }

  }
  const handleLoadMore = () => {
    try {
      dispatch(setLoading(true))

      axios
        .get(page.next)
        .then((response) => {
          setShips([...ships, ...response.data.results]);
          setPage(response.data);
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 500);
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.log('error: ', error);
    }


  };


  return (
    <>
      <Container maxWidth="xl" minheight="100vh">
        <Typography variant="h1" align="center" gutterBottom>Star Wars ships</Typography>
        <Grid container spacing={3}>
          {ships.map(ship => (
            <Grid item xs={12} sm={8} md={4} key={ship?.name}>
              <Paper elevation={3} className={globalClasses.shipsPaper} onClick={() => handleClickOpen(ship)}>
                <CardContent>
                  <Typography variant="h1" component="h1">{ship?.name}</Typography>
                  <Typography variant='h4' gutterBottom><strong>model:</strong> {ship?.model}</Typography>
                  <Typography variant='h4' gutterBottom><strong>manufacturer:</strong> {ship?.manufacturer}</Typography>
                  <Typography variant='h4' gutterBottom><strong>starship class:</strong> {ship?.starship_class}</Typography>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {open &&
          <DataContext.Provider value={{ selectedShip, data, type }}>
            <CommonDialog
              open={open}
              handleClose={handleClose}
            />
          </DataContext.Provider>}

        {page?.next && (
          <Box className={globalClasses.loadMoreContainer}>
            <Button
              size='large'
              className={globalClasses.shipsLoadMoreButton}
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </Box>
        )}

      </Container>
    </>
  );
};

export default StarShips;
