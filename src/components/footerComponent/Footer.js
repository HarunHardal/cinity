import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import logo from '../../images/logo.png'

const Footer = () => {
  return (
    <div className="footer-container">
      <span className="footer-line"></span>
      <div className="footer-content-wrapper">
        <div>
          <img className="tmdb-logo" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"></img>
        </div>
        <div>
          <a className="icons">
            <FontAwesomeIcon icon={faGithub} href="https://github.com/HarunHardal"></FontAwesomeIcon>
          </a>
          <a className="icons" href="https://www.linkedin.com/in/harun-hardal-a642a1203/">
            <FontAwesomeIcon icon={faLinkedinIn}></FontAwesomeIcon>
          </a>
          <a className="icons" href="https://www.instagram.com/harun.hardal/">
            <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
          </a>
        </div>
        <div>
          <Link to='/' className="footer-logo">
      <img className="footer-logo-image" src={logo} alt=""></img>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
