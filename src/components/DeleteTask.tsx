import React, { useState, useEffect } from "react";
import { Task } from "../interfaces/Task";

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
      <h2>Delete Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.date + task.task}>
            {task.task} | {task.importance}{" "}
            <button onClick={() => onRemove(task.date, task.task)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteTask;
