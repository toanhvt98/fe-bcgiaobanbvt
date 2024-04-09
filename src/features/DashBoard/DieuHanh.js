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
import { getDataNewestByNgay } from "./dashboardSlice";
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
import CardTheoDoiBNVip from "./CardTheoDoiBNVip";

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

const DieuHanh = () => {
  const now = dayjs().tz("Asia/Ho_Chi_Minh");
  const [date, setDate] = useState(now);
  const [isToday, setIsToday] = useState(true);
  const {
    dashboadChiSoChatLuong,
    thoigianchokhambenh,
    thoigiankhambenh,
    tongthoigian,
    canlamsangs,
    khambenhngoaitru,
    dangdieutrinoitru,
    chisosObj,
    giuongconglap,
    giuongyeucau,
  } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.mytheme);
  //   useEffect(() => {
  //     const dateCurent = new Date().toISOString();

  //     dispatch(getDataNewestByNgay(dateCurent));
  //   }, []);
  const dataCLSNoiTru = [];
  dataCLSNoiTru.push(chisosObj.xn_noitru);
  dataCLSNoiTru.push(chisosObj.xq_noitru);
  dataCLSNoiTru.push(chisosObj.ct32_noitru);
  dataCLSNoiTru.push(chisosObj.ct128_noitru);
  dataCLSNoiTru.push(chisosObj.ct128_noitru_bhyt);
  dataCLSNoiTru.push(chisosObj.mri30_noitru);
  dataCLSNoiTru.push(chisosObj.mri15_noitru);
  dataCLSNoiTru.push(chisosObj.sa_noitru);
  dataCLSNoiTru.push(chisosObj.cnhh_noitru);
  dataCLSNoiTru.push(chisosObj.mdlx_noitru);
  dataCLSNoiTru.push(chisosObj.ns_noitru);
  dataCLSNoiTru.push(chisosObj.dn_noitru);
  dataCLSNoiTru.push(chisosObj.dt_noitru);

  const dataCLSNgoaiTru = [];
  dataCLSNgoaiTru.push(chisosObj.xn_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.xq_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.ct32_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.ct128_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.ct128_ngoaitru_bhyt);
  dataCLSNgoaiTru.push(chisosObj.mri30_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.mri15_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.sa_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.cnhh_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.mdlx_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.ns_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.dn_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.dt_ngoaitru);

  const handleDateChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào
    console.log("Chay day khong");
    if (newDate instanceof Date) {
      // newDate.setHours(7, 0, 0, 0);
      setDate(new Date(newDate));
      console.log("newdate", newDate);
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);
      // const updatedDate = newDate.hour(7).minute(0).second(0).millisecond(0);
      // console.log("updateDate", updatedDate);
      setDate(newDate);
      // setDate(updatedDate);
    }
    setIsToday(dayjs(newDate).isSame(now, 'day'));
    // dispatch(getDataNewestByNgay(date.toISOString()));
  };

  // useEffect(() => {
  //   const fetchNewestData = () => {
  //     const dateCurent = new Date().toISOString();
  //     dispatch(getDataNewestByNgay(dateCurent));
  //     console.log("render lại");
  //   };

  //   fetchNewestData(); // Gọi khi component mount

  //   const intervalId = setInterval(fetchNewestData, 60000); // Gọi lại sau mỗi 1 phút

  //   return () => {
  //     clearInterval(intervalId); // Dọn dẹp khi component unmount
  //   };
  // }, [dispatch]); // Chỉ rerun khi dispatch thay đổi

  useEffect(() => {
    const fetchNewestData = () => {
      console.log("newdate truyen  dispatch", date.toISOString());
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

  return (
    <Stack>
      <AppBar position="static" sx={{ mb: 3 }}>
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
          <Card sx={{m:1}} >

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{m:1}} label="Ngày" value={date} onChange={handleDateChange} />
          </LocalizationProvider>
          </Card>
          <DisplayChiSoDashBoard
            ChiSoDashBoard={dashboadChiSoChatLuong.ChiSoDashBoard}
          />
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} spacing={1}>
          <Card sx={{ backgroundColor: darkMode ? "#1D1D1D" : "#1939B7" }}>
            <CardHeader
              title={"Ngoại trú"}
              sx={{ textAlign: "center", color: "#FFF" }}
            />
            <CardContent>
              <Grid container spacing={1}>
                {/* Grid items bên trong Card */}
                <Grid item xs={12} sm={12} md={6}>
                  <Card
                    sx={{
                      fontWeight: "bold",
                      color: darkMode ? "#FFF" : "#1939B7",

                      boxShadow: 10,
                    }}
                  >
                    Đăng ký khám
                    <MyPieChart
                      data={khambenhngoaitru}
                      colors={colors}
                      other={{ height: 175 }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={1.5}>
                  <CardNgoaiTinhCapCuu />
                </Grid>

                <Grid item xs={12} sm={12} md={4.5}>
                  <CardXuTriKham />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Card
                    sx={{
                      fontWeight: "bold",
                      color: darkMode ? "#FFF" : "#1939B7",

                      boxShadow: 10,
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem" }}>
                      Cận lâm sàng ngoại trú
                    </Typography>
                    {darkMode ? (
                      <BarApexChartDarkMode
                        data={dataCLSNgoaiTru}
                        categories={[
                          "Xét nghiệm",
                          "XQuang",
                          "CT 1-32 dãy",
                          "CT 128 dãy",
                          "CT 128 dãy (BHYT)",
                          "MRI 3.0",
                          "MRI 1.5",
                          "Siêu âm",
                          "Đo chức năng hô hấp",
                          "Đo mật độ loãng xương",
                          "Nội soi",
                          "Điện não đồ",
                          "Điện tim đồ",
                        ]}
                      />
                    ) : (
                      <BarAPexChart
                        data={dataCLSNgoaiTru}
                        categories={[
                          "Xét nghiệm",
                          "XQuang",
                          "CT 1-32 dãy",
                          "CT 128 dãy",
                          "CT 128 dãy (BHYT)",
                          "MRI 3.0",
                          "MRI 1.5",
                          "Siêu âm",
                          "Đo chức năng hô hấp",
                          "Đo mật độ loãng xương",
                          "Nội soi",
                          "Điện não đồ",
                          "Điện tim đồ",
                        ]}
                      />
                    )}
                  </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Card sx={{ p: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "1.3rem",
                        color: darkMode ? "#FFF" : "#1939B7",
                        
                      }}
                    >
                      Bệnh nhân đặc biệt đang điều trị
                    </Typography>
                    {/* <CardDonThuocNgoaiTru /> */}
                    <CardTheoDoiBNVip/>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Hiển thị nội trú */}
        <Grid item xs={12} sm={12} md={6} spacing={1}>
          <Card sx={{ backgroundColor: darkMode ? "#1D1D1D" : "#1939B7" }}>
            <CardHeader
              title={"Nội trú"}
              sx={{ textAlign: "center", color: "#FFF" }}
            />
            <CardContent>
              <Grid container spacing={1}>
                {/* Grid items bên trong Card */}
                <Grid item xs={12} sm={12} md={6}>
                  <Card
                    sx={{
                      fontWeight: "bold",
                      color: darkMode ? "#FFF" : "#1939B7",

                      boxShadow: 10,
                    }}
                  >
                    Đang điều trị nội trú
                    <MyPieChart
                      data={dangdieutrinoitru}
                      colors={colors}
                      other={{ height: 175 }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <CardXuTriNoiTru />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Card
                    sx={{
                      fontWeight: "bold",
                      color: darkMode ? "#FFF" : "#1939B7",

                      boxShadow: 10,
                    }}
                  >
                    {/* <CardHeader title={"Cận lâm sàng nội trú"} sx={{fontSize:'0.5rem'}} /> */}
                    <Typography sx={{ fontSize: "1.2rem" }}>
                      Cận lâm sàng nội trú
                    </Typography>
                    {darkMode ? (
                      <BarApexChartDarkMode
                        data={dataCLSNoiTru}
                        categories={[
                          "Xét nghiệm",
                          "XQuang",
                          "CT 1-32 dãy",
                          "CT 128 dãy",
                          "CT 128 dãy (BHYT)",
                          "MRI 3.0",
                          "MRI 1.5",
                          "Siêu âm",
                          "Đo chức năng hô hấp",
                          "Đo mật độ loãng xương",
                          "Nội soi",
                          "Điện não đồ",
                          "Điện tim đồ",
                        ]}
                      />
                    ) : (
                      <BarAPexChart
                        data={dataCLSNoiTru}
                        categories={[
                          "Xét nghiệm",
                          "XQuang",
                          "CT 1-32 dãy",
                          "CT 128 dãy",
                          "CT 128 dãy (BHYT)",
                          "MRI 3.0",
                          "MRI 1.5",
                          "Siêu âm",
                          "Đo chức năng hô hấp",
                          "Đo mật độ loãng xương",
                          "Nội soi",
                          "Điện não đồ",
                          "Điện tim đồ",
                        ]}
                      />
                    )}
                  </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Card sx={{ p: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        color: darkMode ? "#FFF" : "#1939B7",
                      }}
                    >
                      Tình hình sử dụng giường
                    </Typography>
                    <Grid container spacing={1}>
                      {/* Grid items bên trong Card */}
                      <Grid item xs={12} sm={12} md={6}>
                        <Card sx={{ boxShadow: 15 }}>
                          <Typography
                            sx={{ color: darkMode ? "#FFF" : "#1939B7" }}
                          >
                            Giường công lập
                            
                          </Typography>
                          <Typography
                           sx={{ color: "#bb1515" }}
                          >
                          (BN đang nằm: {chisosObj.giuongconglap_sudung_tongbn})
                            
                          </Typography>
                          <MyPieChart
                            data={giuongconglap}
                            colors={colors}
                            other={{ height: 175 }}
                          />
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Card sx={{ boxShadow: 15 }}>
                          <Typography
                            sx={{ color: darkMode ? "#FFF" : "#1939B7" }}
                          >
                            Giường yêu cầu
                            
                          </Typography>
                          <Typography
                            sx={{ color: "#bb1515" }}
                          >
                           (BN đang nằm: {chisosObj.giuongyeucau_sudung_tongbn})
                            
                          </Typography>
                          <MyPieChart
                            data={giuongyeucau}
                            colors={colors}
                            other={{ height: 175 }}
                          />
                        </Card>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default DieuHanh;
