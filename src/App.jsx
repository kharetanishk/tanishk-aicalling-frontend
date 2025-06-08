import "./css/App.css";
import "./css/index.css";
import tanupic from "./assets/tanuai.png";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { BsLayoutSidebar } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { toggleAtomstate } from "./states/atoms";
import CallingApp, { Loader } from "./components/Call";
import CallingInterface from "./components/Callinterface";
import { useState } from "react";
import ThankYou from "./components/Thankyou";
import { Aboutproject } from "./components/About";
import Chatinterface from "./components/Chatinterface";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CallingApp />} />
            <Route path="/calling" element={<Loader />} />
            <Route path="/callinginterface" element={<CallingInterface />} />
            <Route path="/chat" element={<Chatinterface />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/aboutproject" element={<Aboutproject />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export const Layout = () => {
  const [isSidebarOpen, setToggleSidebar] = useRecoilState(toggleAtomstate);
  const toggleSidebar = () => setToggleSidebar((prev) => !prev);

  return (
    <div className="mobile-frame">
      <div className="app-container">
        <div className="navbar">
          <div className="navbar-left">
            {!isSidebarOpen && (
              <button className="sidebar-btn" onClick={toggleSidebar}>
                <BsLayoutSidebar />
              </button>
            )}
          </div>

          <p className="appname">Tanishk AI</p>

          <div className="navbar-right">
            <div className="photo-container">
              <img className="profile-pic" src={tanupic} alt="profilepic" />
            </div>
          </div>
        </div>

        {isSidebarOpen && (
          <>
            <Sidebar closeSidebar={toggleSidebar} />
            <div className="overlay" onClick={toggleSidebar}></div>
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
};

const Sidebar = () => {
  const setToggleSidebar = useSetRecoilState(toggleAtomstate);
  const [isclosing, setclosing] = useState(false);
  const handleClose = () => {
    setclosing(true);
    setTimeout(() => {
      setToggleSidebar(false);
    }, 300);
  };

  return (
    <div className={`sidebar ${isclosing ? "slide-out" : "slide-in"}`}>
      <button className="closesidebar" onClick={handleClose}>
        <MdCancel />
      </button>
      <div className="sidebar-content-container">
        <div className="sidebar-content">
          <ul>
            <li>
              <Link to="/" onClick={handleClose}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/chat" onClick={handleClose}>
                Chatinterface
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
