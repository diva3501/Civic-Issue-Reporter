import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Building, Users, MapPin, AlertTriangle, CheckCircle,
  BarChart3, Bell, ShieldCheck, Clock, Globe, ThumbsUp, Sparkles, Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Landing = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();

  const handleLogin = (role, name, department) => {
    setCurrentUser({ role, name, department });
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Beautiful gradient background with abstract overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 bg-[length:200%_200%] animate-gradient-x">
  {/* Subtle pattern overlay */}
  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

  {/* Floating Orbs */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float-slow"></div>
  <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-float"></div>
</div>


      <div className="relative z-10 flex-1 text-white lg:text-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          
          {/* Top Header */}
          <div className="text-center mb-12">
            <div className="bg-white/20 lg:bg-indigo-100 rounded-full p-5 w-24 h-24 mx-auto mb-5 flex items-center justify-center shadow-lg">
              <MapPin size={48} className="text-white lg:text-indigo-600" />
            </div>
            <h1 className="text-4xl font-extrabold mb-3 tracking-tight lg:text-gray-900">
              CivicSave
            </h1>
            <p className="text-base text-white">
  Report, track, and resolve community issues effortlessly ✨
</p>

          </div>

          {/* Portal Buttons */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-center">
  Login to Your Portal
</h2>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
  {/* Civilian */}
  <button
    onClick={() => handleLogin('civilian', 'John Citizen')}
    className="relative group w-64 px-6 py-4 rounded-2xl font-semibold text-white
               bg-gradient-to-r from-blue-500 to-indigo-500 
               shadow-lg shadow-blue-500/30
               hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50
               transition-all duration-300 flex items-center justify-center gap-3"
  >
    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 transition">
      <User size={20} />
    </span>
    Civilian Portal
  </button>

  {/* Municipal Staff */}
  <button
    onClick={() => handleLogin('municipal', 'Sarah Manager')}
    className="relative group w-64 px-6 py-4 rounded-2xl font-semibold text-white
               bg-gradient-to-r from-green-500 to-emerald-500 
               shadow-lg shadow-green-500/30
               hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50
               transition-all duration-300 flex items-center justify-center gap-3"
  >
    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 transition">
      <Building size={20} />
    </span>
    Municipal Staff
  </button>

  {/* Department */}
  <button
    onClick={() => handleLogin('department', 'Mike Worker', 'Public Works')}
    className="relative group w-64 px-6 py-4 rounded-2xl font-semibold text-white
               bg-gradient-to-r from-purple-500 to-fuchsia-500 
               shadow-lg shadow-purple-500/30
               hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50
               transition-all duration-300 flex items-center justify-center gap-3"
  >
    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 transition">
      <Users size={20} />
    </span>
    Department Portal
  </button>
</div>

          </div>

          {/* Features Highlights */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-6 overflow-x-auto no-scrollbar flex space-x-4 lg:space-x-0 pb-8">
            <div className="flex-shrink-0 bg-white/20 lg:bg-white lg:text-gray-800 rounded-xl p-6 text-center shadow-lg hover:scale-105 transition">
              <AlertTriangle size={32} className="mx-auto mb-3 text-red-400 lg:text-red-500" />
              <h3 className="font-semibold mb-2">Report Issues</h3>
              <p className="text-sm lg:text-gray-600">
                Capture issues with photos, description, and GPS location
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/20 lg:bg-white lg:text-gray-800 rounded-xl p-6 text-center shadow-lg hover:scale-105 transition">
              <MapPin size={32} className="mx-auto mb-3 text-blue-300 lg:text-blue-500" />
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm lg:text-gray-600">
                See real-time status updates and notifications
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/20 lg:bg-white lg:text-gray-800 rounded-xl p-6 text-center shadow-lg hover:scale-105 transition">
              <CheckCircle size={32} className="mx-auto mb-3 text-green-300 lg:text-green-500" />
              <h3 className="font-semibold mb-2">Get Results</h3>
              <p className="text-sm lg:text-gray-600">
                Issues resolved quickly through collaboration
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white/20 lg:bg-white lg:text-gray-800 backdrop-blur-md rounded-xl px-8 py-8 mt-10 shadow-lg">
            <h3 className="text-center text-sm font-medium mb-5 flex items-center justify-center gap-2">
              <BarChart3 size={18} /> Community Impact
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-400 lg:text-blue-600">1,247</p>
                <p className="text-sm lg:text-gray-600">Reported</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400 lg:text-green-600">892</p>
                <p className="text-sm lg:text-gray-600">Resolved</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-300 lg:text-yellow-600">248</p>
                <p className="text-sm lg:text-gray-600">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-300 lg:text-purple-600">72%</p>
                <p className="text-sm lg:text-gray-600">Resolution Rate</p>
              </div>
            </div>
          </div>

          {/* New Features Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-10">Why Choose CivicSave?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div className="bg-white/20 lg:bg-white lg:text-gray-800 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition">
                <ShieldCheck className="mx-auto mb-4 text-green-400 lg:text-green-600" size={36} />
                <h4 className="font-semibold mb-2">Secure & Reliable</h4>
                <p className="text-sm lg:text-gray-600">Your data is safe with end-to-end security</p>
              </div>
              <div className="bg-white/20 lg:bg-white lg:text-gray-800 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition">
                <Clock className="mx-auto mb-4 text-blue-400 lg:text-blue-600" size={36} />
                <h4 className="font-semibold mb-2">Real-Time Updates</h4>
                <p className="text-sm lg:text-gray-600">Stay informed with instant notifications</p>
              </div>
              <div className="bg-white/20 lg:bg-white lg:text-gray-800 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition">
                <Globe className="mx-auto mb-4 text-purple-400 lg:text-purple-600" size={36} />
                <h4 className="font-semibold mb-2">Community Driven</h4>
                <p className="text-sm lg:text-gray-600">Empowering citizens to build better cities</p>
              </div>
              <div className="bg-white/20 lg:bg-white lg:text-gray-800 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition">
                <Sparkles className="mx-auto mb-4 text-pink-400 lg:text-pink-600" size={36} />
                <h4 className="font-semibold mb-2">AI-Powered Insights</h4>
                <p className="text-sm lg:text-gray-600">Smarter prioritization for urgent issues</p>
              </div>
              <div className="bg-white/20 lg:bg-white lg:text-gray-800 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition">
                <Layers className="mx-auto mb-4 text-indigo-400 lg:text-indigo-600" size={36} />
                <h4 className="font-semibold mb-2">Seamless Integration</h4>
                <p className="text-sm lg:text-gray-600">Works with municipal systems easily</p>
              </div>
              <div className="bg-white/20 lg:bg-white lg:text-gray-800 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition">
                <ThumbsUp className="mx-auto mb-4 text-yellow-400 lg:text-yellow-600" size={36} />
                <h4 className="font-semibold mb-2">Citizen Friendly</h4>
                <p className="text-sm lg:text-gray-600">Designed for ease of use on all devices</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-white text-indigo-600 rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
        <Bell size={24} />
      </button>
    </div>
  );
};

export default Landing;
