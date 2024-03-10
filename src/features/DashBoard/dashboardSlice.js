import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { removeAndRenumber } from "../../utils/heplFuntion";
import { uploadImagesToCloudinary } from "../../utils/cloudinary";
import { toast } from "react-toastify";
import { da } from "date-fns/locale";

const initialState = {
  isLoading: false,
  error: null,
  dashboadChiSoChatLuong: {},
  chisosObj: {},
  thoigianchokhambenh: [],
  thoigiankhambenh: [],
  tongthoigian: [],
  canlamsangs: [],
  tyletraCLS: {},

  khambenhngoaitru: [],
  dangdieutrinoitru: [],

  giuongconglap: [],
  giuongyeucau: [],

  bnvuotkhuyencao:[],
  bndonthuocmax:[],
  bndonthuocmin:[],
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

      state.chisosObj.xn_noitru = 0;
      state.chisosObj.xq_noitru = 0;
      state.chisosObj.ct_noitru = 0;
      state.chisosObj.mri_noitru = 0;
      state.chisosObj.sa_noitru = 0;
      state.chisosObj.cnhh_noitru = 0;
      state.chisosObj.mdlx_noitru = 0;
      state.chisosObj.ns_noitru = 0;
      state.chisosObj.dn_noitru = 0;
      state.chisosObj.dt_noitru = 0;

      state.chisosObj.xn_ngoaitru = 0;
      state.chisosObj.xq_ngoaitru = 0;
      state.chisosObj.ct_ngoaitru = 0;
      state.chisosObj.mri_ngoaitru = 0;
      state.chisosObj.sa_ngoaitru = 0;
      state.chisosObj.cnhh_ngoaitru = 0;
      state.chisosObj.mdlx_ngoaitru = 0;
      state.chisosObj.ns_ngoaitru = 0;
      state.chisosObj.dn_ngoaitru = 0;
      state.chisosObj.dt_ngoaitru = 0;

      state.chisosObj.ngoaitru_ngoaitinh = 0;
      state.chisosObj.ngoaitru_capcuu = 0;

      state.chisosObj.ngoaitru_chokham = 0;
      state.chisosObj.ngoaitru_dangkham = 0;
      state.chisosObj.ngoaitru_ketthuckham = 0;
      state.chisosObj.ngoaitru_vaovien = 0;
      state.chisosObj.ngoaitru_chuyenvien = 0;

      state.chisosObj.noitru_chonhapvien = 0;
      state.chisosObj.noitru_dangdieutri = 0;
      state.chisosObj.noitru_ravien = 0;
      state.chisosObj.noitru_chuyenvien = 0;
      state.chisosObj.noitru_tuvong = 0;


      state.khambenhngoaitru = setKhambenhNgoaiTruOrDieuTriNoiTruNotFound();
      state.dangdieutrinoitru = setKhambenhNgoaiTruOrDieuTriNoiTruNotFound();

      state.giuongconglap = setGiuongNotFound();
      state.giuongyeucau = setGiuongNotFound();
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
      state.tyletraCLS = setTyLeTraDungCLS(state.chisosObj);

      state.khambenhngoaitru = [];
      state.khambenhngoaitru.push({
        label: "BHYT",
        value: state.chisosObj.ngoaitru_bhyt,
      });
      state.khambenhngoaitru.push({
        label: "Viện phí",
        value: state.chisosObj.ngoaitru_vp,
      });
      state.khambenhngoaitru.push({
        label: "Yêu cầu",
        value: state.chisosObj.ngoaitru_yc,
      });

      state.dangdieutrinoitru = [];
      state.dangdieutrinoitru.push({
        label: "BHYT",
        value: state.chisosObj.noitru_dangdieutri_bhyt,
      });
      state.dangdieutrinoitru.push({
        label: "Viện phí",
        value: state.chisosObj.noitru_dangdieutri_vienphi,
      });
      state.dangdieutrinoitru.push({
        label: "Yêu cầu",
        value: state.chisosObj.noitru_dangdieutri_yeucau,
      });

      state.giuongconglap = [];
      state.giuongconglap.push({
        label: "Sử dụng",
        value: state.chisosObj.giuongconglap_sudung,
      });
      state.giuongconglap.push({
        label: "Trống",
        value:
          state.chisosObj.giuongconglap_tong -
          state.chisosObj.giuongconglap_sudung,
      });

      state.giuongyeucau = [];
      state.giuongyeucau.push({
        label: "Sử dụng",
        value: state.chisosObj.giuongyeucau_sudung,
      });
      state.giuongyeucau.push({
        label: "Trống",
        value:
          state.chisosObj.giuongyeucau_tong -
          state.chisosObj.giuongyeucau_sudung,
      });

      state.bnvuotkhuyencao = state.chisosObj.benhnhan_vuotkhuyencao?JSON.parse(state.chisosObj.benhnhan_vuotkhuyencao):[] || []
      state.bndonthuocmax = state.chisosObj.benhnhan_donthuoc_max?JSON.parse(state.chisosObj.benhnhan_donthuoc_max):[] || []
      state.bndonthuocmin = state.chisosObj.benhnhan_donthuoc_min?JSON.parse(state.chisosObj.benhnhan_donthuoc_min):[] || []
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
  const trungbinhchokham =
    parseFloat((data.tongthoigianchokham / data.tongdakham).toFixed(1)) || "";

  ChiSos.push({
    Name: "Trung bình",
    Value: trungbinhchokham,
  });
  ChiSos.push({
    Name: "Lâu nhất",
    Value: parseFloat(parseFloat(data.maxthoigianchokham)).toFixed(1) ||"",
  });
  ChiSos.push({
    Name: "Nhanh nhất",
    Value: parseFloat(Number(data.minthoigianchokham)).toFixed(1) ||"",
  });

  return {
    Title: `Thời gian chờ khám bệnh`,
    GhiChu: `(Từ khi người bệnh đăng ký đến khi người bệnh được gọi vào trong phòng khám)`,
    ChiSos: ChiSos,
  };
};
const setThoiGianKhamBenh = (data) => {
  const ChiSos = [];
  const trungbinhkham =
    parseFloat((data.tongthoigiankham / data.dachidinhcls).toFixed(1)) || "";

  ChiSos.push({
    Name: "Trung bình",
    Value: trungbinhkham,
  });
  ChiSos.push({ Name: "Lâu nhất", Value: data.maxthoigiankham });
  ChiSos.push({ Name: "Nhanh nhất", Value: data.minthoigiankham });

  return {
    Title: "Thời gian khám bệnh của bác sĩ  ",
    GhiChu: `(Từ khi người bệnh được gọi vào phòng khám đến khi có chỉ định cận lâm sàng)`,
    ChiSos: ChiSos,
  };
};
const setTongThoiGianKhamBenh = (data) => {
  const ChiSos = [];
  const trungbinhtoanvien =
    data.toanvien_tongthoigiankham / data.toanvien_khamxong || "";
  const trungbinhconglap =
    data.conglap_tongthoigiankham / data.conglap_khamxong || "";
  const trungbinhyeucau =
    data.yeucau_tongthoigiankham / data.yeucau_khamxong || "";
  if (trungbinhconglap !== "")
    ChiSos.push({
      Name: "Toàn viện",
      Value: parseFloat(trungbinhtoanvien.toFixed(1)),
    });
  if (trungbinhconglap !== "")
    ChiSos.push({
      Name: "Công lập",
      Value: parseFloat(trungbinhconglap.toFixed(1)),
    });
  if (trungbinhyeucau !== "")
    ChiSos.push({
      Name: "Yêu cầu",
      Value: parseFloat(trungbinhyeucau.toFixed(1)),
    });

  return {
    Title: "Trung bình tổng thời gian khám bệnh",
    GhiChu: `(Tính từ thời điểm người bệnh đăng ký khám bệnh đến khi kết thúc quy trình khám)`,
    ChiSos: ChiSos,
  };
};

