import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES = ['pending', 'completed'];

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('taskUser'));

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  if (!user) {
    navigate('/user-login');
  }

  const fetchTask = async () => {
    try {
      setFetching(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const task = res.data.task;
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        priority: task.priority || 'medium',
        status: task.status || 'pending',
      });
    } catch (err) {
      console.error('Fetch Task Error:', err.response?.data || err);
      toast.error('Failed to fetch task data');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: formData.dueDate || undefined,
        priority: formData.priority,
        status: formData.status,
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      toast.success('Task updated successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error('Update Task Error:', err.response?.data || err);
      toast.error(
        err.response?.data?.error?.message || 'Failed to update task'
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Loading task...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Edit Task
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                required
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                rows={4}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition">
                {PRIORITIES.map(p => (
                  <option
                    key={p}
                    value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition">
                {STATUSES.map(s => (
                  <option
                    key={s}
                    value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50">
              {loading ? (
                <Loader2
                  className="animate-spin mr-2"
                  size={20}
                />
              ) : (
                'Update Task'
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              disabled={loading}
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center justify-center bg-indigo-800 text-white py-2 px-4 rounded-xl hover:bg-indigo-900 transition disabled:opacity-50">
              Cancel
            </motion.button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default EditTask;
