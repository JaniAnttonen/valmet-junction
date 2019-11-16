import React from 'react'
import { Pane, Heading } from 'evergreen-ui'
import History from './History'
import Current from './Current'

const Stats = props => {
  return <Pane display="flex" flexDirection="column" borderRadius={0}>
    <Pane display="flex" flexDirection="row">
      <History />
      <Current />
    </Pane>
  </Pane>
}

export default Stats
