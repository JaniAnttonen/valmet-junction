import React from 'react'
import { Pane, Text, Heading, Strong } from 'evergreen-ui'

const Performance = props => {
  return (
    <Pane>
      <Heading>Paper Quality</Heading>
    </Pane>
  )
}

const History = props => {
  return <Pane display="flex" background="tint" width="50%" padding={25} flexDirection="column" alignItems="flex-start">
    <Heading size="600" marginBottom="1em">Service History</Heading>
    <Strong>Last grinding was 6 months ago</Strong>
    <Performance />
  </Pane>
}

export default History
