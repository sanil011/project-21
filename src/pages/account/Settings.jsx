import { ChevronLeft } from 'lucide-react';
import { useState } from "react"
import { ChevronRight, Copy } from "lucide-react"
import { cn } from '../../utils/utils';
import SettingCard from './components/setting-card';
import { Mail } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { Info } from 'lucide-react';
import { useNavigate,NavLink } from "react-router-dom"
import { useSelector } from "react-redux";


const Settings = () => {
  const { id } = useSelector(store => store.userData); // userData

  const [copied, setCopied] = useState(false);
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // Go back one step in history
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText('1234567890')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }


  return (
    <div className="text-white relative">

      <div className="bg-[#2b3270] h-48 rounded-b-3xl pt-4">
        <ChevronLeft onClick={handleBack} className="absolute left-0 ml-2" />
        <h1 className="text-2xl font-semibold text-center">Settings Center</h1>
      </div>

      <div className={cn("-mt-28 z-50 w-11/12 mx-auto bg-[#384991] text-white shadow-lg rounded-xl p-6")}>
        <div className="flex items-center justify-between mb-8">
          <div className="h-20 w-20 rounded-full overflow-hidden">
            <img src={'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D'} alt="User avatar" className="h-full w-full object-cover" />
          </div>
          <button className="flex items-center text-gray-300 hover:text-white transition-colors">
            <span>Change avatar</span>
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Nickname</span>
            <div className="flex items-center">
              <span className="font-medium">testing</span>
              <ChevronRight className="ml-2 h-5 w-5 text-gray-300" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">UID</span>
            <div className="flex items-center">
              <span className="font-medium">123456789</span>
              <button
                onClick={copyToClipboard}
                className={`ml-2 p-1 rounded transition-colors ${copied ? "text-green-400" : "text-gray-300 hover:text-white"}`}
                aria-label="Copy UID"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className='w-11/12 mx-auto mt-12'>
        <div className='flex items-center gap-2'>
          <div className="w-1 min-h-5 rounded-full bg-blue-500"></div>
          <h1 className="text-2xl font-semibold">Security information</h1>
        </div>
      </div>


      <NavLink to={`/account/${id}/change-password`} className="block">
        <SettingCard
          icon={<LockKeyhole className='text-[#61A9FF]' />}
          arrowText="Edit"
          name="Login password"
        />
      </NavLink>
      <NavLink to={`/account/${id}/bind-mail`} className="block">
        <SettingCard 
        icon={<Mail className='text-[#61A9FF]' />} 
        arrowText={"to bind"} name={'Bind mailbox'} 
        />
      </NavLink>
      <SettingCard icon={<Info className='text-[#61A9FF]' />} arrowText={"1.0.9"} name={'Updated version'} />

    </div>

  );
};

export default Settings;

