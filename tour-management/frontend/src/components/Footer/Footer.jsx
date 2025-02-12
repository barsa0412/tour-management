import React from "react";
import "./footer.css"; //6.9k (gzipped: 2.7k)

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
 
const quick__links = [
    {
        path: "/home",
        display: "Home",
    },
    {
        path: "/about",
        display: "About",
    },
    {
        path: "/tours",
        display: "Tours",
    },
];

const quick__links2 = [
    {
        path: "/gallery",
        display: "Gallery",
    },
    {
        path: "/login",
        display: "Login",
    },
    {
        path: "/register",
        display: "Register",
    },
];

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg="3">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ipsum, iure odio illo beatae laboriosam.</p>
                        <div className="social__links d-flex align-items-center gap-4">
                            <span>
                                <Link to= "#"><i class="ri-youtube-line"></i></Link>
                            </span>
                            <span>
                                <Link to= "#"><i class="ri-github-fill"></i></Link>
                            </span>
                            <span>
                                <Link to= "#"><i class="ri-facebook-circle-line"></i></Link>
                            </span>
                            <span>
                                <Link to= "#"><i class="ri-instagram-line"></i></Link>
                            </span>
                        </div>
                    </div>
                    </Col>
                    <Col lg="3">
                    <h5 className=""></h5>
                    </Col>
                    <Col lg="3"></Col>
                    <Col lg="3"></Col>

                </Row>
            </Container>
        </footer>
    )
};

export default Footer;