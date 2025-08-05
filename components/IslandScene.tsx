'use client';

import React from 'react';

interface IslandSceneProps {
  className?: string;
}

const IslandScene: React.FC<IslandSceneProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-400 to-blue-500">
        {/* Clouds */}
        <div className="absolute top-10 left-1/4 w-20 h-12 bg-white rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute top-16 right-1/3 w-16 h-10 bg-white rounded-full opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-8 right-1/4 w-12 h-8 bg-white rounded-full opacity-60 animate-pulse delay-2000"></div>
      </div>

      {/* Sun */}
      <div className="absolute top-12 right-12 w-16 h-16 bg-yellow-400 rounded-full shadow-lg animate-pulse"></div>

      {/* Ocean */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-600 to-blue-400">
        {/* Water waves animation */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-0 right-0 h-1 bg-white rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-4 left-0 right-0 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Island */}
      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
        {/* Island base */}
        <div className="w-64 h-32 bg-green-600 rounded-t-full relative">
          {/* Beach/sand area */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-yellow-200 rounded-t-full"></div>
          
          {/* Palm trees */}
          <div className="absolute top-4 left-12">
            {/* Tree trunk */}
            <div className="w-2 h-16 bg-amber-700 mx-auto"></div>
            {/* Palm fronds */}
            <div className="relative -top-2">
              <div className="w-8 h-2 bg-green-500 rounded-full transform -rotate-45 absolute -left-3 -top-1"></div>
              <div className="w-8 h-2 bg-green-500 rounded-full transform rotate-45 absolute -right-3 -top-1"></div>
              <div className="w-8 h-2 bg-green-500 rounded-full transform -rotate-12 absolute -left-3 -top-3"></div>
              <div className="w-8 h-2 bg-green-500 rounded-full transform rotate-12 absolute -right-3 -top-3"></div>
            </div>
          </div>

          {/* Second palm tree */}
          <div className="absolute top-6 right-16">
            {/* Tree trunk */}
            <div className="w-2 h-14 bg-amber-700 mx-auto transform rotate-12"></div>
            {/* Palm fronds */}
            <div className="relative -top-2 -right-2">
              <div className="w-6 h-2 bg-green-500 rounded-full transform -rotate-45 absolute -left-2 -top-1"></div>
              <div className="w-6 h-2 bg-green-500 rounded-full transform rotate-45 absolute -right-2 -top-1"></div>
              <div className="w-6 h-2 bg-green-500 rounded-full transform -rotate-12 absolute -left-2 -top-3"></div>
              <div className="w-6 h-2 bg-green-500 rounded-full transform rotate-12 absolute -right-2 -top-3"></div>
            </div>
          </div>

          {/* Rocks/details */}
          <div className="absolute bottom-8 right-8 w-4 h-3 bg-gray-600 rounded"></div>
          <div className="absolute bottom-10 left-20 w-3 h-2 bg-gray-500 rounded"></div>
        </div>
      </div>

      {/* Birds */}
      <div className="absolute top-20 left-1/3 text-gray-800 animate-bounce">
        <span className="text-sm">˄</span>
      </div>
      <div className="absolute top-24 left-1/2 text-gray-800 animate-bounce delay-500">
        <span className="text-sm">˄</span>
      </div>
      <div className="absolute top-18 right-1/3 text-gray-800 animate-bounce delay-1000">
        <span className="text-sm">˄</span>
      </div>
    </div>
  );
};

export default IslandScene;
