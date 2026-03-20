import React, { useState, useContext, useEffect } from "react";
import "./booking.css";
import {
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: "",
    userEmail: "",
    tourName: "",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  useEffect(() => {
    setBooking((prev) => ({
      ...prev,
      userId: user?._id || "",
      userEmail: user?.email || "",
      tourName: title || "",
    }));
  }, [user, title]);

  const handleChange = (e) => {
    setBooking((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) {
      return alert("Please sign in");
    }

    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }

      navigate("/thank-you");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price} <span>/per person</span>
        </h3>
        <span>{avgRating}</span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>

        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              required
              onChange={handleChange}
            />

            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <ListGroup className="list-group">
        <ListGroupItem className="border-0 px-0">
          <h5>₹{price} x {booking.guestSize}</h5>
          <span>₹{Number(price) * Number(booking.guestSize)}</span>
        </ListGroupItem>

        <ListGroupItem className="border-0 px-0">
          <h5>Service charge</h5>
          <span>₹{serviceFee}</span>
        </ListGroupItem>

        <ListGroupItem className="border-0 px-0 total">
          <h5>Total</h5>
          <span>₹{totalAmount}</span>
        </ListGroupItem>
      </ListGroup>

      <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
        Book Now
      </Button>
    </div>
  );
};

export default Booking;