import type { BoardProps, ClickAction } from './util'

export type BoardHeadProps = {
  funs: HeaderFuns
} & BoardProps

type HeaderFuns = {
  refreshState: ClickAction
}
