import "./css/App.css";
import "./css/index.css";
import profilepic from "./assets/profilepic.jpg";
import tanupic from "./assets/tanuai.jpg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { BsLayoutSidebar } from "react-icons/bs";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const Layout = () => {
  function handleclick() {
    console.log("hello world");
  }

  return (
    <div className="navbar">
      <button className="sidebar" onClick={handleclick}>
        <BsLayoutSidebar />
      </button>
      <p className="appname">TanishkGPT</p>
      <div className="photo-container">
        <img className="profile-pic" src={tanupic} alt="profilepic" />
      </div>
    </div>
  );
};

export default App;
