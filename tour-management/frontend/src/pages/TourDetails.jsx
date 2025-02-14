import React from "react"; //6.9k (gzipped: 2.7k)
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import tourData from "../assets/data/tours";
import calculateAvgRating from "../utils/avgRating";

const TourDetails = () => {
    const {id} = useParams()
    //this is an static data later we will call our api and load our data from database

    const tour = tourData.find(tour=> tour.id === id)
    //destructor propertites from tour object
    const {photo, title, desc, price, reviews, address, city, distance, maxGroupSize} = tour;

    const {totalRating, avgRating} = calculateAvgRating(reviews)

    return <>
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
                ></i> {calculateAvgRating === 0 ? null : avgRating }
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
                            <span> <i class="ri-group-3-line"></i>{maxGroupSize}</span>

                        </div>
                        <h5>Description</h5>
                        <p>{desc}</p>
                    </div>
                    {/* ============ tour review section =========== */}
                    
                    {/* ============ tour review section end =========== */}

                </div>
                </Col>
            </Row>
        </Container>
    </section>
    </>
};

export default TourDetails;