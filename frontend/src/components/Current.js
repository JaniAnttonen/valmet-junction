import React from 'react'
import { Pane, Text, Heading, Strong } from 'evergreen-ui'

const Current = props => {
  return <Pane display="flex" width="50%" flexDirection="column" alignItems="flex-start" padding={25}>
    <Heading size={600} marginBottom="0.5em">Current Status</Heading>
    <Heading marginBottom="0.5em" marginTop="1em">Rotation Speed</Heading>
    <Text>400 rpm</Text><br />
    <Text>1000 m/min</Text><br />
  </Pane>
}

export default Current
