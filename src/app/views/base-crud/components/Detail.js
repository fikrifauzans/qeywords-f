/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Span } from 'app/components/Typography';
import { Formik } from 'formik';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import TextArea from 'app/components/TextArea';
import useBaseCruds from 'app/hooks/base-crud/useBaseCruds';
import moment from 'moment/moment';
import { useEffect } from 'react';
import { useState } from 'react';
import toaster, { TOASTER_ERROR } from 'app/helpers/functions/Toaster';

const Detail = () => {
  const { postBaseCrud, mode, setMode, loadBaseCrud, updateBaseCrud } = useBaseCruds();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
  }));

  // inital values
  const [initialValues, setInitialValues] = useState({
    column_integer: null,
    column_smallint: null,
    column_string: '',
    column_boolean: false,
    column_float: null,
    column_date: null,
    column_time: null,
    column_datetime: null,
    column_text: 'test',
    column_binary: 1
  });

  useEffect(() => {
    if (id) {
      loadBaseCrud(id).then((response) => {
        if (response) {
          setInitialValues({
            ...response,
            column_boolean: response?.column_boolean === 1 ? 'true' : 'false',
            column_text: 'test',
            column_binary: 1
          });
        }
      });
    }
  }, [id, setMode, loadBaseCrud]);

  const redirectBack = () => {
    navigate('/base-crud/');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Base Crud', path: '/base-crud' }, { name: 'Detail' }]}
        />
      </Box>
      <Stack spacing={3}>
        <SimpleCard title="Detail Base Crud">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Typography variant="subtitle2">Column Integer</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography variant="caption">{initialValues?.column_integer}</Typography>
              </Grid>

              <Grid item xs={6} md={4}>
                <Typography variant="subtitle2">Column Small Integer</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography variant="caption">{initialValues?.column_smallint}</Typography>
              </Grid>

              <Grid item xs={6} md={4}>
                <Typography variant="subtitle2">Column String</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography variant="caption">{initialValues?.column_string}</Typography>
              </Grid>

              <Grid item xs={6} md={4}>
                <Typography variant="subtitle2">Column Boolean</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography variant="caption">{initialValues?.column_boolean}</Typography>
              </Grid>

              <Grid item xs={6} md={4}>
                <Typography variant="subtitle2">Column Float</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography variant="caption">{initialValues?.column_float}</Typography>
              </Grid>

              <Grid item xs={6} md={4}>
                <Typography variant="subtitle2">Column Date</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography variant="caption">{initialValues?.column_date}</Typography>
              </Grid>

              <Grid item xs={6} md={4}>
                <Typography variant="subtitle2">Column Time</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography variant="caption">{initialValues?.column_time}</Typography>
              </Grid>

              <Grid item xs={6} md={4}>
                <Typography variant="subtitle2">Column Date Time</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography variant="caption">{initialValues?.column_datetime}</Typography>
              </Grid>

              {/* <Grid item xs={6} md={4}>
                <Typography variant="subtitle2">Column Text</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography variant="caption">{initialValues?.column_text}</Typography>
              </Grid>

              <Grid item xs={6} md={4}>
                <Typography variant="subtitle2">Column Binary</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography variant="caption">{initialValues?.column_binary}</Typography>
              </Grid> */}
            </Grid>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              color="warning"
              variant="outlined"
              style={{ marginRight: 10 }}
              onClick={redirectBack}
            >
              <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Back</Span>
            </Button>
          </Box>
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default Detail;
