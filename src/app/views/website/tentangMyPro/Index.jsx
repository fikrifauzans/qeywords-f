
import { useNavigate } from 'react-router-dom';
import {
  ADD_OR_EDIT_URL,
  API,

} from './Configurator';
import { useBaseServerState } from 'app/hooks/core/useBaseServerState';
import { useEffect } from 'react';


const Index = () => {
  // ### DEFINED STATE
  const { filters, data, getList } =
    useBaseServerState();
  // ### FIRSTIME RENDERING

  useEffect(() => {
    getList(API, { ...filters });
  }, [getList, filters]);



  const navigate = useNavigate();

  // ### GET DATA AND REFRESHER
  // const refresh = (query) => getList(API, { ...query });

  // ### TABLE EVENT
  // const onSearch = (search) => refresh({ search: search, ...filters });
  // const onPageChange = (page) => refresh({ page: page, ...filters });
  // const onRowsPerPageChange = (limit) => refresh({ limit: limit, ...filters });
  // const onSort = (orderBy, sortBy) => refresh({ sortBy: orderBy, orderBy: sortBy, ...filters });

  // ### ROW ACTION EVENT
  const onAdd = () => navigate(ADD_OR_EDIT_URL);
  // const onDetail = (row) => navigate(`${DETAIL_URL}/${row.id}`);
  // const onDelete = (row) =>
  //   Swal.fire(DELETE_SWAL_OBJECT).then((result) => {
  //     if (result.isConfirmed)
  //       destroyById(
  //         API,
  //         row.id,
  //         (successStatus, successMessage) =>
  //           toaster(`${successStatus} - ${successMessage}`, TOASTER_SUCCESS),
  //         (errorStatus, errorMessage) => toaster(`${errorStatus} - ${errorMessage}`, TOASTER_ERROR)
  //       );
  //     return refresh();
  //   });
  const onEdit = (row) => navigate(`${ADD_OR_EDIT_URL}/${row.id}`);

  if(data.length === 0) return onAdd
  else return onEdit(data[0])



  // return (
  //   <NContainer>
  //     <Box className="breadcrumb">
  //       <Breadcrumb routeSegments={PAGE_PATH} />
  //     </Box>
  //     <SimpleCard title={TABLE_NAME}>
  //       <Heading onSearch={onSearch} onAdd={onAdd} />
  //       <Table
  //         header={<Headers onSort={onSort} />}
  //         row={<Rows onDetail={onDetail} onDelete={onDelete} onEdit={onEdit} data={data} />}
  //         error={error}
  //         message={message}
  //         data={data}
  //         loading={loading}
  //         pagination={pagination}
  //         onPageChange={onPageChange}
  //         onRowsPerPageChange={onRowsPerPageChange}
  //       />
  //     </SimpleCard>
  //   </NContainer>
  // );
};

export default Index;

