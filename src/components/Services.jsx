import { motion } from "framer-motion";
import {
  FaTint,
  FaWater,
  FaFilter,
  FaFlask,
  FaBox,
  FaShieldAlt,
} from "react-icons/fa";

const services = [
  {
    icon: FaTint,
    label: "5-Stage RO Filtration",
    description: "Advanced multi-stage purification",
  },
  {
    icon: FaFilter,
    label: "Alkaline Filter",
    description: "pH balanced healthy water",
  },
  {
    icon: FaWater,
    label: "TDS Controller",
    description: "Optimal mineral retention",
  },
  {
    icon: FaFlask,
    label: "Mineral Guard",
    description: "Essential minerals preserved",
  },
  {
    icon: FaBox,
    label: "12L Detachable Tank",
    description: "Easy maintenance & cleaning",
  },
  {
    icon: FaShieldAlt,
    label: "UV Protection",
    description: "Complete bacterial elimination",
  },
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
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
      id="services"
      className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-16 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
            Our RO Features
          </h2>
          <p className="text-cyan-200/80 text-lg max-w-2xl mx-auto">
            Advanced water purification technology for your family's health and
            safety
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, i) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={i}
                className="group relative bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 lg:p-8 text-center hover:border-cyan-400/40 transition-all duration-300"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 mb-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30">
                    <IconComponent className="text-2xl lg:text-3xl text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300" />
                  </div>

                  <h3 className="text-lg lg:text-xl font-semibold text-cyan-100 mb-2 group-hover:text-white transition-colors duration-300">
                    {service.label}
                  </h3>

                  <p className="text-cyan-200/70 text-sm lg:text-base group-hover:text-cyan-200/90 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
