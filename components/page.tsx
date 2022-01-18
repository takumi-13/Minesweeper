import styled from 'styled-components'
import { BoardSize } from '../types/type'

type ContainerProps = {
  boardSize: BoardSize
}

export const Container = styled.div<ContainerProps>`
  -moz-transform: ${(props) => 1 / props.boardSize.sizeY + 2};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
`

export const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`
export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;

  a {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }
`
export const Logo = styled.span`
  height: 1em;
  margin-left: 0.5rem;
`
