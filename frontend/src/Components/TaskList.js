import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'

export default function TaskList(props) {

  const tableData = props.data;

  return (
    <TableContainer>
      <TableHead>
        <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Task</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell><Chip color={row.status.replace(" ","").toLowerCase()} label={row.status} /></TableCell>
            <TableCell>
              {/* Add action buttons here */}
              <IconButton disabled><EditIcon/></IconButton>
              <IconButton disabled><DeleteIcon/></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  )
}
