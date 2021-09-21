import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const NavbarCMP = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Dashboard Example</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Container>
  </Navbar>
);

export default NavbarCMP;
