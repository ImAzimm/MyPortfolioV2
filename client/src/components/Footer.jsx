function Footer() {
  return (
    <footer className="bg-dark-burgundy">
      <div className="max-w-[1440px] mx-auto px-[10%] py-6 flex flex-col items-center gap-4">
        <div className="flex gap-16 flex-wrap justify-center">
          <a href="https://www.linkedin.com/in/abdul-azim-bin-abdul-salam-30b696210/?originalSubdomain=my" title="Abdul Azim LinkedIn" target="_blank" rel="noreferrer" className="text-white hover:text-bright-pink transition-colors">
            LinkedIn
          </a>
          <a href="mailto:aabdulazim758@gmail.com" className="text-white hover:text-bright-pink transition-colors">
            Email
          </a>
          <a href="http://wa.me/60178721853" target="_blank" rel="noreferrer" className="text-white hover:text-bright-pink transition-colors">
            WhatsApp
          </a>
        </div>
        <p className="text-white font-normal text-sm m-0">
          <span>©About</span>
          <span className="text-bright-pink">Me</span>
          <span> - Made from Abdul Azim Bin Abdul Salam</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
