import { useLocation } from "react-router-dom";
import thankyoupic from "../assets/thankyourobot.jpg";
import "../css/Thankyou.css";

const ThankYou = () => {
  const location = useLocation();
  const time = location.state?.time || "00:00:00";

  return (
    <>
      <div className="thank-you-container">
        <img src={thankyoupic} alt="Tanishk" className="thank-you-image" />
        <h3>Thankyou for talking with Tanishk's AI!</h3>
        <p>🕒 Interaction Time: {time}</p>
      </div>
    </>
  );
};

export default ThankYou;
