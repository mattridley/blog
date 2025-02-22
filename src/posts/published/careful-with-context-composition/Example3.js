import React from 'react'
import { Margin, useSpacing } from '@kyleshevlin/layout'
import Button from '../../../components/Button'
// These can be found on my snippets page
import { randomRGB } from '../../../utils'
import useForceUpdate from '../../../hooks/useForceUpdate'

const MyContext = React.createContext()
const useMyContext = () => React.useContext(MyContext)

function MyProvider({ children }) {
  const forceUpdate = useForceUpdate()

  return <MyContext.Provider value={forceUpdate}>{children}</MyContext.Provider>
}

function Box() {
  const bs = useSpacing()

  return (
    <div
      style={{
        backgroundColor: randomRGB(),
        borderRadius: 2,
        height: bs(4),
      }}
    />
  )
}

function Trigger() {
  const forceUpdate = useMyContext()

  return <Button onClick={forceUpdate}>Force Update</Button>
}

export default function App() {
  return (
    <MyProvider>
      <Margin bottom={1}>
        <Trigger />
      </Margin>
      <Box />
    </MyProvider>
  )
}
