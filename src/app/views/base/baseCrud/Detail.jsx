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
import { API, PAGE_PATH } from './configurator';

const Detail = () => {
  const { loading, getOne } = useBaseServerState();
  const navigate = useNavigate();
  const params = useParams();

  // inital values
  const [initialValues, setInitialValues] = useState({
    column_integer: null,
    column_smallint: null,
    column_string: null,
    column_boolean: null,
    column_float: null,
    column_date: null,
    column_time: null,
    column_datetime: null,
    column_text: null
  });

  useEffect(() => {
    if (params.id) {
      getOne(API, params.id, (status, message, data, meta) => {
        toaster(`${status} ${message}`, TOASTER_SUCCESS);
        setInitialValues({
          column_integer: data?.column_integer,
          column_smallint: data?.column_smallint,
          column_string: data?.column_string,
          column_boolean: data?.column_boolean,
          column_float: data?.column_float,
          column_date: data?.column_date,
          column_time: data?.column_time,
          column_datetime: data?.column_datetime,
          column_text: data?.column_text
        });
      });
    }
  }, [getOne, params.id]);

  const redirectBack = () => {
    navigate('/base/base-crud/');
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
