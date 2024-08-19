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
      <div>
        <button
          onClick={() => {
            handleMenuClick({ task: true, add: false, delete: false });
          }}
        >
          Tasks
        </button>
        <button
          onClick={() => {
            handleMenuClick({ task: false, add: true, delete: false });
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            handleMenuClick({ task: false, add: false, delete: true });
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default NavBar;
