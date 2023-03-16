import React from 'react';
import { CardContent, CardMedia, Typography, Container, CardActionArea, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setLoading } from '../../store/loaderSlicer';
import { DataContext } from './../../DataContext';
import CommonDialog from './../../Common/CommonDialog';
import { FetchData } from './../../Common/FetchData';


const Films = () => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const type = "films"
  const dispatch = useDispatch()

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

  const handleClick = async (e) => {
    try {
      setSelectedFilm(e)
      dispatch(setLoading(true))

      const result = await FetchData(e);
      if (result) {
        setData(result);
      }
      else {
        setData([])
      }

    } catch (error) {
      console.log('Failed to fetch data:', error);
    } finally {
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
    }
    setOpen(true)
  };

  const loadData = () => {
    dispatch(setLoading(true))
    try {
      axios.get('https://swapi.dev/api/films')
        .then(response => {
          if (response?.status === 200) {
            setFilms(response.data.results);
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
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
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
      {open &&
        <DataContext.Provider value={{ selectedFilm, data, type, open, handleClose }}>
          <CommonDialog />
        </DataContext.Provider>
      }
    </Container>
  );
};

export default Films;
