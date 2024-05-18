
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
  CircularProgress,
  FormLabel
} from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Span } from 'app/components/Typography';
import { Field, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import { useEffect, useState } from 'react';
import toaster, { TOASTER_ERROR, TOASTER_SUCCESS } from 'app/helpers/functions/Toaster';
import { NContainer } from 'app/components/NContainer';
import { API, INDEX_URL, PAGE_PATH } from './Configurator';
import {
  DEFAULT_BOOLEAN,
  DEFAULT_DATE,
  DEFAULT_DATETIME,
  DEFAULT_FILE,
  DEFAULT_FLOAT,
  DEFAULT_INTEGER,
  DEFAULT_STRING,
  DEFAULT_TEXT,
  DEFAULT_TIME,
  RULE_INTEGER_MESSAGE,
  RULE_IS_NUMBER,
  RULE_MAX_LENGTH_MESSAGE,
  RULE_REQUIRED_MESSAGE
} from 'app/utils/constant';
import {
  PAYLOAD_BOOLEAN,
  PAYLOAD_DATE,
  PAYLOAD_DATETIME,
  PAYLOAD_FLOAT,
  PAYLOAD_INT,
  PAYLOAD_STRING,
  PAYLOAD_TIME,
  PAYLOAD_FILE
} from 'app/helpers/functions/PayloadHandler';
import { useBaseServerState } from 'app/hooks/core/useBaseServerState';
import {
  RESPONSE_BOOLEAN,
  RESPONSE_DATE,
  RESPONSE_DATETIME,
  RESPONSE_FILE,
  RESPONSE_FLOAT,
  RESPONSE_INT,
  RESPONSE_STRING,
  RESPONSE_TIME
} from 'app/helpers/functions/ResponseHandler';
import SingleFileImage from 'app/components/SingleFileImage';
import SubmitButton from 'app/components/NakamaButtons/SubmitButton';

const Form = () => {
  const { loading, getOne, updateData, postData } = useBaseServerState();
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (values) => {
    const payload = {
      kategori: PAYLOAD_STRING(values.kategori),
      judul: PAYLOAD_STRING(values.judul),
      link: PAYLOAD_STRING(values.link),
      banner: PAYLOAD_FILE(values.banner),
      urutan: PAYLOAD_INT(values.urutan),
      status: PAYLOAD_BOOLEAN(values.status),
    };

    if (params.id) {
      updateData(
        API,
        params.id,
        payload,
        (status, message, data) => {
          toaster(`${status} - ${message}`, TOASTER_SUCCESS);
          navigate(INDEX_URL);
        },
        (status, message) => toaster(`${status} - ${message}`, TOASTER_ERROR)
      );
    } else {
      postData(
        API,
        payload,
        (status, message, data) => {
          toaster(`${status} - ${message}`, TOASTER_SUCCESS);
          navigate(INDEX_URL);
        },
        (status, message) => toaster(`${status} - ${message}`, TOASTER_ERROR)
      );
    }
  };

  // inital values
  const [initialValues, setInitialValues] = useState({
    kategori: DEFAULT_STRING,
    judul: DEFAULT_STRING,
    link: DEFAULT_STRING,
    banner: DEFAULT_TEXT,
    urutan: DEFAULT_INTEGER,
    status: DEFAULT_BOOLEAN,
  });

  // form field validation schema
  const validationSchema = Yup.object().shape({
    kategori: Yup.string().min(1, RULE_MAX_LENGTH_MESSAGE).required(RULE_REQUIRED_MESSAGE),
    judul: Yup.string().min(1, RULE_MAX_LENGTH_MESSAGE).required(RULE_REQUIRED_MESSAGE),
    link: Yup.string().min(1, RULE_MAX_LENGTH_MESSAGE).required(RULE_REQUIRED_MESSAGE),
    banner: null,
    urutan: Yup.number().typeError().integer().required(RULE_INTEGER_MESSAGE),
    status: Yup.boolean().required(RULE_REQUIRED_MESSAGE),
  });

  useEffect(() => {
    if (params.id) {
      getOne(API, params.id, (status, message, data, meta) => {
        toaster(`${status} ${message}`, TOASTER_SUCCESS);
        setInitialValues({
          kategori: RESPONSE_STRING(data?.kategori),
          judul: RESPONSE_STRING(data?.judul),
          link: RESPONSE_STRING(data?.link),
          banner: RESPONSE_FILE(data?.banner),
          urutan: RESPONSE_INT(data?.urutan),
          status: RESPONSE_BOOLEAN(data?.status),
        });
      });
    }
  }, [getOne, params.id]);

  const redirectBack = () => navigate(INDEX_URL);

  return (
    <NContainer>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={PAGE_PATH} />
      </Box>

      {loading ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <Stack spacing={3}>
          <SimpleCard title={'Form Slider Event'}>
            <Formik
              enableReinitialize={true}
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid direction="row" container spacing={4}>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Kategori"
                        type="text"
                        name="kategori"
                        value={values.kategori}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.kategori && Boolean(errors.kategori)}
                        helperText={touched.kategori && errors.kategori}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Judul"
                        type="text"
                        name="judul"
                        value={values.judul}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.judul && Boolean(errors.judul)}
                        helperText={touched.judul && errors.judul}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Link"
                        type="text"
                        name="link"
                        value={values.link}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.link && Boolean(errors.link)}
                        helperText={touched.link && errors.link}
                      />
                    </Grid> <Grid item xs={12}>
                      <FormLabel component="legend" sx={{ color: 'darkslategray' }}>
                        Banner
                      </FormLabel>
                      <SingleFileImage
                        name="image"
                        defaultValues={values.banner || []}
                        onChange={(values) => setFieldValue('banner', values)}
                        accept={{
                          'image/*': []
                        }}
                        multiple={false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Urutan"
                        type="number"
                        name="urutan"
                        value={values.urutan}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.urutan && Boolean(errors.urutan)}
                        helperText={touched.urutan && errors.urutan}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControlLabel
                        label="Status"
                        name="status"
                        control={
                          <Checkbox
                            checked={values.status}
                            onChange={handleChange}
                            value={values.status}
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                  <SubmitButton redirectBack={redirectBack} />
                </form>
              )}
            </Formik>
          </SimpleCard>
        </Stack>
      )}
    </NContainer>
  );
};

export default Form;

