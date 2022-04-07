import { DifficultyFirstStates } from '../../types/type'
import { makeFirstBoard } from '../board'
import {
  DIFFICULTY_DIFFICULT,
  DIFFICULTY_EASY,
  DIFFICULTY_MIDDLE,
  DIFFICULTY_SPECIAL,
} from './difficulty'

export const FIRST_STATE_EASY: DifficultyFirstStates = {
  difficulty: DIFFICULTY_EASY.difficulty,
  bomNum: 10,
  sizeX: 9,
  sizeY: 9,
  board: makeFirstBoard(9, 9),
}

export const FIRST_STATE_MIDDLE: DifficultyFirstStates = {
  difficulty: DIFFICULTY_MIDDLE.difficulty,
  bomNum: 40,
  sizeX: 16,
  sizeY: 16,
  board: makeFirstBoard(16, 16),
}

export const FIRST_STATE_DIFFICULT: DifficultyFirstStates = {
  difficulty: DIFFICULTY_DIFFICULT.difficulty,
  bomNum: 99,
  sizeX: 30,
  sizeY: 16,
  board: makeFirstBoard(16, 30),
}

export const FIRST_STATE_SPECIAL: DifficultyFirstStates = {
  difficulty: DIFFICULTY_SPECIAL.difficulty,
  bomNum: 150,
  sizeX: 30,
  sizeY: 30,
  board: makeFirstBoard(30, 30),
}

export const FIRST_STATE_COMMON = {
  count: 0,
  gameState: -1,
  flgPosition: [],
}
