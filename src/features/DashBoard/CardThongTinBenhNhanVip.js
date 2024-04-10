import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import {
  commonStyle,
  commonStyleLeft,
  commonStyleTitle,
} from "../../utils/heplFuntion";
import { formatDate_getDate, formatTimeFromISOString } from "../../utils/formatTime";
function CardThongTinBenhNhanVip({
  databenhnhan,
  title,
  value,
  colorCardWarning,
  titleMore,
}) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let commonStyleReponsive = isSmallScreen
    ? { ...commonStyle, fontSize: "0.8rem" }
    : { ...commonStyle };
  let commonStyleLeftReponsive = isSmallScreen
    ? { ...commonStyleLeft, fontSize: "0.8rem" }
    : { ...commonStyleLeft };
  commonStyleReponsive = darkMode
    ? { ...commonStyleReponsive, color: "#FFF" }
    : { ...commonStyleReponsive };
  commonStyleLeftReponsive = darkMode
    ? { ...commonStyleLeftReponsive, color: "#FFF" }
    : { ...commonStyleLeftReponsive };

  let commonStyleTitleReponsive = isSmallScreen
    ? { ...commonStyleTitle, fontSize: "0.8rem" }
    : { ...commonStyleTitle };
  const rowStyle = {
    height: "35px", // Adjust the height as needed
    "& td, & th": { padding: "5px" }, // Adjust the padding as needed
  };

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isHovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  return (
    <Box>
      {/* <Button variant="contained" color="secondary" onClick={handleOpen}>
            
           {khoaHienThis.length} khoa {type}
          </Button> */}

      <Card
        sx={{
          fontWeight: "bold",
          color: "#f2f2f2",
          // backgroundColor:((item.Name ==="Đơn cao nhất" && chisosObj.ngoaitru_max_donthuoc>chisosObj.ngoaitru_khuyencao
          // || (item.Name ==='Vượt khuyến cáo')
          // ||(item.Name ==='Bình quân đơn' && chisosObj.ngoaitru_binhquandon>chisosObj.ngoaitru_khuyencao)
          // ))
          // ?"#bb1515": "#1939B7",
          // p: 1,
          backgroundColor: colorCardWarning ? "#bb1515" : "#1939B7",
          boxShadow: 10,
          borderRadius: 3,

          ":hover": {
            filter: isHovered ? "brightness(1.5)" : "initial", // Tăng độ sáng lên 150%
            cursor: isHovered ? "pointer" : "initial",
          },
        }}
        onClick={handleOpen}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <CardContent>
          <Typography sx={{ textAlign: "center", fontSize: "0.9rem" }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {value}
          </Typography>
        </CardContent>
      </Card>

      <ThemeProvider theme={darkTheme}>
        <div>
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80vw",
                maxHeight: "80vh", // Giới hạn chiều cao tối đa
                overflowY: "auto", // Hiển thị thanh cuộn
                bgcolor: theme.palette.background.paper,
                boxShadow: 24,
                borderRadius: 2,
                p: 3,
              }}
            >
              <Typography
                variant={isSmallScreen ? "h6" : "h5"}
                gutterBottom
                align="center"
                color={darkMode ? "#FFF" : "#1939B7"}
              >
                {titleMore}
              </Typography>
              {/* <Grid
                  container
                  spacing={3}
                  direction={isSmallScreen ? "column" : "row"}
                >
                  {databenhnhan && databenhnhan.map((bn, index) => (
                    <Grid item xs={isSmallScreen ? 12 : 6} key={index}>
                      <Typography variant="body2"> {bn.patientid} : {bn.patientname}:{bn.departmentname}:{bn.tong_donthuoc} </Typography>
                      <Divider />
                    </Grid>
                  ))}
                </Grid> */}

              <Table>
                <TableHead>
                  <TableRow sx={rowStyle}>
                    <TableCell style={commonStyleReponsive}>
                      Mã người bệnh
                    </TableCell>

                    <TableCell style={commonStyleReponsive}>
                      Tên người bệnh
                    </TableCell>
                    <TableCell style={commonStyleReponsive}>
                      Ngày sinh
                    </TableCell>
                    <TableCell style={commonStyleReponsive}>Địa chỉ</TableCell>
                    <TableCell style={commonStyleReponsive}>Khoa</TableCell>
                    <TableCell style={commonStyleReponsive}>Phòng</TableCell>
                    <TableCell style={commonStyleReponsive}>
                      Ngày vào viện
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {databenhnhan &&
                    databenhnhan.map((row, index) => (
                      <TableRow key={index} sx={rowStyle}>
                        <TableCell style={commonStyleLeftReponsive}>
                          {row.patientcode}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {row.patientname} 
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {/* {row.birthday} */}
                          {formatDate_getDate(row.birthday)}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {row.hc_xaname} - {row.hc_huyenname} -{" "}
                          {row.hc_tinhname}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>{row.departmentgroupname}</TableCell>
                        <TableCell style={commonStyleLeftReponsive}>{row.departmentname}</TableCell>

                        <TableCell style={commonStyleLeftReponsive}>{formatDate_getDate(row.hosobenhandate)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Modal>
        </div>
      </ThemeProvider>
    </Box>
  );
}

export default CardThongTinBenhNhanVip;
