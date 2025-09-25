import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit2, CheckCircle, Home } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddTaskButton from '../components/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('taskUser'));
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmToggle, setConfirmToggle] = useState(null);

  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    dueDate: '',
  });

  if (!user) {
    navigate('/user-login');
  }

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(res.data.data);
    } catch (err) {
      console.error('Fetch Tasks Error:', err.response?.data || err);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete task
  const handleDelete = async id => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success('Task deleted successfully');
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      console.error('Delete Task Error:', err.response?.data || err);
      toast.error('Failed to delete task');
    } finally {
      setConfirmDelete(null);
    }
  };

  // Toggle completed
  const handleMarkDone = async id => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success(
        `Task marked as ${
          res.data.task.status === 'completed' ? 'completed' : 'pending'
        }`
      );
      setTasks(prev =>
        prev.map(task => (task._id === id ? res.data.task : task))
      );
    } catch (err) {
      console.error('Toggle Task Error:', err.response?.data || err);
      toast.error('Failed to update task status');
    } finally {
      setConfirmToggle(null);
    }
  };

  // Edit task
  const handleEdit = id => {
    navigate(`/edit-task/${id}`);
  };

  // Priority color mapping
  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return '';
    }
  };

  // Handle filter change
  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filtered tasks
  const filteredTasks = tasks.filter(task => {
    return (
      (filters.priority ? task.priority === filters.priority : true) &&
      (filters.status ? task.status === filters.status : true) &&
      (filters.dueDate
        ? new Date(task.dueDate).toLocaleDateString() ===
          new Date(filters.dueDate).toLocaleDateString()
        : true)
    );
  });

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Task Dashboard
          </h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-4 justify-center items-center">
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500">
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500">
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>

            <input
              type="date"
              name="dueDate"
              value={filters.dueDate}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={() =>
                setFilters({ priority: '', status: '', dueDate: '' })
              }
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl transition">
              Reset Filters
            </button>
          </div>

          {loading ? (
            <div className="text-center text-gray-500">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center text-gray-500">No tasks found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-indigo-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Due Date</th>
                    <th className="py-3 px-4 text-left">Priority</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task, index) => (
                    <tr
                      key={task._id}
                      className={`border-t border-gray-200 ${
                        task.status === 'completed'
                          ? 'bg-green-50 line-through text-gray-400'
                          : ''
                      }`}>
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{task.title}</td>
                      <td className="py-3 px-4">{task.description}</td>
                      <td className="py-3 px-4">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : '-'}
                      </td>
                      <td
                        className={`py-3 px-4 font-semibold rounded-full w-max text-center ${getPriorityColor(
                          task.priority
                        )}`}>
                        {task.priority}
                      </td>
                      <td className="py-3 px-4">
                        {task.status === 'completed' ? (
                          <span className="text-green-600 font-semibold">
                            Completed
                          </span>
                        ) : (
                          <span className="text-yellow-600 font-semibold">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 flex justify-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(task._id)}
                          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                          <Edit2 size={16} />
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setConfirmDelete(task._id)}
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">
                          <Trash2 size={16} />
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setConfirmToggle(task._id)}
                          className={`p-2 rounded-lg ${
                            task.status === 'completed'
                              ? 'bg-gray-400 text-white hover:bg-gray-500'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}>
                          <CheckCircle size={16} />
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Task & Go Home Buttons */}
        <div className="flex justify-center mt-2 mb-4">
          <AddTaskButton />
        </div>
        <div className="flex justify-center mt-4 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            disabled={loading}
            onClick={() => navigate('/')}
            className="flex items-center justify-center bg-green-600 text-white py-2 px-6 rounded-xl hover:bg-green-700 transition disabled:opacity-50">
            <Home
              className="mr-2"
              size={18}
            />
            Go Home
          </motion.button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 text-center shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this task?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Status Confirmation Modal */}
      {confirmToggle && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 text-center shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Status Change</h3>
            <p className="mb-6">
              Are you sure you want to mark this task as{' '}
              {tasks.find(task => task._id === confirmToggle)?.status ===
              'completed'
                ? 'pending'
                : 'completed'}
              ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmToggle(null)}
                className="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={() => handleMarkDone(confirmToggle)}
                className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Dashboard;
