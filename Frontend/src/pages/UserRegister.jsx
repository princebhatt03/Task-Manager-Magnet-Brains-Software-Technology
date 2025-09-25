import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name?.trim(),
        email: formData.email?.trim(),
        password: formData.password?.trim(),
      };

      console.log('Sending payload:', payload);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      toast.success(res.data?.message || 'Registration successful!');
      console.log('Registration Response:', res.data);

      // Redirect after success
      setTimeout(() => navigate('/user-login'), 2000);
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error);

      const errMsg =
        error.response?.data?.message || 'Something went wrong. Try again.';

      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
        {/* React Hot Toast Container */}
        <Toaster
          position="top-center"
          reverseOrder={false}
        />

        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-[1.02] duration-300">
          {/* Header */}
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Create Account
          </h2>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <User
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50">
              {loading ? (
                <Loader2
                  className="animate-spin mr-2"
                  size={20}
                />
              ) : (
                'Register'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/user-login')}
              className="text-indigo-600 hover:underline cursor-pointer">
              Login
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserRegister;
