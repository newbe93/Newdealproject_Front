import React from 'react'
import CHEVRON_LEFT_SOLID from "@assets/icons/chevron-left-solid.svg"
import Conversations from '@components/sidebar/Conversations'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full'>
       <header className="mt-9 h-8 mb-1 fixed left-0 top-0 px-2">
          <div className="flex items-center w-full">
              {/* <div className="w-9 ml-2 flex-shrink-0">
                  <img src={CHEVRON_LEFT_SOLID} alt="back" className="w-6 h-6" onClick={() => navigate(-1)}/>
              </div> */}
              <div className="flex-grow flex justify-center ml-5">
                  <p className="font-bold text-lg">채팅</p>
              </div>
              <div className="w-24 flex-shrink-0"></div>
          </div>
      </header>
        {/* <SearchInput />
        <div className='divider px-3'></div> */}

        <Conversations />
        {/* <LogoutButton/> */}
    </div>
  )
}

export default Sidebar