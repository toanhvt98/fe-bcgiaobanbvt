import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Link,
  Card,
  AppBar,
  Typography,
  Toolbar,
  Box,
  Grid,
  CardHeader,
  CardContent,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import BCKhoaKhamBenh from "../../BaoCaoNgay/BCKhoaKhamBenh";
import useAuth from "../../../hooks/useAuth";
import BCNgayLamSangNoi from "../../BaoCaoNgay/BCNgayLamSangNoi";
import BCKhoaCapCuu from "../../BaoCaoNgay/BCKhoaCapCuu";
import BCNgayLamSangNgoai from "../../BaoCaoNgay/BCNgayLamSangNgoai";
import BCGayMeHS from "../../BaoCaoNgay/BCGayMeHS";
import BCXetNghiemHH from "../../BaoCaoNgay/BCXetNghiemHH";
import BCXetNghiemHS from "../../BaoCaoNgay/BCXetNghiemHS";
import BCXetNghiemVS from "../../BaoCaoNgay/BCXetNghiemVS";
import BCChanDoanHA from "../../BaoCaoNgay/BCChanDoanHA";
import BCThamDoCN from "../../BaoCaoNgay/BCThamDoCN";
import BCHuyetHocTM from "../../BaoCaoNgay/BCHuyetHocTM";
import BCTrungTamCLC from "../../BaoCaoNgay/BCTrungTamCLC";
import { getDataBCNgay, getKhoas } from "../../BaoCaoNgay/baocaongaySlice";
import { formatDateTime } from "../../../utils/formatTime";
import { FRadioGroup, FormProvider } from "../../../components/form";
import MyPieChartForMoney from "../MyPieChartForMoney";
import { calculateTotalForType } from "../../../utils/heplFuntion";
import { getDataNewestByNgay, getDataNewestByNgayChenhLech, getKhuyenCaoKhoaByThangNam } from "../dashboardSlice";
import { useForm } from "react-hook-form";
import TableDoanhThuKPI from "../TableDoanhThuKPI";

