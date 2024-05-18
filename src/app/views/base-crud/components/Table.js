import {
  Alert,
  Box,
  CircularProgress,
  Icon,
  IconButton,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { INIT_PAGE_STATE } from 'app/constants/constants';
import useBaseCruds from 'app/hooks/base-crud/useBaseCruds';
import Swal from 'sweetalert2';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const BaseCrudTable = ({
  data,
  loading,
  error,
  message,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  onAddEditData,
  onDetail
}) => {
  const { currentPage, selectedPageSize, totalItemCount } = pagination;
  const startIndex = (currentPage - 1) * selectedPageSize;
  const { deleteBaseCrud, loadBaseCruds } = useBaseCruds();

  const onDelete = async (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBaseCrud(item?.id);
        loadBaseCruds();
      } else {
        loadBaseCruds();
      }
    });
  };

  return (
    <Box width="100%">
      <>
        {!data || loading || error ? (
          (loading && (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          )) ||
          (error && <Alert severity="error">{message}</Alert>)
        ) : (
          <>
            <TableContainer>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width={40}>
                      #
                    </TableCell>
                    <TableCell align="left">Integer</TableCell>
                    <TableCell align="left">Small Integer</TableCell>
                    <TableCell align="left">String</TableCell>
                    <TableCell align="left">Boolean</TableCell>
                    <TableCell align="left">Float</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Time</TableCell>
                    <TableCell align="left">DateTime</TableCell>
                    <TableCell align="left">Text</TableCell>
                    <TableCell align="left">Blob</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data?.length > 0 &&
                    data?.map((row, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="left">{startIndex + index + 1}</TableCell>
                          <TableCell align="left">{row.column_integer}</TableCell>
                          <TableCell align="left">{row.column_smallint}</TableCell>
                          <TableCell align="left">{row.column_string}</TableCell>
                          <TableCell align="left">{row.column_boolean}</TableCell>
                          <TableCell align="left">{row.column_float}</TableCell>
                          <TableCell align="left">{row.column_date}</TableCell>
                          <TableCell align="left">{row.column_time}</TableCell>
                          <TableCell align="left">{row.column_datetime}</TableCell>
                          <TableCell align="left">{row.column_text}</TableCell>
                          <TableCell align="left">{row.column_binary}</TableCell>
                          <TableCell align="left">
                            <IconButton onClick={() => onDetail(row)}>
                              <Icon color="info">search</Icon>
                            </IconButton>
                            <IconButton onClick={() => onAddEditData(row)}>
                              <Icon color="success">mode_edit</Icon>
                            </IconButton>
                            <IconButton onClick={() => onDelete(row)}>
                              <Icon color="error">delete</Icon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </StyledTable>
            </TableContainer>
            <TablePagination
              sx={{ px: 2 }}
              page={currentPage}
              component="div"
              rowsPerPage={selectedPageSize}
              count={totalItemCount}
              onPageChange={(i, value) => onPageChange(value)}
              rowsPerPageOptions={INIT_PAGE_STATE.pageSizes}
              onRowsPerPageChange={(e) => onRowsPerPageChange(e.target.value)}
              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            />
          </>
        )}
      </>
    </Box>
  );
};

export default BaseCrudTable;
