import './footer.css';
import logo from '../Assets/logo_light.png'
import twitter from '../Assets/twitter.png'
import insta from '../Assets/instagram.png'
import face from '../Assets/facebook.png'

function Footer(){
    return(
        <div className="footer pt-10">
            <div className="top">
                <div className="socials">
                    <div className="mainlogo">
                        <img src={logo} alt="runam logo"/>
                    </div>
                    <div className="socialslogo">
                        <img src={twitter} alt="twitter logo"/>
                        <img src={insta} alt="instagram logo"/>
                        <img src={face} alt="facebook logo"/>
                    </div>
                </div>
                <div className="quicklinks">
                    <h1 className="header">Quick Links</h1>
                    <ul className="links">
                        <li>About</li>
                        <li>FAQs</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="legal">
                    <h1 className="header">Legal</h1>
                    <ul className="links">
                        <li>Terms and Conditions</li>
                        <li>Privacy policy</li>
                        <li>Cookies</li>
                    </ul>
                </div>
            </div>
            <div className="bottom">
                <div className="line"></div>
                <p className="copyright">©2024 RUNIT. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;