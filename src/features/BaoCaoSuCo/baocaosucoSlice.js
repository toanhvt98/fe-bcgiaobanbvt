import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import {
  calculateTongChiSo,
  extractChiSo,
  
  filterChiTietBenhNhansCLC,
  filterChiTietBenhNhansHasExcludeTTCLC,
  filterChiTietBenhNhansNotExcludeTTCLC,
  findKhoasInBaocaongays,
} from "../../utils/heplFuntion";

const initialState = {
  isLoading: false,
  error: null,
  
baocaosucoCurent:{},
baocaosucos:[],
};

const slice = createSlice({
  name: "baocaosuco",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
   
    InsertOneSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.baocaosucoCurent = action.payload
    },
   
    getKhoasInBCGiaoBanSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("khoas", action.payload);
      state.khoas = [...action.payload];
      
    },
    
    getDataBCGiaoBanByFromDateToDateSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    state.bcGiaoBans = action.payload;
    },

    getDataBCGiaoBanCurentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      if(action.payload.length>0) {
state.bcGiaoBanCurent = action.payload[0]
      }
    
    },

    InsertOrUpdateBCGiaoBanByFromDateToDateSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    state.bcGiaoBans = action.payload;
    },

    InsertOrUpdateTrangThaiForBCGiaoBanSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    state.bcGiaoBanCurent = action.payload;
    },
    
  },
});
export default slice.reducer;
//get Baocaongays theo ngay
export const getDataBCNgaysForGiaoBan = (date) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const params = {
      Ngay: date,
    };
    const response = await apiService.get(`/baocaongay/all`, { params });
    
    dispatch(slice.actions.getDataBCNgaysForGiaoBanSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getDataBCGiaoBanByFromDateToDate = (fromDate,toDate) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const params = {
    fromDate:fromDate,
    toDate:toDate,
    };
    const response = await apiService.get(`/bcgiaoban/allbyngay`, { params });
    console.log("bc giao ban by fromDate toDate", response.data.data);
    dispatch(slice.actions.getDataBCGiaoBanByFromDateToDateSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const getDataBCGiaoBanCurent= (date) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const params = {
    fromDate:date,
    toDate:date,
    };
    const response = await apiService.get(`/bcgiaoban/allbyngay`, { params });
    console.log("response in getDataBCGiaoBanCurent", response.data.data);
    dispatch(slice.actions.getDataBCGiaoBanCurentSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const InsertOne = (baocaosuco) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
   
    const response = await apiService.post(`/baocaosuco`, baocaosuco);
    console.log("insert baocaosuco thanhcong", response.data.data);
    dispatch(slice.actions.InsertOneSuccess(response.data.data));
    toast.success("Cập nhật  thành công")
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const InsertOrUpdateTrangThaiForBCGiaoBan = (ngay,trangthai) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
   
    const response = await apiService.post(`/bcgiaoban/trangthai`, {ngay,trangthai});
    console.log("bc giao ban after update and insert trang thai", response.data.data);
    dispatch(slice.actions.InsertOrUpdateTrangThaiForBCGiaoBanSuccess(response.data.data));
    dispatch(getDataBCNgaysForGiaoBan(ngay));
    toast.success("Cập nhật trạng thái thành công")
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getKhoasInBCGiaoBan = () => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const response = await apiService.get("/khoa");
    dispatch(
      slice.actions.getKhoasInBCGiaoBanSuccess(response.data.data.khoas)
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

