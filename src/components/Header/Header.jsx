import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState }  from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';



function Header() {
  const [activeLink, setActiveLink] = useState(null);

  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  

  return (
    <header>
      <Navbar expand="lg" fixed="top"  data-bs-theme="dark" className="navbar-custom">
        <div className="container-fluid" >
          <Navbar.Brand href="#" className="navbar-brand-custom">
            {/* <img src="/logo-black.png" alt="Logo" width="30" height="30" className="d-inline-block align-top" /> */}
            <span>A</span>SHRAFALI
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
              <Nav.Item className={`navbar-item ${activeLink === 'about' ? 'navbar-item-active' : ''}`}>
              <Nav.Link href="#about" onClick={() => handleNavLinkClick('about')}>
                About
              </Nav.Link>
            </Nav.Item>
              <Nav.Item className={`navbar-item ${activeLink === 'skills' ? 'navbar-item-active' : ''}`}>
                <Nav.Link href="#skills" onClick={() => handleNavLinkClick('skills')}> Skills</Nav.Link>
              </Nav.Item>
              <Nav.Item className={`navbar-item ${activeLink === 'experience' ? 'navbar-item-active' : ''}`}>
                <Nav.Link href="#experience"  onClick={() => handleNavLinkClick('experience')}>Experience</Nav.Link>
              </Nav.Item>
              <Nav.Item className={`navbar-item ${activeLink === 'projects' ? 'navbar-item-active' : ''}`}>
                <Nav.Link href="#projects"  onClick={() => handleNavLinkClick('projects')}>Projects</Nav.Link>
              </Nav.Item>
              <Nav.Item className={`navbar-item ${activeLink === 'certifications' ? 'navbar-item-active' : ''}`}>
                <Nav.Link href="#certifications"  onClick={() => handleNavLinkClick('certifications')}>Certifications</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="navbar-text">
            <Nav.Link href="https://www.linkedin.com/in/ashrafali-m-769b25246" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="navbar-icon" />
              </Nav.Link>
              <Nav.Link href="https://github.com/ASHRAFALI-M" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className="navbar-icon" />
              </Nav.Link>
              <Nav.Link href="mailto:ashrafali31018@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} className="navbar-icon" />
              </Nav.Link>
              <Nav.Link href="https://drive.google.com/file/d/1vH4_XyEhNU6CyyYI-ni3yIyKF8pbMBb-/view?usp=sharing" download className="btn btn-primary navbar-btn" target="_blank">
                Resume
              </Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <br />
    </header>
  );
}

export default Header;
