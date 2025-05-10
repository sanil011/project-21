export default function CountdownTimer({ timeRemaining }) {
    let firstDigit = Math.floor(timeRemaining / 10);
    let secondDigit = timeRemaining % 10;
  
    return (
      <div className="flex justify-center items-center py-[1px] px-1">
        <div
          className="flex gap-1 items-center font-bold text-s text-white"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <div className="w-5 h-8 bg-[#21275B] flex items-center justify-center">
            0
          </div>
  
          <div className="w-5 h-8 bg-[#2b3270] flex items-center justify-center">
            0
          </div>
  
          <div className="h-8 bg-[#2b3270] px-1 mx-1 flex items-center justify-center">
            :
          </div>
  
          <div className="w-5 h-8 bg-[#2b3270] flex items-center justify-center">
            {firstDigit}
          </div>
  
          <div className="w-5 h-8 bg-[#21275B] flex items-center justify-center">
            {secondDigit}
          </div>
        </div>
      </div>
    );
  }
  