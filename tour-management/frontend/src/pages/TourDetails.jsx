
import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";

import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    reviews,
    address,
    city,
    distance,
    maxGroupSize,
  } = tour || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews || []);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      return alert("Please sign in");
    }

    const reviewObj = {
      username: user.username,
      reviewText: reviewMsgRef.current.value,
      rating: tourRating,
    };

    try {
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }

      alert(result.message);
      window.location.reload();

    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">

                  <img
                    src={`${BASE_URL.replace("/api/v1", "")}/uploads/${photo}`}
                    alt={title}
                  />

                  <div className="tour__info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="d-flex align-items-center gap-1">
                        <i className="ri-user-star-line" style={{ color: "orange" }}></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? "Not rated" : <span>({reviews?.length})</span>}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-5-line"></i> {city}
                      </span>

                      <span>
                        <i className="ri-price-tag-line"></i> ${price} / per person
                      </span>

                      <span>
                        <i className="ri-pin-distance-line"></i> {distance} km
                      </span>

                      <span>
                        <i className="ri-group-3-line"></i> {maxGroupSize} people
                      </span>
                    </div>

                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length || 0})</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <span key={num} onClick={() => setTourRating(num)}>
                            {num}<i className="ri-star-s-line"></i>
                          </span>
                        ))}
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />

                        <button type="submit" className="btn primary__btn text-white">
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="avatar" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>

                                <p>
                                  {new Date(review.createdAt).toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>

                              <span className="d-flex align-items-center">
                                {review.rating}
                                <i className="ri-star-s-line"></i>
                              </span>
                            </div>

                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default TourDetails;

