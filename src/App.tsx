import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Instagram } from 'lucide-react';
import Navigation from "./components/Navigation";
import MusicPlayer from "./components/MusicPlayer";
import MobileMusicPlayer from "./components/MobileMusicPlayer";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import { useIsMobile } from "./hooks/use-mobile";

const queryClient = new QueryClient();

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showMobilePlayer, setShowMobilePlayer] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const isMobile = useIsMobile();

  const [playlist] = useState<Song[]>([{
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    duration: 180
  }, {
    id: '2',
    title: 'Electric Pulse',
    artist: 'Neon Waves',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    duration: 210
  }, {
    id: '3',
    title: 'Ocean Breeze',
    artist: 'Coastal Vibes',
    thumbnail: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop',
    duration: 195
  }, {
    id: '4',
    title: 'Digital Love',
    artist: 'Cyber Hearts',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop',
    duration: 225
  }, {
    id: '5',
    title: 'Sunset Boulevard',
    artist: 'Golden Hour',
    thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop',
    duration: 165
  }, {
    id: '6',
    title: 'Forest Whispers',
    artist: 'Nature Sounds',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
    duration: 240
  }, {
    id: '7',
    title: 'Starlight Serenade',
    artist: 'Celestial Dreams',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80',
    duration: 200
  }, {
    id: '8',
    title: 'Rhythm Machine',
    artist: 'Beat Factory',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&q=80',
    duration: 185
  }, {
    id: '9',
    title: 'Melodic Journey',
    artist: 'Sound Explorers',
    thumbnail: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop&q=80',
    duration: 215
  }, {
    id: '10',
    title: 'Cosmic Dance',
    artist: 'Space Groove',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop&q=80',
    duration: 175
  }]);

  // Initialize theme on component mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  // Timer for current time
  useEffect(() => {
    if (isPlaying && currentSong) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentSong]);

  // Reset current time when song changes
  useEffect(() => {
    setCurrentTime(0);
  }, [currentSong?.id]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
      return newMode;
    });
  };

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
  };

  const handlePrevious = () => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const previousIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentSong(playlist[previousIndex]);
  };

  const handleToggleFavorite = (songId: string) => {
    setFavorites(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId) 
        : [...prev, songId]
    );
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleSongClick = () => {
    if (isMobile && currentSong) {
      setShowMobilePlayer(true);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className={isDarkMode ? 'dark' : 'light'}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground">
              <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
              
              <Routes>
                <Route path="/" element={<Index onPlaySong={handlePlaySong} currentSong={currentSong} isPlaying={isPlaying} onToggleFavorite={handleToggleFavorite} favorites={favorites} />} />
                <Route path="/browse" element={<Browse onPlaySong={handlePlaySong} currentSong={currentSong} isPlaying={isPlaying} onToggleFavorite={handleToggleFavorite} favorites={favorites} />} />
                <Route path="/favorites" element={<Favorites onPlaySong={handlePlaySong} currentSong={currentSong} isPlaying={isPlaying} onToggleFavorite={handleToggleFavorite} favorites={favorites} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>

              {/* Instagram Footer */}
              <div className="fixed bottom-20 left-0 right-0 bg-music-card/80 backdrop-blur-sm border-t border-white/10 p-4 text-center md:bottom-24">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <Instagram size={20} className="text-pink-500" />
                  <span className="text-sm">
                    Agr jeevan mai khush rhna hai toh mujhe instagram pe follow krlo😝
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">+91 8799765492</p>
              </div>

              <MusicPlayer 
                currentSong={currentSong} 
                isPlaying={isPlaying} 
                onPlayPause={handlePlayPause} 
                onNext={handleNext} 
                onPrevious={handlePrevious} 
                onToggleFavorite={handleToggleFavorite} 
                favorites={favorites}
                onSongClick={handleSongClick}
              />

              {/* Mobile Music Player */}
              {showMobilePlayer && (
                <MobileMusicPlayer
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onToggleFavorite={handleToggleFavorite}
                  favorites={favorites}
                  onClose={() => setShowMobilePlayer(false)}
                  currentTime={currentTime}
                  onSeek={handleSeek}
                />
              )}
            </div>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
