import React from 'react'
import { Pane, Select } from 'evergreen-ui'
import GrindingPriority from './GrindingPriority'

const OverlayMenu = () => (
  <Pane display="flex" flexDirection="row" justifyContent="space-between" position="absolute" style={{ width: "calc(100% - 50px)" }}>
    <Pane><Select width={200} style={{ zIndex: "4" }} defaultValue={"foo"}>
      <option value="foo">VT-62419</option>
      <option value="bar">FOO-752189</option>
    </Select>
    </Pane>
    <GrindingPriority />
  </Pane>
)

export default OverlayMenu
