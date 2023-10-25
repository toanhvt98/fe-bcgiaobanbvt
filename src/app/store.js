import { configureStore } from "@reduxjs/toolkit";
import baocaongaySlice from "../features/BaoCaoNgay/baocaongaySlice";
import bcgiaobanSlice from "../features/BCGiaoBan/bcgiaobanSlice";
import userSlice from "../features/User/userSlice";
import baocaosucoSlice from "../features/BaoCaoSuCo/baocaosucoSlice";
import khoaSlice from "../features/Khoa/khoaSlice";
// import baocaosucoSlice from "../features/User/baocaosucoSlice";

const rootReducer = {
  baocaongay: baocaongaySlice,
  bcgiaoban: bcgiaobanSlice,
  user: userSlice,
  baocaosuco: baocaosucoSlice,
  khoa: khoaSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
