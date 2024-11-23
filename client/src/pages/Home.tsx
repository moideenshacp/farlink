import Header from "../components/Header";
import Home1 from "../assets/Home1.png";
import Home2 from "../assets/Home2.png";
import Home3 from "../assets/Home3.png";
import Home4 from "../assets/Home4.png";
import Home5 from "../assets/Home5.png";
import Home6 from "../assets/Home6.png";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />

      <div className="flex flex-col lg:flex-row">
        <img
          className="w-full sm:w-[200px] lg:w-[550px] ml-16 mt-28 mb-8 lg:mb-0"
          src={Home1}
          alt="Home Image 1"
        />

        <img
          className="max-h-[480px] ml-72 mt-20 lg:ml-72 lg:mt-20 hidden lg:block"
          src={Home2}
          alt="Home Image 2"
        />
      </div>

      <div>
        <img src={Home3} alt="Home Image 3" />
        <img src={Home4} alt="Home Image 4" />
        <img src={Home5} alt="Home Image 5" />
        <img src={Home6} alt="Home Image 6" />
      </div>

      <div className="bg-[#4361EE] h-72 text-center flex flex-col justify-center items-center">
        <h2 className="font-bold text-white text-3xl mt-4 tracking-wider">
          Start set-up your team now!
        </h2>
        <h2 className="font-medium text-white text-xs mt-4 tracking-widest">
          Unlimited Users. Cancel Anytime. Free Forever.
        </h2>
        <br />
        <button className="bg-white font-medium text-black px-20 py-3 rounded-full text-base">
          Get-Started
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
