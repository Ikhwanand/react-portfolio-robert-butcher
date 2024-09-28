import About from "./components/About";
import AchievementShowcase from "./components/AchievementShowcase";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";


function App() {
  return (
    <main
      className="overflow-x-hidden bg-black tracking-tighter
    text-gray-200 antialiased"
    >
      <NavBar />
      <HeroSection />
      <About />
      <Projects />
      <Skills />
      <AchievementShowcase />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
}

export default App;
