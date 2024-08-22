import add from '../assets/add.png';
import edit from '../assets/edit.png';
import remove from '../assets/remove.png';
import all from '../assets/all.png';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { changType } from '../stores/productsSlice';

// eslint-disable-next-line react/prop-types
function AsideBar({ openSideBar, setOpenSideBar }) {
  const dispatch = useDispatch();

  return (
    <aside
      className={`absolute duration-200 pt-5 ${
        openSideBar
          ? 'top-[59px] sm:top-[80px]'
          : '-top-[270px] min-[768px]:-top-[120px] max-[1024px] min-[1024px]:-top-[50px]'
      } z-[7] bg-white w-full h-fit overflow-hidden grid gap-x-5 max-[600px]:grid-cols-1 max-[900px]:grid-cols-2 min-[900px]:grid-cols-4 `}
    >
      <div className='border-2 py-2 px-5 mb-5 rounded-lg bg-gray-100'>
        <Link
          to='/'
          onClick={() => {
            setOpenSideBar(!openSideBar);
            dispatch(changType('show'));
          }}
        >
          <button
            className='flex flex-row justify-center items-center space-x-3'
          >
            <img src={all} alt='Show All Products' className='w-10' />
            <p className='font-semibold'>Show All Products</p>
          </button>
        </Link>
      </div>
      <div className='border-2 py-2 px-5 mb-5 rounded-lg bg-gray-100'>
        <Link
          to='/AddProduct'
          onClick={() => {
            setOpenSideBar(!openSideBar);
            dispatch(changType('add'));
          }}
        >
          <button
            className='flex flex-row justify-center items-center space-x-3'
          >
            <img src={add} alt='Add Product' className='w-10' />
            <p className='font-semibold'>Add Product</p>
          </button>
        </Link>
      </div>
      <div className='border-2 py-2 px-5 mb-5 rounded-lg bg-gray-100'>
        <Link
          to='/EditProducts'
          onClick={() => {
            setOpenSideBar(!openSideBar);
            dispatch(changType('edit'));
          }}
        >
          <button
            className='flex flex-row justify-center items-center space-x-3'
          >
            <img src={edit} alt='Edit Products' className='w-10' />
            <p className='font-semibold'>Edit Products</p>
          </button>
        </Link>
      </div>
      <div className='border-2 py-2 px-5 mb-5 rounded-lg bg-gray-100'>
        <Link
          to='/RemoveProducts'
          onClick={() => {
            setOpenSideBar(!openSideBar);
            dispatch(changType('remove'));
          }}
        >
          <button
            className='flex flex-row justify-center items-center space-x-3'
          >
            <img src={remove} alt='Remove Product' className='w-10' />
            <p className='font-semibold'>Remove Product</p>
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default AsideBar;
