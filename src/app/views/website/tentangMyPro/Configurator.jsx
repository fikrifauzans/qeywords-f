
            import { TableCell, TableBody, TableRow, TableHead } from '@mui/material';
            import { DefaultActionTable } from 'app/components/NakamaTable/DefaultAction';
            import SortableTableHead from 'app/components/NakamaTable/SortableTableHead';
            // import { PAYLOAD_BOOLEAN, PAYLOAD_DATE, PAYLOAD_DATETIME, PAYLOAD_FLOAT, PAYLOAD_INT, PAYLOAD_STRING, PAYLOAD_TIME } from 'app/helpers/functions/PayloadHandler';
            
            // #### API URL #####
            export const API = '/website/tentang-mypro';
            export const INDEX_URL = '/website/tentang-mypro';
            export const ADD_OR_EDIT_URL = '/website/tentang-mypro/form';
            export const DETAIL_URL = '/website/tentang-mypro/detail';
            
            export const PAGE_PATH = [{ name: 'Website' }, { name: 'Tentang My Pro' }];
            
            export const TABLE_NAME = 'Base Crud';
            // #### HEADER TABLE #####
            export const Headers = ({ onSort }) => {
              const headers = [
                { component: <SortableTableHead onSort={onSort} orderBy="id" label="#" />, width: '60px' },
                 
            {
                component: (
                  <SortableTableHead onSort={onSort} orderBy='logo' label='Logo' />
                ),
                width: '140px'
              }, 
            {
                component: (
                  <SortableTableHead onSort={onSort} orderBy='tagline' label='Tagline' />
                ),
                width: '140px'
              }, 
            {
                component: (
                  <SortableTableHead onSort={onSort} orderBy='email' label='Email' />
                ),
                width: '140px'
              }, 
            {
                component: (
                  <SortableTableHead onSort={onSort} orderBy='no_tlp' label='No Tlp' />
                ),
                width: '140px'
              }, 
            {
                component: (
                  <SortableTableHead onSort={onSort} orderBy='no_whatsapp' label='No Whatsapp' />
                ),
                width: '140px'
              }, 
            {
                component: (
                  <SortableTableHead onSort={onSort} orderBy='alamat' label='Alamat' />
                ),
                width: '140px'
              }, 
            {
                component: (
                  <SortableTableHead onSort={onSort} orderBy='location' label='Location' />
                ),
                width: '140px'
              }, 
            {
                component: (
                  <SortableTableHead onSort={onSort} orderBy='tentang_kami' label='Tentang Kami' />
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
                         <TableCell>{row.logo}</TableCell>
                         <TableCell>{row.tagline}</TableCell>
                         <TableCell>{row.email}</TableCell>
                         <TableCell>{row.no_tlp}</TableCell>
                         <TableCell>{row.no_whatsapp}</TableCell>
                         <TableCell>{row.alamat}</TableCell>
                         <TableCell>{row.location}</TableCell>
                         <TableCell>{row.tentang_kami}</TableCell>
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
            
