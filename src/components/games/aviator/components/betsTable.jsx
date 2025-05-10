import { cn } from "../../../../utils/utils";
import { memo } from "react";

const BetsTable = ({ historyType, allBets, myBets }) => {
    const data = historyType === "All Bets" ? allBets : myBets;

    return (
        <div className="overflow-x-hidden mx-auto bg-[#111013] h-[400px] w-11/12 ">
            <table className="w-full table-fixed">
                <thead className="">
                    <tr className="border-none p-3">
                        <th className=" p-1 text-left text-[#888] text-xs">
                            {historyType === "All Bets" ? "User" : "Date"}
                        </th>
                        <th className="p-3 text-center text-[#888] text-xs">Bet INR</th>
                        <th className="p-3 text-center text-[#888] text-xs">X</th>
                        <th className="p-3 text-right text-[#888] text-xs">Cash Out INR</th>
                    </tr>
                </thead>
            </table>
            <div className="max-h-[300px] overflow-y-auto w-full">
                <table className="w-full table-fixed border-separate border-spacing-y-2 ">
                    <tbody className="h-[100px] w-full">
                        {data && data.map((result) => {
                            if (historyType === "My Bets" && result.placedAt) {
                                const [year, month, day, hours, minutes] = result.placedAt;
                                const formattedTime = `${hours}:${minutes}`;
                                const formattedDate = `${day}-${month}-${year}`;

                                return (
                                    <tr
                                        key={result.betId}
                                        className={cn("rounded-2xl overflow-hidden ", )}>
                                        <td colSpan={4}>
                                            <div className={cn(" bg-[#1a1a1a] rounded-lg shadow-sm px-2 py-1 grid grid-cols-4 items-center",result.betState == 'WON' && " bg-[#203213]")}>
                                                <div className="text-white text-left text-xs">
                                                    <div>{formattedTime}</div>
                                                    <div>{formattedDate}</div>
                                                </div>
                                                <div className="text-white text-center text-xs">{result.amount}</div>
                                                <div className={cn('text-center text-xs', result.encashedMultiplier > 2.0 ? "text-purple-600" : "text-blue-500")}>
                                                    <span className={cn(result.encashedMultiplier >= 1.0 ? "px-2 py-1 rounded-full bg-black" : "")}>
                                                        {result.encashedMultiplier > 1.0 ? result.encashedMultiplier + "x" : "_"}
                                                    </span>
                                                </div>
                                                <div className="text-white text-right text-xs">{result.encahsedAmount}</div>
                                            </div>
                                        </td>

                                    </tr>
                                );
                            } else {
                                return (
                                    <tr
                                        key={result.userName + result.buttonId}
                                        className={cn("rounded-xl border-none overflow-hidden",)}
                                    >
                                        
                                        <td colSpan={4}>
                                            <div className={cn("bg-[#1a1a1a] rounded-lg shadow-sm px-2 py-1 grid grid-cols-4 items-center", result.multiplier && result.multiplier >= 1 ? "bg-[#203213]" : "")}>

                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src="" // Add actual image URL if available
                                                        alt={result.userName}
                                                        className="w-6 h-6 rounded-full inline"
                                                    />
                                                    <span>
                                                        {result.userName &&
                                                            result.userName[0] +
                                                            "***" +
                                                            result.userName[result.userName.length - 1]}
                                                    </span>
                                                </div>

                                                <div className="text-white text-center text-xs">{result.amount}</div>
                                                <div
                                                    className={`text-center text-xs ${result.multiplier && result.multiplier > 2
                                                        ? "text-purple-600"
                                                        : "text-blue-500"
                                                        }`}
                                                >
                                                    <span
                                                        className={`${result.multiplier && result.multiplier >= 1
                                                            ? "px-2 py-1 rounded-full bg-black"
                                                            : ""
                                                            }`}
                                                    >
                                                        {result.multiplier && result.multiplier > 1.0
                                                            ? result.multiplier + "x"
                                                            : ""}
                                                    </span>
                                                </div>

                                                <div className="text-white text-right text-xs">{result.encashedAmount}</div>
                                            </div>
                                        </td>
                                       
                                       

                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};



export default memo(BetsTable);

