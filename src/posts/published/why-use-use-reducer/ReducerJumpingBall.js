import React from 'react'
import { Flex } from '@kyleshevlin/layout'
import Button from '../../../components/Button'

const GRAVITY = 0.5
const JUMP_IMPULSE = 12
const BALL_SIZE = 20

const BALL_STATE = {
  idle: 'idle',
  jumping: 'jumping',
}

const initialState = {
  ballState: BALL_STATE.idle,
  delta: 0,
  jumpsRemaining: 2,
  position: 0,
}

const reducer = (state, event) => {
  switch (event) {
    case 'CLICK': {
      if (state.jumpsRemaining === 0) {
        return state
      }

      return {
        ...state,
        ballState: 'jumping',
        delta: state.delta + JUMP_IMPULSE,
        jumpsRemaining: state.jumpsRemaining - 1,
      }
    }

    case 'TICK': {
      if (state.ballState === 'idle') return state

      const nextDelta = state.delta - GRAVITY
      const nextPosition = state.position + nextDelta

      if (nextPosition <= 0) {
        return initialState
      }

      return {
        ...state,
        ballState: 'jumping',
        delta: nextDelta,
        position: nextPosition,
      }
    }

    default:
      return state
  }
}

export default function ReducerJumpingBall() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const tick = React.useCallback(() => {
    dispatch('TICK')
  }, [])

  const handleClick = React.useCallback(() => {
    dispatch('CLICK')
  }, [])

  React.useEffect(() => {
    const id = setInterval(tick, 1000 / 60)

    return () => clearInterval(id)
  }, [tick])

  return (
    <Flex direction="column" gap={1} align="center">
      <Canvas>
        <Ball position={state.position} />
      </Canvas>
      <Button onClick={handleClick}>Jump</Button>
    </Flex>
  )
}

function Canvas({ children }) {
  return (
    <div
      css={{
        border: '2px solid var(--colors-offsetMore)',
        position: 'relative',
        height: 300,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

function Ball({ position }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--colors-accent)',
        height: BALL_SIZE,
        width: BALL_SIZE,
        borderRadius: '50%',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: position,
      }}
    />
  )
}
