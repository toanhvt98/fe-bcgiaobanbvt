import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoading: false,
    error: null,
  darkMode: false,
};

const slice = createSlice({
  name: "themedarkmode",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    changeModeSuccess(state, action) {
     
      state.darkMode = action.payload
    },
  },
});

export default slice.reducer;

export const changeMode = (darkmode) => (dispatch) => {
  try {
    dispatch(slice.actions.changeModeSuccess(darkmode));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
 