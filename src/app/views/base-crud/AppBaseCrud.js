import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import Table from './components/Table';
import useBaseCodes from 'app/hooks/base-crud/useBaseCruds';
import Heading from './components/Heading';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppBaseCrud = () => {
  const navigate = useNavigate();
  const { data, loading, filters, error, message, loadBaseCruds, pagination, setMode } =
    useBaseCodes();

  const onPageChange = (page) => {
    const filters = [
      {
        name: 'page',
        value: page
      }
    ];
    loadBaseCruds(filters);
  };

  const onRowsPerPageChange = (value) => {
    const filters = [
      {
        name: 'limit',
        value: value
      }
    ];
    loadBaseCruds(filters);
  };

  const onAddEditData = (item) => {
    if (item) {
      setMode('edit');
      navigate(`/base-crud/form/${item.id}`);
    } else {
      setMode('add');
      navigate('/base-crud/form');
    }
  };

  const onDetail = (item) => {
    if (item) {
      navigate(`/base-crud/detail/${item.id}`);
    }
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Material', path: '/material' }, { name: 'Base Crud' }]}
        />
      </Box>

      <SimpleCard title="Base Crud">
        <Heading loadBaseCruds={loadBaseCruds} onAddEditData={onAddEditData} />
        <Table
          data={data}
          loading={loading}
          filters={filters}
          error={error}
          message={message}
          pagination={pagination}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          onAddEditData={onAddEditData}
          onDetail={onDetail}
        />
      </SimpleCard>
    </Container>
  );
};

export default AppBaseCrud;
