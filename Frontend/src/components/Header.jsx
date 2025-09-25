import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('taskUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser).user || JSON.parse(storedUser));
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    try {
      localStorage.removeItem('taskUser');
      setUser(null);
      toast.success('Logged out successfully!');
      navigate('/user-login');
    } catch (error) {
      console.error('Logout Error:', error);
      toast.error('Something went wrong during logout.');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600">
            TaskManager
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden cursor-pointer md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User
                    className="text-gray-700"
                    size={18}
                  />
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                  <LogOut
                    size={16}
                    className="mr-1"
                  />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/user-login"
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User
                    className="text-gray-700"
                    size={18}
                  />
                  <span className="block text-gray-700 font-medium">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                  <LogOut
                    size={16}
                    className="mr-1"
                  />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/user-login"
                className="block bg-indigo-500 text-white text-center px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
