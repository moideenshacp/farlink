import { motion } from "framer-motion";
import Header from "../../shared/components/landingPageComponents/Header";
import Home5 from "../../assets/Home5.png";
import Home6 from "../../assets/Home6.png";
import Footer from "../../shared/components/landingPageComponents/Footer";
import LandingPageFirstSection from "./LandingPageFirstSection";
import FeaturesSection from "./FeatureCard";
import CoreFeaturesSection from "./CoreFeaturesSection";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const Home = () => {
  return (
    <div>
      <Header />

      <div className="bg-white">
        {/* First Section */}
        <motion.div
          className="flex flex-col bg-white lg:flex-row"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Triggers when 30% of the element is in view
        >
          <LandingPageFirstSection />
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="bg-white mt-1"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FeaturesSection />
        </motion.div>

        {/* Core Features Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CoreFeaturesSection />
        </motion.div>

        {/* Images */}
        <motion.div
          className="flex flex-col items-center space-y-4"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img src={Home5} alt="Home Image 5" />
          <img src={Home6} alt="Home Image 6" />
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div
          className="bg-[#4361EE] h-72 text-center flex flex-col justify-center items-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
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
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
