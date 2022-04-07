import { Difficulty, DifficultyJP } from '../../types/type'

export const DIFFICULTY_EASY: { difficulty: Difficulty; difficultyJP: DifficultyJP } = {
  difficulty: 'easy',
  difficultyJP: '初級',
}
export const DIFFICULTY_MIDDLE: { difficulty: Difficulty; difficultyJP: DifficultyJP } = {
  difficulty: 'middle',
  difficultyJP: '中級',
}
export const DIFFICULTY_DIFFICULT: { difficulty: Difficulty; difficultyJP: DifficultyJP } = {
  difficulty: 'difficult',
  difficultyJP: '上級',
}
export const DIFFICULTY_SPECIAL: { difficulty: Difficulty; difficultyJP: DifficultyJP } = {
  difficulty: 'special',
  difficultyJP: 'スペシャル',
}

export const DIFFICULTY_ALL_LIST = [
  DIFFICULTY_EASY,
  DIFFICULTY_MIDDLE,
  DIFFICULTY_DIFFICULT,
  DIFFICULTY_SPECIAL,
]

export const MODAL_DIFFICULTY_ALL_LIST: {
  difficulty: Difficulty
  difficultyJP: DifficultyJP
}[] = [
  {
    difficulty: DIFFICULTY_EASY.difficulty as Difficulty,
    difficultyJP: DIFFICULTY_EASY.difficultyJP as DifficultyJP,
  },
  {
    difficulty: DIFFICULTY_MIDDLE.difficulty as Difficulty,
    difficultyJP: DIFFICULTY_MIDDLE.difficultyJP as DifficultyJP,
  },
  {
    difficulty: DIFFICULTY_DIFFICULT.difficulty as Difficulty,
    difficultyJP: DIFFICULTY_DIFFICULT.difficultyJP as DifficultyJP,
  },
]
