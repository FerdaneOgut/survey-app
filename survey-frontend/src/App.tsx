
import AppRoutes from './AppRoutes';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
function App() {
  return (
    <div style={{maxWidth:"1440px", margin:" 0px auto"}}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to='/' style={{ textDecoration: "none" }}><Navbar.Brand >Survey App</Navbar.Brand></Link>
        </Container>
      </Navbar>
      <Container>
      <AppRoutes />
      </Container>
    </div>
  );
}

export default App;
