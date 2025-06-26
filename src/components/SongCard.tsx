
import { Play, Pause, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  isCurrentSong: boolean;
  onPlay: (song: Song) => void;
  onToggleFavorite: (songId: string) => void;
  isFavorite: boolean;
}

const SongCard = ({
  song,
  isPlaying,
  isCurrentSong,
  onPlay,
  onToggleFavorite,
  isFavorite,
}: SongCardProps) => {
  return (
    <div className="group bg-music-card rounded-xl p-4 transition-all duration-300 hover:bg-music-card/80 hover:scale-105 animate-fade-in">
      <div className="relative">
        <img
          src={song.thumbnail}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-lg mb-3"
        />
        <Button
          onClick={() => onPlay(song)}
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-music-primary hover:bg-music-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
        >
          {isCurrentSong && isPlaying ? (
            <Pause size={20} className="text-white" />
          ) : (
            <Play size={20} className="text-white ml-1" />
          )}
        </Button>
      </div>
      
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-white font-medium truncate mb-1">{song.title}</h3>
          <p className="text-gray-400 text-sm truncate">{song.artist}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleFavorite(song.id)}
          className={`ml-2 ${
            isFavorite ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </Button>
      </div>
    </div>
  );
};

export default SongCard;
