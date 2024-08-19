import { useState } from "react";

export interface Menu {
  task: boolean;
  add: boolean;
  delete: boolean;
}

interface Props {
  onSelectedMenu: (selectedMenu: Menu) => void;
}

const NavBar = ({ onSelectedMenu }: Props) => {
  const [selectedMenu, setSelectedMenu] = useState<Menu>({
    task: true,
    add: false,
    delete: false,
  });
  return (
    <>
      <div>
        <button
          onClick={() => {
            setSelectedMenu({ task: true, add: false, delete: false });
            onSelectedMenu(selectedMenu);
          }}
        >
          Tasks
        </button>
        <button
          onClick={() => {
            setSelectedMenu({ task: false, add: true, delete: false });
            onSelectedMenu(selectedMenu);
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            setSelectedMenu({ task: false, add: false, delete: true });
            onSelectedMenu(selectedMenu);
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default NavBar;
