import React, { useEffect } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDataNewestByNgay } from "./dashboardSlice";
import DisplayChiSoDashBoard from "../../components/DisplayChiSoDashBoard";
import CardThoiGian from "./CardThoiGian";
import TableCanLamSang from "./TableCanLamSang";
import StackBarTyLeTraDungCLS from "./StackBarTyLeTraDungCLS";
import { fDateTime, fDateTimeSuffix, formatDateTime } from "../../utils/formatTime";

const ChiSoChatLuong = () => {
  const {
    dashboadChiSoChatLuong,
    thoigianchokhambenh,
    thoigiankhambenh,
    tongthoigian,
    canlamsangs,
  } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     const dateCurent = new Date().toISOString();

  //     dispatch(getDataNewestByNgay(dateCurent));
  //   }, []);

  useEffect(() => {
    const fetchNewestData = () => {
      const dateCurent = new Date().toISOString();
      dispatch(getDataNewestByNgay(dateCurent));
      console.log("render lại");
    };

    fetchNewestData(); // Gọi khi component mount

    const intervalId = setInterval(fetchNewestData, 60000); // Gọi lại sau mỗi 1 phút

    return () => {
      clearInterval(intervalId); // Dọn dẹp khi component unmount
    };
  }, [dispatch]); // Chỉ rerun khi dispatch thay đổi

  return (
    <Stack>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
            {dashboadChiSoChatLuong.Ngay &&
          <Typography variant="h6" sx={{marginX:'auto',textAlign:'center'}}>SỐ LIỆU LẤY LÚC {formatDateTime(dashboadChiSoChatLuong.Ngay)}</Typography>
            }
          <Box sx={{ flexGrow: 1 }} />
          <DisplayChiSoDashBoard
            ChiSoDashBoard={dashboadChiSoChatLuong.ChiSoDashBoard}
          />
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={7}>
          <CardThoiGian data={thoigianchokhambenh} />
          <CardThoiGian data={thoigiankhambenh} />
          <CardThoiGian data={thoigianchokhambenh} />
       <StackBarTyLeTraDungCLS/>
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <TableCanLamSang canlamsangs={canlamsangs} type={0} />
          <TableCanLamSang canlamsangs={canlamsangs} type={1} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ChiSoChatLuong;
