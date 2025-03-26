"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, MeshDistortMaterial } from "@react-three/drei"
import { Vector3, type Mesh } from "three"

function MessageBubble({
  position,
  text,
  color,
  speed = 1,
}: {
  position: [number, number, number]
  text: string
  color: string
  speed?: number
}) {
  const meshRef = useRef<Mesh | null>(null) as React.MutableRefObject<Mesh | null>

  useFrame((state) => {
    if (!meshRef.current) return

    // Gentle floating animation
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.002
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.05
    meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2 * speed) * 0.05
  })

  return (
    <group position={new Vector3(...position)}>
 <mesh ref={(instance) => { meshRef.current = instance || null }}>

      <sphereGeometry args={[1, 32, 32]} />

        <MeshDistortMaterial color={color} speed={0.8} distort={0.3} radius={1} transparent opacity={0.7} />
      </mesh>
      <Text
        position={[0, 0, 1.1]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {text}
      </Text>
    </group>
  )
}

export function Floating3DMessage() {
  return (
    <div className="absolute inset-0 z-0 opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <MessageBubble position={[-2.5, 1, 0]} text="Speak freely" color="#9c27b0" speed={1.2} />
        </Float>

        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
          <MessageBubble position={[2.5, -1, -1]} text="Stay anonymous" color="#2196f3" speed={0.8} />
        </Float>

        <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
          <MessageBubble position={[0, 2, -2]} text="End-to-end encrypted" color="#e91e63" speed={1} />
        </Float>
      </Canvas>
    </div>
  )
}

