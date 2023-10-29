import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { FTextField, FormProvider } from "../../components/form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { delKhoa } from "./khoaSlice";
const yupSchema = Yup.object().shape({
  _id: Yup.string(),
  STT: Yup.number(),
  TenKhoa: Yup.string(),
});
function DeleteForm({ isOpen, isClose, khoa }) {
  const { _id, STT, TenKhoa } = khoa;
  const { isLoading } = useSelector((state) => state.khoa);
  const defaultValues = {
    STT: STT,
    TenKhoa: TenKhoa,
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
  const onSubmit = () => {
    dispatch(delKhoa(_id));
    isClose();
  };
  useEffect(() => {
    setValue("STT", STT);
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
            height: "350px", // Or any other height you want
          },
        }}
      >
        <DialogTitle id="form-dialog-title">Xóa khoa phòng</DialogTitle>
        <Divider />
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={3}>
              <Stack direction="row" display="flex" alignItems="center">
                <Typography width={100} noWrap>
                  Số thứ tự
                </Typography>
                <FTextField
                  name="STT"
                  lable="STT"
                  inputProps={{ readOnly: true }}
                />
              </Stack>

              <Stack direction="row" display="flex" alignItems="center">
                <Typography width={100} noWrap>
                  Tên khoa
                </Typography>
                <FTextField
                  name="TenKhoa"
                  lable="TenKhoa"
                  inputProps={{ readOnly: true }}
                />
              </Stack>
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
                  Xóa
                </LoadingButton>
                <DialogActions>
                  <Button
                    onClick={isClose}
                    variant="contained"
                    color="error"
                    size="small"
                    style={{
                      maxWidth: "50px",
                      maxHeight: "50px",
                      minWidth: "20px",
                      minHeight: "20px",
                    }}
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

export default DeleteForm;
