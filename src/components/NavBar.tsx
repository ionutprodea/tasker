import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

interface Menu {
  task: boolean;
  add: boolean;
  delete: boolean;
}

interface Props {
  onSelectedMenu: (selectedMenu: Menu) => void;
}

const NavBar = ({ onSelectedMenu }: Props) => {
  const handleMenuClick = (selectedMenu: Menu) => {
    onSelectedMenu(selectedMenu);
  };

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            onClick={() => {
              handleMenuClick({ task: true, add: false, delete: false });
            }}
          >
            Tasker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  handleMenuClick({ task: true, add: false, delete: false });
                }}
              >
                Tasks
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  handleMenuClick({ task: false, add: true, delete: false });
                }}
              >
                Add Tasks
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  handleMenuClick({ task: false, add: false, delete: true });
                }}
              >
                Delete Tasks
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
