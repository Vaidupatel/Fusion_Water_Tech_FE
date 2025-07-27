import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaAward,
  FaCogs,
  FaHeadset,
  FaHandshake,
  FaTools,
} from "react-icons/fa";

const usps = [
  {
    icon: FaAward,
    text: "10+ Years' Experience",
    description: "Trusted expertise in water purification",
  },
  {
    icon: FaCogs,
    text: "Top-Grade RO Systems",
    description: "Premium quality equipment and components",
  },
  {
    icon: FaHeadset,
    text: "Prompt Customer Service",
    description: "24/7 support for all your needs",
  },
  {
    icon: FaHandshake,
    text: "Rental Plans Available",
    description: "Flexible payment options for everyone",
  },
  {
    icon: FaTools,
    text: "Annual Maintenance Coverage",
    description: "Comprehensive service packages",
  },
  {
    icon: FaCheckCircle,
    text: "Quality Assurance",
    description: "100% satisfaction guaranteed",
  },
];

const WhyChooseUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="why-choose-us"
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-cyan-100 py-16 lg:py-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
            Why Choose Us
          </h2>
          <p className="text-cyan-200/80 text-lg max-w-2xl mx-auto">
            Experience the difference with our premium water solutions and
            exceptional service
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {usps.map((usp, i) => {
            const IconComponent = usp.icon;
            return (
              <motion.div
                key={i}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 lg:p-8 hover:border-cyan-400/40 transition-all duration-300"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-xl text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-cyan-100 mb-2 group-hover:text-white transition-colors duration-300">
                      {usp.text}
                    </h3>
                    <p className="text-cyan-200/70 text-sm group-hover:text-cyan-200/90 transition-colors duration-300">
                      {usp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
