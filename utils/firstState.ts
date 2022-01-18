import { makeFirstBoard } from './board'

export const FIRST_STATE_EASY = {
  difficulty: 'easy',
  bomNum: 10,
  sizeX: 9,
  sizeY: 9,
  board: makeFirstBoard(9, 9),
}

export const FIRST_STATE_MIDDLE = {
  difficulty: 'middle',
  bomNum: 40,
  sizeX: 16,
  sizeY: 16,
  board: makeFirstBoard(16, 16),
}

export const FIRST_STATE_DIFFICULT = {
  difficulty: 'difficult',
  bomNum: 99,
  sizeX: 30,
  sizeY: 16,
  board: makeFirstBoard(16, 30),
}

export const FIRST_STATE_SPECIAL = {
  difficulty: 'special',
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
