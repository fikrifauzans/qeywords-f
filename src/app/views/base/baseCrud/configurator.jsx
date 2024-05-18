import { TableCell, TableBody, TableRow, TableHead } from '@mui/material';
import { DefaultActionTable } from 'app/components/NakamaTable/DefaultAction';
import SortableTableHead from 'app/components/NakamaTable/SortableTableHead';
// import { PAYLOAD_BOOLEAN, PAYLOAD_DATE, PAYLOAD_DATETIME, PAYLOAD_FLOAT, PAYLOAD_INT, PAYLOAD_STRING, PAYLOAD_TIME } from 'app/helpers/functions/PayloadHandler';

// #### API URL #####
export const API = '/base/base-crud';
export const INDEX_URL = '/base/base-crud';
export const ADD_OR_EDIT_URL = '/base/base-crud/form';
export const DETAIL_URL = '/base/base-crud/detail';

export const PAGE_PATH = [{ name: 'Base' }, { name: 'Base Crud' }];

export const TABLE_NAME = 'Base Crud';
// #### HEADER TABLE #####
export const Headers = ({ onSort }) => {
  const headers = [
    { component: <SortableTableHead onSort={onSort} orderBy="id" label="#" />, width: '60px' },
    {
      component: (
        <SortableTableHead onSort={onSort} orderBy="column_integer" label="column integer" />
      ),
      width: '140px'
    },
    {
      component: (
        <SortableTableHead onSort={onSort} orderBy="column_smallint" label="column smallint" />
      ),
      width: '140px'
    },
    {
      component: (
        <SortableTableHead onSort={onSort} orderBy="column_string" label="column string" />
      ),
      width: '140px'
    },
    {
      component: (
        <SortableTableHead onSort={onSort} orderBy="column_boolean" label="column boolean" />
      ),
      width: '140px'
    },
    {
      component: <SortableTableHead onSort={onSort} orderBy="column_float" label="column float" />,
      width: '140px'
    },
    {
      component: <SortableTableHead onSort={onSort} orderBy="column_date" label="column date" />,
      width: '140px'
    },
    {
      component: <SortableTableHead onSort={onSort} orderBy="column_time" label="column time" />,
      width: '140px'
    },
    {
      component: (
        <SortableTableHead onSort={onSort} orderBy="column_datetime" label="column datetime" />
      ),
      width: '150px'
    },
    {
      component: <SortableTableHead onSort={onSort} orderBy="column_text" label="column text" />,
      width: '400px'
    },
    {
      component: <SortableTableHead onSort={onSort} orderBy="column_serverside" label="Column Serverside" />,
      width: '400px'
    },
    {
      component: <SortableTableHead onSort={onSort} orderBy="column_map" label="Column Map" />,
      width: '400px'
    },
    {
      component: <SortableTableHead onSort={onSort} orderBy="action" label="action" />,
      width: '140px'
    }
  ];
  return (
    <TableHead>
      <TableRow>
        {/* ### LOOPING HEADER  */}
        {headers.map((header, index) => {
          return (
            <TableCell width={header.width} key={index}>
              {' '}
              {header.component}
            </TableCell>
          );
        })}

        {/* ### LOOPING HEADER  */}
      </TableRow>
    </TableHead>
  );
};

// ##### ROWS TABLE #####
export const Rows = ({ data, onDelete, onDetail, onEdit }) => {
  return (
    <TableBody>
      {data.map((row, index) => (
        <TableRow hover key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{row.column_integer}</TableCell>
          <TableCell>{row.column_smallint}</TableCell>
          <TableCell>{row.column_string}</TableCell>
          <TableCell>{row.column_boolean}</TableCell>
          <TableCell>{row.column_float}</TableCell>
          <TableCell>{row.column_date}</TableCell>
          <TableCell>{row.column_time}</TableCell>
          <TableCell>{row.column_datetime}</TableCell>
          <TableCell>{row.column_text}</TableCell>
          <TableCell>{row.column_serverside?.column_string}</TableCell>
          <TableCell>{(row.column_map)}</TableCell>
          <TableCell>
            <DefaultActionTable
              onDetail={() => onDetail(row)}
              onEdit={() => onEdit(row)}
              onDelete={() => onDelete(row)}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
