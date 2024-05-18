import {
  Alert,
  Box,
  CircularProgress,
  Stack,
  styled,
  Table,
  TablePagination,
  TableContainer
} from '@mui/material';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const NTable = ({
  header,
  row,
  loading,
  error,
  message,
  pagination,
  onPageChange,
  onRowsPerPageChange
}) => {
  const { currentPage, rowsPerPage, count, rowsPerPageOptions } = pagination;

  return (
    <Box width="100%">
      {/* ### Loading  */}
      {loading && (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}
      {/* ### Error Message  */}
      {error && <Alert severity="error">{message}</Alert>}
      {/* ### TABLE GLOBAL  */}
      <TableContainer sx={{ maxHeight: 400 }}>
        <StyledTable>
          {header}
          {row}
        </StyledTable>
      </TableContainer>
      <TablePagination
        sx={{ px: 2 }}
        page={currentPage}
        component="div"
        rowsPerPage={rowsPerPage}
        count={count}
        onPageChange={(index, value) => onPageChange(value, index)}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={(e) => onRowsPerPageChange(e.target.value)}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Box>
  );
};

export default NTable;
