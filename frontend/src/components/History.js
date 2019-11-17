import React from 'react'
import { Pane, Text, Heading, Strong } from 'evergreen-ui'

const History = props => {
  return <Pane display="flex" background="tint" width="50%" padding={25} flexDirection="column" alignItems="flex-start">
    <Heading size={600} marginBottom="0.5em">Service History</Heading>
    <Heading marginBottom="0.5em" marginTop="1em">Last Grind</Heading>
    <Text>6 months ago</Text>
    <Heading marginBottom="0.5em" marginTop="1em">Paper Performance</Heading>
    <Text>Good</Text>
    <Heading marginBottom="0.5em" marginTop="1em">Speed-compensated Grind</Heading>
    <Text>True</Text>
  </Pane>
}

export default History
