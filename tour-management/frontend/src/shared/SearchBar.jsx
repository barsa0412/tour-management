import React from "react"; //6.9k (gzipped: 2.7k)
import './search-bar.css'
import { Col, Form, FormGroup } from "reactstrap";

const SearchBar = () => {
    return <col lg='12'>
        <div className="search__bar">
            <Form className="d-flex align-items-center gap-4">
                <FormGroup className="d-flex gap-3 form__group form__group-fast">
                    <span><i class="ri-map-pin-3-line"></i></span>
                    <div>
                        <h6>Location</h6>
                        <input type="text" placeholder="Where Are You Going? " />
                    </div>
                </FormGroup>
                <FormGroup className="d-flex gap-3 form__group form__group-fast">
                    <span><i class="ri-map-pin-4-line"></i></span>
                    <div>
                        <h6>Distance</h6>
                        <input type="number" placeholder="Distance k/m " />
                    </div>
                </FormGroup>
                <FormGroup className="d-flex gap-3 form__group form__group-last">
                    <span><i class="ri-group-line"></i></span>
                    <div>
                        <h6>Max People</h6>
                        <input type="number" placeholder="0 " />
                    </div>
                </FormGroup>
            </Form>
        </div>
    </col>
};

export default SearchBar;