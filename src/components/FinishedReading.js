import React from 'react'
import shevy, { bs } from '../shevy'
import BeardStrokes from './BeardStrokes'
import Share from './Share'
import { Flex, Grid, Margin } from '@kyleshevlin/layout'

export default function FinishedReading({ beardStrokeKey, slug, title }) {
  return (
    <div>
      <h3 css={{ fontWeight: 'bold', marginBottom: bs(0.25) }}>
        Finished reading?
      </h3>

      <p>Here are a few options for what to do next.</p>

      <AfterOptionWrap>
        <AfterOption label="Like">
          <BeardStrokes slug={beardStrokeKey} />
        </AfterOption>

        <AfterOption label="Share">
          <Share slug={slug} title={title} />
        </AfterOption>
      </AfterOptionWrap>
    </div>
  )
}

function AfterOptionWrap({ children }) {
  return (
    <Grid templateColumns="auto auto" gap={1} style={{ alignItems: 'end' }}>
      {children}
    </Grid>
  )
}

function AfterOption({ children, label }) {
  return (
    <>
      <div
        css={{
          fontFamily: 'var(--fonts-catamaran)',
          fontSize: shevy.h4.fontSize,
          fontWeight: 'bold',
        }}
      >
        <Margin bottom={0.25}>{label}</Margin>
      </div>
      <Flex align="center">{children}</Flex>
    </>
  )
}
