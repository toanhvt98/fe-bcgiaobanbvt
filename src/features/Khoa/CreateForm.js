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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FTextField, FormProvider } from "../../components/form";
import { getKhoas } from "../BaoCaoNgay/baocaongaySlice";
const yupSchema = Yup.object().shape({
  STT: Yup.number().required("This field is require"),
  TenKhoa: Yup.string().required("This field is require"),
  LoaiKhoa: Yup.string().required("This field is require"),
  MaKhoa: Yup.string().required("This field is require"),
});
const defaultValues = {
  STT: "",
  TenKhoa: "",
  LoaiKhoa: "",
  MaKhoa: "",
};
function CreateForm({ isOpen, isClose }) {
  const { isLoading } = useSelector((state) => state.khoa);
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
  // useEffect(() => {
  //   if (true) {
  //     // Khi prop benhnhan thay đổi, cập nhật lại dữ liệu trong form
  //     console.log("chay vao day");
  //     setValue("STT", "");
  //     setValue("TenKhoa", "");

  //     setValue("LoaiKhoa", "");

  //     setValue("MaKhoa", "");
  //     // setValue("PhanQuyen", user.PhanQuyen || "");
  //   }
  // }, [setValue]);
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const { STT, TenKhoa, LoaiKhoa, MaKhoa } = data;
    console.log("data dat", data);
    // dispatch(listKhoa());
    // dispatch(createKhoa(data));
    dispatch(creKhoa(data));
    reset();
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
            height: "500px", // Or any other height you want
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
              <FTextField
                name="LoaiKhoa"
                label="Loại khoa"
                // onChange={(event) => setLoaiKhoa(event.target.value)}
                fullWidth
              />
              <FTextField
                name="MaKhoa"
                label="Mã khoa"
                // onChange={(event) => setMaKhoa(event.target.value)}
                fullWidth
              />
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
                  loading={
                    isSubmitting
                    //  || isLoading
                  }
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
