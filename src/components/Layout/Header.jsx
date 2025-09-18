import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building, Users, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useApp();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const getRoleIcon = () => {
    switch (currentUser?.role) {
      case 'civilian':
        return <User className="text-blue-600" />;
      case 'municipal':
        return <Building className="text-green-600" />;
      case 'department':
        return <Users className="text-purple-600" />;
      default:
        return null;
    }
  };

  const getRoleLabel = () => {
    switch (currentUser?.role) {
      case 'civilian':
        return 'Civilian Portal';
      case 'municipal':
        return 'Municipal Staff Portal';
      case 'department':
        return 'Department Portal';
      default:
        return '';
    }
  };

  if (!currentUser) return null;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            {getRoleIcon()}
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{getRoleLabel()}</h1>
              <p className="text-sm text-gray-500">Welcome, {currentUser.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;