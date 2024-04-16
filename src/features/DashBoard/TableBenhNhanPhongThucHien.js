import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Card,
  useMediaQuery,
  Box,
  Stack,
} from "@mui/material";
import { commonStyle, commonStyleLeft } from "../../utils/heplFuntion";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { FRadioGroup, FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import MyFRadioGroup from "../../components/form/MyFRadioGroup";
import { formatDateTime } from "../../utils/formatTime";

function TableBenhNhanPhongThucHien({ dataBenhNhan, titleTable }) {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let commonStyleReponsive = isSmallScreen
    ? { ...commonStyle, fontSize: "0.6rem" }
    : { ...commonStyle };
  let commonStyleLeftReponsive = isSmallScreen
    ? { ...commonStyleLeft, fontSize: "0.6rem" }
    : { ...commonStyleLeft };
  commonStyleReponsive = darkMode
    ? { ...commonStyleReponsive, color: "#FFF" }
    : { ...commonStyleReponsive };
  commonStyleLeftReponsive = darkMode
    ? { ...commonStyleLeftReponsive, color: "#FFF" }
    : { ...commonStyleLeftReponsive };

  const commonStyleLeftReponsiveRed = {
    ...commonStyleLeftReponsive,
    color: "#bb1515",
  };
  const rowStyle = {
    height: "35px", // Adjust the height as needed
    "& td, & th": { padding: "5px" }, // Adjust the padding as needed
  };
  const [selectedDoiTuongBN, setSelectedDoiTuongBN] = useState(9);
  const [selectedLoaiTT, setSelectedLoaiTT] = useState(9);
  const [selectedTrangThai, setSelectedTrangThai] = useState(9);
  const defaultValues = {
    DoiTuongBN: 9,
    LoaiTT: 9,
    TrangThai: 9,
  };
  const methods = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const mapDoiTuongBN = (value) => {
    switch (value) {
      case 1:
        return "BHYT";
        break;
      case 2:
        return "Viện phí";
        break;
      case 3:
        return "Yêu cầu";
        break;
      default:
        break;
    }
  };
  const mapLoaiTT = (value) => {
    switch (value) {
      case 0:
        return "BHYT";
        break;
      case 1:
        return "Viện phí";
        break;
      case 3:
        return "Yêu cầu";
        break;
      case 4:
        return "BHYT+YC";
        break;
      default:
        break;
    }
  };
  const mapTrangThai = (value) => {
    switch (value) {
      case 1:
        return "Chờ";
        break;
      case 2:
        return "Đã trả KQ";
        break;
      case 16:
        return "Đã thực hiện";
        break;

      default:
        break;
    }
  };

  return (
    <Box sx={{ my: 1, p: 2 }}>
      <TableContainer>
        <Card
          sx={{
            fontWeight: "bold",
            color: "#f2f2f2",
            backgroundColor: "#1939B7",
            p: 1,
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: isSmallScreen ? "1rem" : "1.3rem",
            }}
          >
            {`${titleTable} (Số lượng: ${
              dataBenhNhan.filter(
                (row) =>
                  (selectedDoiTuongBN === 9 ||
                    row.doituongbenhnhanid === selectedDoiTuongBN) &&
                  (selectedLoaiTT === 9 ||
                    row.loaidoituong === selectedLoaiTT) &&
                  (selectedTrangThai === 9 ||
                    row.maubenhphamstatus === selectedTrangThai)
              ).length
            })`}
          </Typography>
          <Stack>
            <FormProvider methods={methods}>
              <Card sx={{ color: darkMode ? "#FFF" : "#1939B7",p:2 }}>
                Đối tượng bệnh nhân
                <MyFRadioGroup
                  name="DoiTuongBN"
                  value={selectedDoiTuongBN}
                  onChange={(e) => {
                    setSelectedDoiTuongBN(parseInt(e.target.value, 10));
                  }}
                  options={[
                    { value: 9, label: "Tất cả" },
                    { value: 1, label: "BHYT" },
                    { value: 2, label: "Viện phí" },
                    { value: 3, label: "Yêu cầu" },
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: { isSmallScreen } ? 12 : 20,
                    },
                    "& .MuiTypography-body1": {
                      fontSize: isSmallScreen ? "0.7rem" : "1.1rem",
                    },
                  }}
                />
              </Card>
              <Card sx={{ color: darkMode ? "#FFF" : "#1939B7",p:2 }}>
                Loại hình thanh toán dịch vụ
                <MyFRadioGroup
                  name="LoaiTT"
                  value={selectedLoaiTT}
                  onChange={(e) => {
                    setSelectedLoaiTT(parseInt(e.target.value, 10));
                  }}
                  options={[
                    { value: 9, label: "Tất cả" },
                    { value: 0, label: "BHYT" },
                    { value: 1, label: "Viện phí" },
                    { value: 3, label: "Yêu cầu" },
                    { value: 4, label: "BHYT+YC" },
                  ]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: { isSmallScreen } ? 12 : 20,
                      row: false,
                    },
                    "& .MuiTypography-body1": {
                      fontSize: isSmallScreen ? "0.7rem" : "1.1rem",
                    },
                  }}
                />
              </Card>

              <Card sx={{ color: darkMode ? "#FFF" : "#1939B7",p:2 }}>
                Trạng thái dịch vụ
                <MyFRadioGroup
                  name="Trạng thái"
                  value={selectedTrangThai}
                  onChange={(e) => {
                    setSelectedTrangThai(parseInt(e.target.value, 10));
                  }}
                  options={[
                    { value: 9, label: "Tất cả" },
                    { value: 1, label: "Chờ" },
                    { value: 16, label: "Đã thực hiện (Chưa trả KQ)" },
                    { value: 2, label: "Đã trả KQ" },
                  ]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: { isSmallScreen } ? 12 : 20,
                    },
                    "& .MuiTypography-body1": {
                      fontSize: isSmallScreen ? "0.7rem" : "1.1rem",
                    },
                  }}
                />
              </Card>
            </FormProvider>
          </Stack>
        </Card>
        <TableContainer component={Paper} style={{overflowX: 'auto',}}  >

        <Table>
          <TableHead>
            <TableRow sx={rowStyle}>
              <TableCell style={commonStyleReponsive}>Mã BN</TableCell>
              <TableCell style={commonStyleReponsive}>Tên BN</TableCell>
              <TableCell style={commonStyleReponsive}>Đối tượng</TableCell>
              <TableCell style={commonStyleReponsive}>Khoa</TableCell>
              <TableCell style={commonStyleReponsive}>Phòng</TableCell>
              <TableCell style={commonStyleReponsive}>Tên dịch vụ</TableCell>
              <TableCell style={commonStyleReponsive}>Loại TT</TableCell>
              <TableCell style={commonStyleReponsive}>Trạng thái</TableCell>
              <TableCell style={commonStyleReponsive}>Chỉ định</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataBenhNhan
              .filter(
                (row) =>
                  (selectedDoiTuongBN === 9 ||
                    row.doituongbenhnhanid === selectedDoiTuongBN) &&
                  (selectedLoaiTT === 9 ||
                    row.loaidoituong === selectedLoaiTT) &&
                  (selectedTrangThai === 9 ||
                    row.maubenhphamstatus === selectedTrangThai)
              )
              .map((row, index) => (
                <TableRow key={index} sx={rowStyle}>
                  <TableCell style={commonStyleLeftReponsive}>
                    {row.patientid}
                  </TableCell>
                  <TableCell style={commonStyleLeftReponsive}>
                    {row.patientname}
                  </TableCell>
                  <TableCell style={commonStyleLeftReponsive}>
                    {mapDoiTuongBN(row.doituongbenhnhanid)}
                  </TableCell>
                  <TableCell style={commonStyleLeftReponsive}>
                    {row.departmentgroupname}
                  </TableCell>
                  <TableCell style={commonStyleLeftReponsive}>
                    {row.departmentname}
                  </TableCell>
                  <TableCell style={commonStyleLeftReponsive}>
                    {row.servicepricename}
                  </TableCell>
                  <TableCell style={commonStyleLeftReponsive}>
                    {mapLoaiTT(row.loaidoituong)}
                  </TableCell>
                  <TableCell style={commonStyleLeftReponsive}>
                    {mapTrangThai(row.maubenhphamstatus)}
                  </TableCell>
                  <TableCell style={commonStyleLeftReponsive}>
                    {formatDateTime(row.maubenhphamdate)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        </TableContainer>
      </TableContainer>
    </Box>
  );
}

export default TableBenhNhanPhongThucHien;
