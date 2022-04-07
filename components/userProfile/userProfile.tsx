import { useAuth0 } from '@auth0/auth0-react'
import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const MyDiv = styled.div`
  margin-bottom: 10px;
`

export const UserProfile: React.FC = () => {
  const name = useAuth0<{ name: string }>()?.user?.name
  const displayName = name !== undefined ? name.substr(0, name.indexOf('@')) : '名無し'
  const { logout } = useAuth0()
  return (
    <MyDiv>
      <Grid container alignItems="stretch" spacing={{ xs: 2 }}>
        <Grid item>
          <Typography variant="h6">{`ようこそ、${displayName}さん`}</Typography>
        </Grid>
        <Grid item>
          <Button
            disableElevation
            style={{ fontWeight: 'bold' }}
            onClick={() => {
              logout()
            }}
          >
            ログアウト
          </Button>
        </Grid>
      </Grid>
    </MyDiv>
  )
}
