import { useSelector, useDispatch } from 'react-redux';
import {
  closeEditModal,
  setEditConfirmationModal,
} from '../stores/productsSlice';
import { useState } from 'react';
import EditConfirmationModal from '../components/EditConfirmationModal';
function EditModal() {
  const { url, singleProduct, editConfirmationModal } = useSelector(
    (store) => store.products
  );
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    _id: singleProduct._id,
    name: singleProduct?.name || '',
    category: singleProduct?.category || 'men',
    oldPrice: singleProduct?.oldPrice || 0,
    newPrice: singleProduct?.newPrice || 0,
    imgPath: singleProduct?.imgPath || null,
  });
  

  const changeHandler = (e) => {
    if (e.target.name === 'imgPath')
      return setForm({ ...form, [e.target.name]: e.target.files[0] });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className='relative z-10  min-[1024px]:px-10 bg-white'>
      {editConfirmationModal && <EditConfirmationModal form={form} />}
      <div className='fixed inset-0 bg-gray-500  bg-opacity-80 transition-opacity'></div>

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center '>
          <form>
            <div className='flex justify-center mb-5'>
              <label htmlFor='file' className='flex justify-center'>
                <img
                  src={
                    typeof form.imgPath === 'string'
                      ? url + form.imgPath
                      : URL.createObjectURL(form.imgPath)
                  }
                  alt='Image'
                  className='max-[600px]:w-full max-[900px]:w-3/4 min-[1024px]:w-9/12'
                />
              </label>
              <input
                type='file'
                name='imgPath'
                id='file'
                required
                hidden
                accept='image/*'
                onChange={changeHandler}
              />
            </div>
            <div className='grid gap-x-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
              <div className='flex flex-col mb-5 border-2 p-2 rounded-lg bg-white'>
                <label htmlFor='name'>Enter Product Name</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  required
                  className='p-2 border w-full mt-2'
                  onChange={changeHandler}
                  value={form.name}
                />
              </div>
              <div className='flex flex-col mb-5 border-2 p-2 rounded-lg bg-white'>
                <label htmlFor='category'>Enter Product Category</label>
                <select
                  name='category'
                  id='category'
                  required
                  className='p-2 border w-full mt-2'
                  onChange={changeHandler}
                  value={form.category}
                >
                  <option value='men'>Men</option>
                  <option value='women'>Women</option>
                  <option value='kid'>Kid</option>
                </select>
              </div>

              <div className='flex flex-col mb-5 border-2 p-2 rounded-lg bg-white'>
                <label htmlFor='oldPrice'>Old Price</label>
                <input
                  type='number'
                  name='oldPrice'
                  id='oldPrice'
                  min={1}
                  required
                  className='p-2 border w-full mt-2'
                  onChange={changeHandler}
                  value={form.oldPrice}
                />
              </div>
              <div className='flex flex-col mb-5 border-2 p-2 rounded-lg bg-white'>
                <label htmlFor='newPrice'>New Price</label>
                <input
                  type='number'
                  name='newPrice'
                  id='newPrice'
                  min={1}
                  required
                  className='p-2 border w-full mt-2'
                  onChange={changeHandler}
                  value={form.newPrice}
                />
              </div>
            </div>
            <div className='flex justify-center gap-10 mb-5 p-2 '>
              <button
                className='border-2 border-red-800 text-white rounded-lg bg-red-600 p-2 hover:bg-red-500'
                type='button'
                onClick={() => dispatch(closeEditModal())}
              >
                Cancel
              </button>
              <button
                type='button'
                className='border-2 rounded-lg bg-white p-2'
                onClick={() => {
                  dispatch(setEditConfirmationModal(true));
                }}
              >
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
