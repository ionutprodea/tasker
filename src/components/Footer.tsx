import { Menu } from "../interfaces/Menu";

interface Props {
  onSelectedMenu: (selectedMenu: Menu) => void;
}

const Footer = ({ onSelectedMenu }: Props) => {
  const handleMenuClick = (selectedMenu: Menu) => {
    onSelectedMenu(selectedMenu);
  };
  return (
    <div className="footer d-flex align-items-center justify-content-center">
      <div className="centered-container m-5">
        <a
          className="nav-link px-4"
          href="#"
          onClick={() => {
            handleMenuClick({
              home: false,
              task: false,
              add: false,
              delete: false,
              about: true,
              contact: false,
            });
          }}
        >
          About
        </a>
        <a
          className="nav-link px-4"
          href="#"
          onClick={() => {
            handleMenuClick({
              home: false,
              task: false,
              add: false,
              delete: false,
              about: false,
              contact: true,
            });
          }}
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default Footer;
