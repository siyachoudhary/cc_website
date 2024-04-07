import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faInstagram, faLinkedin, faYoutube} from "@fortawesome/free-brands-svg-icons";

function MyFooter() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className={"footerContainer"}>
                <h1 className={"footerText"}>CONANT CONNECT © 2024</h1>

            <div>
                <ul>
                    <li className='footerText'>WEBSITE DEVELOPED BY: </li>
                    <li className='footerText'><a href={"https://github.com/siyachoudhary"} target={"_blank"}>SIYA CHOUDHARY</a></li>
                    <li className='footerText'> & </li>
                    <li className='footerText'><a href={"https://github.com/AnjaliVasishth5"} target={"_blank"}>ANJALI VASISHTH</a></li>
                </ul>
            </div>
        </Navbar>
    );
}

export default MyFooter;