
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
      logo: PAYLOAD_FILE(values.logo),
      tagline: PAYLOAD_STRING(values.tagline),
      email: PAYLOAD_STRING(values.email),
      no_tlp: PAYLOAD_STRING(values.no_tlp),
      no_whatsapp: PAYLOAD_STRING(values.no_whatsapp),
      alamat: PAYLOAD_STRING(values.alamat),
      location: PAYLOAD_STRING(values.location),
      tentang_kami: PAYLOAD_STRING(values.tentang_kami),
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
    logo: DEFAULT_TEXT,
    tagline: DEFAULT_STRING,
    email: DEFAULT_STRING,
    no_tlp: DEFAULT_STRING,
    no_whatsapp: DEFAULT_STRING,
    alamat: DEFAULT_STRING,
    location: DEFAULT_TEXT,
    tentang_kami: DEFAULT_TEXT,
  });

  // form field validation schema
  const validationSchema = Yup.object().shape({
    logo: null,
    tagline: Yup.string().min(1, RULE_MAX_LENGTH_MESSAGE).required(RULE_REQUIRED_MESSAGE),
    email: Yup.string().min(1, RULE_MAX_LENGTH_MESSAGE).required(RULE_REQUIRED_MESSAGE),
    no_tlp: Yup.string().min(1, RULE_MAX_LENGTH_MESSAGE).required(RULE_REQUIRED_MESSAGE),
    no_whatsapp: Yup.string().min(1, RULE_MAX_LENGTH_MESSAGE).required(RULE_REQUIRED_MESSAGE),
    alamat: Yup.string().min(1, RULE_MAX_LENGTH_MESSAGE).required(RULE_REQUIRED_MESSAGE),
    location: Yup.string().required(RULE_REQUIRED_MESSAGE),
    tentang_kami: Yup.string().required(RULE_REQUIRED_MESSAGE),
  });

  useEffect(() => {
    if (params.id) {
      getOne(API, params.id, (status, message, data, meta) => {
        toaster(`${status} ${message}`, TOASTER_SUCCESS);
        setInitialValues({
          logo: RESPONSE_FILE(data?.logo),
          tagline: RESPONSE_STRING(data?.tagline),
          email: RESPONSE_STRING(data?.email),
          no_tlp: RESPONSE_STRING(data?.no_tlp),
          no_whatsapp: RESPONSE_STRING(data?.no_whatsapp),
          alamat: RESPONSE_STRING(data?.alamat),
          location: RESPONSE_STRING(data?.location),
          tentang_kami: RESPONSE_STRING(data?.tentang_kami),
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
          <SimpleCard title={'Form Tentang My Pro'}>
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
                    <Grid item xs={12}>
                      <FormLabel component="legend" sx={{ color: 'darkslategray' }}>
                        Logo
                      </FormLabel>
                      <SingleFileImage
                        name="image"
                        defaultValues={values.logo || []}
                        onChange={(values) => setFieldValue('logo', values)}
                        accept={{
                          'image/*': []
                        }}
                        multiple={false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Tagline"
                        type="text"
                        name="tagline"
                        value={values.tagline}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.tagline && Boolean(errors.tagline)}
                        helperText={touched.tagline && errors.tagline}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="text"
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="No Tlp"
                        type="text"
                        name="no_tlp"
                        value={values.no_tlp}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.no_tlp && Boolean(errors.no_tlp)}
                        helperText={touched.no_tlp && errors.no_tlp}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="No Whatsapp"
                        type="text"
                        name="no_whatsapp"
                        value={values.no_whatsapp}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.no_whatsapp && Boolean(errors.no_whatsapp)}
                        helperText={touched.no_whatsapp && errors.no_whatsapp}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Alamat"
                        type="text"
                        name="alamat"
                        value={values.alamat}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.alamat && Boolean(errors.alamat)}
                        helperText={touched.alamat && errors.alamat}
                      />
                    </Grid>  <Grid item xs={12} sm={12}>
                      <Field
                        name="location"
                        as={TextField}
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Location"
                        fullWidth
                        value={values.location}
                        error={touched.location && Boolean(errors.location)}
                        helperText={touched.location && errors.location}
                      />
                    </Grid>  <Grid item xs={12} sm={12}>
                      <Field
                        name="tentang_kami"
                        as={TextField}
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Tentang Kami"
                        fullWidth
                        value={values.tentang_kami}
                        error={touched.tentang_kami && Boolean(errors.tentang_kami)}
                        helperText={touched.tentang_kami && errors.tentang_kami}
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

