import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle, Link } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "" : ""}>
                  <span className="tagline">
                    Welcome to KaaGz.<span className="text-[#0056b3]">AI</span>
                  </span>
                  <h1>
                    Seamless <span>Document Verification using AI</span>
                    <br />& Secured by Blockchain
                  </h1>
                  <p>
                    KaaGz AI redefines documentation with advanced AI and
                    blockchain, delivering secure, tamper-proof, and instantly
                    verifiable documents. Simplify processes for issuers,
                    verifiers, and users seamlessly!
                  </p>
                  <div>
                    <div className="flex gap-3">
                      <div className="flex justify-center items-center gap-1">
                        <div>Fast</div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            color="#0056b3"
                            fill="currentColor"
                            className="bi bi-lightning-charge-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <div>Reliable</div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            color="#0056b3"
                            fill="currentColor"
                            className="bi bi-file-earmark-check-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <div>Secure</div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            color="#0056b3"
                            fill="currentColor"
                            className="bi bi-key-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    className="hover:animate-pulse"
                    style={{ textDecoration: "none" }}
                    href="/dashboard"
                  >
                    <button className="get-started p-3">
                      <div>Let's Get Started</div>
                      <div>
                        <ArrowRightCircle size={25} />
                      </div>
                    </button>
                  </a>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated" : ""}>
                  <img src="./assets/img/hero.png" alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
