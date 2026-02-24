import image from '../assets/my image 2.jpg';

function Home() {
  return (
    <div className="bg-light-burgundy">
      <div className="max-w-[1440px] mx-auto px-[10%]">
        <div className="py-24 flex flex-col md:flex-row items-center justify-between md:pr-[3.6rem] gap-8">
          <div className="w-full md:w-[31.6rem] p-2.5 text-white">
            <h4 className="text-bright-pink font-normal text-xl">Hello, Welcome</h4>
            <h1 className="text-[2.5rem] font-bold">My name is Abdul Azim</h1>
            <p>Feel free to browse through my portfolio at your leisure. If you have any questions or need further information, please don't hesitate to reach out to me.</p>
            <a href="mailto:aabdulazim758@gmail.com" className="no-underline block w-fit">
              <button className="bg-bright-pink text-dark-burgundy border-none font-sans px-5 py-2 rounded hover:shadow-[4px_4px_8px_0px_#3D1308] hover:bg-lavender cursor-pointer transition-all mt-4">
                Contact me
              </button>
            </a>
          </div>
          <div className="w-[26.625rem] aspect-square bg-grey rounded-[1.25rem] flex overflow-hidden shadow-[0_0_1.25rem_0.25rem_#3D1308]">
            <img src={image} alt="" className="object-cover w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
