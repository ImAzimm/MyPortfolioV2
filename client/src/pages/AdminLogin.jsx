import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-dark-burgundy min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="bg-burgundy rounded-xl p-10 w-full max-w-md">
        <h1 className="text-white text-2xl font-bold text-center mb-6">
          <span>Admin </span>
          <span className="text-bright-pink">Login</span>
        </h1>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="px-4 py-2 rounded bg-dark-burgundy text-white placeholder-grey border border-burgundy focus:outline-none focus:border-bright-pink"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded bg-dark-burgundy text-white placeholder-grey border border-burgundy focus:outline-none focus:border-bright-pink"
          />
          <button type="submit" className="bg-bright-pink text-dark-burgundy border-none font-sans px-5 py-2 rounded hover:shadow-[4px_4px_8px_0px_#3D1308] hover:bg-lavender cursor-pointer transition-all">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
