import Other17 from "../Assets/Other 17.png" 
import Clock from "../Assets/clock.png"

function Container3(){
    return(
        <div id="love">
            <div className="flex flex-col gap-16 justify-center py-24 bg-[#F9F9F9]">
                <div id="heading" className="flex flex-col text-center justify-center ">
                    <h1 className="font-bold text-5xl ">Why Our customers love us</h1>
                    <div className="  flex justify-center pt-6"> 
                    <p className="w-[40%]">At RUNIT TECHNOLOGIES, we pride ourselves on creating a seamless and efficient experience for our users. Here’s why our customers love us:</p>
                    </div>
                </div>
                <div id="cards" className='md:flex px-28 gap-4'>
                    <div id="card1" className=" bg-[#EBEDF5] rounded-md">
                        <div className="flex justify-end">
                            <img className="rounded-md" src={Other17}alt=""/>
                        </div>
                        
                        <div className="p-2 ">
                            <h4 className="font-bold">Ease</h4>
                            <p>Create errand requests easily and quickly, with the touch of a button</p>
                        </div>
                        
                    </div>
                    <div id="card2" className=" flex bg-[#E9FAF9] rounded-md">
                        <div className=" flex flex-col justify-end p-2 ">
                            <h4 className="font-bold">Save Time</h4>
                            <p>Get things done faster and more efficiently, freeing up your time for what matters most.</p>
                        </div>
                        
                    </div>
                    <div id="card3" className="bg-[#ECECEF] rounded-md">
                        <div className="flex justify-end">
                            <img className="rounded-md" src={Clock} alt=""/>
                        </div>
                        
                        <div className="p-2 ">
                            <h4 className="font-bold">Reliable Service</h4>
                            <p>Connect with trustworthy service providers who deliver on their promises, ensuring peace of mind.</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Container3;