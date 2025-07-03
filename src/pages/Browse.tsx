import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SongCard from '@/components/SongCard';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

interface BrowseProps {
  onPlaySong: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onToggleFavorite: (songId: string) => void;
  favorites: string[];
}

const Browse = ({ onPlaySong, currentSong, isPlaying, onToggleFavorite, favorites }: BrowseProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const filteredSongs = allSongs.filter(
    song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const genres = [
    { name: 'Hip Hop', count: 2, image: '/lovable-uploads/9374816d-4708-4000-b9b8-bff234c9c91d.png' },
    { name: 'Alternative', count: 1, image: '/lovable-uploads/d9d57ae0-27fc-4b06-a8a4-171299ad3643.png' },
    { name: 'Bollywood', count: 2, image: '/lovable-uploads/b8f13b17-e273-4227-a62d-a305fb944f03.png' },
    { name: 'Pop', count: 2, image: '/lovable-uploads/a0c230df-5f98-4f5e-8ea9-4231576bd704.png' },
    { name: 'Anime', count: 1, image: '/lovable-uploads/4b9b9ed7-4a2a-4b61-ba41-fe517e01cc79.png' },
    { name: 'Feel Good', count: 2, image: '/lovable-uploads/4d699a69-d3cb-4f80-a460-739887c2f80a.png' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-music-dark via-gray-900 to-music-dark pt-20 pb-24">
      <div className="container mx-auto px-4 py-12">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 flex items-center">
            <span className="w-1 h-12 bg-gradient-to-b from-music-primary to-music-secondary mr-4 rounded-full"></span>
            Browse Music
          </h1>

          {/* Search Bar */}
          <div className="relative mb-12 max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search for songs, artists, or albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-music-card border-white/10 text-white placeholder-gray-400 focus:border-music-primary"
            />
          </div>

          {/* Genres */}
          {!searchQuery && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Browse by Genre</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {genres.map((genre) => (
                  <div
                    key={genre.name}
                    className="group relative bg-music-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                  >
                    <img
                      src={genre.image}
                      alt={genre.name}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                      <div>
                        <h3 className="text-white font-semibold">{genre.name}</h3>
                        <p className="text-gray-300 text-sm">{genre.count} songs</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Search Results / All Songs */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              {searchQuery ? `Search Results (${filteredSongs.length})` : 'All Songs'}
            </h2>
            {filteredSongs.length === 0 ? (
              <div className="text-center py-20">
                <Search size={64} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No songs found</h3>
                <p className="text-gray-400">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredSongs.map((song) => (
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
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Browse;
