// ProjectCard Component
import { Col } from "react-bootstrap";

interface ProjectCardProps {
  title: string;
  description: string;
  imgUrl: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imgUrl,
}) => {
  return (
    <Col xs={12} sm={6} md={3} className="team-card">
      <div className="proj-imgbx">
        <img src={imgUrl} alt={title} className="team-img" />
        <div className="proj-txtx">
          <h4 className="team-title">{title}</h4>
          <span className="team-role">{description}</span>
        </div>
      </div>
    </Col>
  );
};
