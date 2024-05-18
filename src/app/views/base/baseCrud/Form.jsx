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
import { Breadcrumb, SimpleCard, } from 'app/components';
import { Span } from 'app/components/Typography';
import { Field, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import { useEffect, useState } from 'react';
import toaster, { TOASTER_ERROR, TOASTER_SUCCESS } from 'app/helpers/functions/Toaster';
import { NContainer } from 'app/components/NContainer';
import { API, INDEX_URL, PAGE_PATH } from './configurator';
import {
  DEFAULT_BOOLEAN,
  DEFAULT_DATE,
  DEFAULT_DATETIME,
  DEFAULT_FILE,
  DEFAULT_FLOAT,
  DEFAULT_INTEGER,
  DEFAULT_MAP,
  DEFAULT_OBJECT,
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
  PAYLOAD_FILE,
  PAYLOAD_SERVERSIDE,
  PAYLOAD_MAP,
} from 'app/helpers/functions/PayloadHandler';
import { useBaseServerState } from 'app/hooks/core/useBaseServerState';
import {
  RESPONSE_BOOLEAN,
  RESPONSE_DATE,
  RESPONSE_DATETIME,
  RESPONSE_FILE,
  RESPONSE_FLOAT,
  RESPONSE_INT,
  RESPONSE_MAP,
  RESPONSE_SERVERSIDE,
  RESPONSE_STRING,
  RESPONSE_TIME
} from 'app/helpers/functions/ResponseHandler';
import SingleFileImage from 'app/components/SingleFileImage';
import SelectServerside from 'app/components/NForms/SelectServerside';
import MapPicker from 'app/components/NForms/MapPicker';



const Form = () => {


  const { loading, getOne, updateData, postData } = useBaseServerState();
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (values) => {
    const payload = {
      column_integer: PAYLOAD_INT(values.column_integer),
      column_smallint: PAYLOAD_INT(values.column_smallint),
      column_string: PAYLOAD_STRING(values.column_string),
      column_boolean: PAYLOAD_BOOLEAN(values.column_boolean),
      column_float: PAYLOAD_FLOAT(values.column_float),
      column_date: PAYLOAD_DATE(values.column_date),
      column_time: PAYLOAD_TIME(values.column_time),
      column_datetime: PAYLOAD_DATETIME(values.column_datetime),
      column_text: PAYLOAD_STRING(values.column_text),
      column_file: PAYLOAD_FILE(values.column_file),
      column_serverside: PAYLOAD_SERVERSIDE(values.column_serverside, 'id'),
      column_map: PAYLOAD_MAP(values.column_map)
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
    column_integer: DEFAULT_INTEGER,
    column_smallint: DEFAULT_INTEGER,
    column_string: DEFAULT_STRING,
    column_boolean: DEFAULT_BOOLEAN,
    column_float: DEFAULT_FLOAT,
    column_date: DEFAULT_DATE,
    column_time: DEFAULT_TIME,
    column_datetime: DEFAULT_DATETIME,
    column_text: DEFAULT_TEXT,
    column_file: DEFAULT_FILE,
    column_serverside: DEFAULT_STRING,
    column_map: DEFAULT_STRING
  });

  // form field validation schema
  const validationSchema = Yup.object().shape({
    column_integer: Yup.number().typeError().integer().required(RULE_INTEGER_MESSAGE),
    column_smallint: Yup.number().typeError().integer().required(RULE_INTEGER_MESSAGE),
    column_string: Yup.string().min(1, RULE_MAX_LENGTH_MESSAGE).required(RULE_REQUIRED_MESSAGE),
    column_float: Yup.number().typeError().required(RULE_IS_NUMBER),
    column_boolean: Yup.boolean().required(RULE_REQUIRED_MESSAGE),
    column_date: Yup.date().typeError().required(RULE_REQUIRED_MESSAGE),
    column_time: Yup.date().typeError().required(RULE_REQUIRED_MESSAGE),
    column_datetime: Yup.date().typeError().required(RULE_REQUIRED_MESSAGE),
    column_text: Yup.string().required(RULE_REQUIRED_MESSAGE),
    column_file: null,
    column_serverside: Yup.object().required(RULE_REQUIRED_MESSAGE),
    column_map: Yup.string().required(RULE_REQUIRED_MESSAGE),
  });

  useEffect(() => {
    if (params.id) {
      getOne(API, params.id, (status, message, data, meta) => {
        toaster(`${status} ${message}`, TOASTER_SUCCESS);
        setInitialValues({
          column_integer: RESPONSE_INT(data?.column_integer),
          column_smallint: RESPONSE_INT(data?.column_smallint),
          column_string: RESPONSE_STRING(data?.column_string),
          column_boolean: RESPONSE_BOOLEAN(data?.column_boolean),
          column_float: RESPONSE_FLOAT(data?.column_float),
          column_date: RESPONSE_DATE(data?.column_date),
          column_time: RESPONSE_TIME(data?.column_time),
          column_datetime: RESPONSE_DATETIME(data?.column_datetime),
          column_text: RESPONSE_STRING(data?.column_text),
          column_file: RESPONSE_FILE(data?.column_file),
          column_serverside: RESPONSE_SERVERSIDE(data?.column_serverside),
          column_map: RESPONSE_MAP(data?.column_map)
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
          <SimpleCard title={'Form Base Crud'}>
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Column Integer"
                        type="number"
                        name="column_integer"
                        value={values.column_integer}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.column_integer && Boolean(errors.column_integer)}
                        helperText={touched.column_integer && errors.column_integer}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Column Small Integer"
                        type="number"
                        name="column_smallint"
                        value={values.column_smallint}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.column_smallint && Boolean(errors.column_smallint)}
                        helperText={touched.column_smallint && errors.column_smallint}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Column String"
                        type="text"
                        name="column_string"
                        value={values.column_string}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.column_string && Boolean(errors.column_string)}
                        helperText={touched.column_string && errors.column_string}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Column Float"
                        type="number"
                        name="column_float"
                        value={values.column_float}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.column_float && Boolean(errors.column_float)}
                        helperText={touched.column_float && errors.column_float}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={values.column_date}
                          onChange={(date) => setFieldValue('column_date', date)}
                          label="Column Date"
                          name="column_date"
                          slotProps={{ textField: { fullWidth: true } }}
                          error={touched.column_date && Boolean(errors.column_date)}
                          helperText={touched.column_date && errors.column_date}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Column Time"
                          name="column_time"
                          value={values.column_time}
                          onChange={(time) => {
                            setFieldValue('column_time', time);
                          }}
                          slotProps={{ textField: { fullWidth: true } }}
                          error={touched.column_time && Boolean(errors.column_time)}
                          helperText={touched.column_time && errors.column_time}
                          format="hh:mm:ss"
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          label="Column Date Time"
                          name="column_datetime"
                          value={values.column_datetime}
                          onChange={(date) => setFieldValue('column_datetime', date)}
                          slotProps={{ textField: { fullWidth: true } }}
                          error={touched.column_datetime && Boolean(errors.column_datetime)}
                          helperText={touched.column_datetime && errors.column_datetime}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="column_text"
                        as={TextField}
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Column Text"
                        fullWidth
                        value={values.column_text}
                        error={touched.column_text && Boolean(errors.column_text)}
                        helperText={touched.column_text && errors.column_text}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        label="Column Boolean"
                        name="column_boolean"
                        control={
                          <Checkbox
                            checked={values.column_boolean}
                            onChange={handleChange}
                            value={values.column_boolean}
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel component="legend" sx={{ color: 'darkslategray' }}>
                      Gambar Artikel
                    </FormLabel>
                    <SingleFileImage
                      name="image"
                      defaultValues={values.column_file || []}
                      onChange={(values) => setFieldValue('column_file', values)}
                      accept={{
                        'image/*': []
                      }}
                      multiple={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel component="legend" sx={{ color: 'darkslategray' }}>
                      Column Serverside
                    </FormLabel>
                    <SelectServerside
                      label="column serverside"
                      getOptionLabel={(val) => val ? `Pick Your Label (val.your_label) : ${JSON.stringify(val)}` : ''}
                      error={touched.column_serverside && Boolean(errors.column_serverside)}
                      helperText={touched.column_serverside && errors.column_serverside}
                      value={values.column_serverside}
                      onChange={(val) => setFieldValue('column_serverside', val)}
                      onClear={() => setFieldValue('column_serverside', null)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel component="legend" sx={{ color: 'darkslategray' }}>
                      Map
                    </FormLabel>
                    <MapPicker
                      onClear={() => setFieldValue('column_map', '')}
                      onChange={(val) => setFieldValue('column_map', JSON.stringify(val))}
                      value={values.column_map} />
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
                    <Button
                      color="warning"
                      variant="outlined"
                      style={{ marginRight: 10 }}
                      onClick={redirectBack}
                    >
                      <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Cancel</Span>
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                      <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
                    </Button>
                  </Box>
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
