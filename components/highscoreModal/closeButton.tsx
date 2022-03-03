import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import React from 'react'
import { CloseButtonProps } from '../../types/highScoreModal/closeButton'

export const CloseButton: React.FC<CloseButtonProps> = ({ funs }) => {
  return (
    <IconButton
      aria-label="close"
      onClick={() => funs.setShowModal(false)}
      sx={{
        position: 'absolute',
        right: 5,
        top: 5,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
  )
}
