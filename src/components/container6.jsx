import "./container6.css";
import Frame97 from "../Assets/Frame 97.png";
import Frame99 from "../Assets/Frame 99.png";
import {  Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


function Container6() {
  return (
    <div className="container6">
      <div className="inner">
        <div className="heading">
          <h1 className="text-3xl font-bold">
            Running errands has never been easier!
          </h1>
        </div>
        <div className="playstore">
          <Button as={Link} to="/runam/onboarding/" bg="#010030" color="white">
            GET STARTED
          </Button>
          {/* <img src={Frame97} alt="" />
                    <img src={Frame99} alt="" /> */}
        </div>
      </div>
    </div>
  );
}

export default Container6;
