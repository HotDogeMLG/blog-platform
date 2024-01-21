import React, { FC } from 'react';
import './Error.scss';

const Error: FC = () => {
  return (
    <div className='Error'>
      <img src='https://vk.com/sticker/1-68062-256b'></img>
      <div className='Error__text'>
        Something went <b>TERRIBLY</b> wrong
      </div>
    </div>
  );
};

export default Error;
