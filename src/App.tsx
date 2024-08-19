import { useState } from "react";
import AddTask from "./components/AddTask";
import DeleteTask from "./components/DeleteTask";
import ShowTasks from "./components/ShowTasks";
import NavBar from "./components/NavBar";

function App() {
  const [selectedMenu, setSelectedMenu] = useState({
    task: true,
    add: false,
    delete: false,
  });
  return (
    <>
      <NavBar onSelectedMenu={setSelectedMenu} />
      {selectedMenu.task && <ShowTasks />}
      {selectedMenu.add && <AddTask />}
      {selectedMenu.delete && <DeleteTask />}
    </>
  );
}

export default App;
