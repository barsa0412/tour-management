import React, { useState } from "react";
import "./newsletter.css";

import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    alert("Subscribed successfully");
    setEmail("");
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information.</h2>

              <div className="newsletter__input">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  className="btn newsletter__btn"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                fugit ipsam officia libero alias nemo.
              </p>
            </div>
          </Col>

          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;