
import { useState, useEffect } from 'react';
import SongCard from '@/components/SongCard';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

interface FavoritesProps {
  onPlaySong: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onToggleFavorite: (songId: string) => void;
  favorites: string[];
}

const Favorites = ({ onPlaySong, currentSong, isPlaying, onToggleFavorite, favorites }: FavoritesProps) => {
  const [allSongs] = useState<Song[]>([
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

  const favoriteSongs = allSongs.filter(song => favorites.includes(song.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-music-dark via-gray-900 to-music-dark pt-20 pb-24">
      <div className="container mx-auto px-4 py-12">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center">
            <span className="w-1 h-12 bg-gradient-to-b from-red-500 to-pink-500 mr-4 rounded-full"></span>
            Your Favorites
          </h1>
          <p className="text-gray-400 text-lg mb-12">
            {favoriteSongs.length} {favoriteSongs.length === 1 ? 'song' : 'songs'} you love
          </p>

          {favoriteSongs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-music-primary to-music-secondary rounded-full flex items-center justify-center">
                <Heart size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">No favorites yet</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Start exploring music and tap the heart icon to add songs to your favorites.
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-music-primary to-music-secondary hover:from-music-secondary hover:to-music-primary text-white px-8 py-3 rounded-full transition-all duration-300"
              >
                Discover Music
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favoriteSongs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isPlaying={isPlaying}
                  isCurrentSong={currentSong?.id === song.id}
                  onPlay={onPlaySong}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
