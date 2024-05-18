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
tagline: null,
email: null,
no_tlp: null,
no_whatsapp: null,
alamat: null,
location: null,
tentang_kami: null,});
      
        useEffect(() => {
          if (params.id) {
            getOne(API, params.id, (status, message, data, meta) => {
              toaster(`${status} ${message}`, TOASTER_SUCCESS);
              setInitialValues({
tagline: data?.tagline,
email: data?.email,
no_tlp: data?.no_tlp,
no_whatsapp: data?.no_whatsapp,
alamat: data?.alamat,
location: data?.location,
tentang_kami: data?.tentang_kami,});
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
      <Typography variant="subtitle2">Logo</Typography>
    </Grid>
    <Grid item xs={6} md={8}>
     <Typography variant="caption">{initialValues?.logo}</Typography>
    </Grid>
    
<Grid item xs={6} md={4}>
      <Typography variant="subtitle2">Tagline</Typography>
    </Grid>
    <Grid item xs={6} md={8}>
     <Typography variant="caption">{initialValues?.tagline}</Typography>
    </Grid>
    
<Grid item xs={6} md={4}>
      <Typography variant="subtitle2">Email</Typography>
    </Grid>
    <Grid item xs={6} md={8}>
     <Typography variant="caption">{initialValues?.email}</Typography>
    </Grid>
    
<Grid item xs={6} md={4}>
      <Typography variant="subtitle2">No Tlp</Typography>
    </Grid>
    <Grid item xs={6} md={8}>
     <Typography variant="caption">{initialValues?.no_tlp}</Typography>
    </Grid>
    
<Grid item xs={6} md={4}>
      <Typography variant="subtitle2">No Whatsapp</Typography>
    </Grid>
    <Grid item xs={6} md={8}>
     <Typography variant="caption">{initialValues?.no_whatsapp}</Typography>
    </Grid>
    
<Grid item xs={6} md={4}>
      <Typography variant="subtitle2">Alamat</Typography>
    </Grid>
    <Grid item xs={6} md={8}>
     <Typography variant="caption">{initialValues?.alamat}</Typography>
    </Grid>
    
<Grid item xs={6} md={4}>
      <Typography variant="subtitle2">Location</Typography>
    </Grid>
    <Grid item xs={6} md={8}>
     <Typography variant="caption">{initialValues?.location}</Typography>
    </Grid>
    
<Grid item xs={6} md={4}>
      <Typography variant="subtitle2">Tentang Kami</Typography>
    </Grid>
    <Grid item xs={6} md={8}>
     <Typography variant="caption">{initialValues?.tentang_kami}</Typography>
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
      
