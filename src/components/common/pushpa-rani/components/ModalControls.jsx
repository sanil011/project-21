import { Switch } from '@mui/material';
import PlusIcon from '../icon/plus';
import MinusIcon from '../icon/minus';
import { cn } from '../../../../utils/utils';
import PropTypes from 'prop-types';

const ModalControls = ({ title, inputValue, setInputValue, switchValue, setSwitchValue, onPressMinus, onPressPlus }) => {

    const handleChangeSwitch = (event) => {
        setSwitchValue(event.target.checked);
    };

    return (

        <div className={cn('bg-[#290C2F] w-11/12 mx-auto rounded-lg pt-2 pb-6 transition-all')}>

            <div className='flex gap-2 items-center'>
                <Switch
                    checked={switchValue}
                    onChange={handleChangeSwitch}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#ffffff', // bright green color when checked
                            opacity: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(0, 255, 0, 0.08)',
                            },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#00FF00', // bright green color for the track
                            opacity: 1, // increased opacity to make it more solid
                        },
                        '& .MuiSwitch-track': {
                            opacity: 0.9, // increased base track opacity
                        }
                    }}
                />
                <h1 className='text-white text-lg font-semibold'>{title}</h1>
            </div>
            <div className='relative w-6/12 mx-auto mt-2'>
                <button
                    onClick={onPressMinus}
                    className={cn("cursor-pointer absolute -top-[2.5px] -left-3 border-[3px] border-[#5CBAD5] w-10 h-10 rounded-full flex justify-center items-center transition-all",
                        !switchValue ? "bg-gray-400" : 'bg-white'
                    )}
                // disabled={isBetting}
                >
                    <MinusIcon />

                </button>
                <div className='w-full mx-auto flex justify-center'>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(Number(e.target.value))}
                        className={cn("w-[90%] mx-auto bg-blue-400 shadow-[0_0_0_2.5px_#6220B2] text-black font-semibold text-center h-[2.2rem]  p-0 focus:outline-none border-2 border-black")}
                        disabled={!switchValue}
                    />
                </div>

                <button
                    onClick={onPressPlus}
                    className={cn("cursor-pointer absolute -top-[2.5px] -right-2 border-[3px] border-[#5CBAD5] w-10 h-10 rounded-full flex justify-center items-center",
                        !switchValue ? "bg-gray-400" : 'bg-white')}
                // disabled={isBetting}
                >
                    <PlusIcon />

                </button>
            </div>
        </div>



    )
}

ModalControls.propTypes = {
    title: PropTypes.string.isRequired,
    inputValue: PropTypes.number.isRequired,
    setInputValue: PropTypes.func.isRequired,
    switchValue: PropTypes.bool.isRequired,
    setSwitchValue: PropTypes.func.isRequired,
    onPressMinus: PropTypes.func.isRequired,
    onPressPlus: PropTypes.func.isRequired
};

export default ModalControls