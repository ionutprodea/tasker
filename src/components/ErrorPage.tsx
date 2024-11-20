import NavBar from "./NavBar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="app-container d-flex flex-column justify-content-between">
        <div>
          <NavBar />
          <h1 className="m-5">Error 404!</h1>
          <div className="m-5 centered-container">
            <ul className="list-group">
              <div className="d-flex justify-content-start align-items-center">
                <div>
                  <h2>
                    This page doesn't exist. Use the menu to navigate or the
                    link below.
                  </h2>
                  <h2>
                    <Link to={"/"} className="no-tasks-link">
                      Click here!
                    </Link>
                  </h2>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ErrorPage;
