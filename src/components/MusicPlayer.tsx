
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useIsMobile } from '@/hooks/use-mobile';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
  audioUrl?: string;
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
  currentTime: number;
  duration: number;
  onSeek: (value: number[]) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  isLoading?: boolean;
  error?: string | null;
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
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  isLoading,
  error,
}: MusicPlayerProps) => {
  const isMobile = useIsMobile();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            {error && <p className="text-red-400 text-xs truncate">{error}</p>}
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
              onClick={onPrevious}
              className="text-gray-300 hover:text-white"
            >
              <SkipBack size={20} />
            </Button>
            <Button
              onClick={onPlayPause}
              disabled={isLoading || !!error}
              className="w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
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
              max={duration}
              step={1}
              onValueChange={onSeek}
              className="flex-1"
              disabled={!currentSong.audioUrl}
            />
            <span className="text-xs text-gray-400 w-10 text-center">
              {formatTime(duration)}
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
            onValueChange={(value) => onVolumeChange(value[0])}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
