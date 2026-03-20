import React from "react";
import { Container, Row, Col } from "reactstrap";

const About = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="about__content">
              <h2>About Our Tour Management System</h2>

              <p>
                Welcome to our Tour Management website. This platform helps
                users explore amazing travel destinations and book tours easily.
                Our goal is to make travel planning simple, fast, and enjoyable.
              </p>

              <p>
                You can browse different tours, check details about each
                destination, read reviews from other travelers, and book your
                favorite trips. We provide reliable information so you can plan
                your journey with confidence.
              </p>

              <p>
                Our system is built using modern web technologies like React,
                Node.js, and MongoDB to ensure a smooth and fast experience for
                users.
              </p>

              <h4>Our Features</h4>
              <ul>
                <li>Browse different travel destinations</li>
                <li>Search tours easily</li>
                <li>View tour details and reviews</li>
                <li>Book tours online</li>
                <li>User login and registration system</li>
              </ul>

              <p>
                We believe traveling should be exciting and stress-free. Our
                platform is designed to help travelers discover new places and
                create unforgettable memories.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;