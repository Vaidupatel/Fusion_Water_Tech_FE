import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    message: "Fantastic service & super clean water!",
    avatar: "🧑‍🦱",
  },
  { name: "Rahul Mehta", message: "RO on rent was a lifesaver!", avatar: "👨‍💼" },
  {
    name: "Neha Verma",
    message: "Support team is always prompt!",
    avatar: "👩‍🔧",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="bg-slate-900 text-white py-16">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-accent mb-10">
        What Our Clients Say
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="bg-charcoal p-6 rounded-xl shadow-md text-cyan-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-2">{t.avatar}</div>
            <p className="italic text-sm mb-2">"{t.message}"</p>
            <div className="text-cyan-300 font-semibold">{t.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
