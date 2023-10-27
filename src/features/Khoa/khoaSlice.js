import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
const initialState = {
  isLoading: false,
  error: "",

  listKhoa: [],
  count: 0,
};

const slice = createSlice({
  name: "khoa",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;

      state.error = action.payload;
      console.log("Error", action.payload);
    },
    updateKhoaSuccess(state, action) {
      state.isLoading = false;
      state.listKhoa.unshift(action.payload);
      state.error = "";
      console.log("Update department success: ", action.payload);
    },
    creKhoaSuccess(state, action) {
      state.isLoading = false;

      state.error = "";
      console.log("Create department success", action.payload);
      state.listKhoa.push(action.payload.khoa);
    },
    deleteKhoaSuccess(state, action) {
      state.isLoading = false;
      state.listKhoa.unshift(action.payload);
      state.error = "";
      console.log("Delete department success", action.payload);
    },
    getKhoaSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      state.listKhoa = action.payload.khoas;

      console.log("Get department success", action.payload);
    },
  },
});

export default slice.reducer;

export const listKhoa = () => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());
    const response = await apiService.get(`/khoa`);
    dispatch(slice.actions.getKhoaSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
export const creKhoa = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());
    const response = await apiService.post(`/khoa`, data);
    console.log("respone", response.data.data);
    dispatch(slice.actions.creKhoaSuccess(response.data.data));
    toast.success("Tạo khoa thành công");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
    console.log(error);
  }
};
export const delKhoa = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());
    const response = await apiService.delete(`/khoa/${id}`);
    console.log("respone", response.data.data);
    dispatch(slice.actions.deleteKhoaSuccess(response.data));
    toast.success("Xóa khoa thành công");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
    console.log(error);
  }
};
