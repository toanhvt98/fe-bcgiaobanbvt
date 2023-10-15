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
import React, { useState } from "react";
import MyPieChart1 from "../components/form/MyPieChart1";
import MyPieChart2 from "../components/form/MyPieChart2";
import MyPieChart from "../components/form/MyPieChart";

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
  // { color: "#00661a" },
  // { color: "#0033cc" },
  // { color: "#00cc00" },
  // { color: "#0088FE" },
  // { color: "#FFBB28" },
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
 
  height: 300,
};
function BaoCaoSuCoYKhoaPage() {
  // Lấy thời gian hiện tại theo múi giờ của Việt Nam
  const now = dayjs().tz("Asia/Ho_Chi_Minh");

  const [todate, setTodate] = useState(now);
  const [fromdate, setFromdate] = useState(now);
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
    }
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
    }
  };
  return (
    <Container>
      <Card>
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
              <MyPieChart data={data} colors={colors} other= {{...size1}}/>
              {/* <MyPieChart data={data} colors={colors} other= {{...size}} /> */}
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardHeader title={"2.Tổng hợp theo loại sự cố"} />
            <MyPieChart2 />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardHeader title={"3. Phân loại theo mức độ"} />
            <MyPieChart2 />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardHeader title={"4. Phân loại theo nhóm nguyên nhân"} />
            <MyPieChart2 />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardHeader title={"5. Phân loại theo nhóm sự cố y khoa"} />
            <MyPieChart2 />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardHeader title={"6. Tổng hợp sự cố y khoa theo hậu quả sự cố"} />
            <MyPieChart2 />
          </Grid>
        </Grid>
        <MyPieChart data={data} colors={colors} other= {{...size1}}/>
        <Card sx={{ p: 2 }}>
          <CardHeader title={"Hình thứcc báo cáo"} />
          <PieChart
            series={[
              {
                data: data,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -30 },

                arcLabel: (item) => {
                  const percentage = ((item.value / 15) * 100).toFixed(0); // Tính phần trăm và làm tròn đến 2 chữ số thập phân
                  return `${percentage}%`; // Hiển thị phần trăm
                },
                arcLabelMinAngle: 10,
              },
            ]}
            sx={{
              [`& .${pieArcClasses.faded}`]: {
                fill: "gray",
              },
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                // fontWeight: 'bold',
              },
            }}
            height={500}
          />
        </Card>
      </Card>

      <Card>
        {/* <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data:data1,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      // {...size}
      width= {400}
      height= {200}
 
    /> */}

        <MyPieChart1 data={data1} other={{ ...size }} total={15} />

        <MyPieChart1 data={data} other={{ ...size }} />

        <Card>
          <MyPieChart2 />
        </Card>
      </Card>
    </Container>
  );
}

export default BaoCaoSuCoYKhoaPage;
