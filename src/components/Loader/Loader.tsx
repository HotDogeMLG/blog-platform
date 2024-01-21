import React, { FC } from 'react';
import { Grid } from 'react-loader-spinner';
import './Loader.scss';

const Loader: FC = () => {
  return (
    <Grid
      visible={true}
      height='80'
      width='80'
      color='hsla(209, 100%, 55%, 1)'
      ariaLabel='grid-loading'
      radius='12.5'
      wrapperStyle={{}}
      wrapperClass='Loader'
    />
  );
};

export default Loader;
