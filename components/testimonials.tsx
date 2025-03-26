"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Marketing Director",
    content:
      "This platform has transformed how our team communicates sensitive information. The anonymity feature encourages honest feedback that we wouldn't get otherwise.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "HR Professional",
    content:
      "We use this for anonymous workplace feedback. It's been instrumental in improving our company culture by giving everyone a voice.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Team Lead",
    content:
      "The security features are impressive. I can share sensitive information with my team without worrying about data breaches.",
    rating: 4,
  },
  {
    name: "Jamie Taylor",
    role: "Journalist",
    content:
      "Essential tool for my work. I can communicate with sources while protecting their identity. The auto-destruction feature is a game-changer.",
    rating: 5,
  },
  {
    name: "Raj Patel",
    role: "Product Manager",
    content:
      "We collect anonymous product feedback through this platform. The insights we've gained have been invaluable for our development roadmap.",
    rating: 4,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!carouselRef.current) return

    gsap.to(carouselRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.1,
      onComplete: () => {
        gsap.to(carouselRef.current?.children, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        })
      },
    })
  }, [currentIndex])

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={carouselRef}
        className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30"
      >
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <div className="flex items-center justify-center mb-2">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              ))}
              {[...Array(5 - testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i + testimonials[currentIndex].rating} className="h-5 w-5 text-gray-400" />
              ))}
            </div>
            <p className="text-lg text-center mb-6">"{testimonials[currentIndex].content}"</p>
            <div className="text-center">
              <p className="font-semibold">{testimonials[currentIndex].name}</p>
              <p className="text-sm text-gray-400">{testimonials[currentIndex].role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-purple-900/40 border border-purple-500/30 hover:bg-purple-800/60 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-purple-500" : "bg-gray-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-purple-900/40 border border-purple-500/30 hover:bg-purple-800/60 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

