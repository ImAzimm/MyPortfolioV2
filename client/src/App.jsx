import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Tiptap from './testing/Tiptap.jsx';
import AdminProjectForm from './pages/forms/AdminProjectForm.jsx';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={token ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/projects/new"
          element={token ? <AdminProjectForm /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/projects/edit/:id"
          element={token ? <AdminProjectForm /> : <Navigate to="/admin/login" />}
        />

        <Route
          path="/testing/tiptapbasic"
          element={<Tiptap />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
