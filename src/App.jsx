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
    <div id="app">
      <div className="absolute z-20 bg-white">
        <Nav />
      </div>
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
      <Footer />
    </div>
  );
}

export default App;
