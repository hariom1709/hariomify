
import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useIsMobile } from '@/hooks/use-mobile';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleFavorite: (songId: string) => void;
  favorites: string[];
  onSongClick?: () => void;
}

const MusicPlayer = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onToggleFavorite,
  favorites,
  onSongClick,
}: MusicPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const isMobile = useIsMobile();

  // Reset current time when song changes
  useEffect(() => {
    setCurrentTime(0);
  }, [currentSong?.id]);

  useEffect(() => {
    if (isPlaying && currentSong) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            onNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentSong, onNext]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleNext = () => {
    setCurrentTime(0);
    onNext();
  };

  const handlePrevious = () => {
    setCurrentTime(0);
    onPrevious();
  };

  const handleSongInfoClick = () => {
    if (isMobile && onSongClick) {
      onSongClick();
    }
  };

  if (!currentSong) return null;

  const isFavorite = favorites.includes(currentSong.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-music-card/95 backdrop-blur-lg border-t border-white/10 p-4 z-40">
      <div className="container mx-auto flex items-center justify-between">
        {/* Song Info */}
        <div 
          className="flex items-center space-x-4 flex-1 min-w-0 cursor-pointer md:cursor-default"
          onClick={handleSongInfoClick}
        >
          <img
            src={currentSong.thumbnail}
            alt={currentSong.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-medium truncate">{currentSong.title}</h4>
            <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(currentSong.id);
            }}
            className={`${
              isFavorite ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="text-gray-300 hover:text-white"
            >
              <SkipBack size={20} />
            </Button>
            <Button
              onClick={onPlayPause}
              className="w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="text-gray-300 hover:text-white"
            >
              <SkipForward size={20} />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-400 w-10 text-center">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={currentSong.duration}
              step={1}
              onValueChange={handleSeek}
              className="flex-1"
            />
            <span className="text-xs text-gray-400 w-10 text-center">
              {formatTime(currentSong.duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="hidden md:flex items-center space-x-2 flex-1 justify-end">
          <Volume2 size={18} className="text-gray-400" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0])}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
