import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";

const navigationLink = [
  { label: "Home", href: "/" },
  { label: "Driver", href: "/driver" },
  { label: "Order", href: "/order" },
  { label: "Chart", href: "/chart" },
];
const Header = () => {
  let location = useLocation();

  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand href="#home">Kmeans App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            variant="pills"
            className="me-auto"
            defaultActiveKey={location.pathname}
          >
            {navigationLink.map((link) => {
              return (
                <Nav.Item>
                  <Nav.Link>
                    <Link to={link.href}>{link.label}</Link>
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
