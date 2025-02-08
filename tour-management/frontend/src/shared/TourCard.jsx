import React from "react"; //6.9k (gzipped: 2.7k)
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const TourCard = ({tour}) => {
    const {id, title, photo, price, featured, avgRating, reviews } = tour
    return <div className="tour__card">
        <Card>
            <div className="tour__img">
                <img src={photo} alt="tour-img" />
                <span>Featured</span>
            </div>
        </Card>
        <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
                <span className="tour__location d-flex align-items-center gap-1">
                <i class="ri-map-pin-range-line"></i>
                </span>
            </div>
        </CardBody>
    </div>;
};

export default TourCard;