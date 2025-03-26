"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"


export function ThreeDBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create scene
    const scene = new THREE.Scene()

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Add orbit controls for mobile touch interaction
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.enablePan = false
    controls.rotateSpeed = 0.3

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1500

    const posArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 100
      posArray[i + 1] = (Math.random() - 0.5) * 100
      posArray[i + 2] = (Math.random() - 0.5) * 100

      // Scale
      scaleArray[i / 3] = Math.random()
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))

    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    })

    // Create color gradient
    const colors = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Purple to blue gradient
      const t = i / (particlesCount * 3)
      colors[i] = 0.5 + 0.3 * Math.sin(t * Math.PI) // R
      colors[i + 1] = 0.2 // G
      colors[i + 2] = 0.8 - 0.3 * Math.sin(t * Math.PI) // B
    }

    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    particlesMaterial.vertexColors = true

    // Create points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Create floating 3D objects
    const floatingObjects: THREE.Mesh[] = []

    // Create a torus
    const torusGeometry = new THREE.TorusGeometry(5, 1, 16, 50)
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x9c27b0,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const torus = new THREE.Mesh(torusGeometry, torusMaterial)
    torus.position.set(-15, 10, -20)
    scene.add(torus)
    floatingObjects.push(torus)

    // Create an icosahedron
    const icosaGeometry = new THREE.IcosahedronGeometry(4, 0)
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: 0x2196f3,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const icosahedron = new THREE.Mesh(icosaGeometry, icosaMaterial)
    icosahedron.position.set(20, -10, -15)
    scene.add(icosahedron)
    floatingObjects.push(icosahedron)

    // Create an octahedron
    const octaGeometry = new THREE.OctahedronGeometry(3, 0)
    const octaMaterial = new THREE.MeshBasicMaterial({
      color: 0xe91e63,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial)
    octahedron.position.set(-10, -15, -10)
    scene.add(octahedron)
    floatingObjects.push(octahedron)

    // Create a dodecahedron
    const dodecaGeometry = new THREE.DodecahedronGeometry(2.5, 0)
    const dodecaMaterial = new THREE.MeshBasicMaterial({
      color: 0x4caf50,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const dodecahedron = new THREE.Mesh(dodecaGeometry, dodecaMaterial)
    dodecahedron.position.set(15, 15, -25)
    scene.add(dodecahedron)
    floatingObjects.push(dodecahedron)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(0, 1, 1)
    scene.add(directionalLight)

    // Mouse movement effect
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animate floating objects
    floatingObjects.forEach((obj, index) => {
      // Set random rotation speeds
      const rotX = 0.001 + Math.random() * 0.002
      const rotY = 0.001 + Math.random() * 0.002
      const rotZ = 0.001 + Math.random() * 0.002

      // Store rotation speeds on the object
      obj.userData = { rotX, rotY, rotZ }

      // Initial animation
      gsap.to(obj.position, {
        y: obj.position.y + 2,
        duration: 2 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(obj.rotation, {
        x: Math.PI * 2,
        duration: 10 + index * 5,
        repeat: -1,
        ease: "none",
      })
    })

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate particles
      particlesMesh.rotation.x += 0.0003
      particlesMesh.rotation.y += 0.0003

      // Mouse movement effect
      particlesMesh.rotation.x += mouseY * 0.0003
      particlesMesh.rotation.y += mouseX * 0.0003

      // Rotate floating objects
      floatingObjects.forEach((obj) => {
        const { rotX, rotY, rotZ } = obj.userData
        obj.rotation.x += rotX
        obj.rotation.y += rotY
        obj.rotation.z += rotZ
      })

      // Update controls
      controls.update()

      renderer.render(scene, camera)
    }

    animate()

    // Initial animation
    gsap.fromTo(particlesMesh.rotation, { x: Math.PI * 2, y: 0 }, { x: 0, y: 0, duration: 2, ease: "power3.out" })

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)

      // Dispose geometries and materials
      scene.remove(particlesMesh)
      particlesGeometry.dispose()
      particlesMaterial.dispose()

      floatingObjects.forEach((obj) => {
        scene.remove(obj)
        obj.geometry.dispose()
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose())
        } else {
          obj.material.dispose()
        }
      })

      torusGeometry.dispose()
      torusMaterial.dispose()
      icosaGeometry.dispose()
      icosaMaterial.dispose()
      octaGeometry.dispose()
      octaMaterial.dispose()
      dodecaGeometry.dispose()
      dodecaMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10" aria-hidden="true" />
}

