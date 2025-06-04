import "./App.css";
import About from "./Components/About/About";
import Feature from "./Components/Feature/Feature";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Feature />
      <About />
    </>
  );
}

export default App;
