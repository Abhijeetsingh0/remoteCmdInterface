import React from "react";
import "./home.css"

const Home = () => {
  return (
    <div className="container">
    <header>
      <h1>Welcome to Kabutar first draft!</h1>
    </header>
    <br/>
    <div className="row">
      <div className="col-md-6">
        <p>
          Sed eu erat sed purus dictum volutpat. Aenean sit amet purus eros. Cras vel
          magna nec nulla pharetra volutpat.
        </p>
      </div>
      <div className="col-md-6">
        <p>
          Sed eu erat sed purus dictum volutpat. Aenean sit amet purus eros. Cras vel
          magna nec nulla pharetra volutpat.
        </p>
      </div>
    </div>

    <footer>
      <div className="contact-me">
        <h2>Contact Me</h2>
        <p>If you have any questions or inquiries, feel free to reach out.</p>
        <a href="mailto:contact@example.com">Email Me</a>
      </div>
    </footer>
  </div>
  );
};

export default Home;