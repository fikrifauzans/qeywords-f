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
  Typography,
  RadioGroup,
  Radio,
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
import { API, INDEX_URL, PAGE_PATH, TABLE_NAME } from './configurator';
import {
  DEFAULT_INTEGER,
  DEFAULT_STRING,
  RULE_INTEGER_MESSAGE,
  RULE_MAX_LENGTH_MESSAGE,
  RULE_REQUIRED_MESSAGE
} from 'app/utils/constant';
import {
  PAYLOAD_FILE,
  PAYLOAD_FILES,
  PAYLOAD_INT,
  PAYLOAD_STRING,
  PAYLOAD_TEXT_RICH
} from 'app/helpers/functions/PayloadHandler';
import { useBaseServerState } from 'app/hooks/core/useBaseServerState';
import {
  RESPONSE_INT,
  RESPONSE_STRING,
  RESPONSE_TEXT_RICH,
  RESPONSE_FILE
} from 'app/helpers/functions/ResponseHandler';
import { Editor } from 'react-draft-wysiwyg';
import SubmitButton from 'app/components/NakamaButtons/SubmitButton';
import SingleFileImage from 'app/components/SingleFileImage';
import { useArtikels } from 'app/hooks/website/artikel/useArtikels';

const Form = () => {
  const { loading, getOne, updateData, postData } = useArtikels();
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (values) => {
    let payload = {
      video_link: PAYLOAD_STRING(values.video_link),
      title: PAYLOAD_STRING(values.title),
      type: PAYLOAD_INT(values.type),
      description: PAYLOAD_TEXT_RICH(values.description),
      image: PAYLOAD_FILE(values.image)
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
    video_link: DEFAULT_STRING,
    title: DEFAULT_STRING,
    type: DEFAULT_INTEGER,
    description: DEFAULT_STRING,
    image: []
  });

  // form field validation schema
  const validationSchema = Yup.object().shape({
    video_link: Yup.string().required(RULE_REQUIRED_MESSAGE),
    title: Yup.string().min(1, RULE_MAX_LENGTH_MESSAGE).required(RULE_REQUIRED_MESSAGE),
    type: Yup.number().typeError().integer().required(RULE_INTEGER_MESSAGE),
    description: Yup.mixed().required(RULE_REQUIRED_MESSAGE)
  });

  useEffect(() => {
    if (params.id) {
      getOne(API, params.id, (status, message, data, meta) => {
        toaster(`${status} ${message}`, TOASTER_SUCCESS);
        setInitialValues({
          video_link: RESPONSE_STRING(data?.video_link),
          title: RESPONSE_STRING(data?.title),
          type: RESPONSE_INT(data?.type),
          description: RESPONSE_TEXT_RICH(data?.description),
          image: RESPONSE_FILE(data.image)
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
          <SimpleCard title={params.id ? `Ubah ${TABLE_NAME}` : `Tambah ${TABLE_NAME}`}>
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
                        Pilih Jenis Artikel
                      </FormLabel>
                      <RadioGroup
                        row
                        value={values.type}
                        name="type"
                        aria-label="Pilih Jenis Artikel"
                        onChange={handleChange}
                      >
                        <FormControlLabel value={1} control={<Field as={Radio} />} label="Video" />
                        <FormControlLabel value={2} control={<Field as={Radio} />} label="Teks" />
                        <FormControlLabel value={3} control={<Field as={Radio} />} label="Event" />
                      </RadioGroup>
                    </Grid>

                    <Grid item xs={12}>
                      <FormLabel component="legend" sx={{ color: 'darkslategray' }}>
                        Gambar Artikel
                      </FormLabel>
                      <SingleFileImage
                        name="image"
                        defaultValues={values.image || []}
                        onChange={(values) => setFieldValue('image', values)}
                        accept={{
                          'image/*': []
                        }}
                        multiple={false}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormLabel component="legend" sx={{ color: 'darkslategray' }}>
                        Link Video
                      </FormLabel>
                      <TextField
                        sx={{ marginTop: 1 }}
                        fullWidth
                        type="text"
                        name="video_link"
                        value={values.video_link}
                        placeholder="Masukkan link video di sini..."
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.video_link && Boolean(errors.video_link)}
                        helperText={touched.video_link && errors.video_link}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormLabel component="legend" sx={{ color: 'darkslategray' }}>
                        Judul Artikel
                      </FormLabel>
                      <TextField
                        sx={{ marginTop: 1 }}
                        fullWidth
                        type="text"
                        name="title"
                        value={values.title}
                        placeholder="Masukkan judul artikel di sini..."
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormLabel component="legend" sx={{ color: 'darkslategray' }}>
                        Deskripsi Artikel
                      </FormLabel>
                      <Editor
                        editorState={values.description}
                        onEditorStateChange={(editorState) =>
                          setFieldValue('description', editorState)
                        }
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        toolbarClassName="demo-toolbar"
                        editorStyle={{
                          border: '1px solid #bdbdbd',
                          padding: '2px',
                          minHeight: 150,
                          borderRadius: '4px'
                        }}
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
