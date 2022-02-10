import { ClickAction } from '../board/util'

export type HighScoreModalProps = {
  consts: {
    difficulty: string
  }
  funs: {
    refreshState: ClickAction
  }
}
