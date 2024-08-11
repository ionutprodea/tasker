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
  useEffect(() => {
    window.localStorage.setItem("TASKER_TASKS", JSON.stringify(tasks));
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register("importance")} name="importance" id="importance">
          <option value="">Importance</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        {errors.importance?.message && <p>{errors.importance.message}</p>}
        <input
          {...register("task")}
          type="text"
          name="task"
          id="task"
          placeholder="Task..."
        />
        {errors.task?.message && <p>{errors.task.message}</p>}
        <input
          {...register("date")}
          type="text"
          name="date"
          id="date"
          placeholder="Date: __/__/20__"
        />
        {errors.date?.message && <p>{errors.date.message}</p>}

        <input
          {...register("details")}
          type="text"
          name="details"
          id="details"
          placeholder="Description..."
        />
        {errors.details?.message && <p>{errors.details.message}</p>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddTask;
