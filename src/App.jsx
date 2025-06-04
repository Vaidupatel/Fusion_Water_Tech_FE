import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      {/* <div className="h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Hero Section</h1>
          <p className="text-xl opacity-90">
            Scroll down to see the navbar transition
          </p>
        </div>
      </div> */}
      <div className="bg-gray-50">
        {["About", "Services", "Portfolio", "Contact"].map((section) => (
          <div
            key={section}
            id={section.toLowerCase()}
            // className="min-h-screen flex items-center justify-center"
            className="h-screen w-full bg-neutral-900 flex items-center justify-center"
            style={{
              backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2) 0.5px, transparent 0)`,
              backgroundSize: "8px 8px",
              backgroundRepeat: "repeat",
            }}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {section} Section
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
