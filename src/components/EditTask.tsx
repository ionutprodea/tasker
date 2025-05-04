import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import axios from "axios";
import { API_URL } from "../services/apiEndpoint";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  importance: z.string().min(1, { message: "Select importance" }),
  task: z
    .string()
    .min(3, { message: "Required, at least 3 letters" })
    .max(16, { message: "Maximum 16 letters" }),
  date: z
    .string()
    .refine((value) => /^\d{2}\/\d{2}\/\d{4}$/.test(value), {
      message: "Invalid date format. Use DD/MM/YYYY",
    })
    .refine(
      (value) => {
        const [day, month, year] = value.split("/").map(Number);
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return inputDate >= today;
      },
      {
        message: "Task date is in the past",
      }
    ),
  details: z
    .string()
    .min(8, { message: "Required, at least 8 letters" })
    .max(500, { message: "Maximum 500 letters" }),
});

type FormData = z.infer<typeof schema>;

const EditTask = () => {
  const [updatingTask, setUpdatingTask] = useState(false);
  const [taskUpdated, setTaskUpdated] = useState(false);
  const [addError, setAddError] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const navigateTarget = sessionStorage.getItem("tasker-edit-redirect");

  useEffect(() => {
    axios
      .get(`${API_URL}/tasks/${params.id}`, {
        headers: {
          "x-auth-token": sessionStorage.getItem("tasker-auth-token"),
        },
      })
      .then((response) => {
        console.log(response);
        reset({
          task: response.data.task,
          date: response.data.date,
          importance: response.data.importance,
          details: response.data.details,
        });
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setUpdatingTask(true);
    axios
      .put(`${API_URL}/tasks/${params.id}`, data, {
        headers: {
          "x-auth-token": sessionStorage.getItem("tasker-auth-token"),
        },
      })
      .then((response) => {
        console.log("Task added", response.data);
        setUpdatingTask(false);
        setTaskUpdated(true);
        if (navigateTarget === "home") navigate("/");
        else navigate("/tasks");
      })
      .catch((error) => {
        setUpdatingTask(false);
        console.log(error.response?.data || error.message);
        if (error.response) setAddError(error.response.data);
        else if (error.request) setAddError("No response from the server");
        else setAddError("Unexpected error. Please try again");
      });
    reset();
  };
  return (
    <>
      <Helmet>
        <title>Add Tasks</title>
        <meta property="og:title" content="Add Tasks" />
        <meta
          name="description"
          content="Edit tasks from your Tasker to-do list. Stay organized and boost productivity by managing your daily tasks effortlessly."
        />
        <meta
          property="og:description"
          content="Edit tasks from your Tasker to-do list. Stay organized and boost productivity by managing your daily tasks effortlessly."
        />
        <meta
          name="keywords"
          content="Edit Task in Tasker, Simple To-Do App, Task Management App"
        />
        <meta
          property="og:keywords"
          content="Edit Task in Tasker, Simple To-Do App, Task Management App"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="app-container d-flex flex-column justify-content-between">
        <div className="mb-5">
          <NavBar />
          <h1 className="m-5">Edit Task</h1>
          {taskUpdated && <p className="text">Task updated successfully</p>}
          {!updatingTask && (
            <div className="m-5 centered-container">
              <form className="add-task" onSubmit={handleSubmit(onSubmit)}>
                {addError && <p className="form-error">{addError}</p>}
                <input
                  {...register("task")}
                  type="text"
                  name="task"
                  id="task"
                  className="form-control mb-4"
                  autoComplete="off"
                />
                {errors.task?.message && (
                  <p className="form-error">{errors.task.message}</p>
                )}
                <input
                  {...register("date")}
                  type="text"
                  name="date"
                  id="date"
                  className="form-control mb-4"
                  autoComplete="off"
                />
                {errors.date?.message && (
                  <p className="form-error">{errors.date.message}</p>
                )}
                <select
                  {...register("importance")}
                  name="importance"
                  id="importance"
                  className="form-select mb-4"
                >
                  <option value="">Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                {errors.importance?.message && (
                  <p className="form-error">{errors.importance.message}</p>
                )}
                <textarea
                  {...register("details")}
                  name="details"
                  id="details"
                  className="form-control mb-4 details"
                  autoComplete="off"
                />
                {errors.details?.message && (
                  <p className="form-error">{errors.details.message}</p>
                )}
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn px-5"
                  >
                    Update Task
                  </button>
                </div>
              </form>
            </div>
          )}
          {updatingTask && (
            <div className="m-5 centered-container">
              <div className="spinner-border spinner" role="status">
                <span className="visually-hidden">Posting...</span>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default EditTask;
