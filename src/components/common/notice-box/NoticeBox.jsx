import { LocalFireDepartment } from "@mui/icons-material";
import { Volume2 } from 'lucide-react';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { shortNotices } from "../../../data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NoticeBox = () => {
  const settings = {
    vertical: true,
    verticalSwiping: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    pauseOnHover: false,
  };

  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prev) =>
        prev < shortNotices.length - 1 ? prev + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#446ACC] mx-4 mt-2 flex gap-2 justify-between items-center  rounded-full text-white px-2">
      <Volume2 />
      <div className="relative w-3/5">
        <h1
          className="w-full py-0.5 text-xs "
        >
          {shortNotices[currentNoticeIndex].text}
        </h1>
      </div>
      <Link to="/about-us" className="shrink-0 self-center">
        <button
          className="rounded-full text-[14px] flex items-center gap-1 px-2 py-[1px] text-white border"
          style={{
            background: "linear-gradient(to top right, #2aa8f3, #297bf2)",
            border: "1px solid #7ec4fa",
          }}
        >
          <LocalFireDepartment style={{ fontSize: 16 }} />
          Details
        </button>
      </Link>
    </div>
  );
};

export default NoticeBox;
