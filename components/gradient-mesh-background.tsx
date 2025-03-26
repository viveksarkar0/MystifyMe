"use client"

import { useEffect, useRef } from "react"

export function GradientMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Create gradient points
    const points = [
      { x: width * 0.1, y: height * 0.2, radius: width * 0.15, color: "rgba(156, 39, 176, 0.3)" }, // Purple
      { x: width * 0.8, y: height * 0.3, radius: width * 0.2, color: "rgba(33, 150, 243, 0.3)" }, // Blue
      { x: width * 0.3, y: height * 0.7, radius: width * 0.25, color: "rgba(233, 30, 99, 0.2)" }, // Pink
      { x: width * 0.7, y: height * 0.8, radius: width * 0.2, color: "rgba(76, 175, 80, 0.2)" }, // Green
    ]

    // Animation variables
    let animationFrameId: number

    // Animate gradient points
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update points position with time
      const time = Date.now() * 0.001
      points.forEach((point, i) => {
        point.x = width * (0.2 + 0.3 * Math.sin(time * 0.3 + i * 1.5) + 0.5)
        point.y = height * (0.2 + 0.3 * Math.cos(time * 0.2 + i * 1.5) + 0.5)
      })

      // Draw gradients
      points.forEach((point) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)

        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-20" aria-hidden="true" />
}