const setTyLeTraDungCLS = (data) => {
  const tyledung = [];
  const tylesai = [];
  const labels = [];
  const pushValue = (dungthoigian, datraketqua, label) => {
    if (dungthoigian !== null && datraketqua !== null && datraketqua !== 0) {
      const value =
        dungthoigian !== null && datraketqua !== null && datraketqua != 0
          ? (dungthoigian / datraketqua).toFixed(4) * 100
          : 0;
      tyledung.push(value);
      tylesai.push(100 - value);
      labels.push(label);
    } 
  };

  // tyledung.push((data.xn_dungthoigian / data.xn_tongdatrakq).toFixed(2)*100);
  // tyledung.push((data.xq_dungthoigian / data.xq_tongdatrakq).toFixed(2)*100);
  // tyledung.push((data.ct_dungthoigian / data.ct_tongdatrakq).toFixed(2)*100);
  // tyledung.push((data.mri_dungthoigian / data.mri_tongdatrakq).toFixed(2)*100);
  // tyledung.push((data.sa_dungthoigian / data.sa_tongdatrakq).toFixed(2)*100);
  // tyledung.push((data.cnhh_dungthoigian / data.cnhh_tongdatrakq).toFixed(2)*100 );
  // tyledung.push((data.mdlx_dungthoigian / data.mdlx_tongdatrakq).toFixed(2)*100);
  // tyledung.push((data.ns_dungthoigian / data.ns_tongdatrakq).toFixed(2)*100);
  // tyledung.push((data.dn_dungthoigian / data.dn_tongdatrakq).toFixed(2)*100);
  // tyledung.push((data.dt_dungthoigian / data.dt_tongdatrakq).toFixed(2)*100);

  // const tylesai =tyledung.map((tyle)=>100-tyle)

  pushValue(data.xn_dungthoigian, data.xn_tongdatrakq, "Xét nghiệm");
  pushValue(data.xq_dungthoigian, data.xq_tongdatrakq, "XQuang");
  pushValue(data.ct_dungthoigian, data.ct_tongdatrakq, "CT");
  pushValue(data.mri_dungthoigian, data.mri_tongdatrakq, "MRI");
  pushValue(data.sa_dungthoigian, data.sa_tongdatrakq, "Siêu âm");
  pushValue(data.cnhh_dungthoigian, data.cnhh_tongdatrakq, "CN Hô hấp");
  pushValue(data.mdlx_dungthoigian, data.mdlx_tongdatrakq, "Đo MĐLX");
  pushValue(data.ns_dungthoigian, data.ns_tongdatrakq, "Nội soi");
  pushValue(data.dn_dungthoigian, data.dn_tongdatrakq, "Điện não");
  pushValue(data.dt_dungthoigian, data.dt_tongdatrakq, "Điện tim");

  return {
    TyLeDung: tyledung,
    TyLeSai: tylesai,
    Labels: labels,
  };
};
const setThoiGianCanLamSang = (data) => {
  let canlamsangs = [];
  let xetnghiem = {};
  let trungbinhcholaymauXN =
    (data.xn_tongthoigiancholaymau / data.xn_tongxnlaymau).toFixed(1) || "";
  let trungbinhchoketquaXN =
    (data.xn_tongthoigianchoketqua / data.xn_tongdatrakq).toFixed(1) || "";

  xetnghiem.Name = "Xét nghiệm";
  if (data.xn_tongxnlaymau > 0) {
    xetnghiem.TrungBinhChoThucHien = trungbinhcholaymauXN;
    xetnghiem.MaxThucHien = data.xn_maxthoigiancholaymau;
    xetnghiem.MinThucHien = data.xn_minthoigiancholaymau;
  }

  if (data.xn_tongdatrakq > 0) {
    xetnghiem.TrungBinhChoKetQua = trungbinhchoketquaXN;
    xetnghiem.MaxChoKetQua = data.xn_maxthoigianchoketqua;
    xetnghiem.MinChoKetQua = data.xn_minthoigianchoketqua;
  }
  xetnghiem.TyLeDung = (data.xn_dungthoigian / data.xn_tongdatrakq).toFixed(1);
  xetnghiem.TieuChuan = 180;
  canlamsangs.push(xetnghiem);

  let xquang = {};
  let trungbinhchothuchienXQ =
    (data.xq_tongthoigianchothuchien / data.xq_tongthuchien).toFixed(1) || "";
  let trungbinhchoketquaXQ =
    (data.xq_tongthoigianchoketqua / data.xq_tongdatrakq).toFixed(1) || "";

  xquang.Name = "XQuang";
  if (data.xq_tongthuchien > 0) {
    xquang.TrungBinhChoThucHien = trungbinhchothuchienXQ;
    xquang.MaxThucHien = data.maxthoigianchothuchienxq;
    xquang.MinThucHien = data.minthoigianchothuchienxq;
  }
  if (data.xq_tongdatrakq > 0) {
    xquang.TrungBinhChoKetQua = trungbinhchoketquaXQ;
    xquang.MaxChoKetQua = data.xq_maxthoigianchoketqua;
    xquang.MinChoKetQua = data.xq_minthoigianchoketqua;
  }
  xquang.TyLeDung = (data.xq_dungthoigian / data.xq_tongdatrakq).toFixed(1);
  xquang.TieuChuan = 30;
  canlamsangs.push(xquang);

  let ctscanner = {};
  let trungbinhchothuchienCT =
    (data.ct_tongthoigianchothuchien / data.ct_tongthuchien).toFixed(1) || "";
  let trungbinhchoketquaCT =
    (data.ct_tongthoigianchoketqua / data.ct_tongdatrakq).toFixed(1) || "";

  ctscanner.Name = "CT SCanner";
  if (data.ct_tongthuchien > 0) {
    ctscanner.TrungBinhChoThucHien = trungbinhchothuchienCT;
    ctscanner.MaxThucHien = data.ct_maxthoigianchothuchien;
    ctscanner.MinThucHien = data.ct_minthoigianchothuchien;
  }
  if (data.ct_tongdatrakq > 0) {
    ctscanner.TrungBinhChoKetQua = trungbinhchoketquaCT;
    ctscanner.MaxChoKetQua = data.ct_maxthoigianchoketqua;
    ctscanner.MinChoKetQua = data.ct_minthoigianchoketqua;
  }
  ctscanner.TyLeDung = (data.ct_dungthoigian / data.ct_tongdatrakq).toFixed(1);
  ctscanner.TieuChuan = 60;
  canlamsangs.push(ctscanner);

  let mri = {};
  let trungbinhchothuchienMRI =
    (data.mri_tongthoigianchothuchien / data.mri_tongthuchien).toFixed(1) || "";
  let trungbinhchoketquaMRI =
    (data.mri_tongthoigianchoketqua / data.mri_tongdatrakq).toFixed(1) || "";

  mri.Name = "MRI";
  if (data.mri_tongthuchien > 0) {
    mri.TrungBinhChoThucHien = trungbinhchothuchienMRI;
    mri.MaxThucHien = data.mri_maxthoigianchothuchien;
    mri.MinThucHien = data.mri_minthoigianchothuchien;
  }
  if (data.mri_tongdatrakq > 0) {
    mri.TrungBinhChoKetQua = trungbinhchoketquaMRI;
    mri.MaxChoKetQua = data.mri_maxthoigianchoketqua;
    mri.MinChoKetQua = data.mri_minthoigianchoketqua;
  }
  mri.TyLeDung = (data.mri_dungthoigian / data.mri_tongdatrakq).toFixed(1);
  mri.TieuChuan = 120;
  canlamsangs.push(mri);

  let sa = {};
  let trungbinhchothuchienSA =
    (data.sa_tongthoigianchothuchien / data.sa_tongthuchien).toFixed(1) || "";
  let trungbinhchoketquaSA =
    (data.sa_tongthoigianchoketqua / data.sa_tongdatrakq).toFixed(1) || "";

  sa.Name = "Siêu âm";
  if (data.sa_tongthuchien > 0) {
    sa.TrungBinhChoThucHien = trungbinhchothuchienSA;
    sa.MaxThucHien = data.sa_maxthoigianchothuchien;
    sa.MinThucHien = data.sa_minthoigianchothuchien;
  }
  if (data.sa_tongdatrakq > 0) {
    sa.TrungBinhChoKetQua = trungbinhchoketquaSA;
    sa.MaxChoKetQua = data.sa_maxthoigianchoketqua;
    sa.MinChoKetQua = data.sa_minthoigianchoketqua;
  }
  sa.TyLeDung = (data.sa_dungthoigian / data.sa_tongdatrakq).toFixed(1);
  sa.TieuChuan = 10;
  canlamsangs.push(sa);

  let cnhh = {};
  let trungbinhchothuchienCNHH =
    (data.cnhh_tongthoigianchothuchien / data.cnhh_tongthuchien).toFixed(1) ||
    "";
  let trungbinhchoketquaCNHH =
    (data.cnhh_tongthoigianchoketqua / data.cnhh_tongdatrakq).toFixed(1) || "";

  cnhh.Name = "Đo chức năng hô hấp";
  if (data.cnhh_tongthuchien > 0) {
    cnhh.TrungBinhChoThucHien = trungbinhchothuchienCNHH;
    cnhh.MaxThucHien = data.cnhh_maxthoigianchothuchien;
    cnhh.MinThucHien = data.cnhh_minthoigianchothuchien;
  }
  if (data.cnhh_tongdatrakq > 0) {
    cnhh.TrungBinhChoKetQua = trungbinhchoketquaCNHH;
    cnhh.MaxChoKetQua = data.cnhh_maxthoigianchoketqua;
    cnhh.MinChoKetQua = data.cnhh_minthoigianchoketqua;
  }
  cnhh.TyLeDung = (data.cnhh_dungthoigian / data.cnhh_tongdatrakq).toFixed(1);
  cnhh.TieuChuan = 10;
  canlamsangs.push(cnhh);

  let mdlx = {};
  let trungbinhchothuchienMDLX =
    (data.mdlx_tongthoigianchothuchien / data.mdlx_tongthuchien).toFixed(1) ||
    "";
  let trungbinhchoketquaMDLX =
    (data.mdlx_tongthoigianchoketqua / data.mdlx_tongdatrakq).toFixed(1) || "";

  mdlx.Name = "Đo mật độ loãng xương";

  if (data.mdlx_tongthuchien > 0) {
    mdlx.TrungBinhChoThucHien = trungbinhchothuchienMDLX;
    mdlx.MaxThucHien = data.mdlx_maxthoigianchothuchien;
    mdlx.MinThucHien = data.mdlx_minthoigianchothuchien;
  }

  if (data.mdlx_tongdatrakq > 0) {
    mdlx.TrungBinhChoKetQua = trungbinhchoketquaMDLX;
    mdlx.MaxChoKetQua = data.mdlx_maxthoigianchoketqua;
    mdlx.MinChoKetQua = data.mdlx_minthoigianchoketqua;
  }
  mdlx.TyLeDung = (data.mdlx_dungthoigian / data.mdlx_tongdatrakq).toFixed(1);
  mdlx.TieuChuan = 10;
  canlamsangs.push(mdlx);

  let noisoi = {};
  let trungbinhchothuchienNS =
    (data.ns_tongthoigianchothuchien / data.ns_tongthuchien).toFixed(1) || "";
  let trungbinhchoketquaNS =
    (data.ns_tongthoigianchoketqua / data.ns_tongdatrakq).toFixed(1) || "";

  noisoi.Name = "Nội soi";
  if (data.ns_tongthuchien > 0) {
    noisoi.TrungBinhChoThucHien = trungbinhchothuchienNS;
    noisoi.MaxThucHien = data.ns_maxthoigianchothuchien;
    noisoi.MinThucHien = data.ns_minthoigianchothuchien;
  }
  if (data.ns_tongdatrakq > 0) {
    noisoi.TrungBinhChoKetQua = trungbinhchoketquaNS;
    noisoi.MaxChoKetQua = data.ns_maxthoigianchoketqua;
    noisoi.MinChoKetQua = data.ns_minthoigianchoketqua;
  }
  noisoi.TyLeDung = (data.ns_dungthoigian / data.ns_tongdatrakq).toFixed(1);
  noisoi.TieuChuan = 10;
  canlamsangs.push(noisoi);

  let diennao = {};
  let trungbinhchothuchienDN =
    (data.dn_tongthoigianchothuchien / data.dn_tongthuchien).toFixed(1) || "";
  let trungbinhchoketquaDN =
    (data.dn_tongthoigianchoketqua / data.dn_tongdatrakq).toFixed(1) || "";

  diennao.Name = "Điện não đồ";
  if (data.dn_tongthuchien > 0) {
    diennao.TrungBinhChoThucHien = trungbinhchothuchienDN;
    diennao.MaxThucHien = data.dn_maxthoigianchothuchien;
    diennao.MinThucHien = data.dn_minthoigianchothuchien;
  }
  if (data.dn_tongdatrakq > 0) {
    diennao.TrungBinhChoKetQua = trungbinhchoketquaDN;
    diennao.MaxChoKetQua = data.dn_maxthoigianchoketqua;
    diennao.MinChoKetQua = data.dn_minthoigianchoketqua;
  }
  diennao.TyLeDung = (data.dn_dungthoigian / data.dn_tongdatrakq).toFixed(1);
  diennao.TieuChuan = 10;
  canlamsangs.push(diennao);

  let dientim = {};
  let trungbinhchothuchienDT =
    (data.dt_tongthoigianchothuchien / data.dt_tongthuchien).toFixed(1) || "";
  let trungbinhchoketquaDT =
    (data.dt_tongthoigianchoketqua / data.dt_tongdatrakq).toFixed(1) || "";

  dientim.Name = "Điện tim đồ";
  if (data.dt_tongthuchien > 0) {
    dientim.TrungBinhChoThucHien = trungbinhchothuchienDT;
    dientim.MaxThucHien = data.dt_maxthoigianchothuchien;
    dientim.MinThucHien = data.dt_minthoigianchothuchien;
  }
  if (data.dt_tongdatrakq > 0) {
    dientim.TrungBinhChoKetQua = trungbinhchoketquaDT;
    dientim.MaxChoKetQua = data.dt_maxthoigianchoketqua;
    dientim.MinChoKetQua = data.dt_minthoigianchoketqua;
  }
  dientim.TyLeDung = (data.dt_dungthoigian / data.dt_tongdatrakq).toFixed(1);
  dientim.TieuChuan = 10;
  canlamsangs.push(dientim);

  return canlamsangs;
};

const setKhambenhNgoaiTruOrDieuTriNoiTruNotFound = () => {
  const kb = [];
  kb.push({ label: "BHYT", value: 0 });
  kb.push({ label: "Viện phí", value: 0 });
  kb.push({ label: "Yêu cầu", value: 0 });
  return kb;
};
const setGiuongNotFound = () => {
  const kb = [];
  kb.push({ label: "Sử dụng", value: 0 });
  kb.push({ label: "Trống", value: 0 });

  return kb;
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
