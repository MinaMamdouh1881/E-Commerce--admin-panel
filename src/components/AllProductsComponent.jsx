import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../stores/productsSlice';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/pencil.png';
import {
  setDeleteConfirmationModal,
  setEditModal,
} from '../stores/productsSlice';

// eslint-disable-next-line react/prop-types
function AllProductsComponent({ children }) {
  const {
    url,
    AllProducts,
    type,
  } = useSelector((store) => store.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='z-[1]'>
      <h1 className='text-3xl font-bold text-center mb-5'>{children}</h1>
      <div className='grid gap-5 max-[480px]:grid-cols-1 max-[600px]:grid-cols-2 max-[900px]:grid-cols-3 max-[1024px]:grid-cols-4 max-[1280px]:grid-cols-5'>
        {AllProducts?.map((product) => {
          const { _id, name, imgPath, newPrice, oldPrice,category } = product;
          return (
            <div key={_id} className='bg-white rounded-t-lg p-3 '>
              <div className='overflow-hidden'>
                <img
                  src={url + imgPath}
                  alt={name}
                  className='w-full hover:scale-110 hover:-z-[1] duration-500 aspect-[8/12]'
                />
              </div>
              <div>
                <h1>{name}</h1>
                <p>Category : {category}</p>
                <p>New Price : ${newPrice}</p>
                <p>Old Price : ${oldPrice}</p>
              </div>
              <div className='flex justify-center mt-5'>
                {type === 'remove' && (
                  <button
                    onClick={() =>
                      dispatch(setDeleteConfirmationModal({ state: true, _id }))
                    }
                  >
                    <img src={deleteIcon} alt='' className='w-12' />
                  </button>
                )}
                {type === 'edit' && (
                  <button
                    onClick={() => {
                      dispatch(
                        setEditModal({
                          _id,
                          name,
                          imgPath,
                          newPrice,
                          oldPrice,
                          category,
                        })
                      );
                    }}
                  >
                    <img src={editIcon} alt='' className='w-12' />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllProductsComponent;
