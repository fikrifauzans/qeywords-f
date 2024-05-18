import * as React from 'react';
import { styled } from '@mui/system';
import { TextareaAutosize as BaseTextareaAutosize, Typography } from '@mui/material';

export default function TextArea({
  label,
  name,
  onChange,
  maxRows,
  placeholder,
  defaultValue,
  required = false
}) {
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    margin-bottom: 20px;
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
    background: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff'};
    border: 1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]
    };
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]
    };

    &:hover {
      border-color: ${theme.palette.primary.main};
    }

    &:focus {
      border-color: ${theme.palette.primary.main};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light
      };
    }

    // Firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  return (
    <div>
      {label && (
        <Typography variant="body1" color="CaptionText" gutterBottom>
          {label}
        </Typography>
      )}
      <Textarea
        name={name}
        onChange={onChange}
        maxRows={maxRows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-label="maximum height"
        required={required}
      />
    </div>
  );
}
