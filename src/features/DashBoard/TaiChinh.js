import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  Stack,
  Box,
  CardHeader,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataNewestByNgay,
  getDataNewestByNgayChenhLech,
  getKhuyenCaoKhoaByThangNam,
} from "./dashboardSlice";
import DisplayChiSoDashBoard from "../../components/DisplayChiSoDashBoard";
import CardThoiGian from "./CardThoiGian";
import TableCanLamSang from "./TableCanLamSang";
import StackBarTyLeTraDungCLS from "./StackBarTyLeTraDungCLS";
import {
  fDateTime,
  fDateTimeSuffix,
  formatDateTime,
} from "../../utils/formatTime";
import MyPieChart from "../../components/form/MyPieChart";
import CardNgoaiTinhCapCuu from "./CardNgoaiTinhCapCuu";
import CardXuTriKham from "./CardXuTriKham";
import ApexBarChart from "./ApexBarChart";
import { BarChart } from "@mui/x-charts";
import BarAPexChart from "./BarAPexChart";
import CardXuTriNoiTru from "./CardXuTriNoiTru";
import CardDonThuocNgoaiTru from "./CardDonThuocNgoaiTru";
import BarApexChartDarkMode from "./BarApexChartDarkMode";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TableDoanhThuKPI from "./TableDoanhThuKPI";
import { FRadioGroup, FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import TrangThai from "../BCGiaoBan/TrangThai";
import BarGroupStackChart from "./BarGroupStachChart";
import { ConvertDoanhThuCanLamSang } from "../../utils/heplFuntion";
import PieChartApex from "./PieChartApex";
import MyPieChartForMoney from "./MyPieChartForMoney";

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

const TaiChinh = () => {
  dayjs.tz.setDefault("Asia/Ho_Chi_Minh"); // Cấu hình múi giờ nếu cần

  // Khởi tạo trạng thái với ngày hôm qua
  const yesterday = dayjs().subtract(1, "day").tz("Asia/Ho_Chi_Minh");
  const [dateChenhLech, setDateChenhLech] = useState(yesterday);

  const now = dayjs().tz("Asia/Ho_Chi_Minh");
  const [date, setDate] = useState(now);

  const [isToday, setIsToday] = useState(true);
  const [thang, setThang] = useState();
  const [nam, setNam] = useState();
  const {
    dashboadChiSoChatLuong,
    dashboad_NgayChenhLech,
    KPI_DuyetKeToan_With_ChenhLech,
    KPI_TheoChiDinh_With_ChenhLech,
    Pie_DoanhThu_DuyetKeToan,
    Pie_DoanhThu_DuyetKeToan_ChenhLech,
    Pie_DoanhThu_TheoChiDinh,
    Pie_DoanhThu_TheoChiDinh_ChenhLech,
    doanhthu_canlamsang_duyetketoan,
    doanhthu_canlamsang_theochidinh,
  } = useSelector((state) => state.dashboard);
  const CanLamSangDuyetKeToan = ConvertDoanhThuCanLamSang(
    doanhthu_canlamsang_duyetketoan
  );
  const CanLamSangTheoChiDinh = ConvertDoanhThuCanLamSang(
    doanhthu_canlamsang_theochidinh
  );
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.mytheme);
  //   useEffect(() => {
  //     const dateCurent = new Date().toISOString();

  //     dispatch(getDataNewestByNgay(dateCurent));
  //   }, []);

  const handleDateChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào

    if (newDate instanceof Date) {
      // newDate.setHours(7, 0, 0, 0);
      setDate(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);

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
  const [selectedTrangThai, setSelectedTrangThai] = useState("Duyệt kế toán");
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

          <Card sx={{ m: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ m: 1 }}
                label="Ngày"
                value={date}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Card>
          <DisplayChiSoDashBoard
            ChiSoDashBoard={dashboadChiSoChatLuong.ChiSoDashBoard}
          />
        </Toolbar>
      </AppBar>

      <Card
        sx={{
          fontWeight: "bold",
          color: "#f2f2f2",
          backgroundColor: "#1939B7",
          p: 1,
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <Toolbar>
         
          {dashboadChiSoChatLuong.Ngay && (
            <Box>

            <Typography
              variant="h6"
              sx={{ marginX: "auto", textAlign: "center" }}
            >
              {` DOANH THU KHOA TỪ 00:00 NGÀY 1/${thang}/${nam} ĐẾN ${formatDateTime(
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
              {`(Tính chênh lệch từ  đến ${formatDateTime(
                dashboad_NgayChenhLech.Ngay 
              )} đến ${formatDateTime(
                dashboadChiSoChatLuong.Ngay
              )})`}
              
            </Typography>
            </Box>

            
          )}
          {/* <Box sx={{ flexGrow: 1 }} /> */}
        </Toolbar>
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
                  <Grid item xs={12} sm={12} md={4.5}>
                    <Card
                      sx={{
                        fontWeight: "bold",
                        color: darkMode ? "#FFF" : "#1939B7",

                        boxShadow: 10,
                      }}
                    >
                      {`Doanh thu toàn viện (${selectedTrangThai})`}
                       {selectedTrangThai === "Duyệt kế toán"
                ? (
                   
                  <MyPieChartForMoney
                    data={Pie_DoanhThu_DuyetKeToan}
                    colors={colors}
                    other={{ height: 170 }}
                  />
                )
                : (
                 
                  <MyPieChartForMoney
                    data={Pie_DoanhThu_TheoChiDinh}
                    colors={colors}
                    other={{ height: 170 }}
                  />
                )}
                     
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4.5}>
                    <Card
                      sx={{
                        fontWeight: "bold",
                        color: darkMode ? "#FFF" : "#1939B7",

                        boxShadow: 10,
                      }}
                    >
                       {`Tính chênh lệch doanh thu toàn viện (${selectedTrangThai})`}
                     {selectedTrangThai === "Duyệt kế toán"
                ? (
                   
                  <MyPieChartForMoney
                    data={Pie_DoanhThu_DuyetKeToan_ChenhLech}
                    colors={colors}
                    other={{ height: 170 }}
                  />
                )
                : (
                 
                  <MyPieChartForMoney
                    data={Pie_DoanhThu_TheoChiDinh_ChenhLech}
                    colors={colors}
                    other={{ height: 170 }}
                  />
                )}
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Card
                      sx={{
                        fontWeight: "bold",
                        color: darkMode ? "#FFF" : "#1939B7",

                        boxShadow: 10,
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
                      <Card sx={{ ml: 1 }}>
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
      {selectedTrangThai === "Duyệt kế toán" ? (
        <TableDoanhThuKPI doanhthu={KPI_DuyetKeToan_With_ChenhLech} />
      ) : (
        <TableDoanhThuKPI doanhthu={KPI_TheoChiDinh_With_ChenhLech} />
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} spacing={1}>
          <Card
            sx={{
              fontWeight: "bold",
              color: darkMode ? "#FFF" : "#1939B7",

              boxShadow: 10,
            }}
          >
            <CardHeader
              title={"Cận lâm sàng"}
              sx={{ textAlign: "center", color: "#1939B7" }}
            />
            <CardContent>
              <Grid container spacing={1}>
                {/* Grid items bên trong Card */}
                <Grid item xs={12} sm={12} md={12}>
                  <BarGroupStackChart
                    series={[
                      {
                        name: "BHYT (duyệt KT)",
                        group: "DuyetKeToan",
                        data: CanLamSangDuyetKeToan.bhyt,
                      },
                      {
                        name: "Đồng chi trả (Duyệt KT)",
                        group: "DuyetKeToan",
                        data: CanLamSangDuyetKeToan.dongchitra,
                      },
                      {
                        name: "Thu trực tiếp (Duyệt KT)",
                        group: "DuyetKeToan",
                        data: CanLamSangDuyetKeToan.thutructiep,
                      },
                      {
                        name: "BHYT (Theo chỉ định)",
                        group: "TheoChiDinh",
                        data: CanLamSangTheoChiDinh.bhyt,
                      },
                      {
                        name: "Đồng chi trả (Theo chỉ định)",
                        group: "TheoChiDinh",
                        data: CanLamSangTheoChiDinh.dongchitra,
                      },
                      {
                        name: "Thu trực tiếp (Theo chỉ định)",
                        group: "TheoChiDinh",
                        data: CanLamSangTheoChiDinh.thutructiep,
                      },
                    ]}
                    // categories={[]}
                    categories={CanLamSangDuyetKeToan.name}
                    formatter={(val) => VND.format(val)}
                    yaxis={{
                      reversed: false,
                    }}
                    type="tien"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  {CanLamSangDuyetKeToan && CanLamSangTheoChiDinh && (
                    <BarGroupStackChart
                      series={[
                        {
                          name: "Số lượng (duyệt KT)",
                          group: "DuyetKeToan",
                          data: CanLamSangDuyetKeToan.soluong,
                        },

                        {
                          name: "Số lượng (chỉ định)",
                          group: "TheoChiDinh",
                          data: CanLamSangTheoChiDinh.soluong,
                        },
                      ]}
                      categories={CanLamSangDuyetKeToan.name}
                      // categories={['Online advertising', 'Sales Training', 'Print advertising', 'Catalogs', 'Meetings']}
                      formatter={(val) => val}
                      yaxis={{
                        reversed: false,
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TaiChinh;
