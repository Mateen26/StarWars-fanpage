import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Container, Typography, Grid, Card, CardContent, Box, makeStyles, Paper } from '@material-ui/core';
import globalStyles from '../../globalStyles';
import { setLoading } from '../../store/loaderSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

const People = (props) => {
  const isLoading = useSelector((state) => state.Loader.isLoading);
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [open, setOpen] = useState(false);
  const [filmsData, setFilmsData] = useState([]);
  const [starshipsData, setStarshipsData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const globalClasses = globalStyles();

  const dispatch = useDispatch()

  const handleClickOpen = (person) => {
    setSelectedPerson(person);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const fetchFilmsData = async () => {
        dispatch(setLoading(true))
        try {
          const filmsUrls = selectedPerson?.films || [];
          const starShipsUrls = selectedPerson?.starships || [];
          const vehiclesUrls = selectedPerson?.vehicles || [];

          const requests = filmsUrls.map((url) => fetch(url));
          const shipRequests = starShipsUrls.map((url) => fetch(url));
          const vehiclesRequests = vehiclesUrls.map((url) => fetch(url));

          const [responses, shipResponses, vehiclesResponses] = await Promise.all([
            Promise.all(requests),
            Promise.all(shipRequests),
            Promise.all(vehiclesRequests)
          ]);

          const filmsData = await Promise.all(responses.map((res) => res.json()));
          const shipData = await Promise.all(shipResponses.map((res) => res.json()));
          const vehiclesData = await Promise.all(vehiclesResponses.map((res) => res.json()));

          setFilmsData(filmsData);
          setStarshipsData(shipData);
          setVehiclesData(vehiclesData);
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 500);
        } catch (error) {
          
          console.error('Error fetching data: ', error);
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 500);
        }
      };

      fetchFilmsData();
    }
  }, [open, selectedPerson]);

  useEffect(() => {
    loadData()
  }, []);


  const loadData = () => {
    dispatch(setLoading(true))

    try {
      axios.get('https://swapi.dev/api/people')
        .then(response => {
          setPeople(response.data.results);
          setPage(response.data);
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
        <Typography variant="h1" align="center" gutterBottom>Star Wars People</Typography>
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

        <Dialog

          className={globalClasses.dialog}
          open={open}
          onClose={handleClose}
          ref={node => {
            if (node !== null) {
              const dialogEl = node.querySelector(".MuiDialog-paper");
              if (dialogEl !== null) {
                dialogEl.removeAttribute("tabindex");
              }
            }
          }}
        >
          <div className="dialogTitle">{selectedPerson?.name}</div>
          <DialogContent>
            <DialogContentText variant='h4' className={globalClasses?.dialogDetailStyles}>
              <strong>Hair Color:  </strong> {selectedPerson?.hair_color}<br />

              <strong>Skin Color:  </strong> {selectedPerson?.skin_color}<br />

              <strong>Height:  </strong> {selectedPerson?.height} cm<br />

              <strong>Mass:  </strong> {selectedPerson?.mass}kg<br />

              <strong>Films:  </strong> {selectedPerson?.films?.length}<br />

              {filmsData.map((film, index) => (
                <div key={index}>
                  <strong>Film {index + 1}:</strong> {film.title}
                </div>
              ))}
              <strong>StarShips:  </strong> {selectedPerson?.starships?.length}<br />
              {starshipsData.map((film, index) => (
                <div key={index}>
                  <strong>StarShip {index + 1}:</strong> {film.name}<br />
                </div>
              ))}
              <strong>Vehicles:  </strong> {selectedPerson?.vehicles?.length}<br />
              {vehiclesData.map((film, index) => (
                <div key={index}>
                  <strong>Vehicle {index + 1}:</strong> {film.name}
                </div>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          {isLoading && 
              <div className='buttonLoader'>
               <CircularProgress size="5rem"/>
                <Typography variant='h4' >Please Wait</Typography>
              </div>}
            <Button className={globalClasses.closeButton} onClick={handleClose} color="primary">Close</Button>
          </DialogActions>

        </Dialog>


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
