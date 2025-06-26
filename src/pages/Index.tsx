
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import SongCard from '@/components/SongCard';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

interface IndexProps {
  onPlaySong: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onToggleFavorite: (songId: string) => void;
  favorites: string[];
}

const Index = ({ onPlaySong, currentSong, isPlaying, onToggleFavorite, favorites }: IndexProps) => {
  const [trendingSongs] = useState<Song[]>([
    {
      id: '1',
      title: 'Midnight Dreams',
      artist: 'Luna Eclipse',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      duration: 180,
    },
    {
      id: '2',
      title: 'Electric Pulse',
      artist: 'Neon Waves',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      duration: 210,
    },
    {
      id: '3',
      title: 'Ocean Breeze',
      artist: 'Coastal Vibes',
      thumbnail: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop',
      duration: 195,
    },
    {
      id: '4',
      title: 'Digital Love',
      artist: 'Cyber Hearts',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop',
      duration: 225,
    },
    {
      id: '5',
      title: 'Sunset Boulevard',
      artist: 'Golden Hour',
      thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop',
      duration: 165,
    },
    {
      id: '6',
      title: 'Forest Whispers',
      artist: 'Nature Sounds',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
      duration: 240,
    },
  ]);

  const [newReleases] = useState<Song[]>([
    {
      id: '7',
      title: 'Starlight Serenade',
      artist: 'Celestial Dreams',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80',
      duration: 200,
    },
    {
      id: '8',
      title: 'Rhythm Machine',
      artist: 'Beat Factory',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&q=80',
      duration: 185,
    },
    {
      id: '9',
      title: 'Melodic Journey',
      artist: 'Sound Explorers',
      thumbnail: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop&q=80',
      duration: 215,
    },
    {
      id: '10',
      title: 'Cosmic Dance',
      artist: 'Space Groove',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop&q=80',
      duration: 175,
    },
  ]);

  const handlePlayRandomSong = () => {
    const allSongs = [...trendingSongs, ...newReleases];
    const randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];
    onPlaySong(randomSong);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-music-dark via-gray-900 to-music-dark pt-20 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
            Hariomify
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your music universe awaits. Discover, stream, and connect with millions of songs.
          </p>
          <Button
            onClick={handlePlayRandomSong}
            className="bg-gradient-to-r from-music-primary to-music-secondary hover:from-music-secondary hover:to-music-primary text-white px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Play Now
          </Button>
        </div>
      </section>

      {/* Trending Songs */}
      <section className="container mx-auto px-4 py-12">
        <div className="animate-slide-up">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-music-primary to-music-secondary mr-4 rounded-full"></span>
            Trending Now
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trendingSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isPlaying={isPlaying}
                isCurrentSong={currentSong?.id === song.id}
                onPlay={onPlaySong}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favorites.includes(song.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section className="container mx-auto px-4 py-12">
        <div className="animate-slide-up">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-music-secondary to-music-primary mr-4 rounded-full"></span>
            New Releases
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newReleases.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isPlaying={isPlaying}
                isCurrentSong={currentSong?.id === song.id}
                onPlay={onPlaySong}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favorites.includes(song.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
