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
import FileUpload from 'app/components/FileUpload';
import { Span } from 'app/components/Typography';
import { Field, Formik } from 'formik';
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
import { format } from 'date-fns';
import toaster, { TOASTER_ERROR } from 'app/helpers/functions/Toaster';
import { ContentState, convertFromHTML, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { getContentValue, setContentValue } from 'app/helpers/functions/RichTextService';

const AddEditData = () => {
  const { postBaseCrud, mode, setMode, loadBaseCrud, updateBaseCrud } = useBaseCruds();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      column_date: values?.column_date ? moment(values?.column_date).format('YYYY-MM-DD') : null,
      column_time: values?.column_time ? moment(values?.column_time).format('HH:mm:ss') : null,
      column_datetime: values?.column_datetime
        ? moment(values?.column_datetime).format('YYYY-MM-DD HH:mm:ss')
        : null,
      // rich text
      column_text: setContentValue(values.column_text)
    };
    try {
      let response = null;
      if (mode === 'add') response = await postBaseCrud('/base/base-crud', payload);
      if (mode === 'edit') response = await updateBaseCrud(id, '/base/base-crud/', payload);
      if (response?.status === 201 || response?.status === 200) {
        navigate('/base-crud');
      }
    } catch (error) {
      toaster(error?.message, TOASTER_ERROR);
    }
  };

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
    // column_text: null, // text area
    column_text:
      mode === 'add'
        ? EditorState.createEmpty()
        : EditorState.createWithContent(ContentState.createFromText('')), // rich text
    column_binary: 1
  });

  // form field validation schema
  const validationSchema = Yup.object().shape({
    column_integer: Yup.number()
      .typeError('Column Integer must be a number')
      .integer('Column Integer must be an integer')
      .required('Column Integer is Required'),
    column_smallint: Yup.number()
      .typeError('Column Small Integer must be a number')
      .integer('Column Small Integer must be an integer')
      .required('Column Small Integer is Required'),
    column_string: Yup.string()
      .min(1, 'Column String must be 1 character length')
      .required('Column String is Required'),
    column_boolean: Yup.boolean().required('Column Boolean is Required'),
    column_float: Yup.number()
      .typeError('Column Float must be a number')
      .required('Column Float is Required'),
    column_date: Yup.date().required('Date is required'),
    column_time: Yup.date().required('Column Time is Required'),
    column_datetime: Yup.date().required('Column DateTime is Required'),
    // text area
    // column_text: Yup.string()
    //   .min(1, 'Column String must be 1 character length')
    //   .required('Column String is Required'),

    // rich text
    column_text: Yup.mixed().required('Column String is Required')
    // column_binary: Yup.mixed().nullable()
  });

  useEffect(() => {
    if (id) {
      setMode('edit');
      loadBaseCrud(id).then((response) => {
        if (response) {
          setInitialValues({
            column_integer: response?.column_integer,
            column_smallint: response?.column_smallint,
            column_string: response?.column_string,
            column_boolean: response?.column_boolean === 1 ? true : false,
            column_float: response?.column_float,
            column_date: response?.column_date ? new Date(response?.column_date) : null,
            column_time: response?.column_time
              ? new Date(`2000-01-01T${response?.column_time}Z`)
              : null,
            column_datetime: response?.column_datetime ? new Date(response?.column_datetime) : null,
            // column_text: response?.column_text ?? '', // text area
            column_text: response?.column_text
              ? getContentValue(response?.column_text)
              : EditorState.createEmpty(), // rich text
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
          routeSegments={[
            { name: 'Base Crud', path: '/base-crud' },
            { name: mode === 'edit' ? 'Edit' : 'Create' }
          ]}
        />
      </Box>
      <Stack spacing={3}>
        <SimpleCard title={mode === 'edit' ? 'Edit Base Crud' : 'Create Base Crud'}>
          <Formik
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
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="Column Integer"
                      type="number"
                      name="column_integer"
                      value={values.column_integer || ''}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.column_integer && Boolean(errors.column_integer)}
                      helperText={touched.column_integer && errors.column_integer}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      label="Column Small Integer"
                      type="number"
                      name="column_smallint"
                      value={values.column_smallint || ''}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.column_smallint && Boolean(errors.column_smallint)}
                      helperText={touched.column_smallint && errors.column_smallint}
                      sx={{ mb: 3 }}
                    />

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
                      sx={{ mb: 3 }}
                    />

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
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      label="Column Float"
                      type="number"
                      name="column_float"
                      value={values.column_float || ''}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.column_float && Boolean(errors.column_float)}
                      helperText={touched.column_float && errors.column_float}
                      sx={{ mb: 3 }}
                    />
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Column Date"
                        name="column_date"
                        value={values.column_date}
                        onChange={(date) => {
                          setFieldValue('column_date', date);
                        }}
                        slotProps={{ textField: { fullWidth: true, required: true } }}
                        error={touched.column_date && Boolean(errors.column_date)}
                        helperText={touched.column_date && errors.column_date}
                        sx={{ mb: 3 }}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Column Time"
                        name="column_time"
                        value={values.column_time}
                        onChange={(date) => {
                          setFieldValue('column_time', date);
                        }}
                        slotProps={{ textField: { fullWidth: true, required: true } }}
                        error={touched.column_time && Boolean(errors.column_time)}
                        helperText={touched.column_time && errors.column_time}
                        sx={{ mb: 3 }}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        label="Column Date Time"
                        name="column_datetime"
                        value={values.column_datetime}
                        onChange={(date) => {
                          setFieldValue('column_datetime', date);
                        }}
                        slotProps={{ textField: { fullWidth: true, required: true } }}
                        error={touched.column_datetime && Boolean(errors.column_datetime)}
                        helperText={touched.column_datetime && errors.column_datetime}
                        sx={{ mb: 3 }}
                      />
                    </LocalizationProvider>

                    {/* Text Area */}

                    {/* <Field
                      name="column_text"
                      as={TextField}
                      multiline
                      rows={4}
                      variant="outlined"
                      label="Column Textarea"
                      fullWidth
                      margin="normal"
                    /> */}

                    {/* Rich Text */}
                    <Editor
                      editorState={values.column_text}
                      onEditorStateChange={(editorState) =>
                        setFieldValue('column_text', editorState)
                      }
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      toolbarClassName="demo-toolbar"
                      editorStyle={{
                        marginBottom: 25,
                        border: '1px solid #bdbdbd',
                        padding: '2px',
                        minHeight: 150,
                        borderRadius: '4px'
                      }}
                    />

                    {/* <div>
                      <Typography variant="body1" color="CaptionText" gutterBottom>
                        Column Text
                      </Typography>
                      <Editor
                        name="column_text"
                        editorStyle={{
                          marginBottom: 25,
                          border: '1px solid #bdbdbd',
                          padding: '16px',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                    <FileUpload
                      name="column_binary" // Use the same name as in initialValues
                      onFileUpload={handleChange}
                      accept="image/*"
                      multiple
                    /> */}
                  </Grid>
                </Grid>

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
    </Container>
  );
};

export default AddEditData;
