import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useProject(id) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { project, loading, error };
}
