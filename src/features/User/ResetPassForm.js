import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  FRadioGroup,
  FTextField,
  FUploadImage,
  FormProvider,
} from "../../components/form";

import {
  Box,
  Stack,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";

import {
  addBenhNhanToList,
  getKhoas,
  updateBenhNhanToList,
} from "../BaoCaoNgay/baocaongaySlice";
import { CreateUser, resetPass } from "./userSlice";

function ResetPassForm({
  open,
    handleClose,
  handleSave,
  user,
  handleChange,
}) {
  
  
  const dispatch = useDispatch();
 
  const methods = useForm({
   
    defaultValues: {
      UserName: user.UserName || "",
      PassWord: user.PassWord || "",
      
    },
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  
  const resetForm = () => {
    reset();
   
  };

  const onSubmitData = (data) => {
    console.log("data", data);
    const userUpdate = {
      ...data, 
      UserId:user._id
    };
    console.log("reset pass user",userUpdate)

    //dispach reset User
    dispatch(resetPass(userUpdate))
    handleClose();
  };
  
  useEffect(() => {
    if (user) {
      // Khi prop benhnhan thay đổi, cập nhật lại dữ liệu trong form
      console.log("chay vao day",user)
      setValue("UserName", user.UserName || "");
      setValue("PassWord", user.PassWord || "");
     
    }
   
  }, [user,open,setValue]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            width: "1000px", // Or any other width you want
            height: "600px", // Or any other height you want
          },
        }}
      >
        <DialogTitle id="form-dialog-title">Đặt lại mật khẩu</DialogTitle>
        <DialogContent>
          <Card sx={{ p: 3 }}>
            {/* onSubmit={handleSubmit(onSubmit)} */}
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmitData)}
            >
              <Stack spacing={1}>
              <FormControl fullWidth>
           
          </FormControl>
                  <FTextField name="UserName" label="User name"  disabled={true}/>
                <FTextField name="PassWord" label="Password"  type={"password"}/>
                 
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
                    loading={isSubmitting}
                  >
                   Lưu
                  </LoadingButton>
                </Box>
              </Stack>
            </FormProvider>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResetPassForm;
