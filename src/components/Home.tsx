import { useEffect, useState } from "react";
import { Task } from "../interfaces/Task";
import { CurrentDate } from "../services/CurrentDate";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { API_URL } from "../services/apiEndpoint";
import { TaskSorter } from "../services/TaskSorter";
import SortTasks from "./SortTasks";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortOption, setSortOption] = useState("high-low");
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
  const [updatingTask, setUpdatingTask] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const handleCheckboxChange = (task: Task) => {
    const updatedTask = { ...task, checked: !task.checked };
    setUpdatingTask(true);
    axios
      .put(
        `${API_URL}/tasks/${task._id}`,
        { checked: updatedTask.checked },
        {
          headers: {
            "x-auth-token": sessionStorage.getItem("tasker-auth-token"),
          },
        }
      )
      .then((response) => {
        console.log("Task updated:", response.data);
        const updatedTasks = tasks.map((t) =>
          t._id === task._id ? { ...t, checked: updatedTask.checked } : t
        );
        setTasks(updatedTasks);
        setUpdatingTask(false);
      })
      .catch((error) => {
        console.log("Error updating task:", error);
      });
  };

  useEffect(() => {
    setLoadingTasks(true);
    axios
      .get(`${API_URL}/tasks`, {
        headers: {
          "x-auth-token": sessionStorage.getItem("tasker-auth-token"),
        },
      })
      .then((response) => {
        console.log(response);
        setTasks(response.data);
        setLoadingTasks(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (tasks) {
      const sorted = TaskSorter(sortOption, tasks) || [];
      setSortedTasks(sorted);
    }
  }, [tasks, sortOption]);

  const handleToggleDetails = (index: number) => {
    const toggledTasks = tasks.map((task, i) =>
      i === index ? { ...task, showDetails: !task.showDetails } : task
    );
    setTasks(toggledTasks);
  };
  const noTasks = sortedTasks.filter((task) => task.date === CurrentDate());
  return (
    <>
      <Helmet>
        <title>Tasker</title>
        <meta property="og:title" content="Tasker" />
        <meta
          name="description"
          content="Tasker is a simple and efficient to-do app designed to help you organize tasks, boost productivity, and stay on top of your daily plans.
           Manage tasks effortlessly with an intuitive interface."
        />
        <meta
          property="og:description"
          content="Tasker is a simple and efficient to-do app designed to help you organize tasks, boost productivity, and stay on top of your daily plans.
           Manage tasks effortlessly with an intuitive interface."
        />
        <meta
          name="keywords"
          content="Tasker To-Do App, Simple To-Do App, Task Management App"
        />
        <meta
          property="og:keywords"
          content="Tasker To-Do App, Simple To-Do App, Task Management App"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="app-container d-flex flex-column justify-content-between">
        <div>
          <NavBar />
          <h1 className="m-5">Today's Tasks</h1>
          {(updatingTask || loadingTasks) && (
            <div className="m-5 centered-container">
              <div className="spinner-border spinner" role="status">
                <span className="visually-hidden">Updating...</span>
              </div>
            </div>
          )}
          {noTasks.length >= 1 && <SortTasks onSortChange={setSortOption} />}
          <div className="m-5 centered-container">
            <ul className="list-group">
              {noTasks.length === 0 && !loadingTasks && (
                <div className="d-flex justify-content-start align-items-center">
                  <div>
                    <h2>No tasks today</h2>
                    <h2>
                      <Link to={"/add"} className="no-tasks-link">
                        Click here to add task
                      </Link>
                    </h2>
                  </div>
                </div>
              )}
              {tasks.map(
                (task, index) =>
                  task.date == CurrentDate() && (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-start"
                      key={task._id}
                    >
                      <div className="d-flex justify-content-start">
                        <div className="d-flex flex-column mt-2">
                          <p className="me-3">{task.task}</p>
                          {task.showDetails && (
                            <div>
                              <div className="task-importance-mobile">
                                <span className={task.importance}>
                                  {task.importance.toUpperCase()}
                                </span>
                              </div>
                              <p className="my-1 task-date-mobile">
                                {task.date}
                              </p>
                              <p className="my-1 task-details">
                                {task.details}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="task-importance mt-2">
                          <span className={task.importance}>
                            {task.importance.toUpperCase()}
                          </span>
                        </div>
                        <span className="ms-3 mt-2 task-date">{task.date}</span>
                        <div className="checkbox-wrapper-50">
                          <input
                            className="form-check-input shadow-none align-self-start mx-3 my-2 plus-minus"
                            type="checkbox"
                            name="task_description"
                            onChange={() => handleToggleDetails(index)}
                          />
                        </div>
                      </div>
                      <input
                        className="form-check-input shadow-none align-self-start my-3"
                        type="checkbox"
                        name="task_status"
                        id={task._id}
                        checked={task.checked}
                        onChange={() => handleCheckboxChange(task)}
                        hidden
                      />
                      <label
                        htmlFor={task._id}
                        className="finished-task task-checkbox mt-2"
                      >
                        {task.checked ? (
                          <IoMdCheckboxOutline />
                        ) : (
                          <MdCheckBoxOutlineBlank />
                        )}
                      </label>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
