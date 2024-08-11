import { useState, useEffect } from "react";
//import { dummyTasks } from "./dummyTasks";
import { Task } from "../interfaces/Task";

const DeleteTask = () => {
  const onRemove = (date: string, name: string) => {
    setTasks(
      tasks.filter((task: Task) => {
        task.task !== name || task.date !== date;
      })
    );
  };
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const storedTasks = window.localStorage.getItem("TASKER_TASKS");
    storedTasks && setTasks(JSON.parse(storedTasks));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("TASKER_TASKS", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.date + task.task}>
            {task.task} | {task.importance}{" "}
            <button onClick={() => onRemove(task.date, task.task)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteTask;