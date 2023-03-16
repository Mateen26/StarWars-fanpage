import { makeStyles } from '@material-ui/core';

const globalStyles = makeStyles((theme) => ({
  loadMoreContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  loadMoreButton: {
    fontSize: 18,
    padding: theme.spacing(2, 4),
    borderRadius: 50,
    background: "linear-gradient(45deg, #2b5876 30%, #4e4376 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    "&:hover": {
      background: "linear-gradient(45deg, #4e4376 30%, #2b5876 90%)",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
  },
  paper: {
    cursor: 'pointer',
    background: 'linear-gradient(45deg, #2b5876 30%, #4e4376 90%)',
    color: 'white',
    padding: theme.spacing(2),
    textAlign: "center",
    height: 200,
    boxShadow: '0 3px 5px 2px rgba(78,67,118,1)',
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    },
  },
  planetsPaper: {
    borderRadius:80,
    background: 'linear-gradient(45deg, #2b5876 30%, #4e4376 90%)',
    color: 'white',
    padding: theme.spacing(2),
    textAlign: "center",
    height: 360,
    boxShadow: '0 3px 5px 2px rgba(78,67,118,1)',
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    },
  },
  shipsPaper: {
    cursor: 'pointer',
    borderRadius:10,
    background: 'linear-gradient(45deg, #2b5876 30%, #4e4376 90%)',
    color: 'white',
    padding: theme.spacing(2),
    textAlign: "center",
    height: 310,
    boxShadow: '0 3px 5px 2px rgba(78,67,118,1)',
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    },
  },
  dialog: {
    width: '100%',
    height: '100%',
    fontSize: '3.25rem',
    fontWeight: 'bold',
    transition: "transform 0.7s ease-in-out",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },

  dialogDetailStyles: {
    borderWidth: "10px",
    borderRadius: '40px',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
    padding: '20px',
    '& > *': {
      marginBottom: '20px',
      marginRight:'15px',
      padding: '10px',
      borderRadius: '10px',
      background: 'white',
      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
    },
    '& > *:last-child': {
      marginBottom: 0,
    },
    '& strong': {
      display: 'inline-block',
      minWidth: '100px',
      marginRight: '10px',
      fontWeight: 'bold',
      
    },
    '& span': {
      display: 'inline-block',
    },
  },
  closeButton: {
    fontSize: '1.5rem',
    padding: '1rem 2rem'
  },
  detailModal:{
    width: '100%',
     height: '100%'
  },
  dialogTitleStyles: {
    fontSize: '3.25rem',
    fontWeight: 'bold',
  },

}));

export default globalStyles;