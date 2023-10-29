import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updKhoa } from "./khoaSlice";
import {
  Autocomplete,
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
import { set } from "lodash";
import { toast } from "react-toastify";

const yupSchema = Yup.object().shape({
  STT: Yup.number().required("Trường bắt buộc"),
  TenKhoa: Yup.string().required("Trường bắt buộc"),
  LoaiKhoa: Yup.string().required("Trường bắt buộc"),
  MaKhoa: Yup.string().required("Trường bắt buộc"),
});

function UpdateForm({ isOpen, isClose, khoa }) {
  const { isLoading, error } = useSelector((state) => state.khoa);
  const { _id, STT, LoaiKhoa, MaKhoa, TenKhoa } = khoa;
  const lstLoaiKhoa = [
    "kcc",
    "kkb",
    "noi",
    "ngoai",
    "cskh",
    "gmhs",
    "cdha",
    "tdcn",
    "clc",
    "xn",
    "hhtm",
    "xnvs",
    "xnhs",
  ];
  const [loaiKhoa, setLoaiKhoa] = useState(lstLoaiKhoa[0]);

  const defaultValues = {
    STT: "",
    TenKhoa: "",
    LoaiKhoa: loaiKhoa,
    MaKhoa: "",
  };

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const khoa = {
      _id,
      LoaiKhoa: loaiKhoa,
      TenKhoa: data.TenKhoa,
      MaKhoa: data.MaKhoa,
      STT: data.STT,
    };
    console.log("data dat", khoa);

    dispatch(updKhoa(khoa));
    reset();
    isClose();
  };
  useEffect(() => {
    setValue("STT", STT);
    setValue("MaKhoa", MaKhoa);
    setLoaiKhoa(lstLoaiKhoa[lstLoaiKhoa.findIndex((obj) => obj === LoaiKhoa)]);
    setValue("TenKhoa", TenKhoa);
  }, [isOpen, setValue]);
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={isClose}
        aria-labelledby="form-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            width: "500px", // Or any other width you want
            height: "550px", // Or any other height you want
          },
        }}
      >
        <DialogTitle id="form-dialog-title">Thêm khoa phòng</DialogTitle>
        <Divider />

        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FTextField name="STT" label="STT" fullWidth />
              <FTextField name="TenKhoa" label="Tên khoa" fullWidth />
              <Autocomplete
                options={lstLoaiKhoa}
                value={
                  loaiKhoa ||
                  lstLoaiKhoa[lstLoaiKhoa.findIndex((obj) => obj === LoaiKhoa)]
                }
                onChange={(event, newValue) => {
                  setLoaiKhoa(
                    newValue ||
                      lstLoaiKhoa[
                        lstLoaiKhoa.findIndex((obj) => obj === LoaiKhoa)
                      ]
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Loại khoa" variant="outlined" />
                )}
              />
              <FTextField name="MaKhoa" label="Mã khoa" fullWidth />
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
                  Cập nhật
                </LoadingButton>
                <DialogActions>
                  <Button
                    onClick={isClose}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Hủy
                  </Button>
                </DialogActions>
              </Box>
            </Stack>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateForm;
