import { useAuth0 } from '@auth0/auth0-react'
import { Button, ListItemText, Stack } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Main = styled.div`
  margin-top: 40vh;
  transform: scale(1.75);
  transform-origin: top center;
`

const MyDiv = styled.div`
  margin-bottom: 10%;
  text-align: center;
`

const LoginHeader = () => {
  return (
    <MyDiv>
      <img src="LoginHeader.png" alt="ログインヘッダー画像" />
    </MyDiv>
  )
}

export const Login: React.FC = () => {
  const primaryText = 'マインスイーパへようこそ'
  const secondaryText =
    'マインスイーパとは爆弾の位置を特定していくエキサイティングなゲームです。\nゲームを始めるにはログインする必要があります。'
      .split('\n')
      .map((line, key) => (
        <span key={key}>
          {line}
          <br />
        </span>
      ))
  const { loginWithRedirect } = useAuth0()
  return (
    <Main>
      <LoginHeader />
      <Stack justifyContent="center" alignItems="center">
        <ListItemText primary={primaryText} secondary={secondaryText}></ListItemText>
        <Button
          variant="contained"
          disableElevation
          onClick={() => {
            loginWithRedirect()
          }}
          style={{ marginTop: 5 }}
        >
          ログインしてゲームを始める
        </Button>
      </Stack>
    </Main>
  )
}
