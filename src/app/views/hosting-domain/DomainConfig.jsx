// src/components/DomainConfig.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuths from 'app/hooks/auth/useAuth';
import { Button, TextField, Typography, Box, Select, MenuItem, FormControl, InputLabel, Divider } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NContainer } from 'app/components/NContainer';
import { SimpleCard } from 'app/components';
import { POST_SERVER } from 'app/server/Api';
import toaster, { TOASTER_ERROR } from 'app/helpers/functions/Toaster';
import { saveToken } from 'app/helpers/functions/LocalStorageServices';
import useAuth from 'app/hooks/useAuth';


import { duration } from 'moment';
import { useState } from 'react';

const durationOptions = [
  { id: 1, label: '1 Tahun', price: 100000 },
  { id: 2, label: '2 Tahun', price: 190000 },
  { id: 3, label: '3 Tahun', price: 270000 }
];

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  name: Yup.string().required('Name is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
  duration: Yup.number().required('Duration is required').oneOf(durationOptions.map(option => option.id), 'Invalid duration')
});
const validationSchemaAuth = Yup.object({

  duration: Yup.number().required('Duration is required').oneOf(durationOptions.map(option => option.id), 'Invalid duration')
});

const TextFieldWithError = ({ field, form, ...props }) => (
  <TextField
    {...field}
    {...props}
    error={Boolean(form.touched[field.name] && form.errors[field.name])}
    helperText={
      form.touched[field.name] && form.errors[field.name] ? (
        <Typography variant="caption" color="error">
          {form.errors[field.name]}
        </Typography>
      ) : null
    }
  />
);

const SelectFieldWithError = ({ field, form, ...props }) => (
  <FormControl fullWidth margin="normal" variant="outlined" error={Boolean(form.touched[field.name] && form.errors[field.name])}>
    <InputLabel id="duration-label">Duration</InputLabel>
    <Select
      {...field}
      {...props}
      label="Duration"
      labelId="duration-label"
    >
      {durationOptions.map(option => (
        <MenuItem key={option.id} value={option.id}>
          {option.label} - {option.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
        </MenuItem>
      ))}
    </Select>
    {form.touched[field.name] && form.errors[field.name] && (
      <Typography variant="caption" color="error">
        {form.errors[field.name]}
      </Typography>
    )}
  </FormControl>
);

function DomainConfig() {
  const location = useLocation();
  const navigate = useNavigate();
  const { domain } = location.state || {};
  const { isAuthenticated, setAuthStatus } = useAuths();
  const [modal, setModal] = useState(false)
  const { user } = useAuth();


  const handleCheckout = (values) => {
    const selectedDuration = durationOptions.find(option => option.id === values.duration);
    const checkoutData = {
      ...values,
      duration: selectedDuration.id,
      price: selectedDuration.price
    };

    if (!isAuthenticated) {

      const { name, email, password } = values
      POST_SERVER('register', { name, email, password, password_confirmation: password }, (res) => {
        POST_SERVER('login', { email, password }, (res) => {
          const { data } = res?.data
          const token = (data?.token);
          saveToken(token);
          setAuthStatus(true);
          const payload = {
            user_id: data?.user?.id,
            price: checkoutData?.price,
            duration: checkoutData?.duration,
          }
          POST_SERVER('transaction/invoice', payload, (r) => {
            const { data } = r?.data
            navigate('/invoice/' + data?.id)
          })

        })


      }, (e) => {
        toaster(e?.response?.data?.error?.message, TOASTER_ERROR);
      })
    } else {
      const payload = {
        user_id: user?.id,
        price: checkoutData?.price,
        duration: checkoutData?.duration,
      }
      POST_SERVER('transaction/invoice', payload, (r) => {
        const { data } = r?.data
        navigate('/invoice/' + data?.id)
      })
    }



  };

  const handleLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  return (
    <NContainer>
      <SimpleCard>
        <Box>
          <Typography variant="h6" component="h6" gutterBottom>
            Configure Domain: {domain}
          </Typography>
          <Typography variant="p" component="p" gutterBottom>
            Cari domain untuk hosting yang tersedia !
          </Typography>
          <br />
          <Divider />
          <br />


          <Formik
            initialValues={isAuthenticated ? { email: user?.email, name: user?.name, password: 'none', duration: '' } : { email: '', name: '', password: '', duration: '' }}
            validationSchema={isAuthenticated ? validationSchemaAuth : validationSchema}
            onSubmit={handleCheckout}
          >
            {({ isSubmitting, errors }) => (

              <Form>
                {JSON.stringify(errors)}
                <Field
                  name="duration"
                  component={SelectFieldWithError}
                  label="Duration"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                {!isAuthenticated ? (
                  <>
                    <Field
                      name="name"
                      component={TextFieldWithError}
                      label="Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      name="email"
                      component={TextFieldWithError}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />

                    <Field
                      name="password"
                      component={TextFieldWithError}
                      type="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  </>
                ) : (

                  <>
                    <div>nama : {user?.name}</div>
                    <div>email : {user?.email}</div>
                    <br />
                  </>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Checkout
                </Button>
              </Form>
            )}
          </Formik>

          {/* <Button variant="contained" color="primary" onClick={handleCheckout}>
            Checkout
          </Button> */}

          {!isAuthenticated && (
            <Box mt={2}>
              <Typography variant="body1" gutterBottom>
                If you have an account, please <span onClick={handleLogin} style={{ color: 'blue', cursor: 'pointer' }}>log in</span>.
              </Typography>
            </Box>
          )}
        </Box>
      </SimpleCard>
    </NContainer>
  );
}

export default DomainConfig;
