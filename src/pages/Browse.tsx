
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

  const filteredSongs = allSongs.filter(
    song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const genres = [
    { name: 'Electronic', count: 25, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop' },
    { name: 'Ambient', count: 18, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop' },
    { name: 'Pop', count: 32, image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop' },
    { name: 'Rock', count: 28, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
    { name: 'Jazz', count: 15, image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=300&fit=crop' },
    { name: 'Classical', count: 12, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop' },
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
