// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header/Header";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Blogs from "./components/Blogs/Blogs";
import Footer from "./components/Footer/Footer";
// import Certifications from "./components/Certifications/Certifications";
import ControlledExample from "./components/Certifications/Certifications";


function App(){

  return(
    <div className="app">
    <Header />
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Blogs />
    <ControlledExample />
    <Footer />
   
    </div>
  );
}

export default App;
