/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import ImageIcon from '@mui/icons-material/Image';
// import DescriptionIcon from '@mui/icons-material/Description';
import 'react-toastify/dist/ReactToastify.css';
import toaster from 'app/helpers/functions/Toaster';
import { useEffect } from 'react';

const SingleFileImage = ({
  name,
  defaultValues = [],
  onChange,
  accept = {
    'image/*': []
  },
  multiple = true,
  label = 'Select Files to Upload',
  subLabel = 'or Drag and drop files here.',
  positionPreviewBottom = false,
  required = false
}) => {
  const [files, setFiles] = useState(defaultValues);
  const storagePath = process.env.REACT_APP_BACKEND_STORAGE ?? 'http://localhost:8090/';


  useEffect(() => {
    setFiles(defaultValues);
  }, [defaultValues]); // Add defaultValues to the dependency array

  //take a single JavaScript File object
  const getFile = async (file) => {
    const f = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    let fileObj = {};
    await f.then((result) => {
      fileObj['base64'] = result;
      fileObj['type'] = file.type;
      fileObj['size'] = file.size;
      fileObj['path'] = result;
      fileObj['name'] = file.name;
    });
    return fileObj;
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const fileObj = await getFile(acceptedFiles[0]);
      onChange(fileObj);
      setFiles(fileObj);
    },
    [setFiles, onChange]
  );

  const onDropAccepted = useCallback(
    async (acceptedFiles) => {
      const fileObj = await getFile(acceptedFiles[0]);
      onChange(fileObj);
      setFiles(fileObj);
    },
    [setFiles, onChange]
  );

  const removeFile = (event) => {
    event.stopPropagation(); // Stop the click event propagation
    setFiles(null);
    onChange(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept,
    multiple,
    onDropAccepted
  });

  return (
    <div
      {...getRootProps()}
      style={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #eee',
        padding: '20px',
        cursor: 'pointer',
        position: 'relative',
        minHeight: '200px',
        width: '100%',
        marginBottom: 20
      }}
    >
      <input {...getInputProps({ required })} />
      <CloudUploadIcon style={{ fontSize: '4em', color: '#888' }} />
      <Typography variant="h5" color="textSecondary" style={{ marginTop: '10px' }}>
        {label}
      </Typography>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        style={{ marginTop: '10px', marginBottom: 10 }}
      >
        {subLabel}
      </Typography>

      {files !== null && files.name !== undefined && (
        <div
          style={{
            marginTop: positionPreviewBottom ? '20px' : 'auto',
            marginBottom: positionPreviewBottom ? 'auto' : '20px',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ margin: '0 10px', textAlign: 'center' }}>
            <img
              src={files.base64 !== undefined ? files.base64 : `${storagePath}/${files.path}`}
              alt={`Preview ${files.name}`}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                marginBottom: '5px'
              }}
            />

            <Typography variant="body2" color="textSecondary">
              {files.name}
            </Typography>
            <IconButton
              onClick={(event) => removeFile(event)}
              style={{ marginTop: '5px', background: '#fff' }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleFileImage;
