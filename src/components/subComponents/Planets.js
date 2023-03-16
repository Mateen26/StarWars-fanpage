import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container, Typography, Grid, Box, Paper, CardContent } from '@material-ui/core';
import globalStyles from '../../globalStyles';
import { setLoading } from '../../store/loaderSlicer';
import { useDispatch } from 'react-redux';

const Planets = (props) => {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState([]);
  const globalClasses = globalStyles();

  const dispatch = useDispatch()

  useEffect(() => {
    loadData()
  }, []);


  const loadData = () => {
    dispatch(setLoading(true))

    try {
      axios.get('https://swapi.dev/api/planets')
        .then(response => {
          if (response?.status == 200) {
            setPlanets(response.data.results);
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
          setPlanets([...planets, ...response.data.results]);
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
        <Typography variant="h2" align="center" gutterBottom>Planets</Typography>
        <Grid container spacing={3}>
          {planets.map(planet => (
            <Grid item xs={8} sm={6} md={3} key={planet?.name}>
              <Paper elevation={4} className={globalClasses.planetsPaper}>
                <CardContent>
                  <Typography variant="h2" component="h1">{planet?.name}</Typography>
                  <Typography variant='h4' gutterBottom><strong>Climate:</strong>&nbsp; {planet?.climate}</Typography>
                  <Typography variant='h4' gutterBottom><strong>Diameter:</strong>&nbsp; {planet?.diameter}</Typography>
                  <Typography variant='h4' gutterBottom><strong>Population:</strong>&nbsp; {planet?.population}</Typography>
                  <Typography variant='h4' gutterBottom><strong>Surface Water:</strong>&nbsp; {planet?.surface_water}</Typography>
                  <Typography variant='h4' gutterBottom><strong>gravity:</strong>&nbsp; {planet?.gravity}</Typography>
                  <Typography variant='h4' gutterBottom><strong>orbital period:</strong>&nbsp; {planet?.orbital_period}</Typography>
                  <Typography variant='h4' gutterBottom><strong>Terrain:</strong>&nbsp; {planet?.terrain}</Typography>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {page?.next && (
          <Box className={globalClasses.loadMoreContainer}>
            <Button
              size='large'
              className={globalClasses.PlanetsLoadMoreButton}
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

export default Planets;
