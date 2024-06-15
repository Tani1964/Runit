import logo_light from "../Assets/logo_light.png";
import { Link } from "react-scroll";

function Nav() {
  return (
    <div className="flex h-12 w-full justify-between px-6 py-10 pr-6 items-center shadow-xl fixed bg-white">
      <img src={logo_light} alt="runam's logo" className=" h-16" />
      <ul className="invisible md:visible flex gap-9 text-[rgba(2, 1, 49, 0.6);
]">
        <Link
          activeClass="active"
          to="container2"
          spy={true}
          smooth={true}
          offset={40}
          duration={500}
        >
          About Us
        </Link>
        <Link
          activeClass="active"
          to="container7"
          spy={true}
          smooth={true}
          offset={20}
          duration={500}
        >
          FAQs
        </Link>
        <li>Contact US</li>
      </ul>
    </div>
  );
}

export default Nav;
