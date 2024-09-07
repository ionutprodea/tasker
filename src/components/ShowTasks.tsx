import { useEffect, useState } from "react";
import { Task } from "../interfaces/Task";
import SortTasks from "./SortTasks";
import { TaskSorter } from "../services/TaskSorter";

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
  return (
    <div>
      <h1 className="m-5">Tasks</h1>
      <SortTasks onSortChange={setSortOption} />
      <div className="m-5 centered-container">
        <ul className="list-group">
          {tasks.map((task, index) => (
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
                className="form-check-input shadow-none"
                type="checkbox"
                name="task_status"
                id={task.task + task.date}
                checked={task.status} // Checkbox will be checked if status is true
                onChange={() => handleCheckboxChange(index)} // Toggle status on change
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowTasks;
