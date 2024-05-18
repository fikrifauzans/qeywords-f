import { TableCell, TableBody, TableRow, TableHead } from '@mui/material';
import { DefaultActionTable } from 'app/components/NakamaTable/DefaultAction';
import SortableTableHead from 'app/components/NakamaTable/SortableTableHead';
// import { PAYLOAD_BOOLEAN, PAYLOAD_DATE, PAYLOAD_DATETIME, PAYLOAD_FLOAT, PAYLOAD_INT, PAYLOAD_STRING, PAYLOAD_TIME } from 'app/helpers/functions/PayloadHandler';

// #### API URL #####
export const API = '/website/artikel';
export const INDEX_URL = '/website/artikel';
export const ADD_OR_EDIT_URL = '/website/artikel/form';
export const DETAIL_URL = '/website/artikel/detail';

export const PAGE_PATH = [{ name: 'Website' }, { name: 'Artikel' }];

export const TABLE_NAME = 'Artikel';
// #### HEADER TABLE #####
export const Headers = ({ onSort }) => {
  const headers = [
    { component: <SortableTableHead onSort={onSort} orderBy="id" label="#" />, width: '60px' },
    {
      component: <SortableTableHead onSort={onSort} orderBy="title" label="Judul" />,
      width: '140px'
    },
    {
      component: <SortableTableHead onSort={onSort} orderBy="description" label="Deskripsi" />,
      width: '200px'
    },
    {
      component: <SortableTableHead onSort={onSort} orderBy="type" label="Jenis Artikel" />,
      width: '100px'
    },
    {
      component: <SortableTableHead onSort={onSort} orderBy="action" label="Action" />,
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
          <TableCell>{row.title}</TableCell>
          <TableCell>{row.description}</TableCell>
          <TableCell>{row.type}</TableCell>
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
