'use client';

import React, { useEffect, useState } from 'react';

export default function SplashPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const steps = [
      { delay: 0, duration: 600 },
      { delay: 600, duration: 600 },
      { delay: 1200, duration: 600 },
      { delay: 1800, duration: 400 }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, step.delay);
    });

    // Fade out and redirect
    setTimeout(() => {
      setFadeOut(true);
          setTimeout(() => {
            window.location.href = '/login';
      }, 800);
    }, 2800);

    return () => {};
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden transition-all duration-1000 ${fadeOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

      <div className="relative z-10 text-center max-w-lg">
        
        {/* Main Logo Container */}
        <div className="mb-16 relative">
          {/* Glowing background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Animated logo container */}
          <div className={`relative w-32 h-32 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transition-all duration-1000 ${
            currentStep >= 0 ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-12'
          }`}
          style={{
            boxShadow: '0 0 60px rgba(147, 51, 234, 0.3), 0 0 120px rgba(59, 130, 246, 0.2)'
          }}>
            
            {/* Premium Jewellery Icon */}
            <div className={`transition-all duration-700 ${currentStep >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-50'}`}>
              <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                {/* Crown with jewels */}
                <path d="M12 2L15 8L20 9L18 14L12 12L6 14L4 9L9 8L12 2Z" fill="currentColor"/>
                <circle cx="8" cy="10" r="1" fill="#FFD700"/>
                <circle cx="12" cy="11" r="1" fill="#FF69B4"/>
                <circle cx="16" cy="10" r="1" fill="#00CED1"/>
              </svg>
            </div>
            
            {/* Rotating ring */}
            <div className={`absolute inset-0 border-2 border-white/30 rounded-3xl transition-all duration-1000 ${
              currentStep >= 2 ? 'animate-spin' : ''
            }`} style={{ animationDuration: '8s' }}></div>
          </div>

          {/* Floating accent gems */}
          <div className={`absolute -top-4 -left-4 transition-all duration-700 delay-300 ${
            currentStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg animate-bounce"></div>
          </div>
          <div className={`absolute -top-4 -right-4 transition-all duration-700 delay-500 ${
            currentStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className={`absolute -bottom-4 -left-4 transition-all duration-700 delay-700 ${
            currentStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className={`absolute -bottom-4 -right-4 transition-all duration-700 delay-900 ${
            currentStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Animated Title */}
        <div className="mb-12">
          <h1 className={`text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent transition-all duration-1000 ${
            currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
          }}>
            Jewellery CRM
          </h1>
          <p className={`text-xl text-gray-300 transition-all duration-1000 delay-300 ${
            currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Where Luxury Meets Technology
          </p>
        </div>

        {/* Advanced Loading Animation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          {currentStep < 3 ? (
            <div className="flex justify-center space-x-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full transition-all duration-500 ${
                    currentStep >= i ? 'animate-pulse scale-100' : 'scale-75 opacity-50'
                  }`}
                  style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          ) : (
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>

                 {/* Pure Loading Motion */}
         <div className={`mt-6 transition-all duration-500 ${
           currentStep >= 3 ? 'opacity-100' : 'opacity-0'
         }`}>
           <div className="flex justify-center space-x-2">
             <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
             <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
             <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
             <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
           </div>
         </div>
      </div>
    </div>
  );
} 