import { useState } from 'react';
import axios from 'axios';

function AdminProjectForm({ project, token, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: project?.title || '',
    desc: project?.desc || '',
    type: project?.type || 'Course Project',
    links: project?.links || [{ label: '', url: '' }],
  });
  const [thumbnailFiles, setThumbnailFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Show existing image URLs if editing
  const existingThumbnails = project?.thumbnail || [];
  const existingImages = project?.images || [];

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLinkChange = (index, field, value) => {
    const updated = [...form.links];
    updated[index] = { ...updated[index], [field]: value };
    setForm(prev => ({ ...prev, links: updated }));
  };

  const addLink = () => setForm(prev => ({ ...prev, links: [...prev.links, { label: '', url: '' }] }));
  const removeLink = (index) => setForm(prev => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('desc', form.desc);
    formData.append('type', form.type);
    formData.append('links', JSON.stringify(form.links));

    thumbnailFiles.forEach(f => formData.append('thumbnail', f));
    imageFiles.forEach(f => formData.append('images', f));

    try {
      if (project) {
        await axios.put(`/api/admin/projects/${project._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/admin/projects', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-dark-burgundy min-h-[calc(100vh-8rem)]">
      <div className="max-w-[1440px] mx-auto px-[10%] py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-bold">
            <span>{project ? 'Edit' : 'Add'} </span>
            <span className="text-bright-pink">Project</span>
          </h1>
          <button onClick={onCancel} className="text-white hover:text-bright-pink transition-colors">← Back</button>
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl">
          <div>
            <label className="text-white text-sm block mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full px-4 py-2 rounded bg-burgundy text-white placeholder-grey border border-burgundy focus:outline-none focus:border-bright-pink" />
          </div>

          <div>
            <label className="text-white text-sm block mb-1">Description</label>
            <textarea name="desc" value={form.desc} onChange={handleChange} required rows={3}
              className="w-full px-4 py-2 rounded bg-burgundy text-white placeholder-grey border border-burgundy focus:outline-none focus:border-bright-pink resize-none" />
          </div>

          <div>
            <label className="text-white text-sm block mb-1">Type</label>
            <select name="type" value={form.type} onChange={handleChange} required
              className="w-full px-4 py-2 rounded bg-burgundy text-white border border-burgundy focus:outline-none focus:border-bright-pink">
              <option value="Course Project">Course Project</option>
              <option value="Hobby">Hobby</option>
              <option value="PEKOM Events">PEKOM Events</option>
            </select>
          </div>

          <div>
            <label className="text-white text-sm block mb-1">
              Thumbnails (2 images){project ? ' — leave empty to keep existing' : ''}
            </label>
            {project && existingThumbnails.length > 0 && (
              <div className="flex gap-2 mb-2">
                {existingThumbnails.map((url, i) => (
                  <img key={i} src={url} alt="" className="w-16 h-16 object-cover rounded border border-burgundy" />
                ))}
              </div>
            )}
            <input type="file" name="thumbnail" accept="image/*" multiple
              onChange={e => setThumbnailFiles([...e.target.files])}
              className="text-white text-sm" />
          </div>

          <div>
            <label className="text-white text-sm block mb-1">
              Project Images{project ? ' — leave empty to keep existing' : ''}
            </label>
            {project && existingImages.length > 0 && (
              <div className="flex gap-2 mb-2 flex-wrap">
                {existingImages.map((url, i) => (
                  <img key={i} src={url} alt="" className="w-16 h-16 object-cover rounded border border-burgundy" />
                ))}
              </div>
            )}
            <input type="file" name="images" accept="image/*" multiple
              onChange={e => setImageFiles([...e.target.files])}
              className="text-white text-sm" />
          </div>

          <div>
            <label className="text-white text-sm block mb-1">Links</label>
            {form.links.map((link, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input placeholder="Label" value={link.label} onChange={e => handleLinkChange(index, 'label', e.target.value)} required
                  className="flex-1 px-3 py-1.5 rounded bg-burgundy text-white placeholder-grey border border-burgundy focus:outline-none focus:border-bright-pink text-sm" />
                <input placeholder="URL" value={link.url} onChange={e => handleLinkChange(index, 'url', e.target.value)} required
                  className="flex-1 px-3 py-1.5 rounded bg-burgundy text-white placeholder-grey border border-burgundy focus:outline-none focus:border-bright-pink text-sm" />
                <button type="button" onClick={() => removeLink(index)} className="text-red-400 hover:text-red-300 transition-colors text-sm">✕</button>
              </div>
            ))}
            <button type="button" onClick={addLink} className="text-bright-pink hover:text-lavender text-sm transition-colors">+ Add Link</button>
          </div>

          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={submitting}
              className="bg-bright-pink text-dark-burgundy border-none font-sans px-5 py-2 rounded hover:shadow-[4px_4px_8px_0px_#3D1308] hover:bg-lavender cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
            </button>
            <button type="button" onClick={onCancel}
              className="bg-burgundy text-white border border-bright-pink font-sans px-5 py-2 rounded hover:bg-light-burgundy cursor-pointer transition-all">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProjectForm;
