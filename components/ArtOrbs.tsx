'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ArtOrb from './ArtOrb';
import { useAudioStore } from '@/stores/audioStore';

interface ArtOrbsProps {
  className?: string;
}

const ArtOrbs: React.FC<ArtOrbsProps> = ({ className = '' }) => {
  const { tracks, playTrack } = useAudioStore();

  // Generate positions for orbs in a circular arrangement
  const generateOrbPositions = () => {
    const positions: Array<[number, number, number]> = [];
    const radius = 4;
    const heightVariation = 2;
    
    tracks.forEach((_, i) => {
      const angle = (i / tracks.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
      const y = Math.sin(i * 0.7) * heightVariation + 1;
      
      positions.push([x, y, z]);
    });
    
    return positions;
  };

  const orbPositions = React.useMemo(() => generateOrbPositions(), [tracks.length]);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ 
          position: [0, 5, 10],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
        />
        <pointLight 
          position={[-10, 0, -10]} 
          intensity={0.5}
          color="#8B5CF6"
        />
        <pointLight 
          position={[10, 0, 10]} 
          intensity={0.5}
          color="#10B981"
        />

        {/* Environment for reflections */}
        <Environment preset="night" />

        {/* Render all art orbs */}
        {tracks.map((track, index) => (
          <ArtOrb
            key={track.id}
            position={orbPositions[index]}
            trackIndex={index}
            size={0.8}
            speed={1 + Math.random() * 0.5}
            onClick={() => playTrack(index)}
          />
        ))}

        {/* Camera controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />

        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 15, 35]} />
      </Canvas>
    </div>
  );
};

export default ArtOrbs;
