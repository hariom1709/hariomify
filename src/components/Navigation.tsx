
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavigationProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navigation = ({
  isDarkMode,
  toggleTheme
}: NavigationProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [{
    path: '/',
    label: 'Home',
    icon: Home
  }, {
    path: '/browse',
    label: 'Browse',
    icon: Search
  }, {
    path: '/favorites',
    label: 'Favorites',
    icon: Heart
  }];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/lovable-uploads/0be6db75-0d18-479d-9dfa-933df887a527.png" alt="Hariomify Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
            Hariomify
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(item => {
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-music-card border-white/10">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                        isActive ? 'text-music-primary bg-white/10' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center space-x-4">
          
        </div>
      </div>

      {/* Mobile Bottom Navigation - only show on very small screens */}
      <div className="sm:hidden fixed bottom-20 left-0 right-0 bg-music-card/95 backdrop-blur-lg border-t border-white/10">
        <div className="flex items-center justify-around py-2">
          {navItems.map(item => {
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
