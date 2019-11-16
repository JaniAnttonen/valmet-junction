import React, { useRef } from 'react'
import { CylinderGeometry, MeshStandardMaterial, DoubleSide, DirectionalLight } from "three"
import { Canvas, useFrame, mesh, useThree } from 'react-three-fiber'
import { Pane, Text, Heading, Select } from 'evergreen-ui'

const Roll = props => {
  const ref = useRef()
  const { scene } = useThree()
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.x += 0.01))

  const rollGeometry = new CylinderGeometry(1.2, 1.2, 7, 20);
  const rollMaterial = new MeshStandardMaterial({ color: 0xcccccc });

  const light = new DirectionalLight(0xffffff, 0.8);
  light.position.set(10, 10, 10);
  scene.add(light);

  console.log(rollGeometry.faces)

  return <mesh ref={ref}
    rotation={[90, 0, 20.1, 0]}
    args={[rollGeometry, rollMaterial]}
  />
}

const RollCanvas = props => {
  return (
    <Pane display="flex" padding={25} height={"42vh"} background="tint2" borderRadius={0}>
      <Select width={200} style={{ position: "absolute", zIndex: "4" }}>
        <option value="foo" selected>VT-62419</option>
        <option value="bar">FOO-752189</option>
      </Select>
      <Canvas>
        <Roll />
      </Canvas>
    </Pane >
  )
}

export default RollCanvas
