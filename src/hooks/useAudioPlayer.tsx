
import { useState, useRef, useEffect } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
  audioUrl?: string;
}

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(Math.floor(audio.currentTime));
    };

    const handleDurationChange = () => {
      setDuration(Math.floor(audio.duration) || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setError('Failed to load audio file');
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  const loadSong = (audioUrl: string) => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.volume = volume;
      setCurrentTime(0);
      setError(null);
    }
  };

  const play = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        setError('Failed to play audio');
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeVolume = (newVolume: number) => {
    const volumeValue = newVolume / 100;
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  };

  return {
    isPlaying,
    currentTime,
    duration,
    volume: Math.round(volume * 100),
    isLoading,
    error,
    loadSong,
    play,
    pause,
    seek,
    changeVolume,
  };
};
