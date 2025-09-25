import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const AddTaskButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/task')}
      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
      <Plus size={18} />
      Add Task
    </button>
  );
};

export default AddTaskButton;
