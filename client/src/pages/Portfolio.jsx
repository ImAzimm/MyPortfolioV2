import PortfolioCard from '../components/PortfolioCard.jsx';
import useProjects from '../hooks/useProjects.js';

function Portfolio() {
  const { projects, loading, error } = useProjects();

  return (
    <div id="portfolio" className="bg-light-burgundy">
      <div className="max-w-[1440px] mx-auto px-[10%]">
        <div className="py-24">
          <h1 className="text-[2.5rem] font-bold text-white">
            <span>My </span>
            <span className="text-bright-pink">Portfolio</span>
          </h1>
          <p className="text-white">Feel free to explore my portfolio showcasing my experience in class projects and co-curricular activities, particularly focusing on design work.</p>

          {loading && (
            <div className="flex flex-wrap gap-6 mt-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-[21.6rem] h-96 bg-burgundy rounded-[1.25rem] animate-pulse" />
              ))}
            </div>
          )}

          {error && <p className="text-red-400 mt-4">Failed to load projects: {error}</p>}

          {!loading && !error && (
            <div className="flex flex-row flex-wrap gap-6 mt-6">
              {projects.map(project => (
                <PortfolioCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
