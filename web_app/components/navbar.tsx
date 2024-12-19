import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Image from "next/image";
import Logo from "../public/assets/img/logo.png";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value: string) => {
    setActiveLink(value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <div className="logo text-[2rem]">
          <Image className="w-10" src={Logo} alt="logo" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="/"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/ia/mycertificates"
              className={
                activeLink === "features" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("features")}
            >
              My Certificates
            </Nav.Link>

            {/* {localStorage.getItem("type") === "issuing_auth" && (
              <Nav.Link
                href="/ia/generate"
                className={
                  activeLink === "features"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("features")}
              >
                Issue Certificates
              </Nav.Link>
            )} */}

            <Nav.Link
              href="#dev"
              className={
                activeLink === "team" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("team")}
            >
              Team
            </Nav.Link>
          </Nav>

          <span className="navbar-text">
            <button
              className="vvd"
              onClick={() => {
                signIn();
              }}
            >
              <span>Get Started</span>
            </button>
            <div className="register-dropdown">
              <div
                className="register-button"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#ffffff"
                  className="bi bi-box-arrow-in-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
              </div>

              {dropdownOpen && (
                <div className="register-menu">
                  <a href="/signup_user" data-value="user">
                    User
                  </a>
                  <a href="/signup_ia" data-value="issuing-authority">
                    Issuing Authority
                  </a>
                  <a href="/signup_va" data-value="verification-authority">
                    Verification Authority
                  </a>
                </div>
              )}
            </div>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
