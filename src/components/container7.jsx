import './container7.css';
import Up from '../Assets/close.png';
import Down from '../Assets/open.png';

function showInner(text, arrow){
    const inner = document.getElementById(text);
    const image = document.getElementById(arrow);
    console.log(inner)
    
    console.log(inner.classList)

    if (inner.classList.contains("text") ) {
        inner.classList.remove("text");
        inner.classList.add("textShow");
        image.src = Up;
        console.log(0)
    } else {
        inner.classList.remove("textShow");
        inner.classList.add("text");
        image.src = Down;
        console.log(1)
    }
}

function Container7(){
    return(
        <div className="container7  bg-[#F9F9F6] mb-10 py-20">
            <div className="inner text-black py-10">
                <div className="heading">
                    <h1 className="head text-3xl font-bold">FAQs</h1>
                </div>
                <div className="bottom h-fit">
                    <div className="steps">
                        <div className="con  shadow-lg p-4 border-2 border-gray-200 rounded-lg bg-white">
                            <div className="step flex justify-between ">
                                <h1 className="num">How do we ensure the security of packages and personnel?</h1>
                                <img onClick={()=>{
                                    showInner('text5', 'arrow5')
                                }} id="arrow5" src={Down} alt=""/>
                            </div>
                            <div id="text5" className="text text-black">
                                <p className="inner inner text-black">
                                We employ a robust tracking system to ensure the safety of both packages and personnel. Additionally, we require users to sign up with government or national IDs to ensure accountability and security.
                                </p>
                            </div>
                        </div>
                        <div className="con  shadow-lg p-4 border-2 border-gray-200 rounded-lg bg-white">
                            <div className="step flex justify-between">
                                <h1 className="num">How do we ensure quality among service providers?</h1>
                                <img onClick={()=>{ showInner('text6', 'arrow6')
                                }} id="arrow6" src={Down}  alt=""/>
                            </div>
                            <div id="text6" className="text text-black">
                                <p className="inner inner text-black">
                                We use a rating system to evaluate task creators and task creators, ensuring that only the best service providers gain visibility. This helps maintain high-quality interactions and allows us to penalize those who do not meet our standards.
                                </p>
                            </div>
                        </div>
                        <div className="con  shadow-lg p-4 border-2 border-gray-200 rounded-lg bg-white">
                            <div className="step flex justify-between">
                                <h1 className="num">How quickly can I get my service?</h1>
                                <img onClick={()=>{showInner('text7', 'arrow7')
                                }} id="arrow7" src={Down}  alt=""/>
                            </div>
                            <div id="text7" className="text text-black">
                                <p className="inner inner text-black">
                                Our platform connects customers with the nearest service providers, ensuring rapid response times and efficient service delivery.
                                </p>
                            </div>
                        </div>
                        <div className="con  shadow-lg p-4 border-2 border-gray-200 rounded-lg bg-white">
                            <div className="step flex justify-between">
                                <h1 className="num">Are payments secure?</h1>
                                <img onClick={()=>{showInner('text8', 'arrow8')
                                }} id="arrow8" src={Down}  alt=""/>
                            </div>
                            <div id="text8" className="text ">
                                <p className="inner inner text-black">
                                Yes. We use a secure payment system where the task creators deposit funds in escrow. The task receptor is paid only when the task is completed and verified by both parties through QR code scanning.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Container7;