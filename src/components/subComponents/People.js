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

const People = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const globalClasses = globalStyles();

  const type = "people"

  const dispatch = useDispatch()

  const handleClickOpen = async (person) => {
    dispatch(setLoading(true))

    setSelectedPerson(person);
    const result = await FetchData(person);
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
      axios.get('https://swapi.dev/api/people')
        .then(response => {
          if (response?.status === 200) {
            setPeople(response.data.results);
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
          setPeople([...people, ...response.data.results]);
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
        <Typography variant="h2" align="center" gutterBottom>This list includes humans, droids and various alien species.</Typography>
        <Grid container spacing={2}>
          {people.map(person => (
            <Grid item xs={12} sm={8} md={4} key={person.name}>
              <Paper elevation={3} className={globalClasses.paper} onClick={() => handleClickOpen(person)}>
                <CardContent>
                  <Typography variant="h2" component="h1">{person.name}</Typography>
                  <Typography variant='h4' gutterBottom><strong>Birth Year:</strong> {person.birth_year}</Typography>
                  <Typography variant='h4' gutterBottom><strong>Eye Color:</strong> {person.eye_color}</Typography>
                  <Typography variant='h4' gutterBottom><strong>Gender:</strong> {person.gender}</Typography>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {open &&
          <DataContext.Provider value={{ selectedPerson, data, type, open, handleClose }}>
            <CommonDialog />
          </DataContext.Provider>
        }

        {page?.next && (
          <Box className={globalClasses.loadMoreContainer}>
            <Button
              size='large'
              className={globalClasses.loadMoreButton}
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

export default People;
