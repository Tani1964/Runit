import React, { useEffect } from "react";
import Group99 from "../Assets/Group 99.png";
import Other16 from "../Assets/Other 16.png";
import FastDelivery from "../Assets/fast-delivery.png";
import Package from "../Assets/package.png";
import ShoppingBasket from "../Assets/shopping-basket.png";
import Frame97 from "../Assets/Frame 97.png";
import Frame99 from "../Assets/Frame 99.png";
import Group94 from "../Assets/Group 94.png";
import Frame350 from "../Assets/Frame_350.png";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Container2() {
  useEffect(() => {
    const icon = document.getElementById("animated-icon");

    const onMouseDown = (e) => {
      e.preventDefault();
      const shiftX = e.clientX - icon.getBoundingClientRect().left;
      const shiftY = e.clientY - icon.getBoundingClientRect().top;

      const onMouseMove = (e) => {
        icon.style.left = e.pageX - shiftX + "px";
        icon.style.top = e.pageY - shiftY + "px";
      };

      document.addEventListener("mousemove", onMouseMove);

      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", onMouseMove);
        },
        { once: true }
      );
    };

    icon.addEventListener("mousedown", onMouseDown);

    return () => {
      icon.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <div id="container2" className="pt-10 bg-arrow relative">
      <div
        id="main"
        className="flex flex-col md:flex-row px-5 py-4 justify-between items-center mb-10"
      >
        <div className="grid w-1/5 hidden md:block">
          <div className="flex justify-end animate-bounce">
            <img
              src={Group99}
              alt=""
              className="h-auto max-h-12 md:max-h-16 lg:max-h-20"
            />
          </div>
          <div></div>
          <div className="flex justify-start animate-bounce">
            <img
              src={Other16}
              alt=""
              className="h-auto max-h-12 md:max-h-16 lg:max-h-20"
            />
          </div>
        </div>
        <div className="text-center pt-8 md:pt-12">
          <div className="flex justify-center">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl flex flex-col md:flex-row items-center">
              Helping you get things done,
              <br /> one errand at a time
              <img
                id=""
                className="h-8 sm:h-10 md:h-12"
                src={FastDelivery}
                alt="Fast Delivery"
                style={{ animation: "bounce 2s infinite" }}
              />
            </h1>
          </div>
          <div className="mt-6 md:mt-10">
            <p className="text-sm sm:text-base">
              Get the help you need, when you need it! - RUNIT connects you with
              trusted helpers in <br className="hidden sm:block" /> your
              community, ready to assist you with your errands!
            </p>
          </div>
        </div>
        <div className="grid w-1/5 hidden md:block">
          <div className="flex animate-bounce">
            <img
              src={Package}
              alt=""
              className="h-auto max-h-12 md:max-h-16 lg:max-h-20"
            />
          </div>
          <div></div>
          <div className="flex justify-end animate-bounce">
            <img
              src={ShoppingBasket}
              alt=""
              className="h-auto max-h-12 md:max-h-16 lg:max-h-20"
            />
          </div>
        </div>
      </div>
      <div
        id="phone_view"
        className="flex flex-col items-center gap-6 md:gap-10 -z-10"
        style={{ backgroundImage: `url(${Frame350})`,          // Ensures the image covers the whole div
        backgroundRepeat: 'no-repeat',     // Prevents the image from repeating
        backgroundPosition: 'center',   }}
      >
       <Button as={Link} to="/runam/onboarding/" bg="#1fd0c2" color="white">
  GET STARTED
</Button>

        <div id="play_store" className="flex justify-center gap-6 md:gap-10">
          <img id="animated-icon" src={"Frame97"} alt=""      className="h-10 sm:h-12 md:h-14 lg:h-16"          />
          {/* <img src={Frame99} alt="" className="h-10 sm:h-12 md:h-14 lg:h-16" /> */}
        </div>
        <div id="phone_preview" className="flex justify-center pt-44">
          <img src={Group94} alt="" className="  translate-y-36 " />
        </div>
      </div>
    </div>
  );
}

export default Container2;
