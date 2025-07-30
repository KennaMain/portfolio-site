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
    console.log("max dimension: " + maxDimension)

  }, [scene])

  // return <primitive object={scene} scale={5.75/maxDimension} position={boundingBoxCenter.multiplyScalar(-1)} />
  return <primitive object={scene} scale={1/maxDimension} />
}

function SimpleModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={0.5} position={[0, -1, 0]}/>
}

function Scene({ color }: { color?: string }) {
  const cameraRef = useRef<any>(null)
  const controlsRef = useRef<any>(null)
  
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
        position={[0, 0, 6]} 
        makeDefault
      />
      <OrbitControls 
        ref={controlsRef}
        makeDefault
        camera={cameraRef.current}
      />
    </>
  )
}

export const SingleGLTFViewer = ({ url, style }: { url: string, style?: object }) => {
  return (
    <View
      style={{
        height: '300px',
        width: '400px',
        display: 'inline-block',
        margin: '0.2em',
        overflow: 'hidden',
        position: 'relative',
        ...(style ?? {})
      }}
    >
      <Scene color="lightblue" />
      <CenteredModel url={url} />
    </View>
  )
}

export const GLTFViewerRenderProvider = () => {
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
        }}
        eventSource={document.getElementById('root')!}
        gl={{ antialias: true }}
      >
        <View.Port />
        <Preload all />
      </Canvas>
  )
}

export default function GLTFViewer() {
  const modelUrls = [
    '/spongebob.glb',
    '/spongebob copy.glb', 
    '/spongebob.glb',
  ]

  if (typeof document === "undefined") return null

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <div onClick={() => {console.log("Ive been clicked!")}} style={{ 
        padding: '20px', 
        display: 'flex', 
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1
      }}>
        {modelUrls.map((url, index) => (
          <SingleGLTFViewer key={index} url={url} />
        ))}
      </div>
      
      <GLTFViewerRenderProvider/>
    </div>
  )
}