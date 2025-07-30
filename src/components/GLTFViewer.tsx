'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera, Preload, useGLTF, View } from '@react-three/drei'
import { useRef } from 'react'

function Model({ url }: { url: string }) {
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

function SingleGLTFViewer({ url }: { url: string }) {
  return (
    <View
      style={{
        height: '300px',
        width: '400px',
        display: 'inline-block',
        margin: '0.2em',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Scene color="lightblue" />
      <Model url={url} />
    </View>
  )
}

export const GLTFViewerMouseProvider = () => {
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
      
      <GLTFViewerMouseProvider/>
    </div>
  )
}