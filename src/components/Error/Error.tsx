import { FC } from 'react';
import './Error.scss';
import { useTheme } from 'antd-style';

const Error: FC = () => {
  const theme = useTheme();
  return (
    <div
      className='Error'
      style={{ background: theme.colorBgContainer, color: theme.colorText }}
    >
      <img src='https://vk.com/sticker/1-68062-256b'></img>
      <div className='Error__text'>
        Something went <b>TERRIBLY</b> wrong
      </div>
    </div>
  );
};

export default Error;
