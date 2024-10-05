import { useState, useEffect } from "react";
import { Task } from "../interfaces/Task";
import { TaskSorter } from "../services/TaskSorter";
import SortTasks from "./SortTasks";
import NavBar from "./NavBar";
import Footer from "./Footer";

const DeleteTask = () => {
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

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    window.localStorage.setItem("TASKER_TASKS", JSON.stringify(tasks));
  }, [tasks]);

  // Function to remove a task
  const onRemove = (date: string, name: string) => {
    console.log("Removing task:", name, date);
    setTasks((prevTasks) =>
      prevTasks.filter((task) => {
        const shouldRemove = task.task === name && task.date === date;
        console.log("Task:", task, "Remove:", shouldRemove);
        return !shouldRemove;
      })
    );
  };

  return (
    <div className="app-container d-flex flex-column justify-content-between">
      <div>
        <NavBar />
        <h1 className="m-5">Delete Tasks</h1>
        <SortTasks onSortChange={setSortOption} />
        <div className="m-5 centered-container">
          <ul className="list-group">
            {tasks.map((task) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={task.date + task.task}
              >
                <div className="d-flex justify-content-start align-items-center">
                  <p className="my-1 me-3">{task.task}</p>
                  <span className={task.importance}>
                    {task.importance.toUpperCase()}
                  </span>
                  <span className="ms-3 task-date">{task.date}</span>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => onRemove(task.date, task.task)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeleteTask;
