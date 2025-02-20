import Home2 from "../../assets/Home2.png";

const LandingPageFirstSection = () => {
  return (
    <div className="w-full mt-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="relative max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] text-black leading-tight sm:leading-[1.1] font-bold tracking-tight">
                We're here to
                <br />
                Enhance your
                <br />
                Work & Company
              </h1>
              
              {/* Custom curved underline - scales with viewport */}
              <svg
                className="absolute -bottom-4 left-0 w-full max-w-[520px]"
                height="20"
                viewBox="0 0 520 20"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 15.5C103.5 6.5 280 2 519 15.5"
                  stroke="#4361EE"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            <p className="mt-8 sm:mt-10 lg:mt-20 text-base sm:text-lg lg:text-[18px] text-black leading-relaxed max-w-[460px]">
              Let's make your work more organize and easily using the
              FarLink Dashboard with many of the latest features in
              managing work every day.
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <img
              className="w-full h-auto max-h-[480px] object-contain"
              src={Home2}
              alt="Home Image 2"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageFirstSection;