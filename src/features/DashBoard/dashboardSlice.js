import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { removeAndRenumber } from "../../utils/heplFuntion";
import { uploadImagesToCloudinary } from "../../utils/cloudinary";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  dashboadChiSoChatLuong: {},
  chisosObj: {},
  thoigianchokhambenh: [],
  thoigiankhambenh: [],
  tongthoigian: [],
  canlamsangs: [],
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
      state.chisosObj = convertArrayToObject(
        state.dashboadChiSoChatLuong.ChiSoDashBoard
      );
      state.thoigianchokhambenh = setThoiGianChoKhamBenh(state.chisosObj);
      state.thoigiankhambenh = setThoiGianKhamBenh(state.chisosObj);
      state.tongthoigian = setTongThoiGianKhamBenh(state.chisosObj);
      state.canlamsangs = setThoiGianCanLamSang(state.chisosObj);
    },

    insertOrUpdateBaoCaoNgaySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("playload capnhat thanh cong", action.payload);
      const { baocaongay } = { ...action.payload };
      state.ctChiSos = baocaongay.ChiTietChiSo;
      state.bcGiaoBanTheoNgay.UserID = baocaongay.UserID;
      state.bcGiaoBanTheoNgay.BSTruc = baocaongay.BSTruc;
      state.bcGiaoBanTheoNgay.DDTruc = baocaongay.DDTruc;
      state.bcGiaoBanTheoNgay.CBThemGio = baocaongay.CBThemGio;
    },
  },
});
export default slice.reducer;

function convertArrayToObject(dataArray) {
  return dataArray.reduce((acc, current) => {
    acc[current.Code] = current.Value;
    return acc;
  }, {});
}

const setThoiGianChoKhamBenh = (data) => {
  const ChiSos = [];
  const trungbinhchokham = data.tongthoigianchokham / data.tongdakham || "";

  ChiSos.push({ Name: "Trung bình", Value:parseFloat(trungbinhchokham.toFixed(1))});
  ChiSos.push({ Name: "Lâu nhất", Value: parseFloat( data.maxthoigianchokham.toFixed(1)) });
  ChiSos.push({ Name: "Nhanh nhất", Value:parseFloat(data.minthoigianchokham.toFixed(1))  });

  return {
    Title: "Thời gian chờ khám bệnh",
    ChiSos: ChiSos,
  };
};
const setThoiGianKhamBenh = (data) => {
  const ChiSos = [];
  const trungbinhkham = data.tongthoigiankham / data.dachidinhcls || "";

  ChiSos.push({ Name: "Trung bình", Value:parseFloat(trungbinhkham.toFixed(1))  });
  ChiSos.push({ Name: "Lâu nhất", Value: data.maxthoigiankham });
  ChiSos.push({ Name: "Nhanh nhất", Value: data.minthoigiankham });

  return {
    Title: "Thời gian khám bệnh",
    ChiSos: ChiSos,
  };
};
const setTongThoiGianKhamBenh = (data) => {
  const ChiSos = [];

  ChiSos.push({ Name: "Toàn viện", Value: data.trungbinhtoanvien });
  ChiSos.push({ Name: "Công lập", Value: data.trungbinhconglap });
  ChiSos.push({ Name: "Yêu cầu", Value: data.trungbinhyeucau });

  return {
    Title: "Trung bình tổng thời gian khám bệnh ",
    ChiSos: ChiSos,
  };
};

