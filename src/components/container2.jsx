import React, { useEffect } from "react";
import Group99 from "../Assets/Group 99.png";
import Other16 from "../Assets/Other 16.png";
import FastDelivery from "../Assets/fast-delivery.png";
import Package from "../Assets/package.png";
import ShoppingBasket from "../Assets/shopping-basket.png";
import Frame97 from "../Assets/Frame 97.png";
import Frame99 from "../Assets/Frame 99.png";
import Group94 from "../Assets/Group 94.png";

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
      <div id="main" className="flex px-5 py-[16px] justify-between mb-10">
        <div className="grid w-[15%] invisible md:visible">
          <div className="flex justify-end animate-bounce">
            <img src={Group99} alt="" />
          </div>
          <div></div>
          <div className="flex justify-start animate-bounce">
            <img src={Other16} alt="" />
          </div>
        </div>
        <div className="text-center pt-12">
          <div className="flex">
            <h1 className="font-bold  text-5xl flex">
              Helping you get things done,
              <br /> one errand at a time
              <img
                id=""
                className="h-10"
                src={FastDelivery}
                alt="Fast Delivery"
                style={{ animation: "bounce 2s infinite" }}
              />
            </h1>
          </div>
          <div className="mt-10">
            <p className="text-base">
              Get the help you need, when you need it! - RUNIT connects you with
              trusted helpers in <br /> your community, ready to assist you with
              your errands!
            </p>
          </div>
        </div>
        <div className="grid w-[15%] invisible md:visible ">
          <div className="one flex animate-bounce">
            <img src={Package} alt="" />
          </div>
          <div></div>
          <div className="flex justify-end animate-bounce">
            <img src={ShoppingBasket} alt="" />
          </div>
        </div>
      </div>
      <div id="phone_view" className="flex flex-col justify-center gap-10">
        <div id="play_store" className="flex justify-center gap-10">
          <img id="animated-icon" src={Frame97} alt="" />
          <img src={Frame99} alt="" />
        </div>
        <div id="phone_preview" className="flex justify-center">
          <img src={Group94} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Container2;
