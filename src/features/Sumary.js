import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Navigate, useNavigate, Link as RouterLink, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
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
  InsertOrUpdateTrangThaiForBCGiaoBan,
  getDataBCGiaoBanCurent,
  getDataBCNgaysForGiaoBan,
  getKhoasInBCGiaoBan,
} from "./BCGiaoBan/bcgiaobanSlice";
import { useTheme } from "@emotion/react";
import DisplayKhoaButton from "../components/DisplayKhoaButton";
import TongHopHeNoi from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/TongHopHeNoi";
import { da, is } from "date-fns/locale";
import { fDate } from "../utils/formatTime";
import TongHopHeNgoai from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/TongHopHeNgoai";
import TongHopCLC from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/TongHopCLC";
import TongHopToanVien from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/TongHopToanVien";
import TongHopKKB from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/TongHopKKB";
import useAuth from "../hooks/useAuth";
import TongHopCanLamSang from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/TongHopCanLamSang";
import { wrap } from "lodash";
import TrangThai from "./BCGiaoBan/TrangThai";
import MenuIcon from '@mui/icons-material/Menu';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

function Sumary() {
  
  const { user } = useAuth();
  const { khoaDaGuis, khoaChuaGuis, khoas,bcGiaoBanCurent } = useSelector(
    (state) => state.bcgiaoban
  );

// Lấy thời gian hiện tại theo múi giờ của Việt Nam
const now = dayjs().tz("Asia/Ho_Chi_Minh");

// Kiểm tra xem giờ hiện tại có >= 18 hay không
const isAfter18 = now.hour() >= 18;

// Thiết lập giá trị mặc định cho date dựa trên giờ hiện tại
const defaultDate = isAfter18
  ? now.hour(7).minute(0).second(0).millisecond(0)
  : now.subtract(1, "day").hour(7).minute(0).second(0).millisecond(0);

const [date, setDate] = useState(defaultDate);

  const handleDateChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào
    
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

    dispatch(getDataBCGiaoBanCurent(dateISO));
  }, [date,dispatch]);

  useEffect(() => {
    //Set BCGiaoBanCurent In Store
    const dateISO = date.toISOString();

    dispatch(getDataBCNgaysForGiaoBan(dateISO));
  }, [date, khoas, dispatch]);

  useEffect(() => {
    //SetBaoCaoNgayInStore
    dispatch(getKhoasInBCGiaoBan());
  }, []);
  const navigate = useNavigate();
  const handleNhapBaoCao= ()=>{
    navigate("/khoa")
  }
  const handleDuyet= ()=>{
    const dateISO = date.toISOString();

    dispatch(InsertOrUpdateTrangThaiForBCGiaoBan(dateISO,!bcGiaoBanCurent.TrangThai))

  }

  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1199px)');
  const isSmallScreen = useMediaQuery('(max-width:767px)');

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Card sx={{ p: 2, my: 3 }}>
       

{/* For small screens */}
{isSmallScreen && (
    <Stack direction="column" spacing={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Ngày" value={date} onChange={handleDateChange} />
      </LocalizationProvider>
      <TrangThai trangthai={bcGiaoBanCurent.TrangThai} />
      <Stack direction="row" spacing={2}>
              <DisplayKhoaButton khoaHienThis={khoaDaGuis} type="đã gửi" />
              <DisplayKhoaButton khoaHienThis={khoaChuaGuis} type="chưa gửi" />
              <Box sx={{ flexGrow: 1 }} />
              <IconButton onClick={handleClick}>
                <MenuIcon />
              </IconButton>
            </Stack>
    </Stack>
  )}

{/* For medium screens */}
{isMediumScreen && (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Ngày" value={date} onChange={handleDateChange} />
        </LocalizationProvider>
        <TrangThai trangthai={bcGiaoBanCurent.TrangThai} />
      
        <DisplayKhoaButton khoaHienThis={khoaDaGuis} type="đã gửi" />
        <DisplayKhoaButton khoaHienThis={khoaChuaGuis} type="chưa gửi" />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleClick}>
                <MenuIcon />
              </IconButton>
      </Stack>
      {/* {(user.PhanQuyen === 'admin' || user.PhanQuyen === 'manager') && (
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleDuyet}> {bcGiaoBanCurent.TrangThai ? "Gỡ duyệt" : "Duyệt"}</Button>
          <Button variant="contained" onClick={handleNhapBaoCao}> Nhập báo cáo</Button>
          <Button variant="contained"> Export</Button>
        </Stack>
      )} */}
    </Stack>
  )}

