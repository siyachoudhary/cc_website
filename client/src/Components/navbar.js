import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../Resources/images/logo.png"

// stylesheet for navbar
import './navbar.css'

import { useEffect, useRef, useState } from 'react';

function MyNav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isStudent, setIsStudent] = useState(false);

    useEffect(() => {
      if(localStorage.getItem("user")){
        setIsLoggedIn(true)
        if(JSON.parse(localStorage.getItem("user")).user_type=="student"){
          setIsStudent(true)
        }else{
          setIsStudent(false)
        }
      }
    });

  // Hamburger menu toggle
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [navOpen, setNavOpen] = useState(false);

    const [y, setY] = useState(0);

    const handleNavigation = (e) => {

        const window = e.currentTarget;
    
        if (y > window.scrollY || y < window.scrollY) {
    
          if (window.innerWidth <= 991 && document.getElementById("responsive-navbar-nav").classList.contains("show")) {
    
            document.getElementById("responsive-navbar-nav").classList.remove("show");
            document.getElementById("toggle_btn").classList.remove("open");
            setNavOpen(navOpen => !navOpen);
          
          }
    
          else if (window.innerWidth > 991 && document.getElementById("responsive-navbar-nav").classList.contains("show")) {
    
            document.getElementById("responsive-navbar-nav").classList.remove("show");
    
          }
    
    
        }
    
        setY(window.y);
    
      };


      useEffect(() => {

        setY(window.scrollY);
        window.addEventListener("scroll", (e) => handleNavigation(e));
    
        if (windowSize.current[0] <= 991) {
    
          document.getElementById("responsive-navbar-nav").classList.add("collapsing");
          document.getElementById("responsive-navbar-nav").classList.remove("collapse");
    
        }
    
      }, []);

      // toggle for phone size
    const toggleNav = () => {

        if (windowSize.current[0] <= 991) {
    
          document.getElementById("responsive-navbar-nav").classList.add("collapsing");
    
          if (!navOpen) {
    
            document.getElementById("toggle_btn").classList.add("open")
            document.getElementById("responsive-navbar-nav").classList.add("show");
    
          }
          
          else {
    
            document.getElementById("toggle_btn").classList.remove("open")
            document.getElementById("responsive-navbar-nav").classList.remove("show");
    
          }
    
          setNavOpen(navOpen => !navOpen);
    
        }
    
      }

    return (
        <Navbar collapseOnSelect expand="lg"variant="dark" className="navTop myNavbar fixed-top" id="navbarItem">
            <Container>

              {isLoggedIn?
                  <Navbar.Brand href="/home" className={"myLogo"}>
                    <img src={Logo} width={75}/>
                    {/* {isLoggedIn?<a href={"/home"} className={"myName"}>Conant Connect</a>:<a href={"/"} className={"myName"}>Conant Connect</a>} */}
                  </Navbar.Brand>:
                  <Navbar.Brand href="/" className={"myLogo"}>
                    <img src={Logo} width={75}/>
                    {/* {isLoggedIn?<a href={"/home"} className={"myName"}>Conant Connect</a>:<a href={"/"} className={"myName"}>Conant Connect</a>} */}
                  </Navbar.Brand>
              }
                
                {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" className='toggleBtn'/> */}
                <button className = "navbar-toggler second-button toggleBtn" type = "button" data-toggle = "collapse" data-target = "#responsive-navbar-nav"
              aria-controls = "responsive-navbar-nav" aria-expanded = "false" aria-label = "Toggle navigation" onClick = {toggleNav}>
              <div className = "animated-icon2" id = {"toggle_btn"}><span></span><span></span><span></span><span></span></div>
            </button>
                <Navbar.Collapse id="responsive-navbar-nav" className='navbar-collapse'>
                    <Nav className="me-auto">
                        {/*<Nav.Link href="#features">Conant Connact</Nav.Link>*/}
                    </Nav>
                    {isLoggedIn?
                      <Nav>
                          <CustomLink href={"/home"}>Home</CustomLink>
                          <CustomLink href={"/explore"}>Explore</CustomLink>
                          <CustomLink href={"/profile"}>Profile</CustomLink>
                          {isStudent?<CustomLink href={"/myMentors"}>My Mentors</CustomLink>: <CustomLink href={"/myStudents"}>My Students</CustomLink>}
                      </Nav> :
                      <Nav>
                          <CustomLink href={"/login"}>Login</CustomLink>
                          <CustomLink href={"/signup"}>Sign Up</CustomLink>
                      </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

// Custom link component for navbar items
function CustomLink({href, children, ...props}){
    const path = window.location.pathname
    return (
        path===href?
        <Nav.Link href={href} {...props} className={"active"}>{children}</Nav.Link>:
            <Nav.Link href={href} {...props}>{children}</Nav.Link>
    )

}

export default MyNav;