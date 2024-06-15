import Nav from "./components/nav";
import Container2 from "./components/container2";
import Container3 from "./components/container3";
import Container4 from "./components/container4";
import Container5 from "./components/container5";
import Container6 from "./components/container6";
import Container7 from "./components/container7";
import Footer from "./components/footer";

function App() {
  return (
    <div id="app ">
      <div className="absolute w-screen z-20 bg-white overflow-x-clip">
        <Nav />
      </div>
      <div className="pt-20">
        <Container2 />
      </div>
      <div>
        <Container3 />
      </div>
      <div>
        <Container4 />
      </div>
      <div>
        <Container5 />
      </div>
      <div>
        <Container6 />
      </div>
      <div>
        <Container7 />
      </div>
      <Footer />
    </div>
  );
}

export default App;
