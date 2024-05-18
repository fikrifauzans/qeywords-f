import { Button, Grid } from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';

const SubmitButton = ({ redirectBack }) => {
  return (
    <>
      <Grid container spacing={2} marginBottom={2} marginTop={3} alignItems="center">
        <Grid item xs={12} md={8} lg={6}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack style={{ color: '#3C4992' }} />}
            style={{
              height: '50px',
              padding: '12px 16px',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#FFF',
              borderRadius: '12px',
              borderColor: '#E5E7EB'
            }}
            onClick={redirectBack}
          >
            <span
              style={{
                color: '#4B5563',
                fontFamily: 'roboto',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal'
              }}
            >
              Kembali
            </span>
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={6} style={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            type="submit"
            startIcon={<Add />}
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
                fontWeight: 400,
                lineHeight: 'normal'
              }}
            >
              Simpan
            </span>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default SubmitButton;
