import FloatingNavbar from "../components/FloatingNavbar";
import Home from "./landing/Home";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import RentalAMC from "../components/RentalAMC";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <FloatingNavbar />
      <main className="relative">
        <Home />
        <Services />
        <WhyChooseUs />
        <RentalAMC />
        {/* <PricingPlans /> */}
        {/* <Testimonials /> */}
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
