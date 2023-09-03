import { configureStore } from "@reduxjs/toolkit";
import baocaongaySlice from "../features/BaoCaoNgay/baocaongaySlice";
import bcgiaobanSlice from "../features/BCGiaoBan/bcgiaobanSlice";
import userSlice from "../features/User/userSlice";

const rootReducer = {
 baocaongay:baocaongaySlice,
 bcgiaoban: bcgiaobanSlice,
 user:userSlice
};

const store = configureStore({
  reducer:rootReducer
})

export default store;