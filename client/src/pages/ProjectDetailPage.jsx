import React from 'react';
import { useParams } from 'react-router-dom';
import useProject from '../hooks/useProject.js';
import ImageCollage from '../components/ImageCollage.jsx';

function ProjectDetailPage() {
  const { id } = useParams();
  const { project, loading, error } = useProject(id);

  if (loading) {
    return (
      <div className="bg-light-burgundy min-h-[50vh] flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-light-burgundy min-h-[50vh] flex items-center justify-center">
        <p className="text-red-400 text-xl">Project not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-light-burgundy">
        <div className="max-w-[1440px] mx-auto px-[10%]">
          <div className="py-24 flex flex-col md:flex-row items-center justify-between md:pr-[3.6rem] gap-8">
            <div className="w-full md:w-[31.6rem] p-2.5 text-white">
              <h1 className="text-[2.5rem] font-bold text-bright-pink" style={{ textShadow: '4px 4px 8px 0px #D9D9D9' }}>{project.title}</h1>
              <p>{project.desc}</p>
              <div className="grid mt-8 gap-4" style={{ gridTemplateColumns: '15rem 10rem' }}>
                {project.links.map((link, index) => (
                  <React.Fragment key={index}>
                    <span className="text-white">{link.label}</span>
                    <button
                      onClick={() => window.open(link.url, '_blank')}
                      className="bg-bright-pink text-dark-burgundy border-none font-sans px-5 py-2 rounded hover:shadow-[4px_4px_8px_0px_#3D1308] hover:bg-lavender cursor-pointer transition-all w-fit"
                    >
                      See more
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="w-[26.625rem] aspect-square bg-grey rounded-[1.25rem] flex overflow-hidden shadow-[0_0_1.25rem_0.25rem_#3D1308]">
              <img src={project.thumbnail[1]} alt={project.title} className="object-cover w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-burgundy">
        <div className="max-w-[1440px] mx-auto px-[10%] py-24">
          <h1 className="text-white text-[2.5rem] font-bold">
            <span>My </span>
            <span className="text-bright-pink">Artwork</span>
          </h1>
          <ImageCollage images={project.images} />
        </div>
      </div>
    </>
  );
}

export default ProjectDetailPage;
