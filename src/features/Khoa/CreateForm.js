import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { creKhoa } from "./khoaSlice";
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

const yupSchema = Yup.object().shape({
  STT: Yup.number().required("Trường bắt buộc"),
  TenKhoa: Yup.string().required("Trường bắt buộc"),
  LoaiKhoa: Yup.string().required("Trường bắt buộc"),
  MaKhoa: Yup.string().required("Trường bắt buộc"),
});

function CreateForm({ isOpen, isclose }) {
  const { isLoading, error } = useSelector((state) => state.khoa);
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
      ...data,
      LoaiKhoa: loaiKhoa,
    };
    dispatch(creKhoa(khoa));
    reset();
    isclose();
  };
  useEffect(() => {
    setValue("STT", "");
    setValue("TenKhoa", "");
    setLoaiKhoa(loaiKhoa);
    setValue("MaKhoa", "");
  }, [isOpen, setValue]);
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={isclose}
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
              <Autocomplete
                options={lstLoaiKhoa}
                value={loaiKhoa}
                onInputChange={(event, value) => {
                  setLoaiKhoa(value || lstLoaiKhoa[0]);
                  console.log(value);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Loại khoa" variant="outlined" />
                )}
              />
              <FTextField name="MaKhoa" label="Mã khoa" fullWidth />
              <Divider />
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
                <DialogActions>
                  <Button
                    onClick={isclose}
                    variant="contained"
                    size="small"
                    color="error"
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

export default CreateForm;
