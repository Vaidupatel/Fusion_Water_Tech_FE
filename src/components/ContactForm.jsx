import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useSnackbar } from "../context/SnackbarContext";

const ContactForm = () => {
  const serviceId = import.meta.env.VITE_APP_EMAIL_SERVICE_ID;
  const templateId = import.meta.env.VITE_APP_EMAIL_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_APP_EMAIL_PUBLIC_KEY;

  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: import.meta.env.VITE_APP_EMAIL_TO_NAME,
      from_mobile: formData.mobile,
      from_message: formData.message,
      from_priceRanges: formData.priceRange || "",
    };

    // send mail using emailjs
    await emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        showSnackbar("Your response submitted successfully", "success");
      })
      .then(() => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsLoading(false);
      })
      .catch((error) => {
        showSnackbar(
          "Error occuring during submitting response please contact help center or try again latter",
          "error"
        );
        setIsLoading(false);
      });
  };

  return (
    <section id="contact" className="bg-charcoal text-white py-16 px-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl text-accent font-bold mb-6 text-center">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone"].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              required
              value={formData[field]}
              onChange={handleChange}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="w-full p-2 rounded bg-slate-800 border border-cyan-500/20 text-cyan-100"
            />
          ))}
          <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            className="w-full p-2 rounded bg-slate-800 border border-cyan-500/20 text-cyan-100"
          />
          {/* <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {isLoading ? "Sending..." : "Get in Touch"}
          </button> */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-2 rounded font-semibold transition-all duration-300
                        ${
                          isLoading
                            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                            : "bg-gradient-to-r bg-slate-900/90 border border-cyan-400/30 shadow-md shadow-cyan-500/10 text-white hover:brightness-110"
                        }`}
          >
            {isLoading ? "Sending..." : "Get in Touch"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
