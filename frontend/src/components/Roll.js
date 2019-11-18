import React, { useEffect, useState } from 'react'
import { CylinderGeometry, MeshStandardMaterial, DoubleSide, DirectionalLight, AmbientLight } from "three"
import { Canvas, useFrame, mesh, useThree } from 'react-three-fiber'
import { Pane, Text, Heading, Select, Button } from 'evergreen-ui'

import OverlayMenu from './OverlayMenu'

const wait = (duration) => {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

const Roll = ({ crossSections, sectors, dataBuffer }) => {
  const { scene } = useThree()
  const rotation = [90, 0, 20.1, 0]

  const rollGeometry = new CylinderGeometry(1.2, 1.2, 7, sectors, crossSections, true)
  const rollMaterials = [
    new MeshStandardMaterial({ color: 0xcccccc }),
    new MeshStandardMaterial({ color: 0xff0000 }),
    new MeshStandardMaterial({ color: 0x00ff00 }),
    new MeshStandardMaterial({ color: 0x0000ff })
  ];

  const getFaces = (dataPoint) => {
    const face = (dataPoint.sector * crossSections * 2) + (dataPoint.crossSection * 2)
    return [face, face + 1]
  }

  const drawMaterial = (dataPoint) => {
    if (dataPoint) {
      const faces = getFaces(dataPoint)
      if (rollGeometry.faces[faces[0]] && rollGeometry.faces[faces[0]].materialIndex === 0) {
        faces.forEach(face => {
          if (dataPoint.variance < -0.5) {
            rollGeometry.faces[face].materialIndex = 3
          }
          else if (dataPoint.variance > 0.5) {
            rollGeometry.faces[face].materialIndex = 1
          }
          else {
            rollGeometry.faces[face].materialIndex = 2
          }
        })
      }
    }
  }

  useEffect(() => {
    const ambience = new AmbientLight(0xffffff, 1.1);
    const spotlight = new DirectionalLight(0xffffff, 0.3);
    spotlight.position.set(10, 10, 16);
    scene.add(ambience)
    scene.add(spotlight)
  }, [])

  useFrame(() => {
    rollGeometry.rotateY(-0.008)
    //dataBuffer.length > 0 && drawMaterial(dataBuffer.shift())
  })

  useEffect(() => {
    dataBuffer.length > 0 && dataBuffer.forEach(dataPoint => {
      const faces = getFaces(dataPoint)
      faces.forEach(face => {
        if (rollGeometry.faces[face]) {
          if (dataPoint.variance < 0.33) {
            rollGeometry.faces[face].materialIndex = 3
          }
          else if (dataPoint.variance > 0.66) {
            rollGeometry.faces[face].materialIndex = 2
          }
          else {
            rollGeometry.faces[face].materialIndex = 1
          }
        }
      })
    })
  }, [dataBuffer])

  return rollGeometry && rollMaterials ? <mesh
    rotation={rotation}
    args={[rollGeometry, rollMaterials]}
  /> : null
}

const RollCanvas = props => {
  const crossSections = 80
  const sectors = 90
  const dataBuffer = []
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
    <Pane display="flex" padding={25} height={"46vh"} background="orange" borderRadius={0}>
      <OverlayMenu scanRoll={() => scanRoll()} />
      <Canvas>
        <Roll crossSections={crossSections} sectors={sectors} dataBuffer={data} />
      </Canvas>
    </Pane>
  )
}

export default RollCanvas
