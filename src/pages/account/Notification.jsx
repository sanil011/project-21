import { Megaphone } from "lucide-react"
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom"


const Notification = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // Go back one step in history
  }
  return (
    <div className="text-3xl font-semibold  text-white">
      <div className="relative bg-[#2b3270] h-12 flex items-center justify-center">
        <ChevronLeft onClick={handleBack} className="absolute left-0 ml-2" />
        <h1 className="text-2xl font-semibold text-center">Notification</h1>
      </div>

      <div className="w-11/12 mx-auto">
        <WarningBanner />
        <WarningBanner />
        <WarningBanner />
      </div>

    </div>
  );
};

export default Notification;



function WarningBanner() {
  // Get current date and time for the timestamp
  const now = new Date()
  const formattedDate = now.toISOString().split("T")[0]
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const seconds = now.getSeconds().toString().padStart(2, "0")
  const timestamp = `${formattedDate} ${hours}:${minutes}:${seconds}`

  return (
    <div className="bg-[#2B3270] text-white p-4 rounded-md shadow-md my-4">
      <div className="flex items-center gap-3 mb-2">
        <Megaphone className="h-6 w-6 text-white" />
        <h2 className="text-lg">Avoid Scammer And Phising Link</h2>
      </div>
      <p className="text-xs text-gray-300 mb-4 font-light ">
        Please be sure to always use our official website for playing the games with the following link,
        <a href="https://tirangacasino.win" className="text-blue-300 hover:underline mx-1">
          https://tirangacasino.win
        </a>
        . Please always check our official link to access our website and avoid scammers and phishing links
      </p>
      <p className="text-sm text-gray-300 font-light">{timestamp}</p>
    </div>
  )
}


