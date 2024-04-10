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
function CardCT128BHYT({
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
  function formatTimeFromISOString(isoString) {
    const dateObject = new Date(isoString);
    const hours = addLeadingZero(dateObject.getHours());
    const minutes = addLeadingZero(dateObject.getMinutes());
    const seconds = addLeadingZero(dateObject.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
}

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}
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
          backgroundColor: "#bb1515",
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
          <Typography sx={{ textAlign: "center", fontSize: "0.8rem" }}>
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
                color={darkMode?"#FFF":"#1939B7"}
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
                     Khoa
                    </TableCell>

                    <TableCell style={commonStyleReponsive}>
                      Phòng
                    </TableCell>
                    <TableCell style={commonStyleReponsive}>
                      Người chỉ định
                    </TableCell>
                    <TableCell style={commonStyleReponsive}>
                      Bệnh nhân
                    </TableCell>
                    <TableCell style={commonStyleReponsive}>
                      Dịch vụ
                    </TableCell>
                    <TableCell style={commonStyleReponsive}>
                      Thời gian
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {databenhnhan &&
                    databenhnhan.map((row, index) => (
                      <TableRow key={index} sx={rowStyle}>
                        <TableCell style={commonStyleLeftReponsive}>
                          {row.departmentgroupname}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {row.departmentname}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {row.username}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {row.patientname}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {row.servicepricename}
                        </TableCell>
                        <TableCell style={commonStyleLeftReponsive}>
                          
                          {/* {row.maubenhphamdate} */}
                          {formatTimeFromISOString(row.maubenhphamdate)}
                        </TableCell>
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

export default CardCT128BHYT;
