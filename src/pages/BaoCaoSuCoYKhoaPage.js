import { Card, CardHeader, Container, Stack, Typography } from '@mui/material';
import { PieChart, pieArcClasses, pieArcLabelClasses } from '@mui/x-charts';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react'

const data = [
  { id: 0, value: 10, label: 'Sự cố chưa xảy ra' },
  { id: 1, value: 15, label: 'Sự cố đã xảy ra' },
  { id: 2, value: 20, label: 'Bắt buộc' },
  { id: 3, value: 20, label: 'Bắt buộc' },
  { id: 5, value: 20, label: 'Bắt buộc' },
  { id: 6, value: 20, label: 'Bắt buộc' },
  { id: 7, value: 20, label: 'Bắt buộc' },
  { id: 8, value: 20, label: 'Bắt buộc' },
  { id: 9, value: 20, label: 'Bắt buộc' },
  { id: 10, value: 20, label: 'Bắt buộc' },
];
const data1 = [
  { value: 5, label: 'A' },
  { value: 10, label: 'B' },
  { value: 15, label: 'C' },
  { value: 20, label: 'D' },
  { value: 20, label: 'D' },
  { value: 20, label: 'D' },
  
];
const size = {
  width: 400,
  height: 200,
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
      <Stack direction={'row'} my={5}>
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

<Card sx={{p:2}}>
<CardHeader
                  
                  title={"Hình thức báo cáo"}
                />
  <PieChart
      series={[
        {
          data:data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30 },
        },
      ]}
      sx={{
        [`& .${pieArcClasses.faded}`]: {
          fill: 'gray',
        },
      }}
      height={300}
    />
    </Card>
</Card>

    <Card>
    <PieChart
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
      {...size}
    />
    </Card>
    </Container>
  )
}

export default BaoCaoSuCoYKhoaPage
