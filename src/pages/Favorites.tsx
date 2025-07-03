
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      title: '52 Bars',
      artist: 'Hip Hop Artist',
      thumbnail: '/lovable-uploads/9374816d-4708-4000-b9b8-bff234c9c91d.png',
      duration: 210
    },
    {
      id: '2',
      title: 'I Guess',
      artist: 'Alternative Rock',
      thumbnail: '/lovable-uploads/d9d57ae0-27fc-4b06-a8a4-171299ad3643.png',
      duration: 185
    },
    {
      id: '3',
      title: 'Itna na mujhse tu pyaar badhta',
      artist: 'Bollywood Classic',
      thumbnail: '/lovable-uploads/b8f13b17-e273-4227-a62d-a305fb944f03.png',
      duration: 240
    },
    {
      id: '4',
      title: 'Mera jeevan kora kagaz',
      artist: 'Classic Romance',
      thumbnail: '/lovable-uploads/b7d51d48-d9ef-4d56-8838-880ddfa8eb2b.png',
      duration: 195
    },
    {
      id: '5',
      title: 'Sunflower',
      artist: 'Spider-Verse OST',
      thumbnail: '/lovable-uploads/a0c230df-5f98-4f5e-8ea9-4231576bd704.png',
      duration: 158
    },
    {
      id: '6',
      title: 'A Man without Love',
      artist: 'Classic Pop',
      thumbnail: '/lovable-uploads/91e99ec5-6a86-44b8-bc45-bad14d7b3ae1.png',
      duration: 205
    },
    {
      id: '7',
      title: 'Blue Bird',
      artist: 'Anime Soundtrack',
      thumbnail: '/lovable-uploads/4b9b9ed7-4a2a-4b61-ba41-fe517e01cc79.png',
      duration: 220
    },
    {
      id: '8',
      title: 'Nature',
      artist: 'Contemporary Hip Hop',
      thumbnail: '/lovable-uploads/c284f4f7-e1d9-4a5a-8016-5bee157222be.png',
      duration: 175
    },
    {
      id: '9',
      title: 'Roots',
      artist: 'Feel Good Music',
      thumbnail: '/lovable-uploads/4d699a69-d3cb-4f80-a460-739887c2f80a.png',
      duration: 190
    },
    {
      id: '10',
      title: 'Shinunoga e wa',
      artist: 'Japanese Pop',
      thumbnail: '/lovable-uploads/c841dfe5-d375-46b8-afac-c36d477f491f.png',
      duration: 200
    }
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
