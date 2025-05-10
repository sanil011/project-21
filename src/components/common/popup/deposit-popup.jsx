
import { useState } from "react"

import { Switch } from '@mui/material';


const DepositPopup = () => {
    const [hideReminders, setHideReminders] = useState(false)

    const tiers = [
        { amount: 100000, bonus: 800, current: 0 },
        { amount: 50000, bonus: 500, current: 0 },
        { amount: 10000, bonus: 200, current: 0 },
        { amount: 5000, bonus: 100, current: 0 },
    ]

    return (
        <div className="w-11/12 mx-auto h-[80vh] rounded-xl overflow-hidden bg-[#384991] text-white">
            

            <div className="p-2 bg-[#384991]">
                <h2 className="text-lg font-bold text-center mb-2">Extra first deposit bonus</h2>
                <p className="text-center text-sm text-gray-300">Each account can only receive rewards once</p>
            </div>

            <div className="p-2 space-y-4 h-[80%] overflow-auto  bg-[#2B3370]">
                {tiers.map((tier, index) => (
                    <div key={index} className="bg-[#384991] rounded-xl p-3">
                        <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-bold">
                                First deposit
                                <span className="text-orange-400 ml-2">{tier.amount.toLocaleString()}</span>
                            </div>
                            <div className="text-sm font-bold text-orange-400">+ ₹{tier.bonus.toFixed(2)}</div>
                        </div>

                        <p className="text-gray-300 text-xs mb-3">
                            Deposit {tier.amount.toLocaleString()} for the first time and you will receive {tier.bonus} bonus
                        </p>

                        <div className="flex items-center justify-between gap-4">
                            <div className="h-6 bg-indigo-950 rounded-full flex-1 overflow-hidden">
                                <div className="flex text-sm justify-center items-center h-full text-white">
                                    {tier.current}/{tier.amount.toLocaleString()}
                                </div>
                            </div>

                            <button className="h-6 px-4 text-sm text-orange-400 border border-orange-400  rounded-lg">Deposit</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-evenly pt-2 bg-[#384991]">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="hideReminders"
                        checked={hideReminders}
                        onCheckedChange={(checked) => setHideReminders(checked)}
                        className="border-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <label htmlFor="hideReminders" className="text-gray-300">
                        No more reminders today
                    </label>
                </div>

                <button className="bg-blue-500 hover:bg-blue-600 rounded-full px-4">Activity</button>
            </div>

        </div>
    )
}


export default DepositPopup