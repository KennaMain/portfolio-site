'use client'

import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera, RenderTexture, View } from '@react-three/drei';

function Model({url}: {url: string}) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}


// code borrowed from https://codesandbox.io/p/sandbox/bp6tmc?file=%2Fsrc%2FApp.js%3A68%2C1-80%2C2
function Common({ color }: {color: string}) {
  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset="dawn" />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </>
  )
}

// export function Apple(props) {
  // const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/apple-half/model.gltf')
  // useFrame((state, delta) => (scene.rotation.y += delta))
  // return <primitive object={scene} {...props} />
// }

function GLTFViewer() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e?.target?.result;
      if (url) setModelUrl(url.toString());
    };
    reader.readAsDataURL(file);
  };

  const handleLoadDemo = () => {
    // You can replace this with a URL to a demo GLTF model
    setModelUrl('https://example.com/path/to/demo-model.gltf');
  };

  return (
    <div style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}>
      <div style={{ padding: '10px', display: 'flex', gap: '10px' }}>
        <input
          type="file"
          accept=".gltf,.glb"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button onClick={() => (fileInputRef?.current as any)?.click()}>
          Load GLTF/GLB File
        </button>
        <button onClick={handleLoadDemo}>Load Demo Model</button>
      </div>

      {modelUrl ? (
        <>
          <View className="view scale" style={{ height: 300 }}>
            <Common color="lightblue" />
            <Model url={modelUrl}/>
            <OrbitControls makeDefault />
          </View>
        </>
      ) : (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: '#666'
        }}>
          <p>No model loaded. Please select a GLTF/GLB file.</p>
        </div>
      )}
    </div>
  );
}

export default GLTFViewer;