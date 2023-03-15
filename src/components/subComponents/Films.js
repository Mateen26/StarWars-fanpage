import React from 'react';
import { Card, CardContent, CardMedia, Typography, Container, CardActionArea, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setLoading } from '../../store/loaderSlicer';
import globalStyles from '../../globalStyles';
import { DataContext } from './../../DataContext';
import CommonDialog from './../../Common/CommonDialog';


const Films = (props) => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [open, setOpen] = useState(false);

  console.log('films: ', films);
  const dispatch = useDispatch()
  const globalClasses = globalStyles();

  const filmImages = [
    '/Images/aNewHope.jpg',
    '/Images/TheEmpStrikeBackjpg.jpg',
    '/Images/returnOfTheJedi.jpg',
    '/Images/ThePhantomMenace.jpg',
    '/Images/attackOfTheClones.jpg',
    '/Images/Revengeofthesith.jpg'
  ];

  useEffect(() => {
    loadData()
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (e) => {
    // onClick(film);
    setSelectedFilm(e)
    setOpen(true)
  };
  const loadData = () => {
    // dispatch(setLoading(true))

    try {
      axios.get('https://swapi.dev/api/films')
        .then(response => {
          setFilms(response.data.results);
          // setPage(response.data);
          // setTimeout(() => {
          //   dispatch(setLoading(false));
          // }, 500);
        })
        .catch(error => {
          console.log(error);
        })

    } catch (error) {
      console.log('error: ', error);

    }

  }
  return (
    <Container maxWidth="xl" minheight="100vh">
      <Typography variant="h2" align="center" gutterBottom>All The Star Wars Films</Typography>
      <Grid container spacing={4}>
        {films.map((e, index) => (
          <Grid item xs={12} sm={8} md={4} key={index}>
            <CardActionArea className={'filmsCard'} key={index} >
              <CardMedia
                component="img"
                alt={e.title}
                height="300"
                image={process.env.PUBLIC_URL + filmImages[index]}
                title={e.title}
                onClick={() => handleClick(e)}
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div" style={{ textAlign: 'center' }}>
                  {e.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>

      <DataContext.Provider value={{ selectedFilm }}>
        <CommonDialog
          open={open}
          handleClose={handleClose}
        />
      </DataContext.Provider>
   
    </Container>
  );
};

export default Films;
