'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  genre: 'lo-fi' | 'reggae';
}

interface AudioPlayerProps {
  className?: string;
  isNight?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ className = '', isNight = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Sample tracks - replace with actual audio files
  const tracks: Track[] = [
    {
      id: '1',
      title: 'Island Breeze',
      artist: 'Tropical Vibes',
      src: '/audio/island-breeze.mp3',
      genre: 'lo-fi'
    },
    {
      id: '2',
      title: 'Sunset Reggae',
      artist: 'Ocean Waves',
      src: '/audio/sunset-reggae.mp3',
      genre: 'reggae'
    },
    {
      id: '3',
      title: 'Palm Tree Dreams',
      artist: 'Chill Beats',
      src: '/audio/palm-dreams.mp3',
      genre: 'lo-fi'
    },
    {
      id: '4',
      title: 'Caribbean Flow',
      artist: 'Island Rhythms',
      src: '/audio/caribbean-flow.mp3',
      genre: 'reggae'
    }
  ];

  // Update audio element when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrack].src;
      audioRef.current.volume = volume;
    }
  }, [currentTrack, volume]);

  // Handle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle next track
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  // Handle previous track
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, nextTrack, tracks]);

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      audioRef.current.currentTime = newTime;
    }
  };

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Get genre color
  const getGenreColor = (genre: 'lo-fi' | 'reggae') => {
    return genre === 'lo-fi' 
      ? isNight ? 'from-purple-400 to-pink-400' : 'from-purple-500 to-pink-500'
      : isNight ? 'from-green-400 to-yellow-400' : 'from-green-500 to-yellow-500';
  };

  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <button
          onClick={() => setIsMinimized(false)}
          className={`w-16 h-16 rounded-full backdrop-blur-lg border shadow-lg transition-all duration-300 hover:scale-110 ${
            isNight 
              ? 'bg-slate-800/80 border-slate-600 text-white' 
              : 'bg-white/80 border-white/50 text-gray-800'
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <div className={`w-2 h-2 rounded-full mb-1 ${isPlaying ? 'animate-pulse' : ''}`}
                 style={{ backgroundColor: tracks[currentTrack].genre === 'lo-fi' ? '#8B5CF6' : '#10B981' }}></div>
            <span className="text-xs">🎵</span>
          </div>
        </button>
        <audio ref={audioRef} />
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className={`w-80 rounded-2xl backdrop-blur-lg border shadow-2xl transition-all duration-500 ${
        isNight 
          ? 'bg-slate-800/90 border-slate-600' 
          : 'bg-white/90 border-white/50'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-opacity-20">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getGenreColor(tracks[currentTrack].genre)} animate-pulse`}></div>
            <span className={`text-sm font-medium ${isNight ? 'text-white' : 'text-gray-800'}`}>
              {tracks[currentTrack].genre.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className={`p-1 rounded-full transition-colors ${
                isNight ? 'hover:bg-slate-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              🔊
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className={`p-1 rounded-full transition-colors ${
                isNight ? 'hover:bg-slate-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              ➖
            </button>
          </div>
        </div>

        {/* Volume Slider */}
        {showVolumeSlider && (
          <div className="px-4 py-2 border-b border-opacity-20">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${tracks[currentTrack].genre === 'lo-fi' ? '#8B5CF6' : '#10B981'} 0%, ${tracks[currentTrack].genre === 'lo-fi' ? '#8B5CF6' : '#10B981'} ${volume * 100}%, ${isNight ? '#374151' : '#E5E7EB'} ${volume * 100}%, ${isNight ? '#374151' : '#E5E7EB'} 100%)`
              }}
            />
          </div>
        )}

        {/* Track Info */}
        <div className="p-4">
          <h3 className={`text-lg font-semibold truncate ${isNight ? 'text-white' : 'text-gray-800'}`}>
            {tracks[currentTrack].title}
          </h3>
          <p className={`text-sm truncate ${isNight ? 'text-gray-300' : 'text-gray-600'}`}>
            {tracks[currentTrack].artist}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-2">
          <div
            className={`w-full h-2 rounded-full cursor-pointer ${isNight ? 'bg-slate-700' : 'bg-gray-200'}`}
            onClick={handleProgressClick}
          >
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getGenreColor(tracks[currentTrack].genre)} transition-all duration-300`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={`flex justify-between text-xs mt-1 ${isNight ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>{formatTime((progress / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 p-4">
          <button
            onClick={prevTrack}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              isNight ? 'hover:bg-slate-700 text-white' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            ⏮️
          </button>
          
          <button
            onClick={togglePlayPause}
            className={`p-4 rounded-full transition-all duration-200 hover:scale-110 bg-gradient-to-r ${getGenreColor(tracks[currentTrack].genre)} text-white shadow-lg`}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <button
            onClick={nextTrack}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              isNight ? 'hover:bg-slate-700 text-white' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            ⏭️
          </button>
        </div>

        {/* Track List Preview */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2 overflow-x-auto">
            {tracks.map((track, index) => (
              <button
                key={track.id}
                onClick={() => setCurrentTrack(index)}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-xs transition-all duration-200 ${
                  index === currentTrack
                    ? `bg-gradient-to-r ${getGenreColor(track.genre)} text-white`
                    : isNight 
                      ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {track.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default AudioPlayer;
