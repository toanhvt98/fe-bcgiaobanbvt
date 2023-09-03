import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Modal,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataBCNgaysForGiaoBan,
  getKhoasInBCGiaoBan,
} from "./BCGiaoBan/bcgiaobanSlice";
import { useTheme } from "@emotion/react";
import DisplayKhoaButton from "../components/DisplayKhoaButton";
import TongHopHeNoi from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/TongHopHeNoi";
import { da } from "date-fns/locale";
import { fDate } from "../utils/formatTime";
import TongHopHeNgoai from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/TongHopHeNgoai";
import TongHopCLC from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/TongHopCLC";
import TongHopToanVien from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/TongHopToanVien";
import TongHopKKB from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/TongHopKKB";

function Sumary() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { khoaDaGuis, khoaChuaGuis, khoas } = useSelector(
    (state) => state.bcgiaoban
  );
  const [date, setDate] = useState(
    dayjs(new Date()).hour(7).minute(0).second(0).millisecond(0)
  );
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
  };
  const dispatch = useDispatch();
  useEffect(() => {
    //SetBaoCaoNgayInStore
    const dateISO = date.toISOString();

    dispatch(getDataBCNgaysForGiaoBan(dateISO));
  }, [date, khoas, dispatch]);
  useEffect(() => {
    //SetBaoCaoNgayInStore
    dispatch(getKhoasInBCGiaoBan());
  }, []);

  return (
    <Box>
      <Card sx={{ p: 2, my: 3 }}>
        <Stack direction="row" spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Ngày" value={date} onChange={handleDateChange} />
          </LocalizationProvider>

          <DisplayKhoaButton khoaHienThis={khoaDaGuis} type="đã gửi" />
          <DisplayKhoaButton khoaHienThis={khoaChuaGuis} type="chưa gửi" />

          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained"> Nhập báo cáo</Button>
          <Button variant="contained"> Duyệt</Button>
        </Stack>
      </Card>

      <Card sx={{ p: 2, my: 3 }}>
      <Typography variant="h4" sx={{ my: 1 }} textAlign='center'>
             BÁO CÁO GIAO BAN TOÀN VIỆN NGÀY {fDate(date)}
            </Typography>
        <Stack direction="row" justifyContent='center' >
          <Card sx={{ p: 2, my: 1 }}>
          <Typography >- Trực lãnh đạo : PGĐ Sơn </Typography>
          <Typography> - Tổng trực hệ nội: Bs Lê Thị Bích Thủy - Nội thần kinh</Typography>
          <Typography >- Tổng trực hệ ngoại: BS Vi Trường Sơn - Ngoại thần kinh</Typography>
          </Card>
         
        </Stack>

        <Stack direction="row" spacing={2}>
         <TongHopToanVien/>
         <TongHopHeNoi/>
         <TongHopHeNgoai/>
         <TongHopCLC/>
         <TongHopKKB/>
          <Card>
            <CardHeader title="About" variant="h6" />

            <Stack spacing={1} sx={{ p: 1 }}>
              <Typography variant="body2">tổng NB</Typography>
              <Typography variant="body2">vào viện</Typography>

              <Typography variant="body2">BN nặng</Typography>

              <Typography variant="body2">Ngoài giờ : 125</Typography>
              <Typography variant="body2">Ngoài giờ</Typography>
              <Typography variant="body2">Ngoài giờ</Typography>
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Box>
  );
}

export default Sumary;
