import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  genre: 'lo-fi' | 'reggae';
  mood: 'chill' | 'upbeat' | 'dreamy' | 'tropical';
}

interface AudioState {
  // Player state
  isPlaying: boolean;
  currentTrack: number;
  volume: number;
  progress: number;
  duration: number;
  isMinimized: boolean;
  showVolumeSlider: boolean;
  
  // Tracks
  tracks: Track[];
  
  // Visual sync
  isNight: boolean;
  visualizerData: number[];
  
  // Actions
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: number) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setIsMinimized: (minimized: boolean) => void;
  setShowVolumeSlider: (show: boolean) => void;
  setIsNight: (night: boolean) => void;
  setVisualizerData: (data: number[]) => void;
  
  // Player controls
  togglePlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  playTrack: (index: number) => void;
  
  // Utilities
  getCurrentTrack: () => Track;
  getTracksByGenre: (genre: 'lo-fi' | 'reggae') => Track[];
  getRecommendedTrack: (currentMood: string) => Track | null;
}

// Default tracks with enhanced metadata
const defaultTracks: Track[] = [
  {
    id: '1',
    title: 'Island Breeze',
    artist: 'Tropical Vibes',
    src: '/audio/island-breeze.mp3',
    genre: 'lo-fi',
    mood: 'chill'
  },
  {
    id: '2',
    title: 'Sunset Reggae',
    artist: 'Ocean Waves',
    src: '/audio/sunset-reggae.mp3',
    genre: 'reggae',
    mood: 'tropical'
  },
  {
    id: '3',
    title: 'Palm Tree Dreams',
    artist: 'Chill Beats',
    src: '/audio/palm-dreams.mp3',
    genre: 'lo-fi',
    mood: 'dreamy'
  },
  {
    id: '4',
    title: 'Caribbean Flow',
    artist: 'Island Rhythms',
    src: '/audio/caribbean-flow.mp3',
    genre: 'reggae',
    mood: 'upbeat'
  },
  {
    id: '5',
    title: 'Moonlight Waves',
    artist: 'Night Sounds',
    src: '/audio/moonlight-waves.mp3',
    genre: 'lo-fi',
    mood: 'dreamy'
  },
  {
    id: '6',
    title: 'Beach Party',
    artist: 'Sunny Vibes',
    src: '/audio/beach-party.mp3',
    genre: 'reggae',
    mood: 'upbeat'
  }
];

export const useAudioStore = create<AudioState>()((set, get) => ({
  // Initial state
  isPlaying: false,
  currentTrack: 0,
  volume: 0.7,
  progress: 0,
  duration: 0,
  isMinimized: false,
  showVolumeSlider: false,
  isNight: false,
  visualizerData: [],
  tracks: defaultTracks,
  
  // Basic setters
  setIsPlaying: (playing: boolean) => set({ isPlaying: playing }),
  setCurrentTrack: (track: number) => set({ currentTrack: track }),
  setVolume: (volume: number) => set({ volume }),
  setProgress: (progress: number) => set({ progress }),
  setDuration: (duration: number) => set({ duration }),
  setIsMinimized: (minimized: boolean) => set({ isMinimized: minimized }),
  setShowVolumeSlider: (show: boolean) => set({ showVolumeSlider: show }),
  setIsNight: (night: boolean) => set({ isNight: night }),
  setVisualizerData: (data: number[]) => set({ visualizerData: data }),
  
  // Player controls
  togglePlayPause: () => {
    const { isPlaying } = get();
    set({ isPlaying: !isPlaying });
  },
  
  nextTrack: () => {
    const { currentTrack, tracks } = get();
    const nextIndex = (currentTrack + 1) % tracks.length;
    set({ currentTrack: nextIndex, progress: 0 });
  },
  
  prevTrack: () => {
    const { currentTrack, tracks } = get();
    const prevIndex = (currentTrack - 1 + tracks.length) % tracks.length;
    set({ currentTrack: prevIndex, progress: 0 });
  },
  
  playTrack: (index: number) => {
    const { tracks } = get();
    if (index >= 0 && index < tracks.length) {
      set({ 
        currentTrack: index, 
        progress: 0,
        isPlaying: true 
      });
    }
  },
  
  // Utility functions
  getCurrentTrack: () => {
    const { tracks, currentTrack } = get();
    return tracks[currentTrack];
  },
  
  getTracksByGenre: (genre: 'lo-fi' | 'reggae') => {
    const { tracks } = get();
    return tracks.filter((track: Track) => track.genre === genre);
  },
  
  getRecommendedTrack: (currentMood: string) => {
    const { tracks, currentTrack } = get();
    const moodMap: Record<string, string[]> = {
      'day': ['chill', 'upbeat', 'tropical'],
      'night': ['dreamy', 'chill'],
      'sunset': ['tropical', 'dreamy'],
      'sunrise': ['upbeat', 'chill']
    };
    
    const preferredMoods = moodMap[currentMood] || ['chill'];
    const availableTracks = tracks.filter(
      (track: Track, index: number) => 
        index !== currentTrack && 
        preferredMoods.includes(track.mood)
    );
    
    if (availableTracks.length === 0) return null;
    
    return availableTracks[Math.floor(Math.random() * availableTracks.length)];
  }
}));

// Selector hooks for performance optimization
export const useIsPlaying = () => useAudioStore((state: AudioState) => state.isPlaying);
export const useCurrentTrack = () => useAudioStore((state: AudioState) => state.getCurrentTrack());
export const usePlayerControls = () => useAudioStore((state: AudioState) => ({
  togglePlayPause: state.togglePlayPause,
  nextTrack: state.nextTrack,
  prevTrack: state.prevTrack,
  playTrack: state.playTrack
}));
export const useVisualizerData = () => useAudioStore((state: AudioState) => state.visualizerData);
export const useIsNight = () => useAudioStore((state: AudioState) => state.isNight);
