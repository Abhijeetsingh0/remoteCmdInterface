import React from "react";
import { Card, Container } from "react-bootstrap";
import image1 from "../assets/General_green_v2.png" 
import "./home.css"

const Home = () => {
  return (
    <div className="container">
    <header>
      <h1>Welcome to Kabutar very first prototype !</h1>
    </header>
    <Container>
    <Card className="bg-dark text-white">
      <Card.Img src={image1} alt="Card image" />
          <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
      </Card.ImgOverlay>
    </Card>
    </Container>
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
