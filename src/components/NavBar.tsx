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
      <nav
        className="navbar navbar-expand-md  rounded-bottom-4"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a
            className="navbar-brand me-5 ms-4"
            href="#"
            onClick={() => {
              handleMenuClick({ task: true, add: false, delete: false });
            }}
          >
            Tasker
          </a>
          <button
            className="navbar-toggler me-4"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-4" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => {
                    handleMenuClick({ task: true, add: false, delete: false });
                  }}
                >
                  Show Tasks
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => {
                    handleMenuClick({ task: false, add: true, delete: false });
                  }}
                >
                  Add Tasks
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => {
                    handleMenuClick({ task: false, add: false, delete: true });
                  }}
                >
                  Delete Tasks
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
