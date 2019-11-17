import React, { useState } from 'react'
import { Pane, Icon, Text, Button } from 'evergreen-ui'

const GrindingPriority = props => {
  const [grindState, setGrindState] = useState("notScanned")
  let iconName, color, bgColor
  switch (props.priority) {
    case "high":
      iconName = "ban-circle"
      color = "danger"
      bgColor = "redTint"
      break
    case "medium":
      iconName = "warning-sign"
      color = "warning"
      bgColor = "yellowTint"
      break
    default:
      iconName = "info-sign"
      color = "info"
      bgColor = "blueTint"
  }
  return (
    <Pane background={bgColor} display="flex" justifyContent="center" alignItems="center" border padding={8}><Icon icon={iconName} color={color} marginRight="0.2em" />{grindState === "notScanned" ? <><Text>This roll hasn't been scanned yet!</Text><Button onClick={() => { props.scanRoll(); setGrindState("Scanned"); }}>SCAN</Button></> : grindState === "Scanned" ? <><Text>Grinding priority: {props.priority}</Text><Button onClick={() => setGrindState("Grinding")}>GRIND</Button></> : <Button disabled>GRINDING...</Button>}</Pane >
  )
}

export default GrindingPriority
