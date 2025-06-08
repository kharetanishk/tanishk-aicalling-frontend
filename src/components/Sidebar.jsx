import { toggleAtomstate } from "../states/atoms.js";
import { MdCancel } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";
import { FaGithub } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

export const Sidebar = () => {
  const setToggleSidebar = useSetRecoilState(toggleAtomstate);
  const [isclosing, setclosing] = useState(false);

  useEffect(() => {
    if (isclosing) {
      const timer = setTimeout(() => {
        setToggleSidebar((prev) => !prev);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isclosing]);
  const handleClose = () => {
    setclosing(true);
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
                <FaHome />
                Home
              </Link>
            </li>
            <li>
              <Link to="/chat" onClick={handleClose}>
                <IoChatbubbleEllipses />
                Chat-with-AI
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/kharetanishk"
                target="_blank"
                onClick={handleClose}
                rel="noopener noreferrer"
              >
                <FaGithub />
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/tanishk-khare-91290930a/"
                target="_blank"
                onClick={handleClose}
                rel="noopener noreferrer"
              >
                <FaLinkedin />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:tanishk16012004@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BiLogoGmail />
                Gmail
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar-footer">© 2025 Tanishk Khare—Made with ❤️</div>
    </div>
  );
};
