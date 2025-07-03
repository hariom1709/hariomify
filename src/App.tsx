import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import MusicPlayer from "./components/MusicPlayer";
import MobileMusicPlayer from "./components/MobileMusicPlayer";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import { useIsMobile } from "./hooks/use-mobile";
import { useAudioPlayer } from "./hooks/useAudioPlayer";

const queryClient = new QueryClient();

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
  audioUrl?: string;
}

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showMobilePlayer, setShowMobilePlayer] = useState(false);
  const isMobile = useIsMobile();
  
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    error,
    loadSong,
    play,
    pause,
    seek,
    changeVolume,
  } = useAudioPlayer();

  // Updated playlist with your uploaded covers and copyright-free audio
  const [playlist] = useState<Song[]>([
    {
      id: '1',
      title: '52 Bars',
      artist: 'Hip Hop Artist',
      thumbnail: '/lovable-uploads/9374816d-4708-4000-b9b8-bff234c9c91d.png',
      duration: 210,
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    },
    {
      id: '2',
      title: 'I Guess',
      artist: 'Alternative Rock',
      thumbnail: '/lovable-uploads/d9d57ae0-27fc-4b06-a8a4-171299ad3643.png',
      duration: 185,
      audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3'
    },
    {
      id: '3',
      title: 'Itna na mujhse tu pyaar badhta',
      artist: 'Bollywood Classic',
      thumbnail: '/lovable-uploads/b8f13b17-e273-4227-a62d-a305fb944f03.png',
      duration: 240,
      audioUrl: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav'
    },
    {
      id: '4',
      title: 'Mera jeevan kora kagaz',
      artist: 'Classic Romance',
      thumbnail: '/lovable-uploads/b7d51d48-d9ef-4d56-8838-880ddfa8eb2b.png',
      duration: 195,
      audioUrl: 'https://www.soundjay.com/misc/sounds/success-fanfare-trumpets.wav'
    },
    {
      id: '5',
      title: 'Sunflower',
      artist: 'Spider-Verse OST',
      thumbnail: '/lovable-uploads/a0c230df-5f98-4f5e-8ea9-4231576bd704.png',
      duration: 158,
      audioUrl: 'https://www.soundjay.com/misc/sounds/beep-07a.wav'
    },
    {
      id: '6',
      title: 'A Man without Love',
      artist: 'Classic Pop',
      thumbnail: '/lovable-uploads/91e99ec5-6a86-44b8-bc45-bad14d7b3ae1.png',
      duration: 205,
      audioUrl: 'https://www.soundjay.com/misc/sounds/beep-10.wav'
    },
    {
      id: '7',
      title: 'Blue Bird',
      artist: 'Anime Soundtrack',
      thumbnail: '/lovable-uploads/4b9b9ed7-4a2a-4b61-ba41-fe517e01cc79.png',
      duration: 220,
      audioUrl: 'https://www.soundjay.com/misc/sounds/typewriter-key-1.wav'
    },
    {
      id: '8',
      title: 'Nature',
      artist: 'Contemporary Hip Hop',
      thumbnail: '/lovable-uploads/c284f4f7-e1d9-4a5a-8016-5bee157222be.png',
      duration: 175,
      audioUrl: 'https://www.soundjay.com/misc/sounds/beep-28.wav'
    },
    {
      id: '9',
      title: 'Roots',
      artist: 'Feel Good Music',
      thumbnail: '/lovable-uploads/4d699a69-d3cb-4f80-a460-739887c2f80a.png',
      duration: 190,
      audioUrl: 'https://www.soundjay.com/misc/sounds/cash-register-01.wav'
    },
    {
      id: '10',
      title: 'Shinunoga e wa',
      artist: 'Japanese Pop',
      thumbnail: '/lovable-uploads/c841dfe5-d375-46b8-afac-c36d477f491f.png',
      duration: 200,
      audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3'
    }
  ]);

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

  // Load song when currentSong changes
  useEffect(() => {
    if (currentSong?.audioUrl) {
      loadSong(currentSong.audioUrl);
    }
  }, [currentSong?.id, loadSong]);

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

  const handlePlaySong = async (song: Song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        pause();
      } else {
        await play();
      }
    } else {
      setCurrentSong(song);
      // Audio will be loaded in the useEffect above, then we can play
      setTimeout(async () => {
        await play();
      }, 100);
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
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
    seek(value[0]);
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
                <Route 
                  path="/" 
                  element={
                    <Index 
                      onPlaySong={handlePlaySong} 
                      currentSong={currentSong} 
                      isPlaying={isPlaying} 
                      onToggleFavorite={handleToggleFavorite} 
                      favorites={favorites} 
                    />
                  } 
                />
                <Route 
                  path="/browse" 
                  element={
                    <Browse 
                      onPlaySong={handlePlaySong} 
                      currentSong={currentSong} 
                      isPlaying={isPlaying} 
                      onToggleFavorite={handleToggleFavorite} 
                      favorites={favorites} 
                    />
                  } 
                />
                <Route 
                  path="/favorites" 
                  element={
                    <Favorites 
                      onPlaySong={handlePlaySong} 
                      currentSong={currentSong} 
                      isPlaying={isPlaying} 
                      onToggleFavorite={handleToggleFavorite} 
                      favorites={favorites} 
                    />
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>

              <MusicPlayer 
                currentSong={currentSong} 
                isPlaying={isPlaying} 
                onPlayPause={handlePlayPause} 
                onNext={handleNext} 
                onPrevious={handlePrevious} 
                onToggleFavorite={handleToggleFavorite} 
                favorites={favorites} 
                onSongClick={handleSongClick}
                currentTime={currentTime}
                duration={duration || currentSong?.duration || 0}
                onSeek={handleSeek}
                volume={volume}
                onVolumeChange={changeVolume}
                isLoading={isLoading}
                error={error}
              />

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
                  duration={duration || currentSong?.duration || 0}
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
