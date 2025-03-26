"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const messages = [
  "I've been wanting to tell you this for a long time...",
  "Your presentation today was amazing! 🔥",
  "Thank you for always being there for me.",
  "I think we should talk about the project deadline.",
  "Your work has inspired me more than you know.",
  "I've had a crush on you since we first met.",
  "The feedback you gave me changed my perspective.",
  "I'm sorry for what happened last week.",
  "You deserve that promotion more than anyone!",
  "Can we start over? I miss our friendship.",
]

export function MessageBubbles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const timeline = gsap.timeline()

    // Clear any existing message elements
    container.innerHTML = ""

    // Create and animate message bubbles
    messages.forEach((message, index) => {
      // Create message element
      const messageEl = document.createElement("div")
      messageEl.className = `absolute p-4 rounded-lg backdrop-blur-sm max-w-[80%] opacity-0 
        ${
          index % 2 === 0
            ? "bg-purple-500/20 border border-purple-500/30 left-0"
            : "bg-blue-500/20 border border-blue-500/30 right-0"
        }`
      messageEl.textContent = message

      // Add to container
      container.appendChild(messageEl)

      // Position randomly within container
      gsap.set(messageEl, {
        y: 50 + Math.random() * 300,
        x: index % 2 === 0 ? "10%" : "-10%",
        opacity: 0,
        scale: 0.8,
      })

      // Animate in and out with delay based on index
      timeline
        .to(messageEl, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.2,
          ease: "power2.out",
        })
        .to(messageEl, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          delay: 2,
          ease: "power2.in",
          onComplete: () => {
            if (index === messages.length - 1) {
              // Restart animation when all messages have been shown
              setTimeout(() => {
                if (containerRef.current) {
                  const newTimeline = gsap.timeline()
                  const children = Array.from(containerRef.current.children)

                  children.forEach((child, i) => {
                    // Reposition for next animation cycle
                    gsap.set(child, {
                      y: 50 + Math.random() * 300,
                      x: i % 2 === 0 ? "10%" : "-10%",
                      opacity: 0,
                      scale: 0.8,
                    })

                    // Animate in and out again
                    newTimeline
                      .to(child, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        delay: i * 0.2,
                        ease: "power2.out",
                      })
                      .to(child, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.6,
                        delay: 2,
                        ease: "power2.in",
                      })
                  })
                }
              }, 1000)
            }
          },
        })
    })

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Message bubbles will be dynamically created here */}
    </div>
  )
}

