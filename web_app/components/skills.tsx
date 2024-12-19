import { Carousel } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";
import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import Role from "../public/assets/img/image.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export const Skills: React.FC = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    // Perform any necessary side effects here
  }, []);

  return (
    <section className="skill" id="features">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Features</h2>
              <p>Our platform offers variety of fabulous features.</p>
              <div className="skill-slider">
                <div className="item">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/10397/10397230.png"
                    alt="Image"
                  />
                  <h5>AI-Powered Document Verification</h5>
                </div>
                <div className="item">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/8510/8510147.png"
                    alt="Image"
                  />
                  <h5>Blockchain-Enabled Security</h5>
                </div>
                <div className="item">
                  <img
                    src="https://icons.veryicon.com/png/o/business/office-icon-collection/summary-18.png"
                    alt="Image"
                  />
                  <h5>Centralized Document Management</h5>
                </div>
                <div className="item">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/13479/13479838.png"
                    alt="Image"
                  />
                  <h5>Automated Validation and Reporting</h5>
                </div>
                <div className="item">
                  <Image src={Role} alt="Image" style={{ width: "50%" }} />
                  <h5>Role-Based Access Control</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <img src="https://i.postimg.cc/1Xz09km7/Untitled-design-3.png" className="background-image-left"  alt="Image" /> */}
    </section>
  );
};
