'use client';

import React, { useState, useEffect } from 'react';
import { useAudioStore, Track } from '@/stores/audioStore';

interface NftModalProps {
  isOpen: boolean;
  onClose: () => void;
  track?: Track;
}

interface NftMetadata {
  tokenId: string;
  contract: string;
  creator: string;
  owner: string;
  price: string;
  currency: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  mintDate: string;
  description: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

const NftModal: React.FC<NftModalProps> = ({ isOpen, onClose, track }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'history' | 'attributes'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const { currentTrack, playTrack, tracks } = useAudioStore();

  // Mock NFT metadata (in real app, this would come from blockchain/API)
  const mockNftData: NftMetadata = {
    tokenId: `#${Math.floor(Math.random() * 10000)}`,
    contract: '0x' + Math.random().toString(16).substring(2, 42),
    creator: track?.artist || 'Unknown Artist',
    owner: '0x' + Math.random().toString(16).substring(2, 8) + '...',
    price: (Math.random() * 5 + 0.1).toFixed(2),
    currency: 'ETH',
    rarity: ['Common', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)] as NftMetadata['rarity'],
    mintDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    description: `Exclusive NFT for "${track?.title}" - A unique collectible representing this ${track?.genre} masterpiece from the Mucih collection.`,
    attributes: [
      { trait_type: 'Genre', value: track?.genre || 'Unknown' },
      { trait_type: 'Mood', value: track?.mood || 'Unknown' },
      { trait_type: 'Duration', value: '3:42' },
      { trait_type: 'BPM', value: Math.floor(Math.random() * 60 + 80).toString() },
      { trait_type: 'Key', value: ['C', 'D', 'E', 'F', 'G', 'A', 'B'][Math.floor(Math.random() * 7)] + ['♭', '', '♯'][Math.floor(Math.random() * 3)] },
    ]
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 bg-gray-400/10';
      case 'Rare': return 'text-blue-400 bg-blue-400/10';
      case 'Epic': return 'text-purple-400 bg-purple-400/10';
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handlePlayTrack = () => {
    if (track) {
      const trackIndex = tracks.findIndex(t => t.id === track.id);
      if (trackIndex !== -1) {
        playTrack(trackIndex);
      }
    }
  };

  const handlePurchase = () => {
    setIsLoading(true);
    // Simulate purchase process
    setTimeout(() => {
      setIsLoading(false);
      alert('Purchase simulation - In real app, this would connect to Web3 wallet');
    }, 2000);
  };

  if (!isOpen || !track) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600">
              {track.albumArt ? (
                <img 
                  src={track.albumArt} 
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
                  {track.title.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{track.title}</h2>
              <p className="text-gray-400">by {track.artist}</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-full max-h-[70vh]">
          {/* Left side - Image */}
          <div className="lg:w-1/2 p-6">
            <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 relative group">
              {track.albumArt ? (
                <img 
                  src={track.albumArt} 
                  alt={track.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-8xl font-bold">
                  {track.title.charAt(0)}
                </div>
              )}
              
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={handlePlayTrack}
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Rarity badge */}
            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRarityColor(mockNftData.rarity)}`}>
                {mockNftData.rarity}
              </span>
              <span className="text-gray-400 text-sm">Token {mockNftData.tokenId}</span>
            </div>
          </div>

          {/* Right side - Details */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {['details', 'history', 'attributes'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-4 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-white border-b-2 border-purple-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                    <p className="text-gray-300 leading-relaxed">{mockNftData.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400">Creator</label>
                      <p className="text-white font-medium">{mockNftData.creator}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Owner</label>
                      <p className="text-white font-medium">{mockNftData.owner}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Mint Date</label>
                      <p className="text-white font-medium">{mockNftData.mintDate}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Contract</label>
                      <p className="text-white font-medium font-mono text-xs">{mockNftData.contract.substring(0, 10)}...</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Transaction History</h3>
                  {[
                    { action: 'Minted', price: '0.05 ETH', date: mockNftData.mintDate, from: 'Creator' },
                    { action: 'Sale', price: '0.15 ETH', date: '2024-07-15', from: 'Creator' },
                    { action: 'Transfer', price: '0.25 ETH', date: '2024-07-20', from: 'Collector' },
                  ].map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div>
                        <p className="text-white font-medium">{event.action}</p>
                        <p className="text-gray-400 text-sm">{event.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{event.price}</p>
                        <p className="text-gray-400 text-sm">from {event.from}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'attributes' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Attributes</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mockNftData.attributes.map((attr, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white/5 text-center">
                        <p className="text-gray-400 text-sm">{attr.trait_type}</p>
                        <p className="text-white font-semibold">{attr.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Purchase */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Current Price</p>
                  <p className="text-2xl font-bold text-white">{mockNftData.price} {mockNftData.currency}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">~$234.56 USD</p>
                  <p className="text-gray-400 text-sm">Gas: ~$5.23</p>
                </div>
              </div>
              
              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  'Purchase NFT'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftModal;
