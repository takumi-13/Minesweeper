import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { HighScoreModalTableProps } from '../../types/highScoreModal/highScoreModalTable'

type TableRowProps = {
  is_current_result: boolean
}
const CustomTableRow = styled(TableRow)<TableRowProps>`
  background-color: ${(props) => (props.is_current_result ? '#f3ecae68' : 'white')};
`
CustomTableRow.defaultProps = {
  is_current_result: false,
}

export const HighScoreModalTable: React.FC<HighScoreModalTableProps> = ({ consts }) => {
  return (
    <TableContainer component={Paper} style={{ width: 400 }}>
      <Table aria-label="modal table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#5a9fee68' }}>
            <TableCell align="center">順位</TableCell>
            <TableCell align="center">時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consts.displayResult.map((row, index) => (
            <CustomTableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              is_current_result={consts.isActive && index === consts.insertIndex}
            >
              <TableCell component="th" scope="row" align="center">
                {index + 1}
              </TableCell>
              <TableCell align="center">{row}</TableCell>
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
