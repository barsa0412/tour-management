// import React, {useEffect, useRef, useState} from "react"; //6.9k (gzipped: 2.7k)
// import "../styles/tour-details.css";
// import { Container, Row, Col, Form, ListGroup } from "reactstrap";
// import { useParams } from "react-router-dom";

// import calculateAvgRating from "./../utils/avgRating";
// import avatar from "../assets/images/avatar.jpg";
// import Booking from "../components/Booking/Booking";
// import Newsletter from "../shared/Newsletter";
// import useFetch from "./../hooks/useFetch";
// import { BASE_URL } from "./../utils/config";

// const TourDetails = () => {
//     const {id} = useParams();
//     const reviewMsgRef = useRef("");
//     const [tourRating, setTourRting] = useState(null);
//     //this is an static data later we will call our api and load our data from database

//     //fetch data from database
//     const {data:tour, loading, error} = useFetch(`${BASE_URL}/tours/${id}`);
//     //destructor propertites from tour object
//     const {photo, title, desc, price, reviews, address, city, distance, maxGroupSize} = tour;

//     const {totalRating, avgRating} = calculateAvgRating(reviews);
//     //format date
//     const options = {day: "numeric", month: "long", year: "numeric"};

//     //submit request to the server
//     const submitHandler = e =>{
//         e.preventDefault();
//         const reviewText = reviewMsgRef.current.value;

//         // alert(`${reviewText}, ${tourRating}`)
//         //later will call our api
//     };

//     useEffect(()=>{
//         window.scrollTo(0,0)
//     },[tour]);

//     return ( <>
//     <section>
//         <Container>
//             {loading && <h4 className="text-center pt-5">Loading......</h4> }
//             {error && <h4 className="text-center pt-5">{error}</h4> }
//            {
//             !loading && !error (
//                 <Row>
//                 <Col lg="8">
//                 <div className="tour__content">
//                     <img src={photo} alt="" />
//                     <div className="tour__info">
//                         <h2>{title}</h2>
//                         <div className="d-flex align-items-center gap-5">
//                             <span className="d-flex align-items-center gap-1">
//                 <i class="ri-user-star-line" style={{color : "orange"}}
//                 ></i> {avgRating === 0 ? null : avgRating }
//                 {totalRating === 0 ? (
//                     "Not rated" 
//                 ) : (
//                      <span>({reviews?.length})</span> 
//                     )}
//                 </span>

//                 <span>
//                 <i class="ri-map-pin-user-fill"></i> {address}
//                 </span>
//                         </div>
//                         <div className="tour__extra-details">
//                             <span> <i class="ri-map-pin-5-line"></i>{city}</span>
//                             <span> <i class="ri-price-tag-line"></i>${price} /per person</span>
//                             <span> <i class="ri-pin-distance-line"></i>{distance} k/m</span>
//                             <span> <i class="ri-group-3-line"></i>{maxGroupSize} people</span>
                            
//                         </div>
//                         <h5>Description</h5>
//                         <p>{desc}</p>
//                     </div>
//                     {/* ============ tour review section =========== */}
//                     <div className="tour__reviews mt-4">
//                         <h4>Reviews({reviews?.length}reviews) </h4>
//                         <Form onSubmit={submitHandler}>
//                             <div className="d-flex align-items-center gap-3 mb-4 rating__group">
//                                 <span onClick={()=> setTourRting(1)}>1<i class="ri-star-s-line"></i></span>
//                                 <span onClick={()=> setTourRting(2)}>2<i class="ri-star-s-line"></i></span>
//                                 <span onClick={()=> setTourRting(3)}>3<i class="ri-star-s-line"></i></span>
//                                 <span onClick={()=> setTourRting(4)}>4<i class="ri-star-s-line"></i></span>
//                                 <span onClick={()=> setTourRting(5)}>5<i class="ri-star-s-line"></i></span>
//                             </div>
//                             <div className="review__input">
//                                 <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" required />
//                                 <button type="submit" className="btn primary__btn text white" >
//                                     Submit
//                                 </button>
//                             </div>
//                         </Form>
//                         <ListGroup className="user__reviews">
//                             {
//                                 reviews?.map(review =>(
//                                     <div className="review__item">
//                                         <img src={avatar} alt="" />
//                                         <div className="w-100">
//                                             <div className="d-flex align-items-center justify-content-between">
//                                                 <div>
//                                                     <h5>muhib</h5>
//                                                     <p>{new Date("01-01-2025").toLocaleDateString("en-US", options )}</p>
//                                                 </div>
//                                                 <span className="d-flex align-items-center  ">
//                                                    5<i class="ri-star-s-line"></i>
//                                               </span>
//                                             </div>
//                                             <h6>Amazing Tour</h6>
//                                         </div>
//                                     </div>
//                                 ))
//                             }
//                         </ListGroup>
//                     </div>
//                     {/* ============ tour review section end =========== */}

//                 </div>
//                 </Col>
//                 <Col lg="4">
//                 <Booking tour={tour} avgRating= {avgRating}/>
//                 </Col>
//             </Row>
//             )
//            }
//         </Container>
//     </section>
//     <Newsletter />
//     </>
//     );
// };

// export default TourDetails;



import React, { useEffect, useRef, useState } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";

import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "./../hooks/useFetch";
import { BASE_URL } from "./../utils/config";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  // Fetch tour data from API
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  // Destructure properties if tour exists
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

  // Calculate ratings safely (assuming calculateAvgRating handles undefined reviews)
  const { totalRating, avgRating } = calculateAvgRating(reviews || []);

  // Format date options
  const options = { day: "numeric", month: "long", year: "numeric" };

  // Submit review handler
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    // Later: call your API to submit the review
    // alert(`${reviewText}, ${tourRating}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && tour && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt={title} />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="d-flex align-items-center gap-1">
                        <i
                          className="ri-user-star-line"
                          style={{ color: "orange" }}
                        ></i>{" "}
                        {avgRating === 0 ? null : avgRating}{" "}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
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
                        <i className="ri-price-tag-line"></i>${price} / per person
                      </span>
                      <span>
                        <i className="ri-pin-distance-line"></i> {distance} k/m
                      </span>
                      <span>
                        <i className="ri-group-3-line"></i> {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                  {/* Tour review section */}
                  <div className="tour__reviews mt-4">
                    <h4>
                      Reviews(
                      {reviews?.length} {reviews?.length === 1 ? "review" : "reviews"}
                      )
                    </h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1<i className="ri-star-s-line"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2<i className="ri-star-s-line"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3<i className="ri-star-s-line"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4<i className="ri-star-s-line"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5<i className="ri-star-s-line"></i>
                        </span>
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button type="submit" className="btn primary__btn text white">
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__reviews">
                      {reviews?.map((review, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="User avatar" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>muhib</h5>
                                <p>
                                  {new Date("01-01-2025").toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                5<i className="ri-star-s-line"></i>
                              </span>
                            </div>
                            <h6>Amazing Tour</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* Tour review section end */}
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

