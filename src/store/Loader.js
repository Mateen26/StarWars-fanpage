import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const Loader = () => {
  const isLoading = useSelector((state) => state.Loader.isLoading);
  return (
    <>
      {isLoading &&
       <>
        <div className="loading-overlay"></div>
        <div className="loaderOne">
          <CircularProgress size="7rem" />
        </div>
      </>
      }
    </>
  );
};

export default Loader;
