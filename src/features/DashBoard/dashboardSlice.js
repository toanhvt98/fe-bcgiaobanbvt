import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { removeAndRenumber } from "../../utils/heplFuntion";
import { uploadImagesToCloudinary } from "../../utils/cloudinary";
import { toast } from "react-toastify";


const initialState = {
  isLoading: false,
  error: null,
 dashboadChiSoChatLuong: {},
};

const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    
    getDataNewestByNgaySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      
      state.dashboadChiSoChatLuong = action.payload;
    },

    insertOrUpdateBaoCaoNgaySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("playload capnhat thanh cong", action.payload);
      const { baocaongay } = { ...action.payload };
      state.ctChiSos = baocaongay.ChiTietChiSo;
      state.bcGiaoBanTheoNgay.UserID =baocaongay.UserID;
      state.bcGiaoBanTheoNgay.BSTruc=baocaongay.BSTruc;
      state.bcGiaoBanTheoNgay.DDTruc=baocaongay.DDTruc;
      state.bcGiaoBanTheoNgay.CBThemGio=baocaongay.CBThemGio;
    },

  },
});
export default slice.reducer;

export const getDataNewestByNgay = (date) => async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const params = {
      
        Ngay: date,
      };
      const response = await apiService.get(`/dashboard`, { params });
  console.log("dashboard",response.data)
      dispatch(slice.actions.getDataNewestByNgaySuccess(response.data.data.dashboard));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message)
    }
  };

export const getKhoas = () => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const response = await apiService.get("/khoa");
    dispatch(slice.actions.getKhoasSuccess(response.data.data.khoas));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message)
  }
};
