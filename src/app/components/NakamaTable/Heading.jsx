import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddButton from '../NakamaButtons/AddButton';

const Heading = ({ onAdd, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmitOnSearch = (e) => {
    e.preventDefault();
    return onSearch(searchTerm);
  };

  return (
    <>
      <Grid container spacing={2} marginBottom={2} marginTop={3} alignItems="center">
        <Grid item xs={12} md={8} lg={6}>
          <form onSubmit={handleSubmitOnSearch}>
            <TextField
              type="text"
              name="search"
              label="Search"
              size="small"
              style={{ width: '300px' }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </Grid>
        <Grid item xs={12} md={4} lg={6} style={{ textAlign: 'right' }}>
          <AddButton label="Tambah Artikel" onClick={onAdd} />
        </Grid>
      </Grid>
    </>
  );
};

export default Heading;
