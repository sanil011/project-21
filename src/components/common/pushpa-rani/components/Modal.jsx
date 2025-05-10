import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { cn } from '../../../../utils/utils';
import ModalControls from './ModalControls';
import PropTypes from 'prop-types';


const Modal = ({ isOpen, onClose }) => {

    const roundsArray = [5, 10, 20, 25, 50];
    const [isCashDecreaseSwitch, setIsCashDecreaseSwitch] = useState(false);
    const [inputCashDecrease, setInputCashDecrease] = useState(8);



    const [isCashIncreaseSwitch, setIsCashIncreaseSwitch] = useState(false);
    const [inputCashIncrease, setInputCashIncrease] = useState(10);

    const [isSingleWinSwitch, setIsSingleWinSwitch] = useState(false);
    const [inputSingleWin, setInputSingleWin] = useState(10);
    if (!isOpen) return null;
    
    return (
        <div onClick={onClose} className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div onClick={(e) => e.stopPropagation()} className="bg-[#1F134E] rounded-xl shadow-lg w-96 h-[90vh] border-6 border-[#6220B2]">
                <div className='rounded-xl flex flex-col gap-2 justify-between h-full pb-6'>

                    {/* ----------------------------------------------------- */}
                    <div className='flex items-center justify-between text-white p-2'>
                        <h2 className="text-2xl font-semibold">AUTO PLAY OPTIONS</h2>
                        <CloseIcon onClick={onClose} className='cursor-pointer text-gray-300' />
                    </div>

                    {/* ----------------------------------------------------- */}
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-[#FDBE02] text-lg text-center font-semibold'>Number of rounds</h1>
                        <div className='grid grid-cols-5 items-center gap-2 w-10/12 mx-auto'>
                            {roundsArray.map((data) => (
                                <div key={data} className='bg-[#DB159D] px-2 text-center rounded-full'>{data}</div>
                            ))}
                        </div>

                        <div className='flex items-center justify-between w-11/12 gap-1 mx-auto'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-xs text-white'>Bet Amount:</h1>
                                <input
                                    type="number"
                                    value={10}
                                    // onChange={(e) => setInputValue(Number(e.target.value))}
                                    className={cn("w-[48%] rounded-sm mx-auto bg-blue-400 shadow-[0_0_0_2.5px_#6220B2] text-black font-semibold text-center h-[1.5rem]  p-0 focus:outline-none border-2 border-black")}
                                />
                            </div>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-xs text-white'>Cash out at:</h1>
                                <input
                                    type="number"
                                    value={9}
                                    // onChange={(e) => setInputValue(Number(e.target.value))}
                                    className={cn("w-[48%] rounded-sm mx-auto bg-blue-400 shadow-[0_0_0_2.5px_#6220B2] text-black font-semibold text-center h-[1.5rem]  p-0 focus:outline-none border-2 border-black")}
                                />
                            </div>
                        </div>


                    </div>
                    {/* ----------------------------------------------------- */}
                    <div className='flex flex-col gap-6'>
                        <ModalControls title='Stop if cash decrease by'
                            inputValue={inputCashDecrease}
                            setInputValue={setInputCashDecrease}
                            switchValue={isCashDecreaseSwitch}
                            setSwitchValue={setIsCashDecreaseSwitch}
                            onPressMinus
                            onPressPlus
                        />
                        <ModalControls title='Stop if cash increase by'
                            inputValue={inputCashIncrease}
                            setInputValue={setInputCashIncrease}
                            switchValue={isCashIncreaseSwitch}
                            setSwitchValue={setIsCashIncreaseSwitch}
                            onPressMinus
                            onPressPlus
                        />
                        <ModalControls title='Stop if Single win exceeds by'
                            inputValue={inputSingleWin}
                            setInputValue={setInputSingleWin}
                            switchValue={isSingleWinSwitch}
                            setSwitchValue={setIsSingleWinSwitch}
                            onPressMinus
                            onPressPlus
                        />
                    </div>
                    {/* ----------------------------------------------------- */}
                    <div className='flex items-center justify-center gap-3 w-11/12 mx-auto'>
                        <button className="bg-[#FF3B3B] text-xl text-black font-bold py-1.5 px-8 rounded-2xl hover:bg-red-600 transition-all duration-200">
                            CANCEL
                        </button>

                        <button className="bg-[#00FF00] text-xl text-black font-bold py-1.5 px-8 rounded-2xl hover:bg-green-400 transition-all duration-200">
                            START
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Modal