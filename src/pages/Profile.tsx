
import { User, Music, Heart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileProps {
  favorites: string[];
}

const Profile = ({ favorites }: ProfileProps) => {
  const stats = [
    { icon: Music, label: 'Songs Played', value: '1,234' },
    { icon: Heart, label: 'Favorites', value: favorites.length.toString() },
    { icon: Clock, label: 'Hours Listened', value: '89' },
  ];

  const recentActivity = [
    { action: 'Liked', song: 'Midnight Dreams', artist: 'Luna Eclipse', time: '2 hours ago' },
    { action: 'Played', song: 'Electric Pulse', artist: 'Neon Waves', time: '5 hours ago' },
    { action: 'Added to favorites', song: 'Ocean Breeze', artist: 'Coastal Vibes', time: '1 day ago' },
    { action: 'Played', song: 'Digital Love', artist: 'Cyber Hearts', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-music-dark via-gray-900 to-music-dark pt-20 pb-24">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="animate-fade-in">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-music-primary to-music-secondary rounded-full flex items-center justify-center">
              <User size={64} className="text-white" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Music Lover</h1>
              <p className="text-gray-400 text-lg mb-4">Premium Member since 2024</p>
              <Button className="bg-gradient-to-r from-music-primary to-music-secondary hover:from-music-secondary hover:to-music-primary text-white px-6 py-2 rounded-full">
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-music-card rounded-xl p-6 text-center">
                  <Icon size={32} className="text-music-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="bg-music-card rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-gradient-to-b from-music-primary to-music-secondary mr-4 rounded-full"></span>
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                  <div className="flex-1">
                    <p className="text-white">
                      <span className="text-music-primary font-medium">{activity.action}</span> "{activity.song}" by {activity.artist}
                    </p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-music-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Listening Preferences</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Audio Quality</span>
                  <span className="text-music-primary font-medium">High (320 kbps)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Autoplay</span>
                  <span className="text-green-400 font-medium">On</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Crossfade</span>
                  <span className="text-music-primary font-medium">5 seconds</span>
                </div>
              </div>
            </div>

            <div className="bg-music-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Account</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Plan</span>
                  <span className="text-music-primary font-medium">Premium</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Downloads</span>
                  <span className="text-gray-300">Available</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Family Sharing</span>
                  <span className="text-green-400 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
