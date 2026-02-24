import image from '../assets/my image.jpg';

function AboutMe() {
  return (
    <div id="about" className="bg-burgundy">
      <div className="max-w-[1440px] mx-auto px-[10%]">
        <div className="py-24 px-[3.125rem] flex flex-col md:flex-row items-center justify-between text-white gap-8">
          <div className="w-[26.625rem] aspect-square bg-grey rounded-[1.25rem] flex overflow-hidden shadow-[0_0_1.25rem_0.25rem_#3D1308]">
            <img src={image} alt="" className="object-cover w-full" />
          </div>
          <div className="w-full md:w-[32.4rem]">
            <h1 className="text-[2.5rem] font-bold">
              <span>About </span>
              <span className="text-bright-pink">Me</span>
            </h1>
            <p className="text-justify">Currently pursuing a degree in Computer Science majoring Software Engineering at Universiti Malaya, expected completion February 2026.</p>
            <p className="text-justify">Seeking for internship placement for 24 weeks from 14th July until 26th December to develop skills, particularly in web development.</p>
            <p className="text-justify">Specialized in software development and database management with proficiency in Java, JavaScript, HTML, CSS & SQL using framework such as Android Studio, React and Anaconda.</p>
            <p className="text-justify">Brings a track record of successfully collaborating on academic projects that stimulate real-world problem-solving.</p>
            <p className="text-justify">Eager to contribute to innovate projects, enhance team dynamics with strong communication skills, and achieve personal growth by tackling challenging assignments in the tech industry.</p>
            <a href="mailto:aabdulazim758@gmail.com" className="no-underline block w-fit">
              <button className="bg-bright-pink text-dark-burgundy border-none font-sans px-5 py-2 rounded mt-5 hover:shadow-[4px_4px_8px_0px_#3D1308] hover:bg-lavender cursor-pointer transition-all">
                Contact me
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
