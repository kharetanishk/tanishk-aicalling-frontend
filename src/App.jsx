import "./css/App.css";
import "./css/index.css";
import tanupic from "./assets/tanuai.png";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { BsLayoutSidebar } from "react-icons/bs";
import { RecoilRoot, useRecoilState } from "recoil";
import { toggleAtomstate } from "./states/atoms";

// ✅ App wrapped in RecoilRoot at the top level
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

const Layout = () => {
  const [issidebarOpen, settoggleSidebar] = useRecoilState(toggleAtomstate);
  const togglesidebar = () => settoggleSidebar((prev) => !prev);

  return (
    <div className="layout-container">
      <div className="navbar">
        <button className="sidebar-btn" onClick={togglesidebar}>
          <BsLayoutSidebar />
        </button>
        <p className="appname">Tanishk AI</p>
        <div className="photo-container">
          <img className="profile-pic" src={tanupic} alt="profilepic" />
        </div>
      </div>
      <div className={`sidebar ${issidebarOpen ? "open" : ""}`}>
        <button className="sidebar-btn" onClick={togglesidebar}></button>
      </div>
      {issidebarOpen && <Sidebar />}
    </div>
  );
};

const Sidebar = () => {
  return <div className="sidebar">hello world</div>;
};

export default App;
