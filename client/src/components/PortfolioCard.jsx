import { Link } from 'react-router-dom';

function PortfolioCard({ project }) {
  return (
    <Link to={`/portfolio/${project._id}`} className="group block no-underline">
      <div className="w-[21.6rem] rounded-[1.25rem] p-2.5 group-hover:bg-bright-pink group-hover:shadow-[0_0_1.25rem_0.25rem_#3D1308] transition-all cursor-pointer">
        <div className="bg-grey aspect-[4/5] rounded-[1.25rem] overflow-hidden">
          <img src={project.thumbnail[0]} alt={project.title} className="w-full h-auto object-cover" />
        </div>
        <h3 className="text-bright-pink group-hover:text-dark-burgundy text-xl font-semibold mt-2 mb-[-0.5rem] transition-colors">{project.title}</h3>
        <p className="text-white text-base h-16 overflow-hidden">{project.desc}</p>
        <div className="bg-bright-pink group-hover:bg-dark-burgundy w-fit rounded-lg px-5 py-2 transition-colors">
          <span className="text-white text-sm font-medium">{project.type}</span>
        </div>
      </div>
    </Link>
  );
}

export default PortfolioCard;
