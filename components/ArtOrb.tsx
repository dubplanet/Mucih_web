 
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbProps {
  position: readonly [number, number, number];
  onClick: () => void;
}
export default function ArtOrb({ position, onClick }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.4;
  });
  return (
    <mesh ref={meshRef} position={position} onClick={onClick}>
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color="#ec4899" />
    </mesh>
  );
}