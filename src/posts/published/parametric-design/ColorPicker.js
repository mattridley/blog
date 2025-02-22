import React from 'react'
import { Margin, useSpacing } from '@kyleshevlin/layout'

const MAX_HEX = parseInt('ffffff', 16)

export default function ColorPicker() {
  const bs = useSpacing()
  const [backgroundColor, setBackgroundColor] = React.useState('#ff6347')
  // Very imperfect way to try and keep the label text legible as the
  // background color changes
  const textColor =
    parseInt(backgroundColor.replace('#', ''), 16) > MAX_HEX * 0.75
      ? '#111'
      : '#fff'

  const handleChange = e => {
    setBackgroundColor(e.target.value)
  }

  return (
    <div
      css={{
        alignItems: 'center',
        backgroundColor,
        color: textColor,
        display: 'flex',
        fontFamily: 'var(--fonts-secondary)',
        height: bs(8),
        justifyContent: 'center',
        transform: 'all .1s ease',
      }}
    >
      <label
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Margin bottom={0.5}>Choose a color</Margin>
        <div>
          <input onChange={handleChange} type="color" value={backgroundColor} />
        </div>
      </label>
    </div>
  )
}
