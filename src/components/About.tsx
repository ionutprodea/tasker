import { Helmet } from "react-helmet";
import Footer from "./Footer";
import NavBar from "./NavBar";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Tasker</title>
        <meta property="og:title" content="About Tasker" />
        <meta
          name="description"
          content="Tasker is a simple and efficient to-do app designed to help you organize tasks, boost productivity, and stay on top of your daily plans.
       Manage tasks effortlessly with an intuitive interface."
        />
        <meta
          property="og:description"
          content="Tasker is a simple and efficient to-do app designed to help you organize tasks, boost productivity, and stay on top of your daily plans.
       Manage tasks effortlessly with an intuitive interface."
        />
        <meta
          name="keywords"
          content="Tasker To-Do App, Simple To-Do App, Task Management App"
        />
        <meta
          property="og:keywords"
          content="Tasker To-Do App, Simple To-Do App, Task Management App"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="app-container d-flex flex-column justify-content-between">
        <div>
          <NavBar />
          <h1 className="m-5">About</h1>
          <div className="m-5 centered-container">
            <section className="text-container">
              <p className="text mb-4">
                Tasker is a simple yet functional to-do application designed to
                help you manage tasks efficiently. The app allows you to add new
                tasks, delete completed or irrelevant ones, and view all your
                tasks in an organized manner. It also includes sorting features
                to better manage your list.
              </p>
              <p className="text mb-4">
                It is built with a mobile-first approach, Tasker is fully
                responsive, offering a seamless experience on small and medium
                display devices. The interface may feel a bit minimal on larger
                screens.
              </p>
              <p className="text mb-4">
                As a frontend-only application, Tasker stores task entries
                locally in your browser's memory (local storage). Please note
                that clearing the local storage will result in the loss of all
                your tasks.
              </p>
              <p className="text mb-4">
                Developed as a demo project for my portfolio, Tasker showcases
                my skills in frontend development. For any enquiries, please use
                the contact form or visit my{" "}
                <a href="https://ionutprodea.ro/" className="website-link">
                  personal website
                </a>
                .
              </p>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
