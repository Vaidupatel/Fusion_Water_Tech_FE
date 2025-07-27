import { motion } from "framer-motion";
import { FaHome, FaCog, FaCheck } from "react-icons/fa";

const rentalPlans = {
  rental: {
    icon: FaHome,
    title: "Rental Plans",
    subtitle: "No upfront investment required",
    features: [
      "Free installation",
      "Regular filter replacement included",
      "No device purchase cost",
      "24/7 technical support",
      "Easy cancellation policy",
    ],
  },
  amc: {
    icon: FaCog,
    title: "AMC Plans",
    subtitle: "Comprehensive maintenance coverage",
    features: [
      "3 service visits per year",
      "All parts replacement",
      "Priority support",
      "Free water quality testing",
      "Performance optimization",
    ],
  },
};

const RentalAMC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
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
      id="rental-amc"
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
            Rental & AMC Plans
          </h2>
          <p className="text-cyan-200/80 text-lg max-w-2xl mx-auto">
            Flexible options to suit your needs and budget
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Rental Section */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 lg:p-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 flex items-center justify-center">
                  <rentalPlans.rental.icon className="text-xl text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-cyan-200">
                    {rentalPlans.rental.title}
                  </h3>
                  <p className="text-cyan-200/70 text-sm">
                    {rentalPlans.rental.subtitle}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {rentalPlans.rental.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FaCheck className="text-cyan-400 text-sm flex-shrink-0" />
                    <span className="text-cyan-100 text-sm lg:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* AMC Section */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 lg:p-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 flex items-center justify-center">
                  <rentalPlans.amc.icon className="text-xl text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-cyan-200">
                    {rentalPlans.amc.title}
                  </h3>
                  <p className="text-cyan-200/70 text-sm">
                    {rentalPlans.amc.subtitle}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {rentalPlans.amc.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FaCheck className="text-cyan-400 text-sm flex-shrink-0" />
                    <span className="text-cyan-100 text-sm lg:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RentalAMC;
