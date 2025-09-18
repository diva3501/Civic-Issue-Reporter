import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building, Users, MapPin, AlertTriangle, CheckCircle, BarChart3, Bell, ShieldCheck, Clock, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Landing = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();

  const handleLogin = (role, name, department) => {
    setCurrentUser({ role, name, department });
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Wrapper changes color depending on screen */}
      <div className="lg:bg-gray-50 lg:text-gray-800 bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 text-white flex-1">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Top Header */}
          <div className="text-center mb-10">
            <div className="bg-white/20 lg:bg-indigo-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <MapPin size={40} className="text-white lg:text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2 lg:text-gray-900">Civic Issue Reporter</h1>
            <p className="text-sm lg:text-black-600">
              Report, track, and resolve community issues effortlessly
            </p>
          </div>

          {/* Portal Buttons */}
<div className="mb-10">
  <h2 className="text-lg font-semibold mb-4 text-center lg:text-left">Login Your Portal</h2>

  <div className="grid grid-cols-1 lg:flex lg:justify-center lg:gap-6 gap-4">
    {/* Civilian */}
    <button
      onClick={() => handleLogin('civilian', 'John Citizen')}
      className="
        flex items-center justify-center px-6 py-3 rounded-lg font-semibold
        bg-gradient-to-r from-blue-500 to-indigo-500 text-white
        lg:bg-blue-600 lg:hover:bg-blue-700 lg:text-white lg:rounded-full lg:shadow-none
        hover:scale-[1.02] transition-all
      "
    >
      <User size={20} className="mr-2" />
      Civilian Portal
    </button>

    {/* Municipal Staff */}
    <button
      onClick={() => handleLogin('municipal', 'Sarah Manager')}
      className="
        flex items-center justify-center px-6 py-3 rounded-lg font-semibold
        bg-gradient-to-r from-green-500 to-emerald-500 text-white
        lg:bg-green-600 lg:hover:bg-green-700 lg:text-white lg:rounded-full lg:shadow-none
        hover:scale-[1.02] transition-all
      "
    >
      <Building size={20} className="mr-2" />
      Municipal Staff
    </button>

    {/* Department */}
    <button
      onClick={() => handleLogin('department', 'Mike Worker', 'Public Works')}
      className="
        flex items-center justify-center px-6 py-3 rounded-lg font-semibold
        bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white
        lg:bg-purple-600 lg:hover:bg-purple-700 lg:text-white lg:rounded-full lg:shadow-none
        hover:scale-[1.02] transition-all
      "
    >
      <Users size={20} className="mr-2" />
      Department Portal
    </button>
  </div>
</div>


          {/* Features Highlights (mobile → scroll, web → grid) */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-6 overflow-x-auto no-scrollbar flex space-x-4 lg:space-x-0 pb-6 lg:pb-10">
            <div className="flex-shrink-0 bg-white/10 lg:bg-white lg:text-gray-800 rounded-xl p-4 text-center shadow-md">
              <AlertTriangle size={28} className="mx-auto mb-2 text-red-400 lg:text-red-500" />
              <h3 className="font-semibold mb-1">Report Issues</h3>
              <p className="text-xs lg:text-sm lg:text-gray-600">
                Capture issues with photos, description, and GPS location
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/10 lg:bg-white lg:text-gray-800 rounded-xl p-4 text-center shadow-md">
              <MapPin size={28} className="mx-auto mb-2 text-blue-300 lg:text-blue-500" />
              <h3 className="font-semibold mb-1">Track Progress</h3>
              <p className="text-xs lg:text-sm lg:text-gray-600">
                See real-time status updates and notifications
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/10 lg:bg-white lg:text-gray-800 rounded-xl p-4 text-center shadow-md">
              <CheckCircle size={28} className="mx-auto mb-2 text-green-300 lg:text-green-500" />
              <h3 className="font-semibold mb-1">Get Results</h3>
              <p className="text-xs lg:text-sm lg:text-gray-600">
                Issues resolved quickly through collaboration
              </p>
            </div>
          </div>

        

          {/* Stats Section */}
          <div className="bg-white/10 lg:bg-white lg:text-gray-800 backdrop-blur-md rounded-xl px-6 py-6 mt-6 shadow-md">
            <h3 className="text-center text-sm font-medium mb-4 flex items-center justify-center gap-2">
              <BarChart3 size={16} /> Community Impact
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-xl font-bold text-blue-400 lg:text-blue-600">1,247</p>
                <p className="text-xs lg:text-sm lg:text-gray-600">Reported</p>
              </div>
              <div>
                <p className="text-xl font-bold text-green-400 lg:text-green-600">892</p>
                <p className="text-xs lg:text-sm lg:text-gray-600">Resolved</p>
              </div>
              <div>
                <p className="text-xl font-bold text-yellow-300 lg:text-yellow-600">248</p>
                <p className="text-xs lg:text-sm lg:text-gray-600">In Progress</p>
              </div>
              <div>
                <p className="text-xl font-bold text-purple-300 lg:text-purple-600">72%</p>
                <p className="text-xs lg:text-sm lg:text-gray-600">Resolution Rate</p>
              </div>
            </div>
          </div>

          {/* New Features Section */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-center mb-6">Why Choose Our Platform?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 lg:bg-white lg:text-gray-800 rounded-xl p-6 shadow-md text-center">
                <ShieldCheck className="mx-auto mb-3 text-green-400 lg:text-green-600" size={32} />
                <h4 className="font-semibold mb-2">Secure & Reliable</h4>
                <p className="text-sm lg:text-gray-600">Your data is safe with end-to-end security</p>
              </div>
              <div className="bg-white/10 lg:bg-white lg:text-gray-800 rounded-xl p-6 shadow-md text-center">
                <Clock className="mx-auto mb-3 text-blue-400 lg:text-blue-600" size={32} />
                <h4 className="font-semibold mb-2">Real-Time Updates</h4>
                <p className="text-sm lg:text-gray-600">Stay informed with instant notifications</p>
              </div>
              <div className="bg-white/10 lg:bg-white lg:text-gray-800 rounded-xl p-6 shadow-md text-center">
                <Globe className="mx-auto mb-3 text-purple-400 lg:text-purple-600" size={32} />
                <h4 className="font-semibold mb-2">Community Driven</h4>
                <p className="text-sm lg:text-gray-600">Empowering citizens to build better cities</p>
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
