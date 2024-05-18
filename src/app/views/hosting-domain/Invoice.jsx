// src/components/Invoice.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_BY_ID_SERVER } from 'app/server/Api';
import { Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from '@mui/material';
import { NContainer } from 'app/components/NContainer';
import { SimpleCard } from 'app/components';

const styles = {
  root: {
    padding: '20px',
  },
  paper: {
    padding: '20px',
  },
};

const Invoice = () => {
  const params = useParams();
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const getInvoice = () => {
      GET_BY_ID_SERVER('transaction/invoice', params?.id, (res) => {
        setInvoiceData(res?.data?.data);
      });
    };
    getInvoice();
  }, [params.id]);

  return (
    <NContainer>

      <SimpleCard>


        <div style={styles.root}>
          <Typography variant="h6" component="h6" gutterBottom>
            Cari Domain
          </Typography>
          <Typography variant="p" component="p" gutterBottom>
            Cari domain untuk hosting yang tersedia !
          </Typography>

          <br />
          <Divider />
          <br />
          <br />
          {invoiceData && (
            <Paper style={styles.paper}>
              <Typography variant="h5" gutterBottom>Orderan Anda Berhasil!</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={2}>Detail</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Invoice ID</TableCell>
                      <TableCell align="right">{invoiceData.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell align="right">{invoiceData.user.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell align="right">{invoiceData.user.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Price</TableCell>
                      <TableCell align="right">Rp. {invoiceData.price}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Duration</TableCell>
                      <TableCell align="right">{invoiceData.duration} day(s)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </div>
        <Typography>

          Silahkan bayar di no rekeninm berikut ini :
          663721667321
        </Typography>
      </SimpleCard>
    </NContainer>
  );
};

export default Invoice;
