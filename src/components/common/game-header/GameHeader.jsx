import NoticeBox from '../notice-box/NoticeBox';
import { Box } from '@mui/material';
import { AccountBalanceWallet, Autorenew } from '@mui/icons-material';
import { lotteryBackground } from '../../../images';
import CommonHeader from '../../layout/common-header/CommonHeader';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

const GameHeader = () => {
  const { balance, id } = useSelector((store) => store.userData);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // Conditional color based on pathname
  const backgroundColor = pathname.includes("virtual-games/dice") ? "#342e3d" : "#2b3270";

  return (
    <Box className="rounded-b-3xl pb-20 -mb-20" style={{ backgroundColor }}>
      <CommonHeader />
      <Box className="relative text-white mx-4 rounded-2xl shadow-lg p-4 mt-5 overflow-hidden">
        <img
          src={lotteryBackground}
          className="absolute w-full h-full object-cover top-0 left-0 z-0 scale-[1.05]"
        />
        {/* <div className="absolute w-full h-full top-0 left-0" style={{ backgroundColor, opacity: 0.25 }}></div> */}

        <div className="relative z-50">
          <div className="flex items-center justify-center gap-2">
            <h2 className="ml-12 text-center font-bold text-base">₹{balance.toFixed(2)}</h2>
            <Autorenew className="cursor-pointer" sx={{ color: "white", fontSize: 20 }} />
          </div>

          <h1 className="text-center">
            <AccountBalanceWallet
              sx={{ margin: "4px 10px 5px 0", color: "#61a9ff" }}
            />
            Wallet Balance
          </h1>

          <div className="flex w-full justify-between items-center gap-5 mt-3">
            <button
              onClick={() => navigate(`/account/${id}/withdraw`)}
              className="text-lg font-semibold bg-[#D23838] rounded-full px-6 py-1 w-[40%] min-w-[120px]"
            >
              Withdraw
            </button>
            <button
              onClick={() => navigate(`/account/${id}/deposit-history`)}
              className="text-lg font-semibold bg-[#16B05D] rounded-full px-6 py-1 w-[40%] min-w-[120px]"
            >
              Deposit
            </button>
          </div>
        </div>
      </Box>
      <NoticeBox />
    </Box>
  );
}

export default GameHeader;
