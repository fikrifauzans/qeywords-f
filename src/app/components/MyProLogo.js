import Logo from '../assets/png/logo/mypro_logo.png';

const MyProLogo = ({ width = '30px', height = '30px' }) => {
  return <img src={Logo} alt="mypro_logo" width={width} height={height} />;
};

export default MyProLogo;
