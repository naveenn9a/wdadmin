import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.scss'


function generateRow(row, columns, handleTableRowClick) {
  return <TableRow
    key={row.slug}
    onClick={() => handleTableRowClick(row)}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    {columns.map((column) => (
      <TableCell key={column}>{row[column] ? row[column].toString().slice(0, 200) : ''}</TableCell>
    ))}
  </TableRow>
}


export default function WDTable({ columns, rows, handleTableRowClick }) {
  return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column}>{column.toUpperCase()}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          generateRow(row, columns, handleTableRowClick)
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}
