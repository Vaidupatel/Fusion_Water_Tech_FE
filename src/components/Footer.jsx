import { motion } from "framer-motion";
import logo from "/Images/logo.png";

import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      text: "G57, Shayona plaza, Puna-canal Road, Surat, Gujarat",
      link: "https://www.google.co.in/maps/place/Shayona+Plaza/@21.2021291,72.8818803,19.01z/data=!4m6!3m5!1s0x3be04f7fb6963db3:0x53db07f69d77a205!8m2!3d21.201811!4d72.8817696!16s%2Fg%2F11rdv80xn4?entry=ttu",
    },
    {
      icon: FaPhone,
      text: "+91 9376724365",
      link: "tel:+919376724365",
    },
    {
      icon: FaWhatsapp,
      text: "WhatsApp Support",
      link: "https://wa.me/919376724365",
    },
    {
      icon: FaEnvelope,
      text: "fusionwatertech@gmail.com",
      link: "mailto:fusionwatertech@gmail.com",
    },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-cyan-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Fusion Water Tech Logo"
                className="h-15 w-auto"
              />
            </div>
            <p className="text-cyan-200/80 text-sm leading-relaxed mb-6">
              Leading provider of advanced water purification solutions with 15+
              years of experience. We ensure pure, safe, and healthy water for
              your family and business needs.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-cyan-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-cyan-200/70 hover:text-cyan-300 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-cyan-200 mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3">
              {contactInfo.slice(0, 2).map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <li key={index} className="flex items-center gap-3">
                    <IconComponent className="text-cyan-400 text-sm flex-shrink-0" />
                    <a
                      href={contact.link}
                      className="text-cyan-200/70 hover:text-cyan-300 transition-colors duration-300 text-xs leading-relaxed"
                    >
                      {contact.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Contact & Social Section */}
        <motion.div
          className="border-t border-cyan-500/20 pt-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Contact Links */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start">
              {contactInfo.slice(2).map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.link}
                    className="flex items-center gap-2 text-cyan-200/70 hover:text-cyan-300 transition-colors duration-300 text-sm"
                  >
                    <IconComponent className="text-cyan-400" />
                    <span className="hidden sm:inline">{contact.text}</span>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-slate-800/50 border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-300 hover:text-cyan-200 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <IconComponent className="text-sm" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-cyan-500/20 pt-6 mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-cyan-200/60 text-sm">
            © {currentYear} Fusion Water Tech. All rights reserved. |
            <span className="text-cyan-300">
              Pure Science • Clean Water • Sustainable Future
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
