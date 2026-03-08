import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import AdminProjectForm from './AdminProjectForm.jsx';
import AboutMe from './AboutMe.jsx';

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProject, setEditProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/admin/profile', {
        headers: {Authorization: `Bearer ${token}`}
      });
      setProfile(data);

    } catch (err) {
      
    }
  }

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
    fetchUser();
    fetchProjects();
  }, []);

  // TODO: Will be deleted. Just to visualise user data for now
  console.log("user profile: ", profile);

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

  const handleUpdateProfile = async (id) => {
    if (!confirm('Update profile?')) return;
    try {
      await axios.put(`/api/admin/profile`, {aboutme: "test ubah sikit"}, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
          <h1 className="text-white text-4xl font-bold">
            <span>Admin </span>
            <span className="text-bright-pink">Dashboard</span>
          </h1>
          <div className="flex gap-3">
            <button
              onClick={logout}
              className="bg-burgundy text-white border border-bright-pink font-sans px-5 py-2 rounded hover:bg-light-burgundy cursor-pointer transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <AboutMe />
        <div className="flex items-center justify-between mb-8 flex-col gap-4">
          <div className='flex items-center flex-wrap justify-between w-full'>
            <h2 className="text-white text-2xl font-bold">
              <span>My </span>
              <span className="text-bright-pink">Profile</span>
            </h2>
          </div>
          <main className="flex bg-burgundy flex-col w-full px-5 py-3 gap-5">
            <header className='flex items-center flex-wrap justify-between w-full'>
              <h2 className="text-white text-2xl font-bold">
                <span>About </span>
                <span className="text-bright-pink">Me</span>
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => handleUpdateProfile()}
                  className="bg-bright-pink text-dark-burgundy border-none font-sans px-5 py-2 rounded hover:shadow-[4px_4px_8px_0px_#3D1308] hover:bg-lavender cursor-pointer transition-all"
                >
                  + Edit
                </button>
              </div>
            </header>
            
            <article className="w-full px-5 flex flex-col md:flex-row items-center justify-between text-white gap-8">
              <div className="w-full md:w-[30%] aspect-square aspect-square bg-grey rounded-3xl flex overflow-hidden shadow-[0_0_1.25rem_0.25rem_#3D1308]">
                {/* <img src={image} alt="" className="object-cover w-full" /> */}
              </div>
              <div className="flex-1 w-full md:w-[32.4rem]">
                <p className="text-justify">{profile.aboutme}</p>
              </div>
            </article>

            <section className='flex flex-col gap-1'>
              {/* This will be where url link be */}
              <article className='flex gap-2'>
                <div className="flex w-1/3 px-3 py-1.5 rounded bg-non-black text-white border border-bright-pink text-sm min-h-[36px] break-words">
                  <p>email</p>
                </div>
                <div className="flex w-2/3 px-3 py-1.5 rounded bg-non-black text-white border border-bright-pink text-sm min-h-[36px] break-words">
                  www.linkedinurl.com
                </div>
              </article>
              <article className='flex gap-2'>
                <div className="flex w-1/3 px-3 py-1.5 rounded bg-non-black text-white border border-bright-pink text-sm min-h-[36px] break-words">
                  <p>linkedin</p>
                </div>
                <div className="flex w-2/3 px-3 py-1.5 rounded bg-non-black text-white border border-bright-pink text-sm min-h-[36px] break-words">
                  www.linkedinurl.com
                </div>
              </article>
              <article className='flex gap-2'>
                <div className="flex w-1/3 px-3 py-1.5 rounded bg-non-black text-white border border-bright-pink text-sm min-h-[36px] break-words">
                  <p>WhatsApp</p>
                </div>
                <div className="flex w-2/3 px-3 py-1.5 rounded bg-non-black text-white border border-bright-pink text-sm min-h-[36px] break-words">
                  www.linkedinurl.com
                </div>
              </article>
            </section>

            <header className='flex items-center flex-wrap justify-between w-full'>
              <h2 className="text-white text-2xl font-bold">
                Education
              </h2>
            </header>
            <section className='flex flex-wrap gap-1'>
              <article className="w-full md:w-1/2 p-5 rounded-xl bg-non-black text-white border border-bright-pink shadow-md">
                
                <h3 className="text-lg font-semibold text-bright-pink">
                  University of Malaya
                </h3>

                <p className="text-sm text-gray-300">
                  Faculty of Computer Science and Information Technology • Kuala Lumpur
                </p>

                <p className="mt-2 font-medium">
                  Bachelor of Computer Science (Software Engineering)
                </p>

                <div className="flex flex-wrap gap-x-4 text-sm text-gray-400 mt-1">
                  <span>Oct 2022 – Feb 2026</span>
                  <span>CGPA: 3.54</span>
                </div>

                <ul className="mt-3 text-sm text-gray-300 list-disc list-inside space-y-1">
                  <li>
                    Consistently maintained strong academic performance while participating in hackathons and technical projects.
                  </li>
                  <li>
                    Completed advanced coursework in Software Architecture & Design, Software Testing & QA, Mobile Web Development, and Software Project Management.
                  </li>
                </ul>

              </article>
              <article className="w-full md:w-1/2 p-5 rounded-xl bg-non-black text-white border border-bright-pink shadow-md">
                
                <h3 className="text-lg font-semibold text-bright-pink">
                  University of Malaya
                </h3>

                <p className="text-sm text-gray-300">
                  Faculty of Computer Science and Information Technology • Kuala Lumpur
                </p>

                <p className="mt-2 font-medium">
                  Bachelor of Computer Science (Software Engineering)
                </p>

                <div className="flex flex-wrap gap-x-4 text-sm text-gray-400 mt-1">
                  <span>Oct 2022 – Feb 2026</span>
                  <span>CGPA: 3.54</span>
                </div>

                <ul className="mt-3 text-sm text-gray-300 list-disc list-inside space-y-1">
                  <li>
                    Consistently maintained strong academic performance while participating in hackathons and technical projects.
                  </li>
                  <li>
                    Completed advanced coursework in Software Architecture & Design, Software Testing & QA, Mobile Web Development, and Software Project Management.
                  </li>
                </ul>

              </article>
            </section>
          </main>
        </div>

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-white text-2xl font-bold">
            <span>My </span>
            <span className="text-bright-pink">Projects</span>
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="bg-bright-pink text-dark-burgundy border-none font-sans px-5 py-2 rounded hover:shadow-[4px_4px_8px_0px_#3D1308] hover:bg-lavender cursor-pointer transition-all"
            >
              + Add Project
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
