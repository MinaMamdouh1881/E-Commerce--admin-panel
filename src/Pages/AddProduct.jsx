import { useState } from 'react';
import imgIcon from '../assets/image.png';
import { addProduct } from '../stores/productsSlice';
import { useDispatch } from 'react-redux';
function AddProduct() {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    name: '',
    category: 'men',
    oldPrice: 0,
    newPrice: 0,
    imgPath: null,
  });

  const changeHandler = (e) => {
    if (e.target.name === 'imgPath')
      return setForm({ ...form, [e.target.name]: e.target.files[0] });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('oldPrice', form.oldPrice);
    formData.append('newPrice', form.newPrice);
    formData.append('imgPath', form.imgPath);

    dispatch(addProduct(formData));

    setForm({
      name: '',
      category: 'men',
      oldPrice: 0,
      newPrice: 0,
      imgPath: null,
    });

  };
  return (
    <div className=' min-[1024px]:px-10'>
      <h1 className='text-3xl font-bold text-center mb-5'>AddProduct</h1>
      <form onSubmit={handelForm}>
        <div className='flex justify-center mb-5'>
          <label htmlFor='file' className='flex justify-center'>
            <img
              src={form.imgPath ? URL.createObjectURL(form.imgPath) : imgIcon}
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
        <div className='flex justify-center mb-5 border-2 p-2 rounded-lg bg-white'>
          <button disabled={form.imgPath ? false : true}>Add Product</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
