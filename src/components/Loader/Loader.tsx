import { FC } from 'react';
import { Grid } from 'react-loader-spinner';
import './Loader.scss';
import { useTheme } from 'antd-style';

const Loader: FC = () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgContainer }}>
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
    </div>
  );
};

export default Loader;
