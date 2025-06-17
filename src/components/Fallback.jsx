import "../css/index.css";
import notfound from "../assets/errorimage.jpg";
export const Fallback = () => {
  return (
    <div className="  w-full h-full  flex bg-[#121929] border-app justify-center items-center border-none overflow-hidden">
      <img
        src={notfound}
        className="w-fit h-fit object-contain rounded-4xl p-12"
        alt="404 not found "
      />
    </div>
  );
};
