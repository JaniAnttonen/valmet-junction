import React from 'react'
import { Pane, Text, Heading } from 'evergreen-ui'

const Performance = props => {
  return (
    <Pane>
      <Heading size="300">Paper Quality</Heading>
    </Pane>
  )
}

const History = props => {
  return <Pane display="flex" background="tint" width="50%" padding={25}><Heading>Service History</Heading></Pane>
}

export default History
