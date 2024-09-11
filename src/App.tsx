import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import DeleteTask from "./components/DeleteTask";
import ShowTasks from "./components/ShowTasks";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";

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
      <div className="app-container d-flex flex-column justify-content-between">
        <div>
          <NavBar onSelectedMenu={setSelectedMenu} />
          {selectedMenu.home && <Home />}
          {selectedMenu.task && <ShowTasks />}
          {selectedMenu.add && <AddTask />}
          {selectedMenu.delete && <DeleteTask />}
          {selectedMenu.about && <About />}
          {selectedMenu.contact && <Contact />}
        </div>
        <Footer onSelectedMenu={setSelectedMenu} />
      </div>
    </>
  );
}

export default App;
