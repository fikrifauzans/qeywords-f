import { Add } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Heading = ({ onAddEditData, loadBaseCruds }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filters = [];
      if (searchTerm.trim() !== '') {
        filters.push({
          name: 'search',
          value: searchTerm
        });
      }
      loadBaseCruds(filters);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e);
  };

  return (
    <>
      <Grid container spacing={2} marginBottom={2} marginTop={3} alignItems="center">
        <Grid item xs={12} md={8} lg={6}>
          <TextField
            type="text"
            name="search"
            label="Search"
            size="small"
            style={{ width: '300px' }}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={6} style={{ textAlign: 'right' }}>
          <Button variant="contained" startIcon={<Add />} onClick={() => onAddEditData()}>
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Heading;
