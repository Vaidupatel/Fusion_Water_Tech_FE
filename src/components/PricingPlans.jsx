// const plans = [
//   {
//     name: "Home",
//     price: "₹299/mo",
//     features: ["RO + Alkaline", "Free installation", "1-year support"],
//   },
//   {
//     name: "Office",
//     price: "₹499/mo",
//     features: ["High-capacity RO", "Unlimited usage", "Annual Maintenance"],
//   },
//   {
//     name: "Industrial",
//     price: "₹999/mo",
//     features: ["50+ L/hr", "Heavy-duty filters", "Custom support"],
//   },
// ];

// const PricingPlans = () => (
//   <section id="pricing" className="bg-slate-800 text-white py-16">
//     <div className="max-w-6xl mx-auto px-4">
//       <h2 className="text-3xl text-center font-bold text-accent mb-10">
//         Pricing Plans
//       </h2>
//       <div className="grid md:grid-cols-3 gap-6">
//         {plans.map((plan, i) => (
//           <div
//             key={i}
//             className="bg-charcoal p-6 rounded-lg shadow-lg text-center border border-cyan-500/10"
//           >
//             <h3 className="text-xl font-semibold text-cyan-200">{plan.name}</h3>
//             <p className="text-2xl font-bold text-accent my-4">{plan.price}</p>
//             <ul className="text-sm text-cyan-100 space-y-1">
//               {plan.features.map((f, idx) => (
//                 <li key={idx}>• {f}</li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default PricingPlans;

import { motion } from "framer-motion";
import {
  FaHome,
  FaBuilding,
  FaIndustry,
  FaCheck,
  FaStar,
} from "react-icons/fa";

const plans = [
  {
    name: "Home",
    icon: FaHome,
    price: "₹299",
    period: "/month",
    description: "Perfect for families and small households",
    features: [
      "RO + Alkaline filtration",
      "Free installation & setup",
      "1-year comprehensive support",
      "Regular maintenance visits",
      "Water quality testing",
      "Emergency repair service",
    ],
    popular: false,
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    name: "Office",
    icon: FaBuilding,
    price: "₹499",
    period: "/month",
    description: "Ideal for offices and small businesses",
    features: [
      "High-capacity RO system",
      "Unlimited daily usage",
      "Annual maintenance contract",
      "Priority customer support",
      "Advanced TDS monitoring",
      "Bulk water storage solution",
    ],
    popular: true,
    color: "from-cyan-400/30 to-blue-400/30",
  },
  {
    name: "Industrial",
    icon: FaIndustry,
    price: "₹999",
    period: "/month",
    description: "Heavy-duty solution for large operations",
    features: [
      "50+ Liters per hour capacity",
      "Heavy-duty commercial filters",
      "Custom installation & support",
      "24/7 technical assistance",
      "Performance monitoring system",
      "Dedicated account manager",
    ],
    popular: false,
    color: "from-cyan-600/20 to-blue-600/20",
  },
];

const PricingPlans = () => {
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
      id="pricing"
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 lg:py-24 overflow-hidden"
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
            Pricing Plans
          </h2>
          <p className="text-cyan-200/80 text-lg max-w-2xl mx-auto">
            Choose the perfect plan that fits your water purification needs and
            budget
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {plans.map((plan, i) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={i}
                className={`relative group bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-6 lg:p-8 text-center transition-all duration-300 ${
                  plan.popular
                    ? "border-cyan-400/40 shadow-2xl shadow-cyan-500/20 scale-105"
                    : "border-cyan-500/20 hover:border-cyan-400/30 hover:scale-102"
                }`}
                variants={itemVariants}
                whileHover={{
                  scale: plan.popular ? 1.05 : 1.02,
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <FaStar className="text-xs" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Plan Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 mb-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30">
                      <IconComponent className="text-2xl lg:text-3xl text-cyan-300" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-cyan-200 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-cyan-200/70 text-sm">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                        {plan.price}
                      </span>
                      <span className="text-cyan-200/70 text-lg">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCheck className="text-cyan-400 text-sm flex-shrink-0 mt-0.5" />
                        <span className="text-cyan-100/90 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 shadow-lg"
                        : "bg-slate-700/50 text-cyan-200 border border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-400/50"
                    }`}
                    onClick={() => {
                      const contactSection = document.querySelector("#contact");
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-cyan-200/70 text-sm mb-4">
            All plans include free installation, regular maintenance, and 24/7
            customer support.
          </p>
          <p className="text-cyan-300 text-sm">
            Need a custom solution?{" "}
            <a
              href="#contact"
              className="underline hover:text-cyan-200 transition-colors"
            >
              Contact us
            </a>{" "}
            for enterprise pricing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;
