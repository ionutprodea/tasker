import { useEffect, useState } from "react";
//import { dummyTasks } from "./dummyTasks";
import { Task } from "../interfaces/Task";

const ShowTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const storedTasks = localStorage.getItem("TASKER_TASKS");
    storedTasks && setTasks(JSON.parse(storedTasks));
  }, []);

  return (
    <div>
      <h2 className="m-5">Tasks</h2>
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
              <input
                className="form-check-input"
                type="checkbox"
                name="task_status"
                id={task.task + task.date}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowTasks;
