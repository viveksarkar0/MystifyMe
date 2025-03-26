"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { Shield, Clock, Fingerprint, Zap, Lock, Eye } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "All messages are encrypted from the moment they're sent until they're read.",
  },
  {
    icon: Clock,
    title: "Auto-Destruction",
    description: "Messages automatically delete after being read or after 24 hours.",
  },
  {
    icon: Fingerprint,
    title: "Zero Identity Tracking",
    description: "We don't collect IP addresses, device info, or any personal data.",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Messages are delivered instantly, no matter where your recipient is.",
  },
  {
    icon: Lock,
    title: "Password Protection",
    description: "Add an extra layer of security with optional password protection.",
  },
  {
    icon: Eye,
    title: "Read Receipts",
    description: "Know when your message was read without revealing your identity.",
  },
]

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll(".feature-card")

    // Create animation for each card
    cards.forEach((card) => {
      // Create hover effect
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          scale: 1.03,
          boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)",
          duration: 0.3,
          ease: "power2.out",
        })

        // Animate the icon
        const icon = card.querySelector(".feature-icon")
        if (icon) {
          gsap.to(icon, {
            rotate: 360,
            scale: 1.2,
            duration: 0.5,
            ease: "back.out(1.7)",
          })
        }
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 0 0 0 rgba(0,0,0,0)",
          duration: 0.3,
          ease: "power2.out",
        })

        // Reset the icon
        const icon = card.querySelector(".feature-icon")
        if (icon) {
          gsap.to(icon, {
            rotate: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          })
        }
      })

      // Initial reveal animation
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
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="feature-card bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 transition-all duration-300"
        >
          <div className="feature-icon w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-4 transition-all duration-300">
            <feature.icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

