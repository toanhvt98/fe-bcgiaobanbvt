import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,

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

      state.error = null;
      console.log("Update department success: ", action.payload);
    },
    creKhoaSuccess(state, action) {
      state.isLoading = false;

      state.error = null;
      console.log("Create department success", action.payload);
      state.listKhoa.push(action.payload.khoa);
    },
    deleteKhoaSuccess(state, action) {
      state.isLoading = false;

      state.error = null;
      console.log("Delete department success", action.payload);
    },
    getKhoaSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
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
  console.log("vao day");
  try {
    dispatch(slice.actions.startLoading());
    const response = await apiService.post(`/khoa`, data);
    console.log("repone", response.data.data);
    dispatch(slice.actions.creKhoaSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    console.log(error);
  }
};
