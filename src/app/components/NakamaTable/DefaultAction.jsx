import { IconButton, Icon } from '@mui/material';

export const DefaultActionTable = ({ onDetail, onEdit, onDelete, children }) => {
  return (
    <>
      <IconButton onClick={onDetail}>
        <Icon color="info">search</Icon>
      </IconButton>
      <IconButton onClick={onEdit}>
        <Icon color="success">mode_edit</Icon>
      </IconButton>
      <IconButton onClick={onDelete}>
        <Icon color="error">delete</Icon>
      </IconButton>
      {children}
    </>
  );
};
