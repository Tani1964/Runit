import "./container5.css";
import Up from "../Assets/up.png";
import Down from "../Assets/down.png";
import Frame371 from "../Assets/Frame 371.png";
import Frame354 from "../Assets/Frame 354 (1).png";

function showInner(text, arrow) {
  const inner = document.getElementById(text);
  const image = document.getElementById(arrow);
  console.log(inner);

  if (inner.classList.contains("text")) {
    inner.classList.remove("text");
    inner.classList.add("textShow");
    image.src = Up;
    console.log(image.src);
  } else {
    inner.classList.remove("textShow");
    inner.classList.add("text");

    image.src = Down;
    console.log(image.src);
  }
}

function Container5() {
  return (
    <div className="container5">
      <div className="inner flex gap-6 w-full">
        <div className="heading gap-4">
          <h1 className="font-bold text-5xl">Here’s how it works</h1>
          <p className="">
            Our platform connects you with trusted helpers, making it easy to
            get things done. Follow these simple steps to get started:
          </p>
        </div>
        <div className="bottom gap-4 flex sm:flex-col md:flex-row ">
          <div className="hidden md:block  ">
            <img className="" src={Frame354} alt="" />
            <img
              className="-translate-y-10 -translate-x-5"
              src={Frame371}
              alt=""
            />
          </div>
          <div className="steps pb-20">
            <div className="con shadow-lg p-4 border-2 border-gray-200 rounded-lg">
              <div className="step flex justify-between ">
                <div className="flex gap-5">
                  <h1 className="num">01.</h1>
                  <p>Sign Up and Create an Account</p>
                </div>
                <img
                  onClick={() => {
                    console.log(0);
                    showInner("text1", "arrow1");
                  }}
                  id="arrow1"
                  src={Down}
                  alt=""
                />
              </div>
              <div id="text1" className="text">
                <p className="inner inner">
                  Enter your phone number and follow the prompts to create your
                  account. It's quick and straightforward.
                </p>
              </div>
            </div>
            <div className="con shadow-lg p-4 border-2 border-gray-200 rounded-lg">
              <div className="step flex justify-between">
                <div className="flex gap-5">
                  <h1 className="num">02.</h1>
                  <p>Post a Your Detailed Task</p>
                </div>
                <img
                  onClick={() => {
                    console.log(0);
                    showInner("text2", "arrow2");
                  }}
                  id="arrow2"
                  src={Down}
                  alt=""
                />
              </div>
              <div id="text2" className="text">
                <p className="inner inner2">
                  Describe the task you need help with. Our platform will
                  connect you with nearby service providers who can assist.
                </p>
              </div>
            </div>
            <div className="con shadow-lg p-4 border-2 border-gray-200 rounded-lg">
              <div className="step flex justify-between">
                <div className="flex gap-5">
                  <h1 className="num">03.</h1>
                  <p>Choose a Provider</p>
                </div>
                <img
                  onClick={() => {
                    console.log(0);
                    showInner("text3", "arrow3");
                  }}
                  id="arrow3"
                  src={Down}
                  alt=""
                />
              </div>
              <div id="text3" className="text">
                <p className="inner inner3">
                  Review the profiles and ratings of available service
                  providers. Choose the one that best fits your needs and
                  budget.
                </p>
              </div>
            </div>
            <div className="con shadow-lg p-4 border-2 border-gray-200 rounded-lg">
              <div className="step flex justify-between">
                <div className="flex gap-5">
                  <h1 className="num">04.</h1>
                  <p>Get It Done</p>
                </div>
                <img
                  onClick={() => {
                    console.log(0);
                    showInner("text4", "arrow4");
                  }}
                  id="arrow4"
                  src={Down}
                  alt=""
                />
              </div>
              <div id="text4" className="text">
                <p className="inner inner4">
                  Confirm the task and track its progress in real-time. Once
                  completed, rate your provider to help maintain high-quality
                  service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container5;
