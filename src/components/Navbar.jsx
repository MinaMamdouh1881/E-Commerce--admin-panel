import { useState } from 'react';
import navIcon from '../assets/nav-logo.svg';
import AsideBar from './AsideBar';
import my_picture from '../assets/pic.jpg';
import arrow from '../assets/arrow-down-sign-to-navigate.png';
function Navbar() {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className='sticky top-0 z-[9] '>
      <nav className='flex flex-row justify-between sticky top-0 left-0 bg-white z-[9] py-3'>
        <img src={navIcon} alt='' className='w-44 sm:w-[266px]' />
        <button onClick={() => setOpenSideBar(!openSideBar)}>
          <div className='flex flex-row gap-x-3'>
            <div className=' overflow-hidden rounded-full '>
              <img
                src={my_picture}
                alt=''
                className='object-contain w-[60px] scale-125 sm:w-[80px]'
              />
            </div>
            <img
              src={arrow}
              alt=''
              className={`w-[20px] object-contain duration-200 ${
                openSideBar ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
        </button>
      </nav>
      <AsideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
    </div>
  );
}
export default Navbar;
