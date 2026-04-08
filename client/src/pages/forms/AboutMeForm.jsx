import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useFieldArray, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import useProject from '../../hooks/useProject';
import { AuthContext } from '../../context/AuthContext';

function AboutMeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { token } = useContext(AuthContext);

  const { project, loading, error } = useProject(id);

  // Changes: Kita akan guna useFieldArray instead of managing form state manually
  const {register, handleSubmit, control, reset, formState: {errors}} = useForm({
    defaultValues: {
      title: project?.title || "",
      desc: project?.desc || "",
      type: project?.type || "Course Project",
      links: project?.links || [{ label: "", url: "" }]
    }
  });

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink
  } = useFieldArray({
    control,
    name: "links"
  });
  
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        desc: project.desc,
        type: project.type,
        links: project.links
      });
    }
  }, [project, reset]);
  
  if (loading && isEdit) {
    return (
      <div className="bg-light-burgundy min-h-[50vh] flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (error && isEdit) {
    return (
      <div className="bg-light-burgundy min-h-[50vh] flex items-center justify-center">
        <p className="text-red-400 text-xl">Project not found</p>
      </div>
    );
  }

  // Show existing image URLs if editing
  const existingThumbnails = project?.thumbnail || [];
  const existingImages = project?.images || [];

  const onSubmit = async (data) => {
    setSubmitting(true);
    setFormError('');

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('desc', data.desc);
    formData.append('type', data.type);
    formData.append('links', JSON.stringify(data.links));

    if(data.thumbnail && data.thumbnail.length > 0) {
      formData.append('thumbnail', data.thumbnail[0]);
    }

    if(data.images && data.images.length > 0) {
      Array.from(data.images).forEach(f => formData.append('images', f));
    }

    // TODO: Delete soon. This one only for testing if formData is constructed correctly
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // This is where the API call would go to store the project data
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
      navigate(-1);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save project');
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
          <button onClick={() => navigate(-1)} className="text-white hover:text-bright-pink transition-colors">← Back</button>
        </div>

        {formError && <p className="text-red-400 mb-4">{formError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-2xl">
          <div>
            <label className="text-white text-sm block mb-1">Title</label>
            <input 
              {...register('title', {required: "Title is required"})}
              className="w-full px-4 py-2 rounded bg-burgundy text-white placeholder-grey border border-burgundy focus:outline-none focus:border-bright-pink" />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="text-white text-sm block mb-1">Description</label>
            <textarea 
              rows={3}
              {...register('desc', {required: "Description is required"})}
              className="w-full px-4 py-2 rounded bg-burgundy text-white placeholder-grey border border-burgundy focus:outline-none focus:border-bright-pink resize-none" />
            {errors.desc && (
              <p className="text-red-400 text-sm">{errors.desc.message}</p>
            )}
          </div>

          <div>
            <label className="text-white text-sm block mb-1">Type</label>
            <select 
              {...register('type', {required: "Type is required"})}
              className="w-full px-4 py-2 rounded bg-burgundy text-white border border-burgundy focus:outline-none focus:border-bright-pink">
              <option value="Course Project">Course Project</option>
              <option value="Hobby">Hobby</option>
              <option value="PEKOM Events">PEKOM Events</option>
            </select>
            {errors.type && (
              <p className="text-red-400 text-sm">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="text-white text-sm block mb-1">
              Thumbnails (1 image){project ? ' — leave empty to keep existing' : ''}
            </label>
            {project && existingThumbnails.length > 0 && (
              <div className="flex gap-2 mb-2">
                {existingThumbnails.map((url, i) => (
                  <img key={i} src={url} alt="" className="w-16 h-16 object-cover rounded border border-burgundy" />
                ))}
              </div>
            )}
            <input type="file" accept="image/*" 
              {...register('thumbnail', {required: existingThumbnails.length === 0 ? "Thumbnail is required" : false})}
              className="text-white text-sm" />
            {errors.thumbnail?.message && (
              <p className="text-red-400 text-sm">{errors.thumbnail?.message}</p>
            )}
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
            <input type="file" accept="image/*" multiple
              {...register('images', {required: existingImages.length === 0 ? "At least one image is required" : false})}
              className="text-white text-sm" />
            {errors.images?.message && (
              <p className="text-red-400 text-sm">{errors.images?.message}</p>
            )}
          </div>

          <div>
            <label className="text-white text-sm block mb-1">Links</label>
            {linkFields.map((link, index) => (
              <div key={link.id} className="flex gap-2 mb-2">
                <div className='flex-1'>
                  <input placeholder="Label" 
                    {...register(`links.${index}.label`, {required: "Label is required"})}
                    className="flex-1 w-full px-3 py-1.5 rounded bg-burgundy text-white placeholder-grey border border-burgundy focus:outline-none focus:border-bright-pink text-sm" />
                    {errors.links?.[index]?.label?.message && (
                      <p className="text-red-400 text-sm">{errors.links?.[index]?.label?.message}</p>
                    )}
                </div>
                <div className='flex-1'>
                  <input placeholder="URL" 
                    {...register(`links.${index}.url`, {required: "URL is required"})}
                    className="flex-1 w-full px-3 py-1.5 rounded bg-burgundy text-white placeholder-grey border border-burgundy focus:outline-none focus:border-bright-pink text-sm" />
                    {errors.links?.[index]?.url?.message && (
                      <p className="text-red-400 text-sm">{errors.links?.[index]?.url?.message}</p>
                    )}
                </div>
                <button type="button" onClick={() => removeLink(index)} className="text-red-400 hover:text-red-300 transition-colors text-sm">✕</button>
              </div>
            ))}
            <button type="button" onClick={() => appendLink({label: "", url: ""})} className="text-bright-pink hover:text-lavender text-sm transition-colors">+ Add Link</button>
          </div>

          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={submitting}
              className="bg-bright-pink text-dark-burgundy border-none font-sans px-5 py-2 rounded hover:shadow-[4px_4px_8px_0px_#3D1308] hover:bg-lavender cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
            </button>
            <button type="button" onClick={() => navigate(-1)}
              className="bg-burgundy text-white border border-bright-pink font-sans px-5 py-2 rounded hover:bg-light-burgundy cursor-pointer transition-all">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AboutMeForm;
