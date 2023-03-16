import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@material-ui/core';
import globalStyles from '../globalStyles';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { DataContext } from '../DataContext';

const CommonDialog = () => {
  const { open, handleClose, selectedPerson, data, type, selectedFilm, selectedShip } = useContext(DataContext);

  const isLoading = useSelector((state) => state.Loader.isLoading);
  const globalClasses = globalStyles();


  return (
    <>

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

        {type === "people" ? (
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
                    <strong>StarShip {index + 1}:</strong> {film.name}
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
        ) : type === "films" ? (
          <>
            <span className="dialogTitle">{selectedFilm?.title}</span>
            <DialogContent>
              <DialogContentText variant='h4' className={globalClasses?.dialogDetailStyles}>
                <strong>Director:  </strong> {selectedFilm?.director}<br />

                <strong>Producer:  </strong> {selectedFilm?.producer}<br />

                <strong>Release date:  </strong> {selectedFilm?.release_date}<br />

                <strong>Characters:  </strong> {data?.CharactersData.length}<br />

                {data && data?.CharactersData.map((e, index) => (
                  <span key={index}>
                    <strong>Character {index + 1}:</strong> {e.name}
                  </span>
                ))}
                <br />
                <strong>Planets:  </strong> {selectedFilm?.planets?.length}<br />

                {data && data?.planetsData.map((e, index) => (
                  <span key={index}>
                    <strong>Planets {index + 1}:</strong> {e.name}<br />
                  </span>
                ))}
                <br />

                <strong>Species:  </strong> {selectedFilm?.species?.length}<br />

                {data && data?.speciesData.map((e, index) => (
                  <span key={index}>
                    <strong>Specie {index + 1}:</strong> {e.name}
                  </span>
                ))}
                <br />
                <strong>Starships:  </strong> {selectedFilm?.starships?.length}<br />

                {data && data?.shipData.map((e, index) => (
                  <span key={index}>
                    <strong>Starship {index + 1}:</strong> {e.name}
                  </span>
                ))}<br />

                <strong>Vehicles:  </strong> {selectedFilm?.vehicles?.length}<br />

                {data && data?.vehiclesData.map((e, index) => (
                  <span key={index}>
                    <strong>Vehicle {index + 1}:</strong> {e.name}
                  </span>
                ))}<br />
              </DialogContentText>
            </DialogContent>



          </>
        ) : type === "StarShips" ? (
          <>
            <span className="dialogTitle">{selectedShip?.name}</span>
            <DialogContent>
              <DialogContentText variant='h4' className={globalClasses?.dialogDetailStyles}>

                <strong>Cargo capacity:  </strong> {selectedShip?.cargo_capacity}<br />

                <strong>Consumables:  </strong> {selectedShip?.consumables}<br />

                <strong>Cost in credits:  </strong> {selectedShip?.cost_in_credits}<br />

                <strong>Crew:  </strong> {selectedShip?.crew.length}<br />

                <strong>Hyperdrive rating:  </strong> {selectedShip?.hyperdrive_rating}<br />

                <strong>Length:  </strong> {selectedShip?.length}<br />

                <strong>Max atmosphering speed:  </strong> {selectedShip?.max_atmosphering_speed}<br />

                <strong>Passengers:  </strong> {selectedShip?.passengers}<br />

                <strong>Films:  </strong> {selectedShip?.films?.length}<br />

                {data && data?.filmsData.map((film, index) => (
                  <span key={index}>
                    <strong>Film {index + 1}:</strong> {film.title}
                  </span>
                ))}<br />

                <strong>pilots:  </strong> {selectedShip?.pilots?.length}<br />

                {data && data?.pilotsData.map((pilots, index) => (
                  <span key={index}>
                    <strong>Pilot {index + 1}:</strong> {pilots.name}
                  </span>
                ))}
              </DialogContentText>
            </DialogContent>
          </>

        ) : ''}

        <DialogActions>
          {isLoading &&
            <span className='buttonLoader'>
              <CircularProgress size="5rem" />
              <Typography variant='h4' >Please Wait</Typography>
            </span>}
          <Button className={globalClasses.closeButton} onClick={handleClose} color="primary">Close</Button>
        </DialogActions>

      </Dialog>
    </>
  )
}
export default CommonDialog