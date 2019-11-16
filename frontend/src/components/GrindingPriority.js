import React, { useState } from 'react'
import { Pane, Icon, Text } from 'evergreen-ui'

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
    <Pane background={bgColor} display="flex" justifyContent="center" alignItems="center" border padding={8}><Icon icon={iconName} color={color} marginRight="0.2em" />{grindState === "notScanned" ? } {props.priority}</Text></Pane >
  )
}

export default GrindingPriority
