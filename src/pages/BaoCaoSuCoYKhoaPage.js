import {
  Card,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { PieChart, pieArcClasses, pieArcLabelClasses } from "@mui/x-charts";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import MyPieChart1 from "../components/form/MyPieChart1";
import MyPieChart2 from "../components/form/MyPieChart2";
import MyPieChart from "../components/form/MyPieChart";
import { useDispatch, useSelector } from "react-redux";
import { getTongHopSuCo, getTongHopSuCoTheoKhoa } from "../features/BaoCaoSuCo/baocaosucoSlice";
import ThongKeSuCoTheoKhoa from "../features/BaoCaoSuCo/ThongKeSuCoTheoKhoa";

const data = [
  { value: 20, label: "Sự cố chưa xảy ra" },
  { value: 20, label: "Sự cố đã xảy ra" },
  { value: 20, label: "Bắt buộc" },
  { value: 20, label: "Bắt buộc" },
  { value: 20, label: "Bắt buộc" },
];
const colors = [
  { color: "#1939B7" },
  { color: "#bb1515" },
  { color: "#00C49F" },
  { color: "##eb99ff" },
  { color: "#660000" },
  { color: "#00661a" },
  { color: "#0033cc" },
  { color: "#00cc00" },
  { color: "#0088FE" },
  { color: "#FFBB28" },
  { color: "#2ABC28" },
];
const data1 = [
  { value: 5, label: "Tự nguyện" },
  { value: 10, label: "Bắt buộc" },
];
const size = {
  width: 800,
  height: 300,
};

const size1 = {
  height: 250,
};
function BaoCaoSuCoYKhoaPage() {
  const {
    tonghopHinhThuc,
    tonghopLoaiSuCo,
    tonghopMucDo,
    tonghopNhomNguyenNhan,
    tonghopNhomSuCo,
    tonghopTonThuongNB,
    tonghopTonThuongTC,
  } = useSelector((state) => state.baocaosuco);
  // Lấy thời gian hiện tại theo múi giờ của Việt Nam
  const now = dayjs().tz("Asia/Ho_Chi_Minh");

  const [todate, setTodate] = useState(now);
  // const [fromdate, setFromdate] = useState(dayjs().subtract(120, 'day').startOf('day'));
  // const [fromdate, setFromdate] = useState(dayjs().subtract(6, 'month').startOf('day'));
  const [fromdate, setFromdate] = useState(dayjs('2023-10-01').startOf('day'));
  const handleTodateChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào
    console.log("Chay day khong");
    if (newDate instanceof Date) {
      //   newDate.setHours(7, 0, 0, 0);
      setTodate(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);
      //   const updatedDate = newDate.hour(7).minute(0).second(0).millisecond(0);
      //   console.log("updateDate", updatedDate);
      setTodate(newDate);
      getDataForTongHop();
    }
  };
  const dispatch = useDispatch();
  const getDataForTongHop = () => {
    const fromDateISO = fromdate.toISOString();
    const toDateISO = todate.toISOString();
    console.log("fromdate -todate", fromDateISO, toDateISO);
    dispatch(getTongHopSuCo(fromDateISO, toDateISO));
    dispatch(getTongHopSuCoTheoKhoa(fromDateISO,toDateISO))
  };
  const handleNgayBaoCaoChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào
    console.log("Chay day khong");
    if (newDate instanceof Date) {
      //   newDate.setHours(7, 0, 0, 0);
      setFromdate(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);
      //   const updatedDate = newDate.hour(7).minute(0).second(0).millisecond(0);
      //   console.log("updateDate", updatedDate);
      setFromdate(newDate);
      getDataForTongHop();
    }
  };
  useEffect(()=>{
    const fromDateISO = fromdate.toISOString();
    const toDateISO = todate.toISOString();
    console.log("fromdate -todate", fromDateISO, toDateISO);
    dispatch(getTongHopSuCo(fromDateISO, toDateISO));
    dispatch(getTongHopSuCoTheoKhoa(fromDateISO,toDateISO))
  },[fromdate,todate,dispatch])

  return (
    <Container>
      <Card sx={{ p: 2 }}>
        <Typography
          variant="h4"
          sx={{ my: 1, fontSize: "2rem" }}
          textAlign="center"
        >
          TỔNG HỢP SỰ CỐ Y KHOA BỆNH VIỆN ĐA KHOA TỈNH PHÚ THỌ
        </Typography>
        <Stack direction={"row"} my={5}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Từ ngày:"
              value={fromdate}
              onChange={handleNgayBaoCaoChange}
              //   ampm={false}
              //   format="HH:mm:ss"
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Đến ngày:"
              value={todate}
              onChange={handleTodateChange}
              //   ampm={false}
              //   format="HH:mm:ss"
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </Stack>
        <Grid container spacing={3} my={1}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title={"1. Hình thức báo cáo"} />
              <MyPieChart
                data={tonghopHinhThuc}
                colors={colors}
                other={{ ...size1 }}
              />
              {/* <MyPieChart data={data} colors={colors} other= {{...size}} /> */}
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title={"2.Tổng hợp theo loại sự cố"} />
              <MyPieChart
                data={tonghopLoaiSuCo}
                colors={colors}
                other={{ ...size1 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title={"3. Phân loại theo mức độ"} />
              <MyPieChart
                data={tonghopMucDo}
                colors={colors}
                other={{ ...size1 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title={"4. Phân loại theo nhóm sự cố"} />

              <MyPieChart
                data={tonghopNhomNguyenNhan}
                colors={colors}
                other={{ ...size1 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              <CardHeader title={"5. Phân loại theo nhóm nguyên nhân"} />
              <MyPieChart
                data={tonghopNhomSuCo}
                colors={colors}
                other={{ ...size1 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              <CardHeader
                title={"6. Tổng hợp sự cố y khoa theo hậu quả sự cố trên người bệnh"}
              />
              <MyPieChart
                data={tonghopTonThuongNB}
                colors={colors}
                other={{ height: 310 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              <CardHeader
                title={"7. Tổng hợp sự cố y khoa theo hậu quả sự cố trên tổ chức"}
              />
              <MyPieChart
                data={tonghopTonThuongTC}
                colors={colors}
                other={{ height: 310 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              <CardHeader
                title={"8. Tổng hợp sự cố y khoa theo đơn vị báo cáo"}
              />
             <ThongKeSuCoTheoKhoa/>
            </Card>
          </Grid>
        </Grid>
        
      </Card>

    </Container>
  );
}

export default BaoCaoSuCoYKhoaPage;
