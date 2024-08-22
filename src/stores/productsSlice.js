import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const url = 'https://ecommerce2-3qot4z29.b4a.run/';

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (_, { getState }) => {
    const { url } = getState().products;

    try {
      const res = await axios.get(`${url}api/products`);
      if (res?.data?.success) return res.data.products;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (formData, { getState }) => {
    const { url } = getState().products;

    try {
      const res = await axios({
        method: 'POST',
        url: `${url}api/products`,
        data: formData,
      });
      if (res?.data) return res.data.msg;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (formData, { getState, dispatch }) => {
    const { url } = getState().products;

    try {
      const res = await axios({
        method: 'PUT',
        url: `${url}api/products`,
        data: formData,
      });
      if (res?.data?.success) dispatch(getAllProducts());
      return res.data.msg;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (_id, { getState, dispatch }) => {
    const { url } = getState().products;

    try {
      const res = await axios({
        method: 'DELETE',
        url: `${url}api/products`,
        data: { _id },
      });
      if (res?.data?.success) dispatch(getAllProducts());
      return res?.data?.msg;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    url,
    AllProducts: [],
    singleProduct: [],
    type: window.location.pathname.replace('/', ''),
    _id: '',
    editModal: false,
    editConfirmationModal: false,
    deleteConfirmationModal: false,
    loadingModal: false,
    msg: '',
  },
  reducers: {
    changType: (state, { payload }) => {
      if (state.type === payload) return;
      state.type = payload;
    },
    setDeleteConfirmationModal: (state, { payload }) => {
      state.deleteConfirmationModal = payload.state;
      state._id = payload._id || '';
    },
    closeEditModal: (state) => {
      state.editModal = false;
    },
    setEditConfirmationModal: (state, { payload }) => {
      state.editConfirmationModal = payload;
    },
    closeError: (state) => {
      state.msg = '';
    },
    setEditModal: (state, { payload }) => {
      state.singleProduct = payload;
      state.editModal = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loadingModal = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.AllProducts = payload;
      state.loadingModal = false;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      console.log(action.error.message);
      state.loadingModal = false;
    });

    builder.addCase(addProduct.pending, (state) => {
      state.loadingModal = true;
    });
    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      state.loadingModal = false;
      state.msg = payload;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      console.log(action.error.message);
      state.loadingModal = false;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.loadingModal = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.loadingModal = false;
      state.msg = payload;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      console.log(action.error.message);
      state.loadingModal = false;
    });

    builder.addCase(editProduct.pending, (state) => {
      state.loadingModal = true;
      state.editConfirmationModal = false;
      state.editModal = false;
    });
    builder.addCase(editProduct.fulfilled, (state, { payload }) => {
      state.loadingModal = false;
      state.msg = payload;
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      console.log(action.error.message);
      state.loadingModal = false;
    });
  },
});

export const {
  changType,
  setDeleteConfirmationModal,
  closeEditModal,
  setEditConfirmationModal,
  closeError,
  setEditModal,
} = productsSlice.actions;
export default productsSlice.reducer;
