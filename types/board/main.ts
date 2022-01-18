import { Pos } from '../type'
import type { BoardProps, ClickBlockAction } from './util'
export type BoardMainProps = {
  funs: BoardMainFuns
  vars: BoardMainVars
} & BoardProps

export type BoardContentProps = {
  funs: BoardContentFuns
} & BoardProps

export type PushedBlockProps = {
  states: PushedBlockStates
  vars: PushedBlockVars
  funs: PushedBlockFuns
}

type BoardContentFuns = {
  onClick: ClickBlockAction
  onContextMenu: ClickBlockAction
}

type BoardMainVars = {
  x: number
  y: number
  num: number
}

type BoardMainFuns = {
  onClick: ClickBlockAction
  onContextMenu: ClickBlockAction
}

type PushedBlockStates = {
  flgPosition: Pos[]
  boms: Pos[]
}
type PushedBlockVars = {
  x: number
  y: number
  num: number
  canPlayGame: boolean
}
type PushedBlockFuns = {
  onContextMenu: ClickBlockAction
}
