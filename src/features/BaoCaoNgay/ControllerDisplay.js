import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Stack,
  Link,
  Card,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Navigate, useNavigate, Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getDataBCNgay, getKhoas } from "./baocaongaySlice";
import { date } from "yup";
import BCKhoaKhamBenh from "./BCKhoaKhamBenh";
import useAuth from "../../hooks/useAuth";
import BCNgayLamSang from "./BCNgayLamSangNgoai";
import BCGayMeHS from "./BCGayMeHS";
import BCXetNghiemHH from "./BCXetNghiemHH";
import BCXetNghiemHS from "./BCXetNghiemHS";
import BCXetNghiemVS from "./BCXetNghiemVS";
import BCChanDoanHA from "./BCChanDoanHA";
import BCThamDoCN from "./BCThamDoCN";
import BCHuyetHocTM from "./BCHuyetHocTM";
import BCTrungTamCLC from "./BCTrungTamCLC";
import BCNgayLamSangNoi from "./BCNgayLamSangNoi";
import BCNgayLamSangNgoai from "./BCNgayLamSangNgoai";

function ControllerDisplay() {
  const { user } = useAuth();
  const { khoas } = useSelector((state) => state.baocaongay);
  // const [date, setDate] = useState(new Date());
  //   const [date, setDate] = useState((new Date()));
  const [date, setDate] = useState(
    dayjs(new Date()).hour(7).minute(0).second(0).millisecond(0)
  );
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loaikhoa, setLoaikhoa] = useState("noi");

  const dispatch = useDispatch();
  //   const SetBaoCaoNgayInStore = () => {
  //     const dateISO = date.toISOString();
  //     dispatch(getDataBCNgay(dateISO, selectedDepartment));
  //   };

  useEffect(() => {
    dispatch(getKhoas());
  }, [dispatch]);

  useEffect(() => {
    //SetBaoCaoNgayInStore
    const dateISO = date.toISOString();
    if (selectedDepartment !== "")
      dispatch(getDataBCNgay(dateISO, selectedDepartment));
  }, [date, selectedDepartment, dispatch]);

  useEffect(() => {
    // Update selectedDepartment when khoas changes
    if (khoas && khoas.length > 0) {
      setSelectedDepartment(khoas[0]._id);
    }
  }, [khoas]);

  const handleDateChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào
    console.log("Chay day khong");
    if (newDate instanceof Date) {
      newDate.setHours(7, 0, 0, 0);
      setDate(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);
      const updatedDate = newDate.hour(7).minute(0).second(0).millisecond(0);
      console.log("updateDate", updatedDate);
      setDate(updatedDate);
    }
    // setDate(newDate)
    // SetBaoCaoNgayInStore()
  };

  const handleSelectChange = (e) => {
    setSelectedDepartment(e.target.value);
    //setLoaikhoa de hien thi giao dien tuong ung
    const loai_khoa = khoas.find(
      (khoa) => khoa._id === e.target.value
    )?.LoaiKhoa;
    console.log("loaikhoa", loai_khoa);
    setLoaikhoa(loai_khoa);
  };

  return (
    <Stack>
      <Card sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Ngày" value={date} onChange={handleDateChange} />
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel>Khoa</InputLabel>
            <Select value={selectedDepartment} onChange={handleSelectChange}>
              {khoas &&
                khoas.length > 0 &&
                khoas.map((department) => (
                  <MenuItem key={department._id} value={department._id}>
                    {department.TenKhoa}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Link variant="subtitle2" component={RouterLink} to="/">
            Báo cáo toàn viện
          </Link>
        </Stack>{" "}
      </Card>
      <Card sx={{ my: 3, py: 3 }}>
        {loaikhoa === "kkb" && <BCKhoaKhamBenh />}
        {loaikhoa === "noi" && <BCNgayLamSangNoi/>}
        {loaikhoa === "ngoai" && <BCNgayLamSangNgoai/>}
        {loaikhoa === "gmhs" && <BCGayMeHS />}
        {loaikhoa === "xnhh" && <BCXetNghiemHH />}
        {loaikhoa === "xnhs" && <BCXetNghiemHS />}
        {loaikhoa === "xnvs" && <BCXetNghiemVS />}
        {loaikhoa === "cdha" && <BCChanDoanHA />}
        {loaikhoa === "tdcn" && <BCThamDoCN />}
        {loaikhoa === "hhtm" && <BCHuyetHocTM />}
        {loaikhoa === "clc" && <BCTrungTamCLC />}
      </Card>
    </Stack>
  );
}

export default ControllerDisplay;
