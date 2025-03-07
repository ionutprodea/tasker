import { useEffect, useState } from "react";
import { Task } from "../interfaces/Task";
import SortTasks from "./SortTasks";
import { TaskSorter } from "../services/TaskSorter";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ShowTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortOption, setSortOption] = useState("high-low");

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("TASKER_TASKS");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      const sortedTasks = TaskSorter(sortOption, parsedTasks);
      sortedTasks && setTasks(sortedTasks);
    }
  }, [sortOption]);
  // Saves tasks status to localStorage everytime a checkbox is checked/unchecked
  const handleCheckboxChange = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: !task.status } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("TASKER_TASKS", JSON.stringify(updatedTasks));
  };
  const handleToggleDetails = (index: number) => {
    const toggledTasks = tasks.map((task, i) =>
      i === index ? { ...task, showDetails: !task.showDetails } : task
    );
    setTasks(toggledTasks);
  };
  return (
    <>
      <Helmet>
        <title>Show Tasks</title>
        <meta property="og:title" content="Show Tasks" />
        <meta
          name="description"
          content="View all your tasks in Tasker. Stay organized with a clear overview of your to-do list, making task management simple and efficient."
        />
        <meta
          property="og:description"
          content="View all your tasks in Tasker. Stay organized with a clear overview of your to-do list, making task management simple and efficient."
        />
        <meta
          name="keywords"
          content="View Tasks in Tasker, Task List Overview, Show To-Do Items"
        />
        <meta
          property="og:keywords"
          content="View Tasks in Tasker, Task List Overview, Show To-Do Items"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="app-container d-flex flex-column justify-content-between">
        <div>
          <NavBar />
          <h1 className="m-5">Tasks</h1>
          {tasks.length >= 1 && <SortTasks onSortChange={setSortOption} />}
          <div className="m-5 centered-container">
            <ul className="list-group">
              {tasks.length === 0 && (
                <div className="d-flex justify-content-start align-items-center">
                  <div>
                    <h2>No tasks to show</h2>
                    <h2>
                      <Link to={"/add"} className="no-tasks-link">
                        Click here to add task
                      </Link>
                    </h2>
                  </div>
                </div>
              )}
              {tasks.map((task, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={task.date + task.task}
                >
                  <div>
                    <div className="d-flex justify-content-start align-items-center">
                      <p className="my-1 me-3">{task.task}</p>
                      <span className={task.importance}>
                        {task.importance.toUpperCase()}
                      </span>
                      <span className="ms-3 task-date">{task.date}</span>
                      <div className="checkbox-wrapper-50">
                        <input
                          className="form-check-input shadow-none align-self-start mx-3 my-2 plus-minus"
                          type="checkbox"
                          name="task_description"
                          onChange={() => handleToggleDetails(index)}
                        />
                      </div>
                    </div>
                    <p className="my-1 task-date-mobile">{task.date}</p>
                    {task.showDetails && (
                      <p className="my-1 task-details">{task.details}</p>
                    )}
                  </div>
                  <input
                    className="form-check-input shadow-none align-self-start my-3"
                    type="checkbox"
                    name="task_status"
                    checked={task.status} // Checkbox will be checked if status is true
                    onChange={() => handleCheckboxChange(index)} // Toggle status on change
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ShowTasks;
