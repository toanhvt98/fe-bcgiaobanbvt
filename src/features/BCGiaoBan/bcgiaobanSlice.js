import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import {
  extractChiSo,
  filterChiTietBenhNhans,
  filterChiTietBenhNhansCLC,
  findKhoasInBaocaongays,
} from "../../utils/heplFuntion";

const initialState = {
  isLoading: false,
  error: null,
  bcGiaoBanAll: {},
  baocaongays: [],

  noiBNTuvongs: [],
  noiBNChuyenViens: [],
  noiBNXinVes: [],
  noiBNNangs: [],
  noiBNNgoaiGios: [],

  ngoaiBNTuvongs: [],
  ngoaiBNChuyenViens: [],
  ngoaiBNXinVes: [],
  ngoaiBNNangs: [],
  ngoaiBNPhauThuats: [],
  ngoaiBNNgoaiGios: [],

  clcBNTuvongs: [],
  clcBNChuyenViens: [],
  clcBNXinVes: [],
  clcBNNangs: [],

  hsccycBNNgoaiGios: [],
  noiycBNNgoaiGios: [],
  ngoaiycBNPhauThuats: [],
  ngoaiycBNNgoaiGios: [],

  khoas: [],
  khoaDaGuis: [],
  khoaChuaGuis: [],

  chiso: {},
};

const slice = createSlice({
  name: "bcgiaoban",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getDataBCNgaysForGiaoBanSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.baocaongays = action.payload.baocaongays;

      state.noiBNTuvongs = filterChiTietBenhNhans(state.baocaongays, 1, "noi");
      state.noiBNChuyenViens = filterChiTietBenhNhans(
        state.baocaongays,
        2,
        "noi"
      );
      state.noiBNXinVes = filterChiTietBenhNhans(state.baocaongays, 3, "noi");
      state.noiBNNangs = filterChiTietBenhNhans(state.baocaongays, 4, "noi");
      state.noiBNNgoaiGios = filterChiTietBenhNhans(
        state.baocaongays,
        6,
        "noi"
      );

      state.ngoaiBNTuvongs = filterChiTietBenhNhans(
        state.baocaongays,
        1,
        "ngoai"
      );
      state.ngoaiBNChuyenViens = filterChiTietBenhNhans(
        state.baocaongays,
        2,
        "ngoai"
      );
      state.ngoaiBNXinVes = filterChiTietBenhNhans(
        state.baocaongays,
        3,
        "ngoai"
      );
      state.ngoaiBNNangs = filterChiTietBenhNhans(
        state.baocaongays,
        4,
        "ngoai"
      );
      state.ngoaiBNPhauThuats = filterChiTietBenhNhans(
        state.baocaongays,
        5,
        "ngoai"
      );
      state.ngoaiBNNgoaiGios = filterChiTietBenhNhans(
        state.baocaongays,
        6,
        "ngoai"
      );

      state.clcBNTuvongs = filterChiTietBenhNhansCLC(state.baocaongays, 1, [
        "NoiYC",
        "NgoaiYC",
        "HSCCYC",
      ]);
      state.clcBNChuyenViens = filterChiTietBenhNhansCLC(state.baocaongays, 2, [
        "NoiYC",
        "NgoaiYC",
        "HSCCYC",
      ]);
      state.clcBNXinVes = filterChiTietBenhNhansCLC(state.baocaongays, 3, [
        "NoiYC",
        "NgoaiYC",
        "HSCCYC",
      ]);
      state.clcBNNangs = filterChiTietBenhNhansCLC(state.baocaongays, 4, [
        "NoiYC",
        "NgoaiYC",
        "HSCCYC",
      ]);

      state.hsccycBNNgoaiGios = filterChiTietBenhNhansCLC(
        state.baocaongays,
        6,
        ["HSCCYC"]
      );
      state.noiycBNNgoaiGios = filterChiTietBenhNhansCLC(state.baocaongays, 6, [
        "NoiYC",
      ]);
      state.ngoaiycBNNgoaiGios = filterChiTietBenhNhansCLC(
        state.baocaongays,
        6,
        ["NgoaiYC"]
      );
      state.ngoaiycBNPhauThuats = filterChiTietBenhNhansCLC(
        state.baocaongays,
        5,
        ["NgoaiYC"]
      );

      state.khoaDaGuis = findKhoasInBaocaongays(
        state.baocaongays,
        state.khoas
      ).KhoaDaGuis;
      state.khoaChuaGuis = findKhoasInBaocaongays(
        state.baocaongays,
        state.khoas
      ).KhoaChuaGuis;

      //set gía trị cho chiso:
      const chisoCode = [
        "kkb-TongKham",
        "kkb-BaoHiem",
        "kkb-VienPhi",
        "kkb-YeuCau",
        "kkb-NBVaoVien",
        "kkb-CVNoiTru",
        "kkb-CVNgoaiTru",
        "kkb-NgoaiTinhNgoaiTruBH",
        "kkb-NgoaiTinhNgoaiTruVP",
        "kkb-NgoaiTinhNoiTruBH",
        "kkb-NgoaiTinhNoiTruVP",
        "gmhs-TongMo",
        "gmhs-TrongGio",
        "gmhs-NgoaiGio",
        "xn-HuyetHoc",
        "xn-HoaSinh",
        "xn-ViSinh",
        "cdha-Xquang",
        "cdha-CT16",
        "cdha-CT128",
        "cdha-MRI",
        "tdcn-SieuAm",
        "tdcn-NoiSoi",
        "hhtm-TongXN",
        "hhtm-HongCau",
        "hhtm-HuyetTuong",
        "hhtm-TieuCau",
        "hhtm-Cryo",
        "kcc-TongKham",
        "kcc-VaoVien",
        "clc-TongNB",
        "clc-VaoThang",
        "clc-ChuyenSang",
        "clc-GiuongTrong",
      ];
      state.chiso = extractChiSo(state.baocaongays, chisoCode);

      
    },

    getKhoasInBCGiaoBanSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("khoas", action.payload);
      state.khoas = [...action.payload];
      // state.khoaDaGuis = findKhoasInBaocaongays(
      //   state.baocaongays,
      //   state.khoas
      // ).KhoaDaGuis;
      // state.khoaChuaGuis = findKhoasInBaocaongays(
      //   state.baocaongays,
      //   state.khoas
      // ).KhoaChuaGuis;
    },
    getCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, comments, count, page } = action.payload;
      comments.forEach(
        (comment) => (state.commentsById[comment._id] = comment)
      );
      state.commentsByPost[postId] = comments
        .map((comment) => comment._id)
        .reverse();
      state.currentPageByPost[postId] = page;
      state.totalCommentsByPost[postId] = count;
    },
    sendCommentReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, reactions } = action.payload;
      state.commentsById[commentId].reactions = reactions;
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
    console.log("baocaongays", response.data.data);
    dispatch(slice.actions.getDataBCNgaysForGiaoBanSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
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
  }
};

export const sendCommentReaction =
  ({ commentId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Comment",
        targetId: commentId,
        emoji,
      });
      dispatch(
        slice.actions.sendCommentReactionSuccess({
          commentId,
          reactions: response.data.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
