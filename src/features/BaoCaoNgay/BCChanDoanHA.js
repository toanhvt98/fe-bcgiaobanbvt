import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { FTextField, FormProvider } from "../../components/form";

import useAuth from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { insertOrUpdateBaoCaoNgay } from "./baocaongaySlice";
import dayjs from "dayjs";
import { fDate } from "../../utils/formatTime";

const RegisterSchema = Yup.object().shape({
  
  Xquang: Yup.number().typeError("Bạn phải nhập 1 số"),
  CT16: Yup.number().typeError("Bạn phải nhập 1 số"),
  CT128: Yup.number().typeError("Bạn phải nhập 1 số"),
  MRI: Yup.number().typeError("Bạn phải nhập 1 số"),
 
});

function BCChanDoanHA() {
  const { user } = useAuth();
  const { bcGiaoBanTheoNgay, khoas, ctChiSos, isLoading } = useSelector(
    (state) => state.baocaongay
  );

  console.log("bcGiaobantheongay", bcGiaoBanTheoNgay);
  const defaultValues = {
    BSTruc: "",
    DDTruc: "",
    CBThemGio: "",
    Xquang: 0,
    CT16: 0,
    CT128: 0,
    MRI: 0,
   
  };
  console.log("defaultvalue", defaultValues);
  const [tenkhoa, setTenkhoa] = useState("");
  const [ngay, setNgay] = useState();

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    //set value cho cac truong trong form

    setValue(
      "BSTruc",
      bcGiaoBanTheoNgay.BSTruc || ""
    );
    setValue(
      "DDTruc",
      bcGiaoBanTheoNgay.DDTruc || ""
    );
    setValue(
      "CBThemGio",
     bcGiaoBanTheoNgay.CBThemGio || ""
    );
   

    setValue(
      "Xquang",
      ctChiSos.find((obj) => obj.ChiSoCode === "cdha-Xquang")?.SoLuong || 0
    );
    setValue(
      "CT16",
      ctChiSos.find((obj) => obj.ChiSoCode === "cdha-CT16")?.SoLuong || 0
    );
    setValue(
      "CT128",
      ctChiSos.find((obj) => obj.ChiSoCode === "cdha-CT128")?.SoLuong || 0
    );
    setValue(
      "MRI",
      ctChiSos.find((obj) => obj.ChiSoCode === "cdha-MRI")?.SoLuong || 0
    );
   
    //Hiển thị khoa và ngày
    if (bcGiaoBanTheoNgay.KhoaID) {
      const TenKhoa = khoas.find(
        (khoa) => khoa._id === bcGiaoBanTheoNgay.KhoaID
      ).TenKhoa;
      const ngayISO = bcGiaoBanTheoNgay.Ngay;
      const ngay = new Date(ngayISO);
      const ngayFns = fDate(ngay);
      const ngayJS = dayjs(ngay);
      console.log("ngay", ngay);
      console.log("ngayISO", ngayISO);
      console.log("ngayFns", ngayFns);
      console.log("ngayJs", ngayJS);
      setNgay(ngayFns);
      if (TenKhoa) setTenkhoa(TenKhoa);
    }
  }, [bcGiaoBanTheoNgay, khoas, ctChiSos, setValue]);

  const dispatch = useDispatch();
  const handleCapNhatDuLieu = (data) => {
    //Set ChitietChiSols-TongNB

    const ctChiSo = [
     
      { ChiSoCode: "cdha-Xquang", SoLuong: data.Xquang },
      { ChiSoCode: "cdha-CT16", SoLuong: data.CT16 },
      { ChiSoCode: "cdha-CT128", SoLuong: data.CT128 },
      { ChiSoCode: "cdha-MRI", SoLuong: data.MRI },
     
    ];
    // set BaoCaoNgay cap nhat
    const bcNgayKhoa = {
      ...bcGiaoBanTheoNgay,
      UserID: user._id,
      BSTruc:data.BSTruc,
      DDTruc:data.DDTruc,
      CBThemGio:data.CBThemGio,
      ChiTietBenhNhan: [],
      ChiTietChiSo: ctChiSo,
    };

    console.log("BaoCaoNgay", data);
    console.log("user", user);
    console.log("BaoCaoNgay truyen vao slice de insert", bcNgayKhoa);
    dispatch(insertOrUpdateBaoCaoNgay(bcNgayKhoa));
  };

  return (
    <Container>
      <Stack>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(handleCapNhatDuLieu)}
        >
          <Stack direction="row" spacing={2} mt={3}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Báo cáo {tenkhoa} ngày {ngay}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting}
            >
              Cập nhật
            </LoadingButton>
          </Stack>
          <Grid container spacing={3} my={1}>
            <Grid item xs={6} md={4}>
              <FTextField name="BSTruc" label="Bác sĩ trực" />
            </Grid>
            <Grid item xs={6} md={4}>
              <FTextField name="DDTruc" label="Kỹ thuật viên trực" />
            </Grid>
            <Grid item xs={6} md={4}>
              <FTextField name="CBThemGio" label="Cán bộ thêm giờ" />
            </Grid>
            <Grid item xs={6} md={4}>
              <FTextField name="Xquang" label="Số ca chụp Xquang" />
            </Grid>
            <Grid item xs={6} md={4}>
              <FTextField name="CT16" label="Số ca chụp CT16" />
            </Grid>
            <Grid item xs={6} md={4}>
              <FTextField name="CT128" label="Số ca chụp CT128" />
            </Grid>
            <Grid item xs={6} md={4}>
              <FTextField name="MRI" label="Số ca chụp MRI" />
            </Grid>
           
          </Grid>
        </FormProvider>
      </Stack>
    </Container>
  );
}

export default BCChanDoanHA;
