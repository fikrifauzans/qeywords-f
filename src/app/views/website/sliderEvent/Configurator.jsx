
import { TableCell, TableBody, TableRow, TableHead } from '@mui/material';
import { DefaultActionTable } from 'app/components/NakamaTable/DefaultAction';
import SortableTableHead from 'app/components/NakamaTable/SortableTableHead';
// import { PAYLOAD_BOOLEAN, PAYLOAD_DATE, PAYLOAD_DATETIME, PAYLOAD_FLOAT, PAYLOAD_INT, PAYLOAD_STRING, PAYLOAD_TIME } from 'app/helpers/functions/PayloadHandler';

// #### API URL #####
export const API = '/website/slider-event';
export const INDEX_URL = '/website/slider-event';
export const ADD_OR_EDIT_URL = '/website/slider-event/form';
export const DETAIL_URL = '/website/slider-event/detail';

export const PAGE_PATH = [{ name: 'Website' }, { name: 'Slider Event' }];

export const TABLE_NAME = 'Sider Event';
// #### HEADER TABLE #####
export const Headers = ({ onSort }) => {
  const headers = [
    { component: <SortableTableHead onSort={onSort} orderBy="id" label="#" />, width: '60px' },

    {
      component: (
        <SortableTableHead onSort={onSort} orderBy='kategori' label='Kategori' />
      ),
      width: '140px'
    },
    {
      component: (
        <SortableTableHead onSort={onSort} orderBy='judul' label='Judul' />
      ),
      width: '140px'
    },
    {
      component: (
        <SortableTableHead onSort={onSort} orderBy='link' label='Link' />
      ),
      width: '140px'
    },
    // {
    //   component: (
    //     <SortableTableHead onSort={onSort} orderBy='banner' label='Banner' />
    //   ),
    //   width: '140px'
    // },
    {
      component: (
        <SortableTableHead onSort={onSort} orderBy='urutan' label='Urutan' />
      ),
      width: '140px'
    },
    {
      component: (
        <SortableTableHead onSort={onSort} orderBy='status' label='Status' />
      ),
      width: '140px'
    },
    {
      component: <SortableTableHead onSort={onSort} orderBy='action' label='action' />,
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
          <TableCell>{row.kategori}</TableCell>
          <TableCell>{row.judul}</TableCell>
          <TableCell>{row.link}</TableCell>
          {/* <TableCell>{row.banner}</TableCell> */}
          <TableCell>{row.urutan}</TableCell>
          <TableCell>{row.status === 1 ? 'Aktif' : 'Tidak Aktif'}</TableCell>
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

