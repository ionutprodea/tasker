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
      <ul>
        {tasks.map((task) => (
          <li key={task.date + task.task}>
            {task.task} | {task.importance}{" "}
            <input type="checkbox" name="task_status" id="task_status" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowTasks;
