import React, { useEffect, useState, useRef } from 'react'
import { Pane, Text, Heading, Select, Button } from 'evergreen-ui'

import OverlayMenu from './OverlayMenu'

const wait = (duration) => {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

const Plane = ({ data, crossSections, sectors }) => {
  const ref = useRef()
  const [width, setWidth] = useState(0)
  const colors = ["#ff0000", "#00ff00", "#0000ff"]
  return <Pane display="flex" height="45vh" style={{ flexWrap: "wrap", maxWidth: "100%", position: "relative", alignItems: "flex-end" }} ref={ref}>
    {data && data.map(dataPoint => {
      let color
      if (dataPoint.variance < -0.5) {
        color = colors[2]
      }
      else if (dataPoint.variance > 0.5) {
        color = colors[0]
      }
      else {
        color = colors[1]
      }
      return <div key={`cs-${dataPoint.crossSection}-s-${dataPoint.sector}`} style={{ background: color, height: "20px", width: "20px", flexShrink: "0" }}></div>
    }
    )}
  </Pane>
}

const Canvas = props => {
  const crossSections = 10
  const sectors = 20
  const [data, setData] = useState([])

  useEffect(() => {
    const pushNewData = eventData => {
      try {
        const measurement = JSON.parse(eventData)
        const crossSection = Math.floor(measurement.Relative * crossSections)
        const sector = measurement.Deg
        const variance = measurement.Um
        const newData = Object.assign([{ crossSection: crossSection, sector: sector, variance: variance }], data)
        newData.push({ crossSection: crossSection, sector: sector, variance: variance })
        setData(newData)
      } catch (err) {
        console.warn(err)
      }
    }
    const socket = new WebSocket('ws://localhost:8080/live')
    socket.addEventListener('message', (event) =>
      pushNewData(event.data)
    )
  }, [])

  return (
    <Pane display="flex" padding={25} height={"46vh"} background="tint2" borderRadius={0}>
      <OverlayMenu />
      <Plane data={data} crossSections={crossSections} sectors={sectors}></Plane>
    </Pane>
  )
}

export default Canvas
