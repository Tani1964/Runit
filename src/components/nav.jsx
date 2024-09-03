import logo_light from "../Assets/logo_light.png";
import { Link } from "react-scroll";

function Nav() {
  return (
    <div className="flex h-12 w-full justify-between px-6 py-4 items-center shadow-xl fixed bg-white z-10">
      <img
        src={logo_light}
        alt="runam's logo"
        className="h-6 sm:h-8 md:h-10 lg:h-12" // Adjust image height based on screen size
      />
      <ul className="hidden md:flex gap-6 lg:gap-9 text-[rgba(2, 1, 49, 0.6)]">
        <li>
          <Link
            activeClass="active"
            to="container2"
            spy={true}
            smooth={true}
            offset={40}
            duration={500}
            className="cursor-pointer hover:text-black transition-colors"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="container7"
            spy={true}
            smooth={true}
            offset={20}
            duration={500}
            className="cursor-pointer hover:text-black transition-colors"
          >
            FAQs
          </Link>
        </li>
        <li className="cursor-pointer hover:text-black transition-colors">Contact Us</li>
      </ul>
      {/* For smaller screens, you can add a hamburger menu or alternative navigation */}
    </div>
  );
}

export default Nav;
