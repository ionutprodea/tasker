import { useState, useEffect } from "react";
import { Task } from "../interfaces/Task";
//import { dummyTasks } from "./dummyTasks";

const DeleteTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = window.localStorage.getItem("TASKER_TASKS");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

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
    <div>
      <h1 className="m-5">Delete Tasks</h1>
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
  );
};

export default DeleteTask;
