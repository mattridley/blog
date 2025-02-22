import React from 'react'
import Grid from './Grid'
import { ButtonCell } from './Cell'
import { newTicTacToeGrid } from './utils'
import Button from '../../../components/Button'
import { useSpacing } from '@kyleshevlin/layout'

// Simple way to deeply clone an array or object
const clone = x => JSON.parse(JSON.stringify(x))

// An enum for the next turn in our game
const NEXT_TURN = {
  O: 'X',
  X: 'O',
}

const checkThree = (a, b, c) => {
  if (!a || !b || !c) return false
  return a === b && b === c
}

const flatten = array => array.reduce((acc, cur) => [...acc, ...cur], [])

function checkForWin(flatGrid) {
  const [nw, n, ne, w, c, e, sw, s, se] = flatGrid

  return (
    checkThree(nw, n, ne) ||
    checkThree(w, c, e) ||
    checkThree(sw, s, se) ||
    checkThree(nw, w, sw) ||
    checkThree(n, c, s) ||
    checkThree(ne, e, se) ||
    checkThree(nw, c, se) ||
    checkThree(ne, c, sw)
  )
}

const getInitialState = () => ({
  grid: newTicTacToeGrid(),
  status: 'inProgress',
  turn: 'X',
})

const reducer = (state, action) => {
  if (state.status === 'success' && action.type !== 'RESET') {
    return state
  }

  switch (action.type) {
    case 'RESET':
      return getInitialState()

    case 'CLICK': {
      const { x, y } = action.payload
      const nextState = clone(state)
      const { grid, turn } = nextState

      if (grid[y][x]) {
        return state
      }

      grid[y][x] = turn

      const flatGrid = flatten(grid)

      if (checkForWin(flatGrid)) {
        nextState.status = 'success'
        return nextState
      }

      nextState.turn = NEXT_TURN[turn]

      return nextState
    }

    default:
      return state
  }
}

const GAME_STATUS_TEXT = {
  inProgress: () => null,
  success: turn => `${turn} won!`,
}

export default function Game() {
  const bs = useSpacing()
  const [state, dispatch] = React.useReducer(reducer, getInitialState())
  const { grid, status, turn } = state

  const handleClick = (x, y) => {
    dispatch({ type: 'CLICK', payload: { x, y } })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <>
      <div
        style={{
          fontFamily: 'var(--fonts-secondary)',
          fontWeight: 'bold',
          marginBottom: bs(1),
          textTransform: 'uppercase',
        }}
      >
        Interactive
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: bs(1),
            }}
          >
            <div>Next up: {turn}</div>
            <div>{GAME_STATUS_TEXT[status](turn)}</div>
            <Button onClick={reset}>Reset</Button>
          </div>
          <Grid Cell={ButtonCell} grid={grid} handleClick={handleClick} />
        </div>
      </div>
    </>
  )
}
