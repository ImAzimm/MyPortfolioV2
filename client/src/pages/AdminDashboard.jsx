import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import AdminProjectForm from './AdminProjectForm.jsx';

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProject, setEditProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('/api/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await axios.delete(`/api/admin/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditProject(null);
    fetchProjects();
  };

  if (showForm || editProject) {
    return (
      <AdminProjectForm
        project={editProject}
        token={token}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditProject(null); }}
      />
    );
  }

  return (
    <div className="bg-dark-burgundy min-h-[calc(100vh-8rem)]">
      <div className="max-w-[1440px] mx-auto px-[10%] py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-white text-2xl font-bold">
            <span>Admin </span>
            <span className="text-bright-pink">Dashboard</span>
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="bg-bright-pink text-dark-burgundy border-none font-sans px-5 py-2 rounded hover:shadow-[4px_4px_8px_0px_#3D1308] hover:bg-lavender cursor-pointer transition-all"
            >
              + Add Project
            </button>
            <button
              onClick={logout}
              className="bg-burgundy text-white border border-bright-pink font-sans px-5 py-2 rounded hover:bg-light-burgundy cursor-pointer transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {projects.map(project => (
              <div key={project._id} className="bg-burgundy rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={project.thumbnail[0]} alt={project.title} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="text-white font-semibold">{project.title}</h3>
                    <span className="text-bright-pink text-sm">{project.type}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditProject(project)}
                    className="bg-bright-pink text-dark-burgundy border-none font-sans px-4 py-1.5 rounded hover:bg-lavender cursor-pointer transition-all text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-600 text-white border-none font-sans px-4 py-1.5 rounded hover:bg-red-700 cursor-pointer transition-all text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
