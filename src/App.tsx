import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import DeleteTask from "./components/DeleteTask";
import ShowTasks from "./components/ShowTasks";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  // Retrieve the state from localStorage or use the default state
  const [selectedMenu, setSelectedMenu] = useState(() => {
    const savedMenu = localStorage.getItem("selectedMenu");
    return savedMenu
      ? JSON.parse(savedMenu)
      : {
          home: true,
          task: false,
          add: false,
          delete: false,
          about: false,
          contact: false,
        }; // Default state
  });
  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedMenu", JSON.stringify(selectedMenu));
  }, [selectedMenu]);

  return (
    <>
      <NavBar onSelectedMenu={setSelectedMenu} />
      {selectedMenu.home && <Home />}
      {selectedMenu.task && <ShowTasks />}
      {selectedMenu.add && <AddTask />}
      {selectedMenu.delete && <DeleteTask />}
      <Footer onSelectedMenu={setSelectedMenu} />
    </>
  );
}

export default App;
