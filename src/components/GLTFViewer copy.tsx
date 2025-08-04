'use client'

import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

function Model({url}: {url: string}) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function GLTFViewer() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const fileInputRef = useRef(null);

  // This is just a test component, and idk what type this event even is
  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
  const handleFileChange = (event: any) => {
    const file = event.target?.files[0];
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
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <button onClick={() => (fileInputRef?.current as any)?.click()}>
          Load GLTF/GLB File
        </button>
        <button onClick={handleLoadDemo}>Load Demo Model</button>
      </div>

      {modelUrl ? (
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Suspense fallback={null}>
            <Model url={modelUrl} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls />
        </Canvas>
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