import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import 'react-toastify/dist/ReactToastify.css';
import toaster from 'app/helpers/functions/Toaster';
import { useEffect } from 'react';

const FileUpload = ({
  name,
  defaultValues = [],
  onFileUpload,
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

  useEffect(() => {
    setFiles(defaultValues);
  }, [defaultValues]); // Add defaultValues to the dependency array

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles((prevFiles) => {
        // Check for duplicate files
        const newFiles = acceptedFiles.filter(
          (file) => !prevFiles.some((existingFile) => existingFile.file.name === file.name)
        );

        const updatedFiles = newFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          isUploading: true // Set isUploading to true for new files
        }));

        const duplicateFile = acceptedFiles.find((file) =>
          prevFiles.some((existingFile) => existingFile.file.name === file.name)
        );

        if (duplicateFile) {
          toaster(`File "${duplicateFile.name}" already added.`, 'info');
        }

        // Check if multiple is true, return array; otherwise, return object
        const finalFiles = multiple ? [...prevFiles, ...updatedFiles] : [...updatedFiles];
        if (onFileUpload) {
          onFileUpload(finalFiles);
        }

        return finalFiles;
      });
    },
    [onFileUpload, multiple]
  );

  const removeFile = (index, event) => {
    event.stopPropagation(); // Stop the click event propagation
    const updatedFiles = [...files];
    const removedFile = updatedFiles.splice(index, 1)[0];
    setFiles(updatedFiles);

    // Revoke the ObjectURL to prevent memory leaks
    URL.revokeObjectURL(removedFile.preview);

    if (onFileUpload) {
      onFileUpload(updatedFiles);
    }
  };

  const getFileTypeIcon = (fileName) => {
    const fileType = fileName.split('.').pop().toLowerCase();
    if (fileType.startsWith('image/')) {
      return <ImageIcon style={{ fontSize: '48px', color: '#888' }} />;
    } else if (fileType === 'pdf') {
      return <DescriptionIcon style={{ fontSize: '48px', color: '#888' }} />;
    } else {
      return <InsertDriveFileIcon style={{ fontSize: '48px', color: '#888' }} />;
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept,
    multiple
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

      {files?.length > 0 && (
        <div
          style={{
            marginTop: positionPreviewBottom ? '20px' : 'auto',
            marginBottom: positionPreviewBottom ? 'auto' : '20px',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {files.map((file, index) => (
            <div key={index} style={{ margin: '0 10px', textAlign: 'center' }}>
              {file?.file?.type?.startsWith('image/') ? (
                <img
                  src={file.preview}
                  alt={`Preview ${index}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    marginBottom: '5px'
                  }}
                />
              ) : (
                getFileTypeIcon(file?.file?.name)
              )}
              <Typography variant="body2" color="textSecondary">
                {file.file.name}
              </Typography>
              <IconButton
                onClick={(event) => removeFile(index, event)}
                style={{ marginTop: '5px', background: '#fff' }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
