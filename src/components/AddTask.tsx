import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

const schema = z.object({
  importance: z.string().min(1, { message: "Select importance" }),
  task: z.string().min(3, { message: "Required, at least 3 letters" }),
  date: z.string().refine((value) => /^\d{2}\/\d{2}\/\d{4}$/.test(value), {
    message: "Invalid date format. Use DD/MM/YYYY",
  }),
  details: z.string().min(8, { message: "Required, at least 8 letters" }),
});

type FormData = z.infer<typeof schema>;

const AddTask = () => {
  const [tasks, setTasks] = useState<FormData[]>([]);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("TASKER_TASKS");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("TASKER_TASKS", JSON.stringify(tasks));
  }, [tasks]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setTasks((tasks) => [...tasks, data]);
    reset();
  };

  return (
    <>
      <h2 className="m-3">Add Tasks</h2>
      <div className="m-5 form-container">
        <form className="add-task" onSubmit={handleSubmit(onSubmit)}>
          <select
            {...register("importance")}
            name="importance"
            id="importance"
            className="form-select mb-4"
          >
            <option value="">Importance</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {errors.importance?.message && (
            <p className="form-error">{errors.importance.message}</p>
          )}
          <input
            {...register("task")}
            type="text"
            name="task"
            id="task"
            placeholder="Task..."
            className="form-control mb-4"
          />
          {errors.task?.message && (
            <p className="form-error">{errors.task.message}</p>
          )}
          <input
            {...register("date")}
            type="text"
            name="date"
            id="date"
            placeholder="Date: __/__/20__"
            className="form-control mb-4"
          />
          {errors.date?.message && (
            <p className="form-error">{errors.date.message}</p>
          )}
          <input
            {...register("details")}
            type="text"
            name="details"
            id="details"
            placeholder="Description..."
            className="form-control mb-4 details"
          />
          {errors.details?.message && (
            <p className="form-error">{errors.details.message}</p>
          )}
          <button type="submit" className="btn btn-primary px-5">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
