
import Link from "next/link"
import { MessageBubbles } from "@/components/message-bubbles"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { FloatingCTA } from "@/components/floating-cta"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThreeDBackground } from "@/components/three-d-background"
import { GradientMeshBackground } from "@/components/gradient-mesh-background"
import { Floating3DMessage } from "@/components/floating-3d-message"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ThreeDBackground />
      <GradientMeshBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full backdrop-blur-sm border border-purple-500/30">
                <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Completely Anonymous. Totally Secure.
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block">Speak Freely.</span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  Stay Anonymous.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-lg">
                Send messages without revealing your identity. End-to-end encryption with zero tracking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#get-started"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-blue-600 px-6 text-sm font-medium text-white shadow transition-colors hover:from-purple-700 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                >
                  Get Started
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-purple-500/30 bg-black/30 backdrop-blur-sm px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                >
                  How It Works
                </Link>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Floating3DMessage />
              <MessageBubbles />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Sending anonymous messages has never been easier or more secure.
            </p>
          </div>
          <HowItWorks />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-pink-500/10 rounded-full filter blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Built with privacy and security as our top priorities.</p>
          </div>
          <Features />
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Are Saying</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Don&apos;t take our word for it. Here&apos;s what our users think.</p>
          </div>
          <Testimonials />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-16 md:py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-purple-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to speak freely?</h2>
                <p className="text-gray-300 mb-6">
                  Join thousands of users who trust our platform for secure, anonymous communication.
                </p>
                <Link
                  href="#get-started"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-blue-600 px-6 text-sm font-medium text-white shadow transition-colors hover:from-purple-700 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                >
                  Create Your Account
                </Link>
              </div>
              <div className="relative h-[300px] flex items-center justify-center">
                <div className="absolute w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>
                <div className="relative z-10 bg-gradient-to-r from-purple-600 to-blue-600 p-1 rounded-xl">
                  <div className="bg-black rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2">Free Plan</h3>
                    <p className="text-gray-300 mb-4">Perfect for personal use</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <span className="mr-2 text-green-400">✓</span>
                        <span>100 anonymous messages/month</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-green-400">✓</span>
                        <span>Basic encryption</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-green-400">✓</span>
                        <span>24-hour message history</span>
                      </li>
                    </ul>
                    <Link
                      href="#get-started"
                      className="inline-flex w-full h-10 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-blue-600 px-6 text-sm font-medium text-white shadow transition-colors hover:from-purple-700 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl"></div>
      </section>

      <FloatingCTA />
      <Footer />
    </div>
  )
}

