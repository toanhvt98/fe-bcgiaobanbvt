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
function CardBenhNhanThoiGianKham({
  databenhnhan,
  title,
  value,
  colorCardWarning,
  titleMore,
  type,
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
          <Typography sx={{ textAlign: "center"}}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {value} phút
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
                color={"#1939B7"}
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
                      Khoa/phòng
                    </TableCell>
                    <TableCell style={commonStyleReponsive}>Đăng ký</TableCell>
                    <TableCell style={commonStyleReponsive}>
                      Bắt đâu khám
                    </TableCell>
                    {type === "thoigianchokham" ? (
                      <TableCell style={commonStyleReponsive}>
                        Thời gian chờ khám
                      </TableCell>
                    ) : (
                      <>
                      <TableCell style={commonStyleReponsive}>
                        Thời gian có chỉ định CLS
                      </TableCell>
                      <TableCell style={commonStyleReponsive}>
                        Thời gian khám bệnh
                      </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {databenhnhan &&
                    databenhnhan.map((row, index) => (
                      <TableRow key={index} sx={rowStyle}>
                        <TableCell style={commonStyleLeftReponsive}>
                          {row.patientid}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {row.patientname}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {row.departmentname}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {formatTimeFromISOString(row.sothutudate)}
                        </TableCell>
                        <TableCell style={commonStyleLeftReponsive}>
                          {formatTimeFromISOString(row.thoigianbatdaukham)}
                        </TableCell>
                        {type === "thoigianchokham" ? (
                      <TableCell style={commonStyleReponsive}>
                        {parseFloat(parseFloat(row.thoigianchokham)).toFixed(1) ||""}
                      </TableCell>
                    ) : (
                      <>
                      <TableCell style={commonStyleReponsive}>
                      {formatTimeFromISOString(row.thoigiancanlamsangmax)}
                      </TableCell>
                      <TableCell style={commonStyleReponsive}>
                      {parseFloat(parseFloat(row.thoigiankham)).toFixed(1) ||""}
                      
                      </TableCell>
                      </>
                    )}

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

export default CardBenhNhanThoiGianKham;
