import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@material-ui/core';
import globalStyles from '../globalStyles';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { DataContext } from '../DataContext';

const CommonDialog = (props) => {
 
  const { selectedPerson, data, type, selectedFilm } = useContext(DataContext);
  
  const isLoading = useSelector((state) => state.Loader.isLoading);
  const globalClasses = globalStyles();


  return (
    <>

      <Dialog

        className={globalClasses.dialog}
        open={props?.open}
        onClose={props?.handleClose}
        ref={node => {
          if (node !== null) {
            const dialogEl = node.querySelector(".MuiDialog-paper");
            if (dialogEl !== null) {
              dialogEl.removeAttribute("tabindex");
            }
          }
        }}
      >

        { type == "people" ?  ( 
        <>
          <span className="dialogTitle">{selectedPerson?.name}</span>
        <DialogContent>
          <DialogContentText variant='h4' className={globalClasses?.dialogDetailStyles}>
            <strong>Hair Color:  </strong> {selectedPerson?.hair_color}<br />

            <strong>Skin Color:  </strong> {selectedPerson?.skin_color}<br />

            <strong>Height:  </strong> {selectedPerson?.height} cm<br />

            <strong>Mass:  </strong> {selectedPerson?.mass}kg<br />

            <strong>Films:  </strong> {selectedPerson?.films?.length}<br />

                {data && data?.filmsData.map((film, index) => (
              <span key={index}>
                <strong>Film {index + 1}:</strong> {film.title}
              </span>
            ))}
            <br />
            <strong>StarShips:  </strong> {selectedPerson?.starships?.length}<br />
                {data && data?.shipData.map((film, index) => (
              <span key={index}>
                <strong>StarShip {index + 1}:</strong> {film.name}<br />
              </span>
            ))}
            <br />
            <strong>Vehicles:  </strong> {selectedPerson?.vehicles?.length}<br />
                {data && data?.vehiclesData.map((film, index) => (
              <span key={index}>
                <strong>Vehicle {index + 1}:</strong> {film.name}
              </span>
            ))}
          </DialogContentText>
        </DialogContent>
        </>
        ): (
          <>
              <span className="dialogTitle">{selectedFilm?.title}</span>
              <DialogContent>
                <DialogContentText variant='h4' className={globalClasses?.dialogDetailStyles}>
                  <strong>Director:  </strong> {selectedFilm?.director}<br />

                  <strong>Producer:  </strong> {selectedFilm?.producer}<br />

                  <strong>Release date:  </strong> {selectedFilm?.release_date}<br />

                  <strong>Characters:  </strong> {selectedFilm?.characters.length}<br />
                  {/* {charactersData.map((film, index) => (
                    <span key={index}>
                      <strong>Film {index + 1}:</strong> {film.title}
                    </span>
                  ))} */}
                  <br />
                  <strong>Planets:  </strong> {selectedFilm?.planets?.length}<br />

                  {/* {planetsData.map((film, index) => (
                    <span key={index}>
                      <strong>StarShip {index + 1}:</strong> {film.name}<br />
                    </span>
                  ))} */}
                  <br />
                  <strong>Species:  </strong> {selectedFilm?.species?.length}<br />

                  {/* {speciesData.map((film, index) => (
                    <span key={index}>
                      <strong>Vehicle {index + 1}:</strong> {film.name}
                    </span>
                  ))} */}
                  <strong>Starships:  </strong> {selectedFilm?.starships?.length}<br />

                  {/* {starshipsData.map((film, index) => (
                    <span key={index}>
                      <strong>Vehicle {index + 1}:</strong> {film.name}
                    </span>
                  ))} */}
                </DialogContentText>
              </DialogContent>



          </>
        )}

        <DialogActions>
          {isLoading &&
            <span className='buttonLoader'>
              <CircularProgress size="5rem" />
              <Typography variant='h4' >Please Wait</Typography>
            </span>}
          <Button className={globalClasses.closeButton} onClick={props?.handleClose} color="primary">Close</Button>
        </DialogActions>

      </Dialog>
    </>
  )
}
export default CommonDialog