import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import createKhoa, { creKhoa, listKhoa } from "./khoaSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FTextField, FormProvider } from "../../components/form";

const yupSchema = Yup.object().shape({
  STT: Yup.number().required("Trường bắt buộc"),
  TenKhoa: Yup.string().required("Trường bắt buộc"),
  LoaiKhoa: Yup.string().required("Trường bắt buộc"),
  MaKhoa: Yup.string().required("Trường bắt buộc"),
});
const defaultValues = {
  STT: "",
  TenKhoa: "",
  LoaiKhoa: "",
  MaKhoa: "",
};
function CreateForm({ isOpen, isClose }) {
  const { isLoading, error } = useSelector((state) => state.khoa);
  // const [STT, setSTT] = useState("");
  // const [TenKhoa, setTenKhoa] = useState("");
  // const [LoaiKhoa, setLoaiKhoa] = useState("");
  // const [MaKhoa, setMaKhoa] = useState("");
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const { STT, TenKhoa, LoaiKhoa, MaKhoa } = data;
    console.log("data dat", data);
    dispatch(creKhoa(data));
    if (error === null) reset();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={isClose}
        aria-labelledby="form-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            width: "500px", // Or any other width you want
            height: "600px", // Or any other height you want
          },
        }}
      >
        <DialogTitle id="form-dialog-title">Thêm khoa phòng</DialogTitle>
        <Divider />

        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FTextField
                name="STT"
                label="STT"
                // onChange={(event) => setSTT(event.target.value)}
                fullWidth
              />
              <FTextField
                name="TenKhoa"
                label="Tên khoa"
                // onChange={(event) => setTenKhoa(event.target.value)}
                fullWidth
              />
              <FTextField name="LoaiKhoa" label="Loại khoa" fullWidth />
              <FTextField name="MaKhoa" label="Mã khoa" fullWidth />
              {error === null ? "" : <Typography>{error}</Typography>}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="small"
                  loading={isSubmitting || isLoading}
                >
                  Lưu
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={isClose} variant="contained" color="error">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateForm;
