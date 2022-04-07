import React from 'react'
import styled from 'styled-components'

const Main = styled.div`
  margin-top: 40vh;
  transform: scale(1.75);
  transform-origin: top center;
`

export const Loading = () => {
  return (
    <Main>
      <a href="">Now Loading</a>
    </Main>
  )
}
