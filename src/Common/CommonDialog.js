import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Container, Typography, Grid, Card, CardContent, Box, makeStyles, Paper } from '@material-ui/core';
import globalStyles from '../globalStyles';
import { setLoading } from '../store/loaderSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { DataContext } from '../DataContext';

const CommonDialog = (props) => {
 
  const { selectedPerson, filmsData, starshipsData, vehiclesData } = useContext(DataContext);
  
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
          <span className="dialogTitle">{selectedPerson?.name}</span>
        <DialogContent>
          <DialogContentText variant='h4' className={globalClasses?.dialogDetailStyles}>
            <strong>Hair Color:  </strong> {selectedPerson?.hair_color}<br />

            <strong>Skin Color:  </strong> {selectedPerson?.skin_color}<br />

            <strong>Height:  </strong> {selectedPerson?.height} cm<br />

            <strong>Mass:  </strong> {selectedPerson?.mass}kg<br />

            <strong>Films:  </strong> {selectedPerson?.films?.length}<br />

            {filmsData.map((film, index) => (
              <span key={index}>
                <strong>Film {index + 1}:</strong> {film.title}
              </span>
            ))}
            <br />
            <strong>StarShips:  </strong> {selectedPerson?.starships?.length}<br />
            {starshipsData.map((film, index) => (
              <span key={index}>
                <strong>StarShip {index + 1}:</strong> {film.name}<br />
              </span>
            ))}
            <br />
            <strong>Vehicles:  </strong> {selectedPerson?.vehicles?.length}<br />
            {vehiclesData.map((film, index) => (
              <span key={index}>
                <strong>Vehicle {index + 1}:</strong> {film.name}
              </span>
            ))}
          </DialogContentText>
        </DialogContent>
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