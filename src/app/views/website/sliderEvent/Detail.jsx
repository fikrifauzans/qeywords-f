/* eslint-disable no-unused-vars */
import { Box, Button, Grid, Stack, styled, Typography, CircularProgress } from '@mui/material';

import { Breadcrumb, SimpleCard } from 'app/components';
import { Span } from 'app/components/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import useBaseCruds from 'app/hooks/base-crud/useBaseCruds';
import { useEffect } from 'react';
import { useState } from 'react';
import { NContainer } from 'app/components/NContainer';
import { useBaseServerState } from 'app/hooks/core/useBaseServerState';
import toaster, { TOASTER_SUCCESS } from 'app/helpers/functions/Toaster';
import { API, PAGE_PATH, INDEX_URL } from './Configurator';
import {
  DEFAULT_BOOLEAN,
  DEFAULT_DATE,
  DEFAULT_DATETIME,
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
  RESPONSE_BOOLEAN,
  RESPONSE_DATE,
  RESPONSE_DATETIME,
  RESPONSE_FLOAT,
  RESPONSE_INT,
  RESPONSE_STRING,
  RESPONSE_TIME
} from 'app/helpers/functions/ResponseHandler';




const Detail = () => {
  const { loading, getOne } = useBaseServerState();
  const navigate = useNavigate();
  const params = useParams();

  // inital values
  const [initialValues, setInitialValues] = useState({
    kategori: null,
    judul: null,
    link: null,
    urutan: null,
    status: null,
  });

  useEffect(() => {
    if (params.id) {
      getOne(API, params.id, (status, message, data, meta) => {
        toaster(`${status} ${message}`, TOASTER_SUCCESS);
        setInitialValues({
          kategori: data?.kategori,
          judul: data?.judul,
          link: data?.link,
          urutan: data?.urutan,
          status: data?.status,
        });
      });
    }
  }, [getOne, params.id]);

  const redirectBack = () => {
    navigate(INDEX_URL);
  };

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
          <SimpleCard title="Detail Base Crud">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                  <Typography variant="subtitle2">Kategori</Typography>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Typography variant="caption">{initialValues?.kategori}</Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                  <Typography variant="subtitle2">Judul</Typography>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Typography variant="caption">{initialValues?.judul}</Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                  <Typography variant="subtitle2">Link</Typography>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Typography variant="caption">{initialValues?.link}</Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                  <Typography variant="subtitle2">Banner</Typography>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Typography variant="caption">{initialValues?.banner}</Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                  <Typography variant="subtitle2">Urutan</Typography>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Typography variant="caption">{initialValues?.urutan}</Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                  <Typography variant="subtitle2">Status</Typography>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Typography variant="caption">{initialValues?.status === 1 ? 'Aktif' : 'Tidak Aktif'}</Typography>
                </Grid>
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
      )}
    </NContainer>
  );
};

export default Detail;

