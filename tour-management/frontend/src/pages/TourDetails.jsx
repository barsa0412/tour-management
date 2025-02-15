import React, {useRef, useState} from "react"; //6.9k (gzipped: 2.7k)
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import tourData from "../assets/data/tours";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";

const TourDetails = () => {
    const {id} = useParams();
    const reviewMsgRef = useRef();
    const [tourRating, setTourRting] = useState('');
    //this is an static data later we will call our api and load our data from database

    const tour = tourData.find(tour=> tour.id === id);
    //destructor propertites from tour object
    const {photo, title, desc, price, reviews, address, city, distance, maxGroupSize} = tour;

    const {totalRating, avgRating} = calculateAvgRating(reviews);
    //format date
    const options = {day: "numeric", month: "long", year: "numeric"};

    //submit request to the server
    const submitHandler = e =>{
        e.preventDefault();
        const reviewText = reviewMsgRef.current.value;

        // alert(`${reviewText}, ${tourRating}`)
        //later will call our api
    };

    return ( <>
    <section>
        <Container>
            <Row>
                <Col lg="8">
                <div className="tour__content">
                    <img src={photo} alt="" />
                    <div className="tour__info">
                        <h2>{title}</h2>
                        <div className="d-flex align-items-center gap-5">
                            <span className="d-flex align-items-center gap-1">
                <i class="ri-user-star-line" style={{color : "orange"}}
                ></i> {avgRating === 0 ? null : avgRating }
                {totalRating === 0 ? (
                    "Not rated" 
                ) : (
                     <span>({reviews.length})</span> 
                    )}
                </span>

                <span>
                <i class="ri-map-pin-user-fill"></i> {address}
                </span>
                        </div>
                        <div className="tour__extra-details">
                            <span> <i class="ri-map-pin-5-line"></i>{city}</span>
                            <span> <i class="ri-price-tag-line"></i>${price} /per person</span>
                            <span> <i class="ri-pin-distance-line"></i>{distance} k/m</span>
                            <span> <i class="ri-group-3-line"></i>{maxGroupSize} people</span>
                            
                        </div>
                        <h5>Description</h5>
                        <p>{desc}</p>
                    </div>
                    {/* ============ tour review section =========== */}
                    <div className="tour__reviews mt-4">
                        <h4>Reviews({reviews?.length}reviews) </h4>
                        <Form onSubmit={submitHandler}>
                            <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                                <span onClick={()=> setTourRting(1)}>1<i class="ri-star-s-line"></i></span>
                                <span onClick={()=> setTourRting(2)}>2<i class="ri-star-s-line"></i></span>
                                <span onClick={()=> setTourRting(3)}>3<i class="ri-star-s-line"></i></span>
                                <span onClick={()=> setTourRting(4)}>4<i class="ri-star-s-line"></i></span>
                                <span onClick={()=> setTourRting(5)}>5<i class="ri-star-s-line"></i></span>
                            </div>
                            <div className="review__input">
                                <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" required />
                                <button type="submit" className="btn primary__btn text white" >
                                    Submit
                                </button>
                            </div>
                        </Form>
                        <ListGroup className="user__reviews">
                            {
                                reviews?.map(review =>(
                                    <div className="review__item">
                                        <img src={avatar} alt="" />
                                        <div className="w-100">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <h5>muhib</h5>
                                                    <p>{new Date("01-01-2025").toLocaleDateString("en-US", options )}</p>
                                                </div>
                                                <span className="d-flex align-items-center  ">
                                                   5<i class="ri-star-s-line"></i>
                                              </span>
                                            </div>
                                            <h6>Amazing Tour</h6>
                                        </div>
                                    </div>
                                ))
                            }
                        </ListGroup>
                    </div>
                    {/* ============ tour review section end =========== */}

                </div>
                </Col>
                <Col lg="4">
                <Booking tour={tour} avgRating= {avgRating}/>
                </Col>
            </Row>
        </Container>
    </section>
    </>
    );
};

export default TourDetails;