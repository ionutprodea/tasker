import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Invalid email adress" }).min(5).max(75),
  password: z.string().min(6, { message: "Password is required" }).max(255),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [logging, setLogging] = useState(false);
  const [failedLogin, setFailedLogin] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FormData) => {
    console.log(data);
    setLogging(true);
    axios
      .post("http://localhost:3000/api/auth", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("tasker-auth-token", response.data);
        navigate("/");
        setLogging(false);
        setFailedLogin("");
      })
      .catch((error) => {
        setLogging(false);
        setFailedLogin(error.response.data);
        console.error("Login failed:", error.response.data);
      });
    reset();
  };
  return (
    <div className="app-container d-flex flex-column justify-content-between">
      <div>
        <NavBar />
        <h1 className="m-5">Login</h1>
        {!logging && (
          <div className="m-5 centered-container">
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
              {failedLogin && <p className="form-error">{failedLogin}</p>}
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
                type="text"
                name="password"
                id="password"
                placeholder="Password"
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
        {logging && (
          <div className="m-5 centered-container">
            <div className="spinner-border spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
