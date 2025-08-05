"use client";
import React, { useState, useEffect } from 'react';
import ArtOrbs from "./ArtOrbs";

const CYCLE_DURATION = 3000;   // auto-cycle ms  
const TRANSITION_DURATION = 2000; // fade ms

interface IslandSceneProps {
  className?: string;
  autoTransition?: boolean;
  transitionSpeed?: number;
}

const IslandScene: React.FC<IslandSceneProps> = ({ className = '', autoTransition = true, transitionSpeed = CYCLE_DURATION }) => {
  const [isNight, setIsNight] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);

  useEffect(() => {
    if (!autoTransition) return;

    const interval = setInterval(() => {
      setIsNight((prev) => !prev);
    }, transitionSpeed);

    return () => clearInterval(interval);
  }, [autoTransition, transitionSpeed]);

  useEffect(() => {
    const duration = TRANSITION_DURATION;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      setTransitionProgress(currentStep / steps);
      
      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setTransitionProgress(0);
      }
    }, stepDuration);

    return () => clearInterval(progressInterval);
  }, [isNight]);

  // Calculate dynamic colors based on day/night state and transition
  const getSkyColors = () => {
    if (isNight) {
      return transitionProgress > 0 
        ? `from-slate-800 via-slate-900 to-slate-950`
        : `from-slate-800 via-slate-900 to-slate-950`;
    }
    return transitionProgress > 0
      ? `from-sky-300 via-sky-400 to-blue-500`
      : `from-sky-300 via-sky-400 to-blue-500`;
  };

  const getOceanColors = () => {
    return isNight 
      ? `from-slate-900 to-slate-800`
      : `from-blue-600 to-blue-400`;
  };

  const getSunMoonElement = () => {
    if (isNight) {
      return (
        <div className="absolute top-12 right-12 w-16 h-16 bg-gray-200 rounded-full shadow-lg relative">
          {/* Moon craters */}
          <div className="absolute top-2 left-3 w-2 h-2 bg-gray-400 rounded-full opacity-60"></div>
          <div className="absolute top-6 right-2 w-1 h-1 bg-gray-400 rounded-full opacity-40"></div>
          <div className="absolute bottom-3 left-2 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-50"></div>
          {/* Moon glow */}
          <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse opacity-30 scale-125"></div>
        </div>
      );
    }
    return (
      <div className="absolute top-12 right-12 w-16 h-16 bg-yellow-400 rounded-full shadow-lg animate-pulse">
        {/* Sun rays */}
        <div className="absolute inset-0">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-yellow-300"></div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-yellow-300"></div>
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-yellow-300"></div>
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-yellow-300"></div>
        </div>
      </div>
    );
  };

  const getStars = () => {
    if (!isNight) return null;
    
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Day/Night Toggle Button */}
      <button
        onClick={() => setIsNight(!isNight)}
        className="absolute top-4 left-4 z-10 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
      >
        {isNight ? '☀️ Day' : '🌙 Night'}
      </button>

      {/* Sky Background with dynamic colors */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getSkyColors()} transition-all duration-2000`}>
        {/* Stars (only visible at night) */}
        {getStars()}
        
        {/* Clouds */}
        <div className={`absolute top-10 left-1/4 w-20 h-12 rounded-full opacity-80 animate-pulse transition-all duration-2000 ${
          isNight ? 'bg-gray-600' : 'bg-white'
        }`}></div>
        <div className={`absolute top-16 right-1/3 w-16 h-10 rounded-full opacity-70 animate-pulse delay-1000 transition-all duration-2000 ${
          isNight ? 'bg-gray-700' : 'bg-white'
        }`}></div>
        <div className={`absolute top-8 right-1/4 w-12 h-8 rounded-full opacity-60 animate-pulse delay-2000 transition-all duration-2000 ${
          isNight ? 'bg-gray-600' : 'bg-white'
        }`}></div>
      </div>

      {/* Sun/Moon */}
      {getSunMoonElement()}

      {/* Ocean with dynamic colors */}
      <div className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t ${getOceanColors()} transition-all duration-2000`}>
        {/* Water waves animation */}
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute bottom-0 left-0 right-0 h-2 rounded-full animate-pulse transition-all duration-2000 ${
            isNight ? 'bg-gray-300' : 'bg-white'
          }`}></div>
          <div className={`absolute bottom-2 left-0 right-0 h-1 rounded-full animate-pulse delay-500 transition-all duration-2000 ${
            isNight ? 'bg-gray-300' : 'bg-white'
          }`}></div>
          <div className={`absolute bottom-4 left-0 right-0 h-1 rounded-full animate-pulse delay-1000 transition-all duration-2000 ${
            isNight ? 'bg-gray-300' : 'bg-white'
          }`}></div>
        </div>
      </div>

      {/* Island */}
      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
        {/* Island base */}
        <div className={`w-64 h-32 rounded-t-full relative transition-all duration-2000 ${
          isNight ? 'bg-green-800' : 'bg-green-600'
        }`}>
          {/* Beach/sand area */}
          <div className={`absolute bottom-0 left-0 right-0 h-8 rounded-t-full transition-all duration-2000 ${
            isNight ? 'bg-yellow-600' : 'bg-yellow-200'
          }`}></div>
          
          {/* Palm trees */}
          <div className="absolute top-4 left-12">
            {/* Tree trunk */}
            <div className={`w-2 h-16 mx-auto transition-all duration-2000 ${
              isNight ? 'bg-amber-900' : 'bg-amber-700'
            }`}></div>
            {/* Palm fronds */}
            <div className="relative -top-2">
              <div className={`w-8 h-2 rounded-full transform -rotate-45 absolute -left-3 -top-1 transition-all duration-2000 ${
                isNight ? 'bg-green-700' : 'bg-green-500'
              }`}></div>
              <div className={`w-8 h-2 rounded-full transform rotate-45 absolute -right-3 -top-1 transition-all duration-2000 ${
                isNight ? 'bg-green-700' : 'bg-green-500'
              }`}></div>
              <div className={`w-8 h-2 rounded-full transform -rotate-12 absolute -left-3 -top-3 transition-all duration-2000 ${
                isNight ? 'bg-green-700' : 'bg-green-500'
              }`}></div>
              <div className={`w-8 h-2 rounded-full transform rotate-12 absolute -right-3 -top-3 transition-all duration-2000 ${
                isNight ? 'bg-green-700' : 'bg-green-500'
              }`}></div>
            </div>
          </div>

          {/* Second palm tree */}
          <div className="absolute top-7 right-15">
            {/* Tree trunk */}
            <div className={`w-2 h-14 mx-auto transform rotate-12 transition-all duration-2000 ${
              isNight ? 'bg-amber-900' : 'bg-amber-600'
            }`}></div>
            {/* Palm fronds */}
            <div className="relative -top-2 -right-2">
              <div className={`w-6 h-2 rounded-full transform -rotate-45 absolute -left-2 -top-1 transition-all duration-2000 ${
                isNight ? 'bg-green-700' : 'bg-green-500'
              }`}></div>
              <div className={`w-6 h-2 rounded-full transform rotate-45 absolute -right-2 -top-1 transition-all duration-2000 ${
                isNight ? 'bg-green-700' : 'bg-green-500'
              }`}></div>
              <div className={`w-6 h-2 rounded-full transform -rotate-12 absolute -left-2 -top-3 transition-all duration-2000 ${
                isNight ? 'bg-green-700' : 'bg-green-500'
              }`}></div>
              <div className={`w-6 h-2 rounded-full transform rotate-12 absolute -right-2 -top-3 transition-all duration-2000 ${
                isNight ? 'bg-green-700' : 'bg-green-500'
              }`}></div>
            </div>
          </div>

          {/* Rocks/details */}
          <div className={`absolute bottom-8 right-8 w-4 h-3 rounded transition-all duration-2000 ${
            isNight ? 'bg-gray-800' : 'bg-gray-600'
          }`}></div>
          <div className={`absolute bottom-10 left-20 w-3 h-2 rounded transition-all duration-2000 ${
            isNight ? 'bg-gray-700' : 'bg-gray-500'
          }`}></div>
        </div>
      </div>

      {/* Birds */}
      <div className={`absolute top-20 left-1/3 animate-bounce transition-all duration-2000 ${
        isNight ? 'text-gray-300' : 'text-gray-800'
      }`}>
        <span className="text-sm">˄</span>
      </div>
      <div className={`absolute top-24 left-1/2 animate-bounce delay-500 transition-all duration-2000 ${
        isNight ? 'text-gray-300' : 'text-gray-800'
      }`}>
        <span className="text-sm">˄</span>
      </div>
      <div className={`absolute top-18 right-1/3 animate-bounce delay-1000 transition-all duration-2000 ${
        isNight ? 'text-gray-300' : 'text-gray-800'
      }`}>
        <span className="text-sm">˄</span>
      </div>

      {/* Fireflies (only visible at night) */}
      {isNight && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
              style={{
                top: `${60 + Math.random() * 30}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* 3D Art Orbs */}
      <ArtOrbs isNight={isNight} />
    </div>
  );
};

export default IslandScene;