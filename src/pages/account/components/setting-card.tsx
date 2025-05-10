import React from 'react'
import { ChevronRight } from 'lucide-react';


const SettingCard = ({ icon, name, arrowText }) => {
    return (
        <div className='bg-[#2B3270] w-11/12 mx-auto rounded-lg flex items-center justify-between px-3 py-3 my-4'>


            <div className='flex items-center gap-6'>
                <div className='bg-[#303F7F] inline-block p-2 rounded-lg'>
                    {icon}
                </div>

                <h1>{name}</h1>
            </div>



            <div className='flex items-center gap-1 text-gray-300'>
                <p className='text-sm'>{arrowText}</p>
                <ChevronRight />
            </div>
        </div>
    )
}

export default SettingCard