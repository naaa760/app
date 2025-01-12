"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, BarChart3, Shield, Zap } from "lucide-react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-500" />,
      title: "Advanced Analytics",
      description:
        "Get detailed insights and analytics about your items with our powerful tracking system.",
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: "Secure Management",
      description:
        "Your data is protected with enterprise-grade security and real-time backup systems.",
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      title: "Fast Processing",
      description:
        "Experience lightning-fast processing speeds with our optimized platform.",
    },
  ];

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      @keyframes float-delay {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(20px); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-gray-100 to-purple-100">
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 via-gray-200/20 to-purple-100/20" />

        <div className="absolute top-20 left-[20%] w-64 h-64 bg-gradient-to-r from-purple-300/20 to-gray-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[20%] w-72 h-72 bg-gradient-to-r from-gray-300/20 to-purple-200/20 rounded-full blur-3xl animate-float-delay" />

        <div
          className={`relative z-10 max-w-6xl mx-auto px-4 py-20 text-center transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-300 via-gray-200 to-purple-200 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative px-12 py-10 bg-white/50 backdrop-blur-md rounded-xl shadow-lg border border-purple-100">
              <Sparkles className="absolute top-6 right-6 text-purple-400 w-6 h-6 animate-pulse" />

              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-gray-500 to-purple-400 bg-clip-text text-transparent">
                Welcome to BauAI
              </h1>

              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Experience intelligent item management with our cutting-edge
                platform
              </p>

              <div className="flex gap-8 justify-center">
                <Button
                  size="lg"
                  className="relative px-8 py-6 bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="relative z-10 flex items-center gap-2 text-lg font-medium">
                    View Items
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 border-2 border-purple-200 hover:border-purple-300 bg-white/40 hover:bg-white/50 text-gray-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="relative z-10 flex items-center gap-2 text-lg font-medium">
                    Sign In
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-gray-500 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white/70 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:border-purple-200/50"
              >
                <div className="mb-4 p-3 bg-purple-50 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-gray-100/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-gray-500 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their items
            efficiently with BauAI.
          </p>
          <Button
            size="lg"
            className="px-8 py-6 bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2 text-lg font-medium">
              Start Now
              <ArrowRight className="w-5 h-5" />
            </span>
          </Button>
        </div>
      </section>

      <footer className="bg-white/30 backdrop-blur-sm border-t border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 BauAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
