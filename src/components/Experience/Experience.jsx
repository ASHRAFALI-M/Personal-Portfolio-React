import React from "react";
import { Container, Stack, Row, Col} from "react-bootstrap";
import "./Experience.css";
import "./Timeline.css";
import 'react-vertical-timeline-component/style.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";

const experiences = [
  {
    role: "AI Researcher Intern",
    company: "Trio Devs",
    img: "trio.jpg",
    date: "05/2024 to 08/2024",
    endDate: "",
    skills: ["Artificial Intelligence","Research","Communication","Team Work"],
    description: [
      "AI research intern skilled in data analysis, machine learning, and algorithm development.",
      "Proficient in programming languages such as Python, with a passion for exploring innovative solutions to complex problems.",
      "Collaborative team player eager to contribute to cutting-edge research initiatives in artificial intelligence."
    ],
  },
  {
    role: "Data Science Intern",
    company: "Unified Mentor private limited",
    img: "uni.jpeg",
    date: "05/2024 to 07/2024",
    endDate: "07/2024",
    skills: ["Data Science","Ml Algorithms","Data Preprocessing","Data Visualization"],
    description: [
      "In my 2-month virtual data science internship at Unified Mentor Pvt., I tackled real-world challenges by creating innovative predictive models and uncovering deep data insights.",
      " I harnessed cutting-edge technologies and collaborated on transformative projects, driving impactful data-driven solutions. ",
      " This internship significantly boosted my expertise in machine learning, data visualization, and advanced analytics."
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "Sync Interns",
    img: "sync.png",
    date: "07/2023 to 08/2023",
    endDate: "08/2023",
    skills: ["Ml Algorithms","Data Preprocessing"],
    description: [
      "During my virtual machine learning internship, I gained hands-on experience applying algorithms to real-world datasets.",
      " I developed predictive models, optimized them for performance, and learned to interpret results for practical applications.",
      " Through collaborative projects and mentorship, I honed my skills in data preprocessing, model selection, and evaluation techniques, contributing to my growth as a budding data scientist."
    ],
  }
];

const TimelineItem = ({ isPresent }) => (
  <div className="timeline-item">
    <div className={`timeline-dot ${isPresent ? "filled" : ""}`}></div>
    <div className="timeline-content"></div>
  </div>
);


function Experience() {
  return (
    <Container id="experience">
      <h1 id="subtitle">Experience</h1>
      <Stack gap={3} id="stack">
        {experiences.map((experience, index) => (
          <Row key={index}>
            <Col xs={2} id="timeline">
              <TimelineItem isPresent={experience.endDate === "Present"} />
            </Col>
            <Col>
              <div className="Card">
                <div className="Top">
                  <img src={`./${experience.img}`} alt={experience.role} />
                  <div className="Body">
                    <div className="Role">{experience.role}</div>
                    <div className="Company">{experience.company}</div>
                    <div className="Date">{experience.date}</div>
                  </div>
                </div>
                <div className="Description">
                  <span>
                  {experience?.description && (
                    <ul className="DescriptionList">
                      {experience.description.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                  </span>
                  {experience?.skills && (
                    <>
                      <br />
                      <div className="Skills">
                        <b>Skills:</b>
                        <div className="ItemWrapper">
  {experience?.skills?.map((skill, index) => (
    <div key={index} className="Skill">
      <FontAwesomeIcon icon={faCircleDot} className="Icon" /> {skill}
    </div>
  ))}
</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        ))}
      </Stack>
    </Container>
  );
}

export default Experience;
