import Header from "../../shared/components/landingPageComponents/Header";
import Home5 from "../../assets/Home5.png";
import Home6 from "../../assets/Home6.png";
import Footer from "../../shared/components/landingPageComponents/Footer";
import LandingPageFirstSection from "./LandingPageFirstSection";
import FeaturesSection from "./FeatureCard";
import CoreFeaturesSection from "./CoreFeaturesSection";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="bg-white">
        <div className="flex flex-col bg-white lg:flex-row">
          <LandingPageFirstSection />
        </div>
        <div className="bg-white mt-1">
          <FeaturesSection />
        </div>
        <div>
          <CoreFeaturesSection />
        </div>

        <div>
          <img src={Home5} alt="Home Image 5" />
          <img src={Home6} alt="Home Image 6" />
        </div>

        <div className="bg-[#4361EE] h-72 text-center flex flex-col justify-center items-center">
          <h2 className="font-bold text-white text-3xl mt-5 tracking-wider">
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
      </div>
      <Footer />
    </div>
  );
};

export default Home;
