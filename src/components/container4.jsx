import Frame354 from "../Assets/Frame 354 (1).png"
import Frame357 from "../Assets/Frame 357.png"
import Frame358 from "../Assets/Frame 358.png"

function Container4(){
    return(
        <div id="container4 " className=" px-[5%] py-32 flex flex-col gap-8">
            <div className="md:flex justify-between gap-8">
                <div className="md:w-1/2 ">
                    <h1 className="font-bold text-4xl md:w-45">Quick and slick, our setup's a <br/> hit, no fuss, just bliss.</h1>
                    <p className="paragraph">Get the help you need, when you need it - RUNIT connects you with trusted helpers in your community, ready to assist you with your errands! </p>
                </div>
                <div className="invisible  md:visible">
                    <img className="clip" src={Frame354} alt=""/>
                </div>
            </div>
            <div className="md:flex justify-between gap-8">
                <div className="invisible md:visible">
                    <img className="clip" src={Frame357} alt=""/>
                </div>
                <div className="md:w-1/2 ">
                    <h1 className="font-bold text-4xl w-45">Effortless Requests</h1>
                    <p className="paragraph">Create general requests quickly and efficiently through our intuitive app interface. Just a few taps and you're set! </p>
                </div>
            </div>
            <div className="md:flex justify-between gap-8">
                <div className="md:w-1/2">
                    <h1 className="font-bold text-4xl w-45">Streamlined Onboarding</h1>
                    <p className="paragraph">Our user-friendly onboarding process ensures you get started without any hassle, allowing you to focus on what matters most.</p>
                </div>
                <div className="invisible md:visible">
                    <img className="clip" src={Frame358} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Container4;