import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"; 

export default function Menu(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Container className="m-1">
                <LinkContainer to="/"><Navbar.Brand>Menu</Navbar.Brand></LinkContainer> 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <LinkContainer to="/cadastroMaterial"><NavDropdown.Item>Itens</NavDropdown.Item></LinkContainer>    
                            <LinkContainer to="/cadastroResponsavel"><NavDropdown.Item>Responsáveis</NavDropdown.Item></LinkContainer>                          
                        </NavDropdown>                        
                    </Nav>
                    <Nav.Link href="#sair">
                        Sair
                    </Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
