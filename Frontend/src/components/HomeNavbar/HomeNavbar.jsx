import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, NavDropdown, Dropdown, Row, Col } from "react-bootstrap";
import logo from '../../assets/images/dark-logo.png';
// import navIcon1 from '../assets/img/nav-icon1.svg';
// import navIcon2 from '../assets/img/nav-icon2.svg';
// import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import { BrowserRouter as Router} from "react-router-dom";
import "./homenavbar.css"
import { FaShoppingCart} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';




export const HomeNavbar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Router>
        
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <NavDropdown
  className="pr-2 py-2 align-text-top"
  title="Demo"
  id="basic-nav-dropdown"
>
  <Container className="DemoNav pt-0 mt-0">
    <Row>
      <Col xs="12" md="6" className="text-left">
        <Dropdown.Header>
          <FontAwesomeIcon
            color="black"
            icon={"concierge-bell"}
            size="1x"
            className="pr-1"
          />
          {"  "}
          Catering
        </Dropdown.Header>
        <Dropdown.Item>
          <Link href="/">
            <a href="www" className="nav-link" role="button">
              instructor
            </a>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href="/">
            <a href="www" className="nav-link" role="button">
              Course Hub
            </a>
          </Link>
        </Dropdown.Item>

        <Dropdown.Divider />
        <Dropdown.Header>
          <FontAwesomeIcon
            color="black"
            icon={"chalkboard-teacher"}
            size="1x"
            className="pr-1"
          />
          {"  "}
          Classes
        </Dropdown.Header>
        <Dropdown.Item>
          <Link href="/">
            <a href="www" className="nav-link" role="button">
             Landing
            </a>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href="/">
            <a href="www" className="nav-link" role="button">
              Dev
            </a>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href="/">
            <a href="www" className="nav-link" role="button">
              Online Art
            </a>
          </Link>
        </Dropdown.Item>
       
      </Col>
    </Row>
  </Container>
</NavDropdown>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>  
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </NavDropdown>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Instructor</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Login</Nav.Link>
            </Nav>
            <Form className="d-flex">
                    <Form.Control type="search" placeholder="Search" className="me-2 rounded-pill" aria-label="Search"/>
            </Form>
            <span className="navbar-text">
            <div className="shopping-cart">
                <FaShoppingCart />
                <span className="cart-count">0</span>
                </div>
              <HashLink to='#connect'>
                <button className="vvd"><span>Sign Up</span></button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