const setThoiGianCanLamSang = (data) => {
  let canlamsangs = [];
  let xetnghiem = {};
  let trungbinhcholaymauXN =
    data.xn_tongthoigiancholaymau / data.xn_tongxnlaymau || "";
  let trungbinhchoketquaXN =
    data.xn_tongthoigianchoketqua / data.xn_tongdatrakq || "";

  xetnghiem.Name = "Xét nghiệm";
  xetnghiem.TrungBinhChoThucHien = trungbinhcholaymauXN;
  xetnghiem.MaxThucHien = data.xn_maxthoigiancholaymau;
  xetnghiem.MinThucHien = data.xn_minthoigiancholaymau;

  xetnghiem.TrungBinhChoKetQua = trungbinhchoketquaXN;
  xetnghiem.MaxChoKetQua = data.xn_maxthoigianchoketqua;
  xetnghiem.MinChoKetQua = data.xn_minthoigianchoketqua;
  xetnghiem.TyLeDung = data.xn_dungthoigian / data.xn_tongdatrakq;

  canlamsangs.push(xetnghiem);

  let xquang = {};
  let trungbinhchothuchienXQ =
    data.xq_tongthoigianchothuchien / data.xq_tongthuchien || "";
  let trungbinhchoketquaXQ =
    data.xq_tongthoigianchoketqua / data.xq_tongdatrakq || "";

  xquang.Name = "XQuang";
  xquang.TrungBinhChoThucHien = trungbinhchothuchienXQ;
  xquang.MaxThucHien = data.maxthoigianchothuchienxq;
  xquang.MinThucHien = data.minthoigianchothuchienxq;

  xquang.TrungBinhChoKetQua = trungbinhchoketquaXQ;
  xquang.MaxChoKetQua = data.xq_maxthoigianchoketqua;
  xquang.MinChoKetQua = data.xq_minthoigianchoketqua;
  xquang.TyLeDung = data.xq_dungthoigian / data.xq_tongdatrakq;

  canlamsangs.push(xquang);

  let ctscanner = {};
  let trungbinhchothuchienCT =
    data.ct_tongthoigianchothuchien / data.ct_tongthuchien || "";
  let trungbinhchoketquaCT =
    data.ct_tongthoigianchoketqua / data.ct_tongdatrakq || "";

  ctscanner.Name = "CT SCanner";
  ctscanner.TrungBinhChoThucHien = trungbinhchothuchienCT;
  ctscanner.MaxThucHien = data.ct_maxthoigianchothuchien;
  ctscanner.MinThucHien = data.ct_minthoigianchothuchien;

  ctscanner.TrungBinhChoKetQua = trungbinhchoketquaCT;
  ctscanner.MaxChoKetQua = data.ct_maxthoigianchoketqua;
  ctscanner.MinChoKetQua = data.ct_minthoigianchoketqua;
  ctscanner.TyLeDung = data.ct_dungthoigian / data.ct_tongdatrakq;

  canlamsangs.push(ctscanner);

  let mri = {};
  let trungbinhchothuchienMRI =
    data.mri_tongthoigianchothuchien / data.mri_tongthuchien || "";
  let trungbinhchoketquaMRI =
    data.mri_tongthoigianchoketqua / data.mri_tongdatrakq || "";

  mri.Name = "MRI";
  mri.TrungBinhChoThucHien = trungbinhchothuchienMRI;
  mri.MaxThucHien = data.mri_maxthoigianchothuchien;
  mri.MinThucHien = data.mri_minthoigianchothuchien;

  mri.TrungBinhChoKetQua = trungbinhchoketquaMRI;
  mri.MaxChoKetQua = data.mri_maxthoigianchoketqua;
  mri.MinChoKetQua = data.mri_minthoigianchoketqua;
  mri.TyLeDung = data.mri_dungthoigian / data.mri_tongdatrakq;

  canlamsangs.push(mri);

  let sa = {};
  let trungbinhchothuchienSA =
    data.sa_tongthoigianchothuchien / data.sa_tongthuchien || "";
  let trungbinhchoketquaSA =
    data.sa_tongthoigianchoketqua / data.sa_tongdatrakq || "";

  sa.Name = "Siêu âm";
  sa.TrungBinhChoThucHien = trungbinhchothuchienSA;
  sa.MaxThucHien = data.sa_maxthoigianchothuchien;
  sa.MinThucHien = data.sa_minthoigianchothuchien;

  sa.TrungBinhChoKetQua = trungbinhchoketquaSA;
  sa.MaxChoKetQua = data.sa_maxthoigianchoketqua;
  sa.MinChoKetQua = data.sa_minthoigianchoketqua;
  sa.TyLeDung = data.sa_dungthoigian / data.sa_tongdatrakq;

  canlamsangs.push(sa);

  let cnhh = {};
  let trungbinhchothuchienCNHH =
    data.cnhh_tongthoigianchothuchien / data.cnhh_tongthuchien || "";
  let trungbinhchoketquaCNHH =
    data.cnhh_tongthoigianchoketqua / data.cnhh_tongdatrakq || "";

  cnhh.Name = "Đo chức năng hô hấp";
  cnhh.TrungBinhChoThucHien = trungbinhchothuchienCNHH;
  cnhh.MaxThucHien = data.cnhh_maxthoigianchothuchien;
  cnhh.MinThucHien = data.cnhh_minthoigianchothuchien;

  cnhh.TrungBinhChoKetQua = trungbinhchoketquaCNHH;
  cnhh.MaxChoKetQua = data.cnhh_maxthoigianchoketqua;
  cnhh.MinChoKetQua = data.cnhh_minthoigianchoketqua;
  cnhh.TyLeDung = data.cnhh_dungthoigian / data.cnhh_tongdatrakq;

  canlamsangs.push(cnhh);

  let mdlx = {};
  let trungbinhchothuchienMDLX =
    data.mdlx_tongthoigianchothuchien / data.mdlx_tongthuchien || "";
  let trungbinhchoketquaMDLX =
    data.mdlx_tongthoigianchoketqua / data.mdlx_tongdatrakq || "";

  mdlx.Name = "Đo mật độ loãng xương";
  mdlx.TrungBinhChoThucHien = trungbinhchothuchienMDLX;
  mdlx.MaxThucHien = data.mdlx_maxthoigianchothuchien;
  mdlx.MinThucHien = data.mdlx_minthoigianchothuchien;

  mdlx.TrungBinhChoKetQua = trungbinhchoketquaMDLX;
  mdlx.MaxChoKetQua = data.mdlx_maxthoigianchoketqua;
  mdlx.MinChoKetQua = data.mdlx_minthoigianchoketqua;
  mdlx.TyLeDung = data.mdlx_dungthoigian / data.mdlx_tongdatrakq;

  canlamsangs.push(mdlx);

  let noisoi = {};
  let trungbinhchothuchienNS =
    data.ns_tongthoigianchothuchien / data.ns_tongthuchien || "";
  let trungbinhchoketquaNS =
    data.ns_tongthoigianchoketqua / data.ns_tongdatrakq || "";

  noisoi.Name = "Nội soi";
  noisoi.TrungBinhChoThucHien = trungbinhchothuchienNS;
  noisoi.MaxThucHien = data.ns_maxthoigianchothuchien;
  noisoi.MinThucHien = data.ns_minthoigianchothuchien;

  noisoi.TrungBinhChoKetQua = trungbinhchoketquaNS;
  noisoi.MaxChoKetQua = data.ns_maxthoigianchoketqua;
  noisoi.MinChoKetQua = data.ns_minthoigianchoketqua;
  noisoi.TyLeDung = data.ns_dungthoigian / data.ns_tongdatrakq;

  canlamsangs.push(noisoi);

  let diennao = {};
  let trungbinhchothuchienDN =
    data.dn_tongthoigianchothuchien / data.dn_tongthuchien || "";
  let trungbinhchoketquaDN =
    data.dn_tongthoigianchoketqua / data.dn_tongdatrakq || "";

  diennao.Name = "Điện não đồ";
  diennao.TrungBinhChoThucHien = trungbinhchothuchienDN;
  diennao.MaxThucHien = data.dn_maxthoigianchothuchien;
  diennao.MinThucHien = data.dn_minthoigianchothuchien;

  diennao.TrungBinhChoKetQua = trungbinhchoketquaDN;
  diennao.MaxChoKetQua = data.dn_maxthoigianchoketqua;
  diennao.MinChoKetQua = data.dn_minthoigianchoketqua;
  diennao.TyLeDung = data.dn_dungthoigian / data.dn_tongdatrakq;

  canlamsangs.push(diennao);

  let dientim = {};
  let trungbinhchothuchienDT =
    data.dt_tongthoigianchothuchien / data.dt_tongthuchien || "";
  let trungbinhchoketquaDT =
    data.dt_tongthoigianchoketqua / data.dt_tongdatrakq || "";

  dientim.Name = "Điện tim đồ";
  dientim.TrungBinhChoThucHien = trungbinhchothuchienDT;
  dientim.MaxThucHien = data.dt_maxthoigianchothuchien;
  dientim.MinThucHien = data.dt_minthoigianchothuchien;

  dientim.TrungBinhChoKetQua = trungbinhchoketquaDT;
  dientim.MaxChoKetQua = data.dt_maxthoigianchoketqua;
  dientim.MinChoKetQua = data.dt_minthoigianchoketqua;
  dientim.TyLeDung = data.dt_dungthoigian / data.dt_tongdatrakq;

  canlamsangs.push(dientim);

  return canlamsangs;
};

export const getDataNewestByNgay = (date) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const params = {
      Ngay: date,
    };
    const response = await apiService.get(`/dashboard`, { params });
    console.log("dashboard", response.data);
    dispatch(
      slice.actions.getDataNewestByNgaySuccess(response.data.data.dashboard)
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getKhoas = () => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const response = await apiService.get("/khoa");
    dispatch(slice.actions.getKhoasSuccess(response.data.data.khoas));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
