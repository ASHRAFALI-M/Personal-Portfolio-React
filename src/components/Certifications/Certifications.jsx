import Carousel from 'react-bootstrap/Carousel';
import { Container } from 'react-bootstrap';
import './Certifications.css';

function Certifications() {
  const certificateData = [
    {
      title: "Certificate Azure900",
      description: "Certificate Azure900",
      image: "Certificate_Azure900.jpg",
    },
    {
      title: "Data Science and Analytics",
      description: "Hp Life",
      image: "DS_HpLife.jpg",
    },
    {
      title: "Introduction To Data Science",
      description: "Cisco Networking Academy",
      image: "DS_Cisco.jpg",
    },
    {
      title: "Oracle Cloud Infrastructure ",
      description: "Oracle University",
      image: "Cloud_Oracle.jpg",
    },
    {
      title: "What is Data Science",
      description: "IBM by Coursera",
      image: "DS_Coursera.jpg",
    },
    {
      title: "Introduction to Soft Skills",
      description: "TCS Ion",
      image: "SoftSkills_TCSion.jpg",
    },
    {
      title: "Amazon EC2 Observability, Monitoring and Troubleshooting",
      description: "AWS",
      image: "aws.jpg",
    },
    {
      title: "Data, Data, Everywhere",
      description: "Google by Coursera",
      image: "Foundations_cousera.jpg",
    },
    {
      title: "Effective Leadership",
      description: "HP Life",
      image: "EL_HpLife.jpg",
    },
    {
      title: "Machine Learning Internship",
      description: "Sync Interns",
      image: "ML_Sync.jpg",
    },
    {
      title: "Introduction To SQL",
      description: "Udemy",
      image: "sql.jpg",
    },
  
  ];

  return (
    <Container id='certifications'>
      <h1 id='subtitle'>Certifications</h1>
      <Carousel className='cert-carousel'>
        {certificateData.map((certificate, idx) => (
          <Carousel.Item key={idx}>
            <div
              className="cert-image-container"
              style={{ backgroundImage: `url(./${certificate.image})` }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default Certifications;
