import { ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom"


const Feedback = () => {

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // Go back one step in history
  }


  return (
    <div className="text-3xl font-semibold  text-white">
      <div className="relative bg-[#2b3270] h-12 flex items-center justify-center">
        <ChevronLeft onClick={handleBack} className="absolute left-0 ml-2" />
        <h1 className="text-2xl font-semibold text-center">Feedback</h1>
      </div>

      <div>
        <img className='object-contain w-full h-full' src='https://www.tirangagame.top/assets/png/feedbackImg-b7a3bd03.png' />
      </div>

      <div className='px-2 mx-auto mt-6'>
        <textarea placeholder='Please write your feedback here...' className='p-1 border border-gray-400 w-full rounded-md outline-none text-sm font-light' rows={7} />
        <button className='text-base bg-blue-400 py-1.5 rounded-sm w-full'>Submit</button>
      </div>




    </div>
  );
};

export default Feedback;
