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
                help you manage your tasks efficiently. It allows you to add new
                tasks, delete completed or irrelevant ones, and view your tasks
                in an organized, sortable list for better control and clarity.
              </p>
              <p className="text mb-4">
                To use the app, you’ll need to create an account. Your tasks are
                securely stored in a database via API integration, making them
                accessible across devices and safely preserved even if you
                switch browsers or clear your cache. Each account is limited to
                50 task entries. If you need a higher limit, feel free to reach
                out through the contact page.
              </p>
              <p className="text mb-4">
                Built with a mobile-first approach, Tasker is fully responsive,
                delivering a smooth experience on small and medium display
                devices. The interface remains clean and minimal, though it may
                feel a bit spacious on larger screens.
              </p>
              <p className="text mb-4">
                Developed as a demo project for my portfolio, Tasker showcases
                my web development skills. For any enquiries, please use the
                contact form or visit my{" "}
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
