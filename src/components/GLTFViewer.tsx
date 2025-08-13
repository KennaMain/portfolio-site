'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera, Preload, useGLTF, View } from '@react-three/drei'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'

function CenteredModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const [boundingBoxCenter, setBoundingBoxCenter] = useState<THREE.Vector3>(new THREE.Vector3())
  const [maxDimension, setMaxDimension] = useState(1)
  
  // Compute the bounding box and center the model
  useMemo(() => {
    // Create a bounding box that will contain all objects in the scene
    const boundingBox = new THREE.Box3()
    
    // Expand the bounding box to contain all children
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const childBoundingBox = new THREE.Box3().setFromObject(child)
        boundingBox.union(childBoundingBox)
      }
    })
    
    // // Calculate the center of the bounding box
    // const center = new THREE.Vector3()
    // boundingBox.getCenter(center)
    
    // // Move all children to center them at the origin
    // scene.traverse((child) => {
    //   if (child.position) {
    //     child.position.sub(center)
    //   }
    // })
    
    // // Update the bounding box after centering
    // boundingBox.setFromObject(scene)

    setBoundingBoxCenter(boundingBox.getCenter(boundingBoxCenter))

    const size = new THREE.Vector3()
    boundingBox.getSize(size)
    setMaxDimension(Math.max(size.x, size.z) || 1)
  }, [scene])

  // return <primitive object={scene} scale={5.75/maxDimension} position={boundingBoxCenter.multiplyScalar(-1)} />

  // NOTE to Kenna: the rat book looks really good with a baked-in rotation of `rotation={[-Math.PI/8, Math.PI / 8, Math.PI / 16]}`
  // maybe we should re-export it like that
  return <primitive object={scene} scale={1/maxDimension}/> // rotation={[-Math.PI/8, Math.PI / 8, Math.PI / 16]}/>
}

export function SimpleModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={0.5} position={[0, -1, 0]}/>
}

function Scene({ color, controlsEnabled }: { color?: string, controlsEnabled: boolean }) {
  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */} // Three does not provide Camera as a type
  const cameraRef = useRef<any>(null)
  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */} // Three does not provide Controls as a type
  const controlsRef = useRef<any>(null)
  const r = 6         // distance the camera is from the object
  const t = Math.PI/4 // elevation rotation (x rotation)
  const T = Math.PI/4 // z rotation

  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset="dawn" />
      <PerspectiveCamera 
        ref={cameraRef}
        fov={40} 
        position={[r*Math.sin(t)*Math.cos(T), r*Math.sin(t)*Math.sin(T), r*Math.cos(t)]} 
        rotation={[-T, 0, -t]}
        makeDefault
      />
      <OrbitControls 
        enabled={controlsEnabled}
        ref={controlsRef}
        makeDefault
        camera={cameraRef.current}
      />
    </>
  )
}

type SingleGLTFViewerProps = {
  url: string
  style?: object
  backgroundColor?: string
  controlsEnabled?: boolean
}

export const SingleGLTFViewer = ({ url, style, backgroundColor, controlsEnabled }: SingleGLTFViewerProps) => {
  // const randomColor = `rgb(${Math.random()}) ${Math.random()}) ${Math.random()})`
  return (
    <View style={style}>
      <Scene 
        color={backgroundColor} 
        controlsEnabled={controlsEnabled ?? true}
      />
      <CenteredModel url={url} />
    </View>
  )
}

export const GLTFViewerRenderProvider = ({style} : {style?: object}) => {
  return (
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 0,
          ...style
        }}
        eventSource={document.getElementById('root')!}
        gl={{ antialias: true }}
      >
        <View.Port />
        <Preload all />
      </Canvas>
  )
}

export default function GLTFViewer({modelUrls} : {modelUrls: string[]}) {

  if (typeof document === "undefined") return null

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <div style={{ 
        padding: '20px', 
        display: 'flex', 
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1
      }}>
        {modelUrls.map((url, index) => (
          <SingleGLTFViewer key={index} url={url} style={{
            height: '300px',
            width: '400px',
            display: 'inline-block',
            margin: '0.2em',
            overflow: 'hidden',
            position: 'relative',
          }}/>
        ))}
      </div>
      
      <GLTFViewerRenderProvider/>
    </div>
  )
}