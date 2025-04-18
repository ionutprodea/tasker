import { useState, useEffect } from "react";
import { Task } from "../interfaces/Task";
import { TaskSorter } from "../services/TaskSorter";
import SortTasks from "./SortTasks";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import axios from "axios";
import { API_URL } from "../services/apiEndpoint";
import { IoMdCheckboxOutline } from "react-icons/io";

const DeleteTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortOption, setSortOption] = useState("high-low");
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
  const [removedTask, setRemovedTask] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [deleteError, setDeleteError] = useState("");

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
  }, [removedTask]);
  useEffect(() => {
    if (tasks) {
      const sorted = TaskSorter(sortOption, tasks) || [];
      setSortedTasks(sorted);
    }
  }, [tasks, sortOption]);

  const onRemove = (_id: string) => {
    setRemoving(true);
    axios
      .delete(`${API_URL}/tasks/${_id}`, {
        headers: {
          "x-auth-token": sessionStorage.getItem("tasker-auth-token"),
        },
      })
      .then((response) => {
        console.log(`Removing task with ID: ${response.data._id}`);
        setRemoving(false);
        setRemovedTask(true);
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
        if (error.response) setDeleteError(error.response.data);
        else if (error.request) setDeleteError("No response from the server");
        else setDeleteError("Unexpected error. Please try again");
        setRemoving(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Delete Tasks</title>
        <meta property="og:title" content="Delete Tasks" />
        <meta
          name="description"
          content="Easily remove completed or unnecessary tasks in Tasker. Keep your to-do list clean and organized with a simple task deletion process."
        />
        <meta
          property="og:description"
          content="Easily remove completed or unnecessary tasks in Tasker. Keep your to-do list clean and organized with a simple task deletion process."
        />
        <meta
          name="keywords"
          content="Delete Task in Tasker, Task Management Cleanup, Remove Tasks"
        />
        <meta
          property="og:keywords"
          content="Delete Task in Tasker, Task Management Cleanup, Remove Tasks"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="app-container d-flex flex-column justify-content-between">
        <div>
          <NavBar />
          <h1 className="m-5">Delete Tasks</h1>
          {deleteError && <p className="text">{deleteError}</p>}
          {removedTask && <p className="text">Task deleted from database</p>}
          {!removing && !loadingTasks && (
            <div>
              {tasks.length >= 1 && <SortTasks onSortChange={setSortOption} />}
              <div className="m-5 centered-container">
                <ul className="list-group">
                  {tasks.length === 0 && (
                    <div className="d-flex justify-content-start align-items-center">
                      <h2>No tasks to show</h2>
                    </div>
                  )}
                  {sortedTasks.map((task) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={task._id}
                    >
                      <div className="d-flex justify-content-start align-items-center">
                        {task.checked && (
                          <div className="me-2 finished-task">
                            <IoMdCheckboxOutline />
                          </div>
                        )}
                        <p className="my-1 me-3">{task.task}</p>
                        <span className={task.importance}>
                          {task.importance.toUpperCase()}
                        </span>
                        <span className="ms-3 task-date">{task.date}</span>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => onRemove(task._id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {(removing || loadingTasks) && (
            <div className="m-5 centered-container">
              <div className="spinner-border spinner" role="status">
                <span className="visually-hidden">Deleting...</span>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DeleteTask;
