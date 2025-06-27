
import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, MoreVertical, ChevronDown, Share, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

interface MobileMusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleFavorite: (songId: string) => void;
  favorites: string[];
  onClose: () => void;
  currentTime: number;
  onSeek: (value: number[]) => void;
}

const MobileMusicPlayer = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onToggleFavorite,
  favorites,
  onClose,
  currentTime,
  onSeek,
}: MobileMusicPlayerProps) => {
  const [volume, setVolume] = useState(75);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentSong) return null;

  const isFavorite = favorites.includes(currentSong.id);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-teal-600 to-teal-800 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <ChevronDown size={24} />
        </Button>
        <div className="text-center">
          <p className="text-sm opacity-80">PLAYING FROM PLAYLIST</p>
          <p className="text-sm font-medium">おきにいり。あんがく</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
        >
          <MoreVertical size={24} />
        </Button>
      </div>

      {/* Album Art */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <img
            src={currentSong.thumbnail}
            alt={currentSong.title}
            className="w-full aspect-square object-cover rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* Song Info */}
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-white mb-1 truncate">{currentSong.title}</h2>
            <p className="text-lg text-white/80 truncate">{currentSong.artist}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(currentSong.id)}
            className={`ml-4 ${
              isFavorite ? 'text-green-400' : 'text-white/60'
            } hover:bg-white/20`}
          >
            <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-8 py-2">
        <Slider
          value={[currentTime]}
          max={currentSong.duration}
          step={1}
          onValueChange={onSeek}
          className="mb-2"
        />
        <div className="flex justify-between text-white/60 text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 py-6">
        <div className="flex items-center justify-center space-x-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="text-white hover:bg-white/20"
          >
            <SkipBack size={32} />
          </Button>
          <Button
            onClick={onPlayPause}
            className="w-16 h-16 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="text-white hover:bg-white/20"
          >
            <SkipForward size={32} />
          </Button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between px-8 pb-8">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
        >
          <List size={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
        >
          <Share size={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
        >
          <List size={24} />
        </Button>
      </div>
    </div>
  );
};

export default MobileMusicPlayer;
