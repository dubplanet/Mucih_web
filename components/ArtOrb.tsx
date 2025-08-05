'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import { Mesh, Vector3, Texture } from 'three';
import * as THREE from 'three';
import { useAudioStore } from '@/stores/audioStore';

interface ArtOrbProps {
  position: [number, number, number];
  trackIndex: number;
  size?: number;
  speed?: number;
  onClick?: () => void;
}

const ArtOrb: React.FC<ArtOrbProps> = ({ 
  position, 
  trackIndex, 
  size = 1, 
  speed = 1,
  onClick 
}) => {
 const meshRef = useRef<THREE.Mesh>(null!);
  const { tracks, currentTrack, isPlaying } = useAudioStore();
  
  // Get the track data
  const track = tracks[trackIndex];
  const isCurrentTrack = currentTrack === trackIndex;
  
  // Load texture (fallback to placeholder if no album art)
  const texture = useTexture(
    track?.albumArt || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    (texture: Texture) => {
      texture.flipY = false; // Fix texture orientation
    }
  );

  // Animation properties
  const basePosition = useMemo(() => new Vector3(...position), [position]);
  const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const rotationSpeed = useMemo(() => (Math.random() * 0.5 + 0.5) * speed, [speed]);

  // Animate the orb
  useFrame((state: any) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Floating motion
      const floatY = Math.sin(time * 0.5 + floatOffset) * 0.3;
      meshRef.current.position.copy(basePosition);
      meshRef.current.position.y += floatY;
      
      // Rotation
      meshRef.current.rotation.x += rotationSpeed * 0.01;
      meshRef.current.rotation.y += rotationSpeed * 0.015;
      
      // Scale animation for current track
      if (isCurrentTrack && isPlaying) {
        const pulse = 1 + Math.sin(time * 4) * 0.1;
        meshRef.current.scale.setScalar(size * pulse);
      } else {
        meshRef.current.scale.setScalar(size);
      }
      
      // Gentle orbit around center for current track
      if (isCurrentTrack) {
        const orbitRadius = 0.5;
        const orbitSpeed = time * 0.3;
        meshRef.current.position.x += Math.cos(orbitSpeed) * orbitRadius;
        meshRef.current.position.z += Math.sin(orbitSpeed) * orbitRadius;
      }
    }
  });

  // Get orb colors based on genre
  const getOrbGlow = () => {
    if (!track) return '#ffffff';
    
    switch (track.genre) {
      case 'lo-fi':
        return isCurrentTrack ? '#8B5CF6' : '#A78BFA';
      case 'reggae':
        return isCurrentTrack ? '#10B981' : '#34D399';
      default:
        return '#60A5FA';
    }
  };

  return (
    <group>
      {/* Main orb sphere */}
      <Sphere
        ref={meshRef}
        args={[1, 32, 32]}
        onClick={onClick}
        onPointerOver={(e: any) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <meshStandardMaterial
          map={texture}
          metalness={0.3}
          roughness={0.4}
          emissive={getOrbGlow()}
          emissiveIntensity={isCurrentTrack ? 0.2 : 0.1}
        />
      </Sphere>
      
      {/* Glow effect for current track */}
      {isCurrentTrack && (
        <Sphere
          args={[1.2, 16, 16]}
          position={position}
        >
          <meshBasicMaterial
            color={getOrbGlow()}
            transparent
            opacity={0.15}
            depthWrite={false}
          />
        </Sphere>
      )}
      
      {/* Particle ring for playing track */}
      {isCurrentTrack && isPlaying && (
        <group>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            return (
              <Sphere
                key={i}
                args={[0.05, 8, 8]}
                position={[position[0] + x, position[1], position[2] + z]}
              >
                <meshBasicMaterial
                  color={getOrbGlow()}
                  transparent
                  opacity={0.6}
                />
              </Sphere>
            );
          })}
        </group>
      )}
    </group>
  );
};

export default ArtOrb;

