import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
}
