import "./Projects.css";
import { Button, Container, Modal } from "react-bootstrap";
import { useState } from "react";

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Fashion Recommendation System using Image Features",
      date: "Mar 2024 - Apr 2024",
      description:
        "Fashion Recommendation System using Image Features employs advanced image recognition techniques to analyze clothing items, generating personalized style suggestions based on users' preferences and trends. By harnessing visual data, it enhances fashion discovery, guiding users towards tailored selections effortlessly.",
      image:"fashion.jpeg",
      tags: ["Python", "Keras", "Matplotlib"],
      category: "Deep Learning",
      github: "https://github.com/ASHRAFALI-M/Deep-Learning-Project/blob/main/DL1_Fashion%20Recommendation%20System%20using%20Image%20Features.ipynb",
    },
    {
      id: 2,
      title: "Time Series Forecasting with ARIMA",
      date: "Mar 2024 - Apr 2024",
      description:
        "Time Series Forecasting with ARIMA (AutoRegressive Integrated Moving Average) utilizes historical data to model and predict future values, accounting for trends and seasonality. By analyzing patterns in sequential data, ARIMA provides accurate forecasts, aiding in decision-making across various domains such as finance, economics, and weather prediction.",
      image:
        "arima.jpeg",
      tags: ["Python", "Pandas", "Matplotlib", "ARIMA"],
      category: "Python",
      github: "https://github.com/ASHRAFALI-M/Python_Project/blob/main/Time%20Series%20Forecasting%20with%20ARIMA.ipynb",
    },
    {
      id: 3,
      title: "Breast Cancer Survival Prediction with Machine Learning",
      date: "Feb 2024 - Mar 2024",
      description:
        "Breast Cancer Survival Prediction with Machine Learning employs algorithms to analyze medical data, identifying crucial factors affecting patient outcomes. By leveraging features like tumor size, stage, and molecular markers, it predicts the likelihood of survival, aiding clinicians in treatment planning and personalized care strategies for breast cancer patients.",
      image:
        "breast.jpeg",
      tags: ["Python", "Numpy", "Pandas", "Sklearn"],
      category: "Machine Learning",
      github: "https://github.com/ASHRAFALI-M/-Machine-Learning-Projects/blob/main/Breast%20Cancer%20Survival%20Prediction%20with%20Machine%20Learning.ipynb",
    },
  ];

  const [toggle, setToggle] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  return (
    <div className="projects">
      <Container id="projects">
        <div id="Wrapper">
          <h1 id="Title">Projects</h1>
          <div id="ToogleButtonGroup">
            {toggle === "all" ? (
              <Button
                active
                value="all"
                onClick={() => setToggle("all")}
                id="ToogleButton"
              >
                All
              </Button>
            ) : (
              <Button
                value="all"
                onClick={() => setToggle("all")}
                id="ToogleButton"
              >
                All
              </Button>
            )}
            <div className="vr" />
            {toggle === "Deep Learning" ? (
              <Button
                active
                value="Deep Learning"
                onClick={() => setToggle("Deep Learning")}
                id="ToogleButton"
              >
                DEEP LEARNING'S
              </Button>
            ) : (
              <Button
                value="Deep Learning"
                onClick={() => setToggle("Deep Learning")}
                id="ToogleButton"
              >
                DEEP LEARNING'S
              </Button>
            )}
            <div className="vr" />
            {toggle === "Python" ? (
              <Button
                active
                value="Python"
                onClick={() => setToggle("Python")}
                id="ToogleButton"
              >
                PYTHON'S
              </Button>
            ) : (
              <Button
                value="Python"
                onClick={() => setToggle("Python")}
                id="ToogleButton"
              >
                PYTHON'S
              </Button>
            )}
            <div className="vr" />
            {toggle === "Machine Learning" ? (
              <Button
                active
                value="Machine Learning"
                onClick={() => setToggle("Machine Learning")}
                id="ToogleButton"
              >
                MACHINE LEARNING'S
              </Button>
            ) : (
              <Button
                value="Machine Learning"
                onClick={() => setToggle("Machine Learning")}
                id="ToogleButton"
              >
                MACHINE LEARNING'S
              </Button>
            )}
            {/* <div className="vr" />
            {toggle === "backend" ? (
              <Button
                active
                value="backend"
                onClick={() => setToggle("backend")}
                id="ToogleButton"
              >
                BACKEND'S
              </Button>
            ) : (
              <Button
                value="backend"
                onClick={() => setToggle("backend")}
                id="ToogleButton"
              >
                BACKEND'S
              </Button>
            )} */}
          </div>
          <div id="CardContainer">
            {toggle === "all" &&
              projects.map((project, index) => (
                <Button onClick={() => handleOpenModal(project)} id="Card">
                  <img id="Image" src={project.image} />
                  <div id="Tags">
                    {project.tags?.map((tag, index) => (
                      <div id="Tag">{tag}</div>
                    ))}
                  </div>
                  <div id="Details">
                    <div id="TagTitle">{project.title}</div>
                    <div id="Date">{project.date}</div>
                    <div id="Description">{project.description}</div>
                  </div>
                </Button>
              ))}
            {projects
              .filter((item) => item.category == toggle)
              .map((project) => (
                <Button onClick={() => handleOpenModal(project)} id="Card">
                  <img id="Image" src={project.image} />
                  <div id="Tags">
                    {project.tags?.map((tag, index) => (
                      <div id="Tag">{tag}</div>
                    ))}
                  </div>
                  <div id="Details">
                    <div id="TagTitle">{project.title}</div>
                    <div id="Date">{project.date}</div>
                    <div id="Description">{project.description}</div>
                  </div>
                </Button>
              ))}
          </div>
        </div>
      </Container>
      {/* Modal for displaying project details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedProject?.image} alt={selectedProject?.title} id="Image" />
          <p id="Date" style={{marginTop: "10px"}}>{selectedProject?.date}</p>
          <p style={{marginTop: "1rem", marginBottom: "1rem", textAlign: "justify", fontSize: "1.1rem"}}>{selectedProject?.description}</p>
          <div id="Tags">
            {selectedProject?.tags.map((tag, index) => (
              <div id="Tag" key={index}>{tag}</div>
            ))}
          </div>
          <p style={{marginTop: "15px"}}>
            <a href={selectedProject?.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            {selectedProject?.webapp && (
            <p style={{display: "inline", marginLeft: "10px"}}>
              <a href={selectedProject?.webapp} target="_blank" rel="noopener noreferrer">Live Page</a>
            </p>
          )}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} 

export default Projects;
