import { motion } from "framer-motion";
import { useState } from "react";

import { HiPause, HiPlay } from "react-icons/hi";
import H2OChainReaction from "../../components/H2OChainReaction";
import logo from "/Images/logo.png";

const Home = () => {
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => setIsPaused((p) => !p);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  // Animation variants for individual text elements
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Special animation for the main title
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Animation for the tagline
  const taglineVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Animation for the bottom text
  const bottomTextVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="h-dvh w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <H2OChainReaction
        maxParticles={60}
        brandColors={{
          // hydrogen: "#00D4FF",
          hydrogen: "#E3D3D3",
          oxygen: "#FF4444",
          bond: "#4A90E2",
          background: ["#0A1E2E", "#00000002"],
          water: "#00B4D8",
          accent: "#02A7E2",
        }}
        showStats={false}
        onMoleculeForm={(type) => {
          return;
        }}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

      {/* Main Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <motion.div
          className="flex flex-col gap-4 items-center justify-center bg-black/25 backdrop-blur-xl  border border-cyan-400/20 shadow-2xl rounded-2xl px-6 md:px-12 py-8 md:py-14 max-w-4xl pointer-events-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div
            className="w-fit"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={logo}
              alt="Fusion Water Tech Logo"
              className="h-14 md:h-20 w-auto"
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="text-sm sm:text-base md:text-lg text-cyan-100 font-medium max-w-2xl"
            variants={bottomTextVariants}
          >
            Pure Science • Clean Water • Sustainable Future
          </motion.div>

          {/* CTA */}
          <motion.a
            href="#services"
            className="font-bold text-lg md:text-xl px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 text-white shadow-lg backdrop-blur-md hover:brightness-110 transition-all duration-300"
            variants={titleVariants}
          >
            See More
          </motion.a>
        </motion.div>
      </div>

      {/* Control Button */}
      <motion.div
        className="absolute bottom-6 right-6 flex gap-4 pointer-events-auto z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <button
          onClick={togglePause}
          className="flex items-center gap-2 px-4 py-2 text-cyan-100 text-sm rounded-full transition-all duration-300 backdrop-blur-sm border border-cyan-500/30 outline-none hover:bg-cyan-500/20 hover:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/50"
        >
          {isPaused ? <HiPlay size={16} /> : <HiPause size={16} />}
          <span className="hidden sm:inline">
            {isPaused ? "Resume" : "Pause"}
          </span>
        </button>
      </motion.div>
    </section>
  );
};

export default Home;
