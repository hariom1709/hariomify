
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navigation = ({ isDarkMode, toggleTheme }: NavigationProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/browse', label: 'Browse', icon: Search },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 music-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
            Hariomify
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                  isActive ? 'text-music-primary bg-white/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-20 left-0 right-0 bg-music-card/95 backdrop-blur-lg border-t border-white/10">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
                  isActive ? 'text-music-primary' : 'text-gray-300'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
