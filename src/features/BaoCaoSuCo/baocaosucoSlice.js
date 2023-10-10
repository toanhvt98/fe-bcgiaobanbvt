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
totalSuCo:0,
totalPages:1,
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
   
    getBaoCaoSuCosSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.baocaosucos = action.payload.baocaosucos;
      state.totalSuCo = action.payload.count;
      state.totalPages = action.payload.totalPages
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

export const getBaoCaoSuCos = ({ filterName, page = 1, limit = 12 }) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const params = { page, limit };
    if (filterName) params.UserName = filterName;
    const response = await apiService.get(`/baocaosuco`, { params });
    console.log('response',response.data.data)
    dispatch(slice.actions.getBaoCaoSuCosSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getOneById = (sucoId) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    
    const response = await apiService.get(`/baocaosuco/${sucoId}`);
    console.log('response',response.data.data)
    // dispatch(slice.actions.getBaoCaoSuCosSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
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

