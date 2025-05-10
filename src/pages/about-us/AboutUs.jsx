import { notices } from "../../data";
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom"


const AboutUs = () => {

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // Go back one step in history
  }
  return (
    <div className="text-white text-xl flex flex-col justify-center gap-5">
      <div className="relative bg-[#2b3270] h-12 flex items-center justify-center">
        <ChevronLeft onClick={handleBack} className="absolute left-0 ml-2" />
        <h1 className="text-2xl font-semibold text-center">About us</h1>
      </div>

      <div>
        <img src='https://www.tirangagame.top/assets/png/aboutBg-0e9d0afa.png'/>
      </div>

      
      <div className="px-2">
      {notices.map((notice) => (
        <div key={notice.id} className="text-xs my-2">{notice.text}</div>
      ))}
      </div>
    </div>
  );
};

export default AboutUs;
