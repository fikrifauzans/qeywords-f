import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';

const AddButton = ({ label = 'Tambah Data', onClick = null }) => {
  return (
    <Button
      variant="contained"
      startIcon={<Add />}
      onClick={onClick}
      style={{
        height: '50px',
        padding: '12px 16px',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#3C4992',
        borderRadius: '12px'
      }}
    >
      <span
        style={{
          color: '#FFF',
          fontFamily: 'roboto',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'normal'
        }}
      >
        {label}
      </span>
    </Button>
  );
};
export default AddButton;
