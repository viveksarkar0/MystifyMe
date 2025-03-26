"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MessageSquare, Lock, Clock, Send } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: MessageSquare,
    title: "Create a message",
    description: "Write your message in our secure platform. No account required.",
  },
  {
    icon: Lock,
    title: "End-to-end encryption",
    description: "Your message is encrypted and cannot be traced back to you.",
  },
  {
    icon: Send,
    title: "Send anonymously",
    description: "Share a secure link with your recipient via any platform.",
  },
  {
    icon: Clock,
    title: "Auto-destruction",
    description: "Messages are automatically deleted after being read or after 24 hours.",
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll(".step-card")

    // Create animation for each card
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          delay: index * 0.1,
        },
      )
    })

    // Create connecting lines animation
    const lines = container.querySelectorAll(".connector")
    lines.forEach((line) => {
      gsap.fromTo(
        line,
        { width: 0 },
        {
          width: "100%",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="step-card bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 h-full transition-transform duration-300 hover:transform hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>

            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div
                className="connector hidden md:block absolute top-1/2 -right-3 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 w-0"
                style={{ left: "100%" }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

