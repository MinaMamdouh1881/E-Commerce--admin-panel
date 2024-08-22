import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useSelector, useDispatch } from 'react-redux';

import AddProduct from './Pages/AddProduct';
import AllProducts from './Pages/AllProducts';
import EditProducts from './Pages/EditProducts';
import RemoveProducts from './Pages/RemoveProducts';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import EditModal from './components/EditModal';
import LoadingModal from './components/LoadingModal';
import Error from './components/ErrorModal';
import { useEffect } from 'react';
import { changType } from './stores/productsSlice';

function App() {
  const { editModal, deleteConfirmationModal, msg, loadingModal } = useSelector(
    (store) => store.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname.replace('/', '') === 'EditProducts') {
      dispatch(changType('edit'));
    } else if (window.location.pathname.replace('/', '') === 'RemoveProducts') {
      dispatch(changType('remove'));
    }
  }, []);

  return (
    <div className='font-[Poppins]'>
      <BrowserRouter>
        {loadingModal && <LoadingModal />}
        {msg !== '' && <Error />}
        <div className='mx-6'>
          <Navbar />
          {editModal && <EditModal />}
          {deleteConfirmationModal && <DeleteConfirmationModal />}
          <div className='basis-4/5 mt-5 p-5 bg-gray-100 rounded-md'>
            <Routes>
              <Route path='/' element={<AllProducts />} />
              <Route path='/AddProduct' element={<AddProduct />} />
              <Route path='/EditProducts' element={<EditProducts />} />
              <Route path='/RemoveProducts' element={<RemoveProducts />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
