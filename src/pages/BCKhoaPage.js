import {
  Button,
  Card,
  CardHeader,
  Container,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FDatePicker from "../components/form/FDatePicker";
import { FSelect, FTextField, FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import ListBenhNhanCard from "../features/BenhNhan/ListBenhNhanCard";
import BenhNhanEditForm from "../features/BenhNhan/BenhNhanEditForm";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import BenhNhanInsertForm from "../features/BenhNhan/BenhNhanInsertForm";
import ControllerDisplay from "../features/BaoCaoNgay/ControllerDisplay";
import BCNgayLamSang from "../features/BaoCaoNgay/BCNgayLamSangNgoai";
import BCKhoaKhamBenh from "../features/BaoCaoNgay/BCKhoaKhamBenh";

function BCKhoaPage() {
  const { user } = useAuth();
  const { khoas } = useSelector((state) => state.baocaongay);

  return (
    <Container>
      <Stack>
        <ControllerDisplay />
        {/* <BCNgayLamSang/> */}
      </Stack>
    </Container>
  );
}

export default BCKhoaPage;
