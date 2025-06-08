import { toggleAtomstate } from "../states/atoms.js";
import { MdCancel } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
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