{/* For large screens */}
{isLargeScreen && (
    <Stack direction="row" spacing={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Ngày" value={date} onChange={handleDateChange} />
        </LocalizationProvider>
        <TrangThai trangthai={bcGiaoBanCurent.TrangThai} />
      
        <DisplayKhoaButton khoaHienThis={khoaDaGuis} type="đã gửi" />
        <DisplayKhoaButton khoaHienThis={khoaChuaGuis} type="chưa gửi" />
        {(user.PhanQuyen ==='admin' || user.PhanQuyen ==='manager')&&(

        <Button variant="contained" onClick={handleDuyet}> {bcGiaoBanCurent.TrangThai ? "Gỡ duyệt" : "Duyệt"}</Button>
        )}
        <Box sx={{flexGrow:1}}/>
          <Button variant="contained" onClick={handleNhapBaoCao}> Nhập báo cáo</Button>
          <Button variant="contained"> Export</Button>
    </Stack>
  )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {(user.PhanQuyen ==='admin' || user.PhanQuyen ==='manager')&&(

          <MenuItem onClick={() => { handleDuyet(); handleClose(); }}>{bcGiaoBanCurent.TrangThai ? "Gỡ duyệt" : "Duyệt"}</MenuItem>
          )}
          <MenuItem onClick={() => { handleNhapBaoCao(); handleClose(); }}>Nhập báo cáo</MenuItem>
          <MenuItem onClick={handleClose}>Export</MenuItem>
        </Menu>
      </Card>
      <Card sx={{ p: 2, my: 3 }}>
      <Typography variant="h4" sx={{ my: 1,fontSize:isSmallScreen?'1.5rem':'2rem' }} textAlign='center'>
             BÁO CÁO GIAO BAN TOÀN VIỆN NGÀY {fDate(date)}
            </Typography>
        <Stack direction="row" justifyContent='center' >
          <Card sx={{ p: 2, my: 1, }}>
          <Typography sx={{fontSize:isSmallScreen?'0.9rem':'1rem'}}>- Trực lãnh đạo : {bcGiaoBanCurent?bcGiaoBanCurent.TrucLanhDao: " "} </Typography>
          <Typography sx={{fontSize:isSmallScreen?'0.9rem':'1rem'}}> - Tổng trực hệ nội: {bcGiaoBanCurent?bcGiaoBanCurent.TTHeNoi: " "}</Typography>
          <Typography sx={{fontSize:isSmallScreen?'0.9rem':'1rem'}}>- Tổng trực hệ ngoại: {bcGiaoBanCurent?bcGiaoBanCurent.TTHeNgoai: " "}</Typography>
          </Card>
         
        </Stack>

        <Grid container spacing={2}>
  {/* Màn hình lớn (md trở lên): 1 dòng, Màn hình vừa (sm): 2 component/1 dòng, Màn hình nhỏ (xs): 1 component/1 dòng */}
  <Grid item xs={12} sm={6} md={2}>
    <TongHopToanVien />
  </Grid>
  <Grid item xs={12} sm={6} md={2}>
    <TongHopHeNoi />
  </Grid>
  <Grid item xs={12} sm={6} md={2}>
    <TongHopHeNgoai />
  </Grid>
  <Grid item xs={12} sm={6} md={2}>
    <TongHopCLC />
  </Grid>
  <Grid item xs={12} sm={6} md={2}>
    <TongHopKKB />
  </Grid>
  <Grid item xs={12} sm={6} md={2}>
    <TongHopCanLamSang />
  </Grid>
</Grid>

      </Card>
    </Box>
  );
}

export default Sumary;
