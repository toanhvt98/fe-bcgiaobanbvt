import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Link,
  Card,
  Container,
  Grid,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import {
  getDataBCNgay,
  getKhoas,
} from "../features/BaoCaoNgay/baocaongaySlice";
import useAuth from "../hooks/useAuth";
import { FTextField, FormProvider } from "../components/form";
import {  useForm } from "react-hook-form";

function SuCoYKhoaPage() {
  const { user } = useAuth();
  const { khoas } = useSelector((state) => state.baocaongay);
  // const [date, setDate] = useState(new Date());
  //   const [date, setDate] = useState((new Date()));

  // Lấy thời gian hiện tại theo múi giờ của Việt Nam
  const now = dayjs().tz("Asia/Ho_Chi_Minh");

  // Kiểm tra xem giờ hiện tại có >= 18 hay không
  const isAfter18 = now.hour() >= 18;

  // Thiết lập giá trị mặc định cho date dựa trên giờ hiện tại

  const [date, setDate] = useState(now);

  const [selectedDepartment, setSelectedDepartment] = useState(user.KhoaID._id);
  const [loaikhoa, setLoaikhoa] = useState("noi");
  const [makhoa, setMakhoa] = useState("");

  const dispatch = useDispatch();

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
      // setSelectedDepartment(khoas[0]._id);
      setSelectedDepartment(user.KhoaID._id);
      const loai_khoa = khoas.find(
        (khoa) => khoa._id === selectedDepartment
      )?.LoaiKhoa;
      const ma_khoa = khoas.find(
        (khoa) => khoa._id === selectedDepartment
      )?.MaKhoa;

      console.log("loaikhoa", loai_khoa);
      setLoaikhoa(loai_khoa);
      setMakhoa(ma_khoa);
    }
  }, [khoas, user.KhoaID._id]);

  const handleDateChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào
    console.log("Chay day khong");
    if (newDate instanceof Date) {
      //   newDate.setHours(7, 0, 0, 0);
      setDate(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);
      //   const updatedDate = newDate.hour(7).minute(0).second(0).millisecond(0);
      //   console.log("updateDate", updatedDate);
      setDate(newDate);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedDepartment(e.target.value);
    //setLoaikhoa de hien thi giao dien tuong ung
    const loai_khoa = khoas.find(
      (khoa) => khoa._id === e.target.value
    )?.LoaiKhoa;
    const ma_khoa = khoas.find((khoa) => khoa._id === e.target.value)?.MaKhoa;

    console.log("loaikhoa", loai_khoa);
    setLoaikhoa(loai_khoa);
    setMakhoa(ma_khoa);
  };
  const defaultValues ={
    BsTruc:''
  }
  const methods = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  
  return (
    <Container>
      <Stack>
        <Card sx={{ p: 2 }}>
          <Stack direction="row" spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày"
                value={date}
                onChange={handleDateChange}
                //   ampm={false}
                //   format="HH:mm:ss"
                format="DD/MM/YYYY HH:mm:ss"
              />
            </LocalizationProvider>
            <FormControl>
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
      </Stack>
      <Stack>
      <FormProvider
          methods={methods}
          onSubmit={handleSubmit}
        >
        <Grid container spacing={3} my={1}>
          <Grid item xs={12} md={6}>
            <Card>HÌNH THỨC BÁO CÁO SỰ CỐ Y KHOA</Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>Số báo cáo/Mã số sự cố:
                
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
                Thông tin người bệnh
                <FTextField name="HoTen" label="Họ và tên:" />
                <FTextField name="HoTen" label="Số bệnh án:" />
                <FTextField name="HoTen" label="Họ và tên" />
                <FTextField name="HoTen" label="Họ và tên" />

                </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>Đối tượng xảy ra sự cố</Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>Nơi xảy ra sự cố
                <Stack direction={"row"} > 
                <FTextField name="HoTen" label="Khoa/phòng/vị trí xảy ra sự cố:" />
               <FTextField name="HoTen" label="Vị trí cụ thể:" />
                </Stack>
                <FTextField name="HoTen" label="Mô tả ngắn gọn về sự cố:" />
                <FTextField name="HoTen" label="Đề xuất giải pháp ban đầu:" />
                <FTextField name="HoTen" label="Điều trị/xử lý ban đầu đã thực hiện" />

            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>Thông báo cho Bác sĩ điều trị/người có trách nhiệm</Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>Ghi nhận vào hồ sơ bệnh án/giấy tờ liên quan</Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>Phân loại ban đầu về sự cố</Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>Đánh giá ban đầu về mức độ ảnh hưởng của sự cố</Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>Thông tin người báo cáo
            <Stack direction={"row"} > 
                <FTextField name="HoTen" label="Họ tên:" />
               <FTextField name="HoTen" label="Số điện thoại:" />
               <FTextField name="HoTen" label="Email:" />
                </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>Người chứng kiến</Card>
          </Grid>
        </Grid>
        </FormProvider>
      </Stack>
    </Container>
  );
}

export default SuCoYKhoaPage;
