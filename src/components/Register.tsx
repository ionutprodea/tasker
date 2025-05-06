import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/apiEndpoint";

const schema = z.object({
  username: z
    .string()
    .min(5, { message: "Username minimum length is 5 characters" })
    .max(75, { message: "Username maximum length is 75 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email adress" })
    .min(5)
    .max(75, { message: "Email adreess maximum length is 75" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(255),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [registering, setRegistering] = useState(false);
  const [failedRegistering, setFailedRegistering] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FormData) => {
    setRegistering(true);
    axios
      .post(`${API_URL}/users`, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("tasker-auth-token", response.data);
        navigate("/");
        setRegistering(false);
        setFailedRegistering("");
      })
      .catch((error) => {
        if (error.response) {
          setFailedRegistering(error.response.data);
        } else if (error.request) {
          setFailedRegistering("No response from server");
        } else {
          setFailedRegistering("Unexpected error. Please try again");
        }
        console.error("Registration failed:", error.response.data);
      });
    reset();
  };
  return (
    <div className="app-container d-flex flex-column justify-content-between">
      <div>
        <NavBar />
        <h1 className="m-5">Register</h1>
        {!registering && (
          <div className="m-5 centered-container">
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
              {failedRegistering && (
                <p className="form-error">{failedRegistering}</p>
              )}
              <input
                {...register("username")}
                type="text"
                name="username"
                id="username"
                placeholder="Username..."
                className="form-control mb-4"
                autoComplete="off"
              />
              {errors.username?.message && (
                <p className="form-error">{errors.username.message}</p>
              )}
              <input
                {...register("email")}
                type="text"
                name="email"
                id="email"
                placeholder="Email..."
                className="form-control mb-4"
                autoComplete="off"
              />
              {errors.email?.message && (
                <p className="form-error">{errors.email.message}</p>
              )}
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
                placeholder="Password..."
                className="form-control mb-4"
                autoComplete="off"
              />
              {errors.password?.message && (
                <p className="form-error">{errors.password.message}</p>
              )}
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary px-5">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
        {registering && (
          <div className="m-5 centered-container">
            <div className="spinner-border spinner" role="status">
              <span className="visually-hidden">Registering...</span>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Register;
