import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
const initialState = {
  isLoading: false,
  error: "",

  listKhoa: [],
  count: 0,
  check: false,
};

const slice = createSlice({
  name: "khoa",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.check = false;
    },
    hasError(state, action) {
      state.isLoading = false;

      state.error = action.payload;
      console.log("Error", action.payload);
    },
    updateKhoaSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      console.log("Update department success: ", action.payload);
      state.listKhoa = state.listKhoa.map((khoa) => {
        if (khoa._id === action.payload._id) {
          return { ...khoa, ...action.payload };
        }
        return khoa;
      });
    },
    creKhoaSuccess(state, action) {
      state.isLoading = false;

      state.error = "";
      console.log("Create department success", action.payload);
      state.listKhoa.push(action.payload.khoa);
    },
    deleteKhoaSuccess(state, action) {
      state.isLoading = false;
      state.listKhoa = state.listKhoa.filter(
        (item) => item._id !== action.payload.data._id
      );
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
    console.log("this í error", error);
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
export const updKhoa =
  ({ _id, STT, LoaiKhoa, MaKhoa, TenKhoa }) =>
  async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());
      const data = {
        TenKhoa,
        MaKhoa,
        STT,
        LoaiKhoa,
      };
      const response = await apiService.put(`/khoa/${_id}`, data);
      console.log("respone", response.data.data);
      dispatch(slice.actions.updateKhoaSuccess(response.data.data.khoa));
      toast.success("Cập nhật khoa thành công");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
      console.log(error);
    }
  };
