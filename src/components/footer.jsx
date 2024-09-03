import './footer.css';
import logo from '../Assets/logo_light.png';
import twitter from '../Assets/twitter.png';
import insta from '../Assets/instagram.png';
import face from '../Assets/facebook.png';

function Footer() {
  return (
    <footer className="footer bg-gray-800 text-white py-10 px-4 sm:px-8 md:px-[5%]">
      <div className="top flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="socials flex flex-col items-start gap-4">
          <div className="mainlogo">
            <img src={logo} alt="Runam logo" className="w-32" />
          </div>
          <div className="socialslogo flex gap-4">
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="Twitter logo" className="w-6" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <img src={insta} alt="Instagram logo" className="w-6" />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <img src={face} alt="Facebook logo" className="w-6" />
            </a>
          </div>
        </div>
        <div className="quicklinks">
          <h2 className="header font-semibold text-lg">Quick Links</h2>
          <ul className="links mt-2 space-y-2">
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/faqs" className="hover:underline">FAQs</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>
        <div className="legal">
          <h2 className="header font-semibold text-lg">Legal</h2>
          <ul className="links mt-2 space-y-2">
            <li><a href="/terms" className="hover:underline">Terms and Conditions</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/cookies" className="hover:underline">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="bottom mt-10">
        <hr className="line border-gray-700" />
        <p className="copyright text-center mt-4">©2024 RUNIT. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
