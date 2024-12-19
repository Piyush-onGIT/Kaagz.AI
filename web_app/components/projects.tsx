import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./projectCard";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
  const projects = [
    {
      title: "Khushi Bansal (Leader)",
      description: "Blockchain Developer",
      imgUrl:
        "https://res.cloudinary.com/dbdf3pjsp/image/upload/v1733923222/my_image_nshmwy.jpg",
    },
    {
      title: "Piyush Kumar",
      description: "Backend Developer",
      imgUrl:
        "https://res.cloudinary.com/dbdf3pjsp/image/upload/v1733925933/piyuhs_kjnogp.jpg",
    },
    {
      title: "Prince Tripathi",
      description: "Frontend Developer",
      imgUrl:
        "https://res.cloudinary.com/dbdf3pjsp/image/upload/v1733949629/myPic_fgv18l.jpg",
    },
    {
      title: "Pranjal Naman",
      description: "Frontend Developer",
      imgUrl:
        "https://res.cloudinary.com/dbdf3pjsp/image/upload/v1733925833/pranjal_q7owkt.jpg",
    },
    {
      title: "Raj Motwani",
      description: "Machine Learning Developer",
      imgUrl:
        "https://res.cloudinary.com/dbdf3pjsp/image/upload/v1733925476/1733918189581_jebdnq.jpg",
    },
    {
      title: "Uday Sharma",
      description: "Frontend Developer",
      imgUrl:
        "https://res.cloudinary.com/dbdf3pjsp/image/upload/v1733923960/uday_smzyqo.jpg",
    },
  ];

  return (
    <section className="project" id="dev">
      <Container>
        <Row>
          <Col sm={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={`team-section ${
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }`}
                >
                  <h2 className="team-heading">Meet Our Team</h2>
                  <p className="team-description">
                    A passionate team of experts in AI and blockchain, committed
                    to revolutionizing document verification. We combine
                    innovation and precision to create secure, efficient, and
                    user-friendly solutions, shaping the future of document
                    management.
                  </p>
                  <Row className="team-cards">
                    {projects.map((project, index) => (
                      <ProjectCard key={index} {...project} />
                    ))}
                  </Row>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