function DashBoardKhoa() {
  const { user } = useAuth();
  const { khoas } = useSelector((state) => state.baocaongay);
  const {
    dashboadChiSoChatLuong,
    dashboad_NgayChenhLech,
    doanhthu_toanvien_theochidinh,
    doanhthu_toanvien_duyetketoan,
    doanhthu_toanvien_theochidinh_NgayChenhLech,
    doanhthu_toanvien_duyetketoan_NgayChenhLech,
    KPI_DuyetKeToan_With_ChenhLech,
    KPI_TheoChiDinh_With_ChenhLech,
    Pie_DoanhThu_DuyetKeToan,
    Pie_DoanhThu_DuyetKeToan_ChenhLech,
    Pie_DoanhThu_TheoChiDinh,
    Pie_DoanhThu_TheoChiDinh_ChenhLech,
    doanhthu_canlamsang_duyetketoan,
    doanhthu_canlamsang_theochidinh,
    doanhthu_canlamsang_theochidinh_NgayChenhLech,
    doanhthu_canlamsang_duyetketoan_NgayChenhLech,
    khuyencaokhoa,
  } = useSelector((state) => state.dashboard);
  // Lấy thời gian hiện tại theo múi giờ của Việt Nam
  const now = dayjs().tz("Asia/Ho_Chi_Minh");

  const yesterday = dayjs().subtract(1, "day").tz("Asia/Ho_Chi_Minh");
  const [dateChenhLech, setDateChenhLech] = useState(yesterday);

  const [date, setDate] = useState(now);

  const [isToday, setIsToday] = useState(true);
  const [thang, setThang] = useState();
  const [nam, setNam] = useState();
  const [selectedTrangThai, setSelectedTrangThai] = useState("Duyệt kế toán");
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const colors = [
    { color: "#1939B7" },
    { color: "#bb1515" },
    { color: "#00C49F" },
    { color: "#eb99ff" },
    { color: "#660000" },
    { color: "#00661a" },
    { color: "#0033cc" },
    { color: "#00cc00" },
    { color: "#0088FE" },
    { color: "#FFBB28" },
    { color: "#2ABC28" },
  ];
  let dataEx_DuyetKeToan = [];
 
  let dataEx_TheoChiDinh = [];
  
  let dataEx_ChenhLech_TheoChiDinh = [];
  
  let dataEx_ChenhLech_DuyetKeToan = [];
 
  const [selectedDepartment, setSelectedDepartment] = useState(user.KhoaID._id);
  const [loaikhoa, setLoaikhoa] = useState("noi");
  const [makhoa, setMakhoa] = useState("");

  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.mytheme);

  useEffect(() => {
    dispatch(getKhoas());
  }, [dispatch]);

  useEffect(() => {
    // Update selectedDepartment when khoas changes
    if (khoas && khoas.length > 0) {
      console.log("chay day")
      setSelectedDepartment(user.KhoaID._id);
      const loai_khoa = khoas.find(
        (khoa) => khoa._id === selectedDepartment
      )?.LoaiKhoa;
      const ma_khoa = khoas.find(
        (khoa) => khoa._id === selectedDepartment
      )?.MaKhoa;

      console.log("UF1 loaikhoa", loai_khoa);
      setLoaikhoa(loai_khoa);
      setMakhoa(ma_khoa);
    }
  }, [khoas, user.KhoaID._id]);

  const handleDateChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào

    if (newDate instanceof Date) {
      // newDate.setHours(7, 0, 0, 0);
      setDate(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", dataEx_DuyetKeToan);

      setDate(newDate);
      // setDate(updatedDate);
    }
    setIsToday(dayjs(newDate).isSame(now, "day"));
    // dispatch(getDataNewestByNgay(date.toISOString()));
  };
  const handleDateChenhLechChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào

    if (newDate instanceof Date) {
      // newDate.setHours(7, 0, 0, 0);
      setDateChenhLech(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);

      setDateChenhLech(newDate);
      // setDate(updatedDate);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedDepartment(e.target.value);
    //setLoaikhoa de hien thi giao dien tuong ung
    const loai_khoa = khoas.find(
      (khoa) => khoa._id === e.target.value
    )?.LoaiKhoa ;
    const ma_khoa = khoas.find((khoa) => khoa._id === e.target.value)?.MaKhoa;

    console.log("loaikhoa", loai_khoa);
    setLoaikhoa(loai_khoa);
    setMakhoa(ma_khoa);
  };

  
  useEffect(() => {
    dispatch(getDataNewestByNgayChenhLech(dateChenhLech.toISOString()));
  }, [dispatch, dateChenhLech]);

  useEffect(() => {
    const fetchNewestData = () => {
      // Tính toán tháng và năm từ `date`
      const dateObj = new Date(date);

      // Tính toán tháng và năm từ `dateObj`
      const thang = dateObj.getMonth() + 1; // JavaScript đếm tháng từ 0

      const nam = dateObj.getFullYear();
      setThang(thang);
      setNam(nam);
      // Gọi dispatch cho getKhuyenCaoKhoaByThangNam trước
      dispatch(getKhuyenCaoKhoaByThangNam(thang, nam));
      dispatch(getDataNewestByNgay(date.toISOString()));
      console.log("render lại");
    };
    fetchNewestData();
    // Kiểm tra nếu ngày là ngày hiện tại mới chạy setInterval
    if (isToday) {
      // Gọi khi component mount

      const intervalId = setInterval(fetchNewestData, 900000); // Gọi lại sau mỗi 15 phút

      return () => {
        clearInterval(intervalId); // Dọn dẹp khi component unmount
      };
    }

    return undefined; // Nếu không phải ngày hiện tại, không chạy setInterval
  }, [dispatch, date, isToday]); // Chỉ rerun khi dispatch, date, hoặc isToday thay đổi
  const defaultValues = {
    TrangThai: "Duyệt kế toán",
  };
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
    <Stack>
      <AppBar position="static" sx={{ mb: 1 }}>
        <Toolbar>
          {dashboadChiSoChatLuong.Ngay && (
            <Typography
              variant="h6"
              sx={{ marginX: "auto", textAlign: "center" }}
            >
              (Số liệu {formatDateTime(dashboadChiSoChatLuong.Ngay)})
            </Typography>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Card sx={{ m: 1 ,p:1 }}>
            <FormControl fullWidth>
              <InputLabel >Khoa</InputLabel>

              <Select
                value={selectedDepartment}
                onChange={handleSelectChange}
                sx={{ m: 1 }}
              >
                {khoas &&
                  khoas.length > 0 &&
                  khoas.map((department) => (
                    <MenuItem key={department._id} value={department._id}>
                      {department.TenKhoa}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Card>
          <Card sx={{ m: 1,p:1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ m: 1 }}
                label="Ngày"
                value={date}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Card>
        </Toolbar>
      </AppBar>

      <Card
        sx={{
          color: "#f2f2f2",
          backgroundColor: "#1939B7",
          borderRadius: 3,
        }}
      >
        {dashboadChiSoChatLuong.Ngay && (
            <Stack sx={{ textAlign: "center" }}>
              <Typography variant="h6">
                {` DOANH THU KHOA TỪ 00:00  1/${thang}/${nam} ĐẾN ${formatDateTime(
                  dashboadChiSoChatLuong.Ngay
                )}`}{" "}
                {selectedTrangThai === "Duyệt kế toán"
                  ? `(ĐÃ DUYỆT KẾ TOÁN)`
                  : `(THEO CHỈ ĐỊNH)`}
              </Typography>
              <Typography
                variant="h7"
                sx={{ marginX: "auto", textAlign: "center" }}
              >
                {`(Tính chênh lệch từ  ${formatDateTime(
                  dashboad_NgayChenhLech.Ngay
                )} đến ${formatDateTime(dashboadChiSoChatLuong.Ngay)})`}
              </Typography>
            </Stack>
          )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} spacing={1}>
            <Card
              sx={{
                fontWeight: "bold",
                color: darkMode ? "#FFF" : "#1939B7",
                backgroundColor: darkMode ? "#1D1D1D" : "#1939B7",
                boxShadow: 10,
              }}
            >
              <CardHeader
                title={""}
                sx={{ textAlign: "center", color: "#1939B7" }}
              />
              <CardContent>
                <Grid container spacing={1}>
                  {/* Grid items bên trong Card */}
                  <Grid item xs={12} sm={12} md={5.2}>
                    <Card
                      sx={{
                        fontWeight: "bold",
                        color: darkMode ? "#FFF" : "#1939B7",

                        boxShadow: 10,
                      }}
                    >
                      {`Doanh thu toàn viện (${selectedTrangThai})`}
                      {selectedTrangThai === "Duyệt kế toán" ? (
                        <MyPieChartForMoney
                          data={Pie_DoanhThu_DuyetKeToan}
                          colors={colors}
                          other={{ height: 300 }}
                          dataEx={dataEx_DuyetKeToan}
                        />
                      ) : (
                        <MyPieChartForMoney
                          data={Pie_DoanhThu_TheoChiDinh}
                          colors={colors}
                          other={{ height: 300 }}
                          dataEx={dataEx_TheoChiDinh}
                        />
                      )}
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={5.2}>
                    <Card
                      sx={{
                        fontWeight: "bold",
                        color: darkMode ? "#FFF" : "#1939B7",

                        boxShadow: 10,
                      }}
                    >
                      {`Tính chênh lệch doanh thu toàn viện (${selectedTrangThai})`}
                      {selectedTrangThai === "Duyệt kế toán" ? (
                        <MyPieChartForMoney
                          data={Pie_DoanhThu_DuyetKeToan_ChenhLech}
                          colors={colors}
                          other={{ height: 300 }}
                          dataEx={dataEx_ChenhLech_DuyetKeToan}
                        />
                      ) : (
                        <MyPieChartForMoney
                          data={Pie_DoanhThu_TheoChiDinh_ChenhLech}
                          colors={colors}
                          other={{ height: 300 }}
                          dataEx={dataEx_ChenhLech_TheoChiDinh}
                        />
                      )}
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={1.6}>
                    <Card
                      sx={{
                        fontWeight: "bold",
                        color: darkMode ? "#FFF" : "#1939B7",
                        height: 325,
                        boxShadow: 10,
                        alignItems: "center",
                      }}
                    >
                      Chọn tiêu chí:
                      <Card>
                        <FormProvider methods={methods}>
                          <FRadioGroup
                            name="TrangThai"
                            value={selectedTrangThai}
                            onChange={(e) => {
                              setSelectedTrangThai(e.target.value);
                              console.log("trangthia", selectedTrangThai);
                            }}
                            options={["Duyệt kế toán", "Theo chỉ định"]}
                            // options={allOptions.slice(4)}

                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 50,
                                p: 2,
                              },
                            }}
                          />
                        </FormProvider>
                      </Card>
                      <Card sx={{ marginTop: 3 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{ m: 1 }}
                            label="Ngày tính chênh lệch"
                            value={dateChenhLech}
                            onChange={handleDateChenhLechChange}
                          />
                        </LocalizationProvider>
                      </Card>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}></Stack>{" "}
      </Card>
      <Card sx={{ my: 3, py: 3 }}>
      {selectedTrangThai === "Duyệt kế toán" ? (
       'duyet ke toan'
      ) : (
       'theo chi dinh'
      )}
      </Card>
    </Stack>
  );
}

export default DashBoardKhoa;
