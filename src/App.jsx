import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import { motion } from "framer-motion";

import Header from "./components/Header/Header";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Blogs from "./components/Blogs/Blogs";
import Certifications from "./components/Certifications/Certifications";
import Footer from "./components/Footer/Footer";

// Page transition variants
const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function App() {
  return (
    <div className="app bg-dark text-light overflow-hidden">
      {/* Sticky Hero Header */}
      <Header />

      {/* About */}
      <motion.section
        className="section container py-5"
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <About />
      </motion.section>

      {/* Skills – Glassmorphism Section */}
      <motion.section
        className="section container py-5 glass-card"
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Skills />
      </motion.section>

      {/* Experience – Timeline Feel */}
      <motion.section
        className="section container py-5"
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Experience />
      </motion.section>

      {/* Projects – Highlight Cards */}
      <motion.section
        className="section container py-5 glass-card"
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Projects />
      </motion.section>

      {/* Blogs – Minimal Feed */}
      <motion.section
        className="section container py-5"
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Blogs />
      </motion.section>

      {/* Certifications – Carousel / Cards */}
      <motion.section
        className="section container py-5 glass-card"
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Certifications />
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

