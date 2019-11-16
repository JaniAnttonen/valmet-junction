import React, { useRef, useEffect, useState } from 'react'
import { CylinderGeometry, MeshStandardMaterial, DoubleSide, DirectionalLight, AmbientLight } from "three"
import { Canvas, useFrame, mesh, useThree } from 'react-three-fiber'
import { Pane, Text, Heading, Select, Button } from 'evergreen-ui'

const Roll = ({ crossSections, sectors, data }) => {
  const ref = useRef()
  const { scene } = useThree()
  const [rotation, setRotation] = useState([90, 0, 20.1, 0])

  const rollGeometry = new CylinderGeometry(1.2, 1.2, 3, sectors, crossSections, true)
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

  useEffect(() => {
    const ambience = new AmbientLight(0xffffff, 1.1);
    const spotlight = new DirectionalLight(0xffffff, 0.3);
    spotlight.position.set(10, 10, 16);
    scene.add(ambience)
    scene.add(spotlight)
  }, [])

  useEffect(() => {
    console.log(rollGeometry.faces.length === crossSections * sectors * 2)
    data.forEach(dataPoint => {
      const faces = getFaces(dataPoint)
      faces.forEach(face => {
        if (dataPoint.variance < 0.33) {
          rollGeometry.faces[face].materialIndex = 3
        }
        else if (dataPoint.variance > 0.66) {
          rollGeometry.faces[face].materialIndex = 2
        }
        else {
          rollGeometry.faces[face].materialIndex = 1
        }
      })
      console.log(faces)
    })
  }, [data])

  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.x += 0.01
  })

  return rollGeometry && rollMaterials ? <mesh ref={ref}
    rotation={rotation}
    args={[rollGeometry, rollMaterials]}
  /> : null
}

const RollCanvas = props => {
  const [data, setData] = useState([{ crossSection: 0, sector: 0, variance: 0.2 }, { crossSection: 0, sector: 1, variance: 0.5 }, { crossSection: 0, sector: 2, variance: 0.1 }, { crossSection: 1, sector: 0, variance: 0.4 }, { crossSection: 1, sector: 1, variance: 0.7 }, { crossSection: 3, sector: 7, variance: 0.7 }])

  const crossSections = 4
  const sectors = 8

  const fetchNewData = () => {
    const crossSection = Math.floor(data.length / sectors)
    setData(data.concat({ crossSection: crossSection, sector: data.length, variance: Math.random() }))
  }

  return (
    <Pane display="flex" padding={25} height={"42vh"} background="tint2" borderRadius={0}>
      <Select width={200} style={{ position: "absolute", zIndex: "4" }}>
        <option value="foo" selected>VT-62419</option>
        <option value="bar">FOO-752189</option>
      </Select>
      <Canvas>
        <Roll crossSections={crossSections} sectors={sectors} data={data} />
      </Canvas>
    </Pane >
  )
}

export default RollCanvas
