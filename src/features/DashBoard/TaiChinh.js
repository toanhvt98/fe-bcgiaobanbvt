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
import { getDataNewestByNgay, getKhuyenCaoKhoaByThangNam } from "./dashboardSlice";
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
  const now = dayjs().tz("Asia/Ho_Chi_Minh");
  const [date, setDate] = useState(now);
  const [isToday, setIsToday] = useState(true);
  const {
    dashboadChiSoChatLuong,
    doanhthu_toanvien_theochidinh,
    doanhthu_toanvien_duyetketoan,
    KPI_TheoChiDinh,
    KPI_DuyetKeToan,
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
  dataCLSNoiTru.push(chisosObj.ct_noitru);
  dataCLSNoiTru.push(chisosObj.mri_noitru);
  dataCLSNoiTru.push(chisosObj.sa_noitru);
  dataCLSNoiTru.push(chisosObj.cnhh_noitru);
  dataCLSNoiTru.push(chisosObj.mdlx_noitru);
  dataCLSNoiTru.push(chisosObj.ns_noitru);
  dataCLSNoiTru.push(chisosObj.dn_noitru);
  dataCLSNoiTru.push(chisosObj.dt_noitru);

  const dataCLSNgoaiTru = [];
  dataCLSNgoaiTru.push(chisosObj.xn_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.xq_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.ct_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.mri_ngoaitru);
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
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);
      const updatedDate = newDate.hour(7).minute(0).second(0).millisecond(0);
      console.log("updateDate", updatedDate);
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
       // Tính toán tháng và năm từ `date`
       const dateObj = new Date(date);
    
       // Tính toán tháng và năm từ `dateObj`
       const thang = dateObj.getMonth() + 1; // JavaScript đếm tháng từ 0
       const nam = dateObj.getFullYear();
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
<TableDoanhThuKPI doanhthu = {KPI_DuyetKeToan}/>
     
    </Stack>
  );
};

export default TaiChinh;
