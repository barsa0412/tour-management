import React,{useRef, useEffect, useContext} from "react"; //6.9k (gzipped: 2.7k)
import { Container, Row, Button} from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";

const nav__links= [
    {
        path:'/home',
        display: 'Home',
    },
    {
        path:'/about',
        display: 'About',
    },
    {
        path:'/tours',
        display: 'Tours',
    },
];

const Header = () => {
    const headerRef = useRef(null);
    const navigate = useNavigate();
    const {user, dispatch} = useContext(AuthContext);

    const logout = () =>{
        dispatch({type: "LOGOUT"})
        navigate("/");
    }

    const stickyHeaderFunc = () => {
        window.addEventListener("scroll", () => {
            if(
                document.body.scrollTop > 80 || 
                document.documentElement.scrollTop > 80){
                headerRef.current.classList.add("sticky__header");
            } else {
                headerRef.current.classList.remove("sticky__header");

            }
        });
    };

useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
});

    return ( <header className="header" ref={headerRef}>
        <Container>
            <Row>
                <div className="nav__wrapper d-flex align-items-center justify-content-between">

                    {/* =============== logo ============== */}
                    <div className="logo">
                        <img src={logo} alt=""></img>
                    </div>
                    {/* =============== logo end ============== */}

                    {/* =============== menu start ============== */}
                    <div className="navigation">
                        <ul className="menu d-flex align-items-center gap-5">
                            {
                                nav__links.map((item,index)=>(
                                    <li className="nav__item" key={index}>
                                        <NavLink to={item.path} className={navClass=> navClass.isActive ? "active__link": ""}>{item.display}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {/* =============== menu end ============== */}

                 <div className="nav__right d-flex align-items-center gap-4">
                   <div className="nav__btns d-flex align-items-center gap-4">

                    {
                        user? ( <>
                        <h5 className="mb-0">{user.username}</h5>
                        <Button className="btn btn-dark" onClick={logout}>Logout</Button>
                        </> ) : ( <>
                        <Button className="btn secondary__btn" style={{ backgroundColor: 'orange', color: 'white' }}>
                       <Link to='/login' style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                   </Button>
                   
                    <Button className="btn primary__btn" style={{ backgroundColor: 'orange', color: 'white' }}>
                                    <Link to='/register' style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
                                </Button>
                        </>
                    )}
                   
                   </div>
                    <span className="mobile__menu"></span>
                    <i class="ri-menu-add-fill"></i>
                 </div>

                </div>
            </Row>
        </Container>
    </header>
    );
};

export default Header;

