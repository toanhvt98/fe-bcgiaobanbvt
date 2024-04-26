import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Link,
  Card,
  AppBar,
  Typography,
  Toolbar,
  Box,
  Grid,
  CardHeader,
  CardContent,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "../../../hooks/useAuth";

import { getKhoas } from "../../BaoCaoNgay/baocaongaySlice";
import { formatDateTime } from "../../../utils/formatTime";
import { FRadioGroup, FormProvider } from "../../../components/form";
import MyPieChartForMoney from "../MyPieChartForMoney";
import {
  ConvertDoanhThuBacSiKhoa,
  ConvertDoanhThuCanLamSang,
  Get_KhoaID_By_MaKhoa,
  calculateTotalForType,
  tinhChenhLech_DoanhThu_BacSi,
} from "../../../utils/heplFuntion";
import { getKhuyenCaoKhoaByThangNam } from "../dashboardSlice";
import { useForm } from "react-hook-form";

import {
  getDataNewestByNgayKhoa,
  getDataNewestByNgayKhoaChenhLech,
} from "./dashboardkhoaSlice";
import TableDoanhThuKhoaBacSi from "./TableDoanhThuKhoaBacSi";
import TableCanLamSangKhoa from "./TableCanLamSangKhoa";

function DashBoardKhoa() {
  const { user } = useAuth();
  const { khoas } = useSelector((state) => state.baocaongay);
  // const {
  //   chisokhoa,
  //   dashboad_NgayChenhLech,

  // } = useSelector((state) => state.dashboard);

  const {chisokhoa,chisokhoa_NgayChenhLech} = useSelector((state)=>state.dashboardkhoa)
  // Lấy thời gian hiện tại theo múi giờ của Việt Nam
  const now = dayjs().tz("Asia/Ho_Chi_Minh");

  const yesterday = dayjs().subtract(1, "day").tz("Asia/Ho_Chi_Minh");
  const [dateChenhLech, setDateChenhLech] = useState(yesterday);

  const [date, setDate] = useState(now);

  const [isToday, setIsToday] = useState(true);
  const [thang, setThang] = useState();
  const [nam, setNam] = useState();
  const [selectedTrangThai, setSelectedTrangThai] = useState("Duyệt kế toán");
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const colors = [
    { color: "#1939B7" },
    { color: "#bb1515" },
    { color: "#00C49F" },
    { color: "#eb99ff" },
    { color: "#660000" },
    { color: "#00661a" },
    { color: "#0033cc" },
    { color: "#00cc00" },
    { color: "#0088FE" },
    { color: "#FFBB28" },
    { color: "#2ABC28" },
  ];
  let dataEx_DuyetKeToan = [];

  let dataEx_TheoChiDinh = [];

  let dataEx_ChenhLech_TheoChiDinh = [];

  let dataEx_ChenhLech_DuyetKeToan = [];

  const doanhthu_table_DuyetKeToan = ConvertDoanhThuBacSiKhoa(chisokhoa.json_doanhthu_toanvien_bacsi_duyetketoan)
  const doanhthu_table_DuyetKeToan_NgayChenhLech = ConvertDoanhThuBacSiKhoa(chisokhoa_NgayChenhLech.json_doanhthu_toanvien_bacsi_duyetketoan)
  const doanhthu_ChenhLech_DuyetKeToan = tinhChenhLech_DoanhThu_BacSi(doanhthu_table_DuyetKeToan_NgayChenhLech,doanhthu_table_DuyetKeToan)
  
  const doanhthu_table_TheoChiDinh = ConvertDoanhThuBacSiKhoa(chisokhoa.json_doanhthu_toanvien_bacsi_theochidinh)
  const doanhthu_table_TheoChiDinh_NgayChenhLech = ConvertDoanhThuBacSiKhoa(chisokhoa_NgayChenhLech.json_doanhthu_toanvien_bacsi_theochidinh)
  const doanhthu_ChenhLech_TheoChiDinh = tinhChenhLech_DoanhThu_BacSi(doanhthu_table_TheoChiDinh_NgayChenhLech,doanhthu_table_TheoChiDinh)

  const data_Pie_DuyetKeToan = [
    { label: "Thu trực tiếp", value: doanhthu_table_DuyetKeToan[0]?.thutructiep || 0 },
    { label: "Đồng chi trả", value: doanhthu_table_DuyetKeToan[0]?.dongchitra ||0 },
    { label: "BHYT", value: doanhthu_table_DuyetKeToan[0]?.bhyt || 0 },
    { label: "MRI 3.0", value: doanhthu_table_DuyetKeToan[0]?.tienmri30 || 0 },
  ]
  const data_Pie_DuyetKeToan_ChenhLech = [
    { label: "Thu trực tiếp", value: doanhthu_ChenhLech_DuyetKeToan[0]?.thutructiep || 0 },
    { label: "Đồng chi trả", value: doanhthu_ChenhLech_DuyetKeToan[0]?.dongchitra ||0 },
    { label: "BHYT", value: doanhthu_ChenhLech_DuyetKeToan[0]?.bhyt || 0 },
    { label: "MRI 3.0", value: doanhthu_ChenhLech_DuyetKeToan[0]?.tienmri30 || 0 },
  ]


  const data_Pie_TheoChiDinh = [
    { label: "Thu trực tiếp", value: doanhthu_table_TheoChiDinh[0]?.thutructiep || 0 },
    { label: "Đồng chi trả", value: doanhthu_table_TheoChiDinh[0]?.dongchitra ||0 },
    { label: "BHYT", value: doanhthu_table_TheoChiDinh[0]?.bhyt || 0 },
    { label: "MRI 3.0", value: doanhthu_table_TheoChiDinh[0]?.tienmri30 || 0 },
  ]
  const data_Pie_TheoChiDinh_ChenhLech = [
    { label: "Thu trực tiếp", value: doanhthu_ChenhLech_TheoChiDinh[0]?.thutructiep || 0 },
    { label: "Đồng chi trả", value: doanhthu_ChenhLech_TheoChiDinh[0]?.dongchitra ||0 },
    { label: "BHYT", value: doanhthu_ChenhLech_TheoChiDinh[0]?.bhyt || 0 },
    { label: "MRI 3.0", value: doanhthu_ChenhLech_TheoChiDinh[0]?.tienmri30 || 0 },
  ]

  const CanLamSangDuyetKeToan = ConvertDoanhThuCanLamSang(
    chisokhoa?.json_doanhthu_canlamsang_duyetketoan_khoa || [],
    chisokhoa_NgayChenhLech?.json_doanhthu_canlamsang_duyetketoan_khoa || [])

  const CanLamSangTheoChiDinh = ConvertDoanhThuCanLamSang(
    chisokhoa?.json_doanhthu_canlamsang_theochidinh_khoa || [],
    chisokhoa_NgayChenhLech?.json_doanhthu_canlamsang_theochidinh_khoa || [])
  

  const [selectedDepartment, setSelectedDepartment] = useState(user.KhoaID._id);
  const [loaikhoa, setLoaikhoa] = useState("noi");
  const [makhoa, setMakhoa] = useState("");

  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.mytheme);

  useEffect(() => {
    dispatch(getKhoas());
  }, [dispatch]);

  useEffect(() => {
    // Update selectedDepartment when khoas changes
    if (khoas && khoas.length > 0) {
      console.log("chay day");
      setSelectedDepartment(user.KhoaID._id);
      const loai_khoa = khoas.find(
        (khoa) => khoa._id === selectedDepartment
      )?.LoaiKhoa;
      const ma_khoa = khoas.find(
        (khoa) => khoa._id === selectedDepartment
      )?.MaKhoa;

      console.log("UF1 loaikhoa", loai_khoa);
      setLoaikhoa(loai_khoa);
      setMakhoa(ma_khoa);
    }
  }, [khoas, user.KhoaID._id]);

  const handleDateChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào

    if (newDate instanceof Date) {
      // newDate.setHours(7, 0, 0, 0);
      setDate(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      setDate(newDate);
      // setDate(updatedDate);
    }
    setIsToday(dayjs(newDate).isSame(now, "day"));
    // dispatch(getDataNewestByNgay(date.toISOString()));
  };
  const handleDateChenhLechChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào

    if (newDate instanceof Date) {
      // newDate.setHours(7, 0, 0, 0);
      setDateChenhLech(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);

      setDateChenhLech(newDate);

      // dispatch(getDataNewestByNgayKhoaChenhLech());
      // setDate(updatedDate);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedDepartment(e.target.value);
    //setLoaikhoa de hien thi giao dien tuong ung
    const loai_khoa = khoas.find(
      (khoa) => khoa._id === e.target.value
    )?.LoaiKhoa;
    const ma_khoa = khoas.find((khoa) => khoa._id === e.target.value)?.MaKhoa;

    setMakhoa(ma_khoa);
    const khoaid = Get_KhoaID_By_MaKhoa(makhoa);
    console.log("makhoa in ch", ma_khoa, khoaid);
    // dispatch(getDataNewestByNgayKhoa(date.toISOString(),khoaid))
    setLoaikhoa(loai_khoa);
  };
  useEffect(() => {
    dispatch(
      getDataNewestByNgayKhoaChenhLech(
        dateChenhLech.toISOString(),
        Get_KhoaID_By_MaKhoa(makhoa)
      )
    );
  }, [dispatch, dateChenhLech,makhoa]);

  useEffect(() => {
    const fetchNewestData = () => {
      // Tính toán tháng và năm từ `date`
      const dateObj = new Date(date);

      // Tính toán tháng và năm từ `dateObj`
      const thang = dateObj.getMonth() + 1; // JavaScript đếm tháng từ 0

      const nam = dateObj.getFullYear();
      setThang(thang);
      setNam(nam);
      // Gọi dispatch cho getKhuyenCaoKhoaByThangNam trước
      dispatch(getKhuyenCaoKhoaByThangNam(thang, nam));
      dispatch(
        getDataNewestByNgayKhoa(date.toISOString(),Get_KhoaID_By_MaKhoa(makhoa))
        
      );
      console.log("render lại");
    };
    fetchNewestData();
    // Kiểm tra nếu ngày là ngày hiện tại mới chạy setInterval
    if (isToday) {
      // Gọi khi component mount

      const intervalId = setInterval(fetchNewestData, 900000); // Gọi lại sau mỗi 15 phút

      return () => {
        clearInterval(intervalId); // Dọn dẹp khi component unmount
      };
    }

    return undefined; // Nếu không phải ngày hiện tại, không chạy setInterval
  }, [dispatch, date, isToday, makhoa]); // Chỉ rerun khi dispatch, date, hoặc isToday thay đổi
  const defaultValues = {
    TrangThai: "Duyệt kế toán",
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

  return (
    <Stack>
      <AppBar position="static" sx={{ mb: 1 }}>
        <Toolbar>
          {chisokhoa.Ngay && (
            <Typography
              variant="h6"
              sx={{ marginX: "auto", textAlign: "center" }}
            >
              (Số liệu {formatDateTime(chisokhoa.Ngay)})
            </Typography>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Card sx={{ m: 1, p: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Khoa</InputLabel>

              <Select
                value={selectedDepartment}
                onChange={handleSelectChange}
                disabled={(user.PhanQuyen !=='admin')}
                sx={{ m: 1 }}
              >
                {khoas &&
                  khoas.length > 0 &&
                  khoas.map((department) => (
                    <MenuItem key={department._id} value={department._id}>
                      {department.TenKhoa}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Card>
          <Card sx={{ m: 1, p: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ m: 1 }}
                label="Ngày"
                value={date}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Card>
        </Toolbar>
      </AppBar>

      <Card
        sx={{
          color: "#f2f2f2",
          backgroundColor: "#1939B7",
          borderRadius: 3,
        }}
      >
        {chisokhoa.Ngay && (
          <Stack sx={{ textAlign: "center" }}>
            <Typography variant="h6">
              {` DOANH THU ${khoas.find((khoa)=>khoa.MaKhoa===makhoa)?.TenKhoa.toUpperCase()} TỪ 00:00  1/${thang}/${nam} ĐẾN ${formatDateTime(
                chisokhoa.Ngay
              )}`}{" "}
              {selectedTrangThai === "Duyệt kế toán"
                ? `(ĐÃ DUYỆT KẾ TOÁN)`
                : `(THEO CHỈ ĐỊNH)`}
            </Typography>
            <Typography
              variant="h7"
              sx={{ marginX: "auto", textAlign: "center" }}
            >
              {`(Tính chênh lệch từ  ${formatDateTime(
                chisokhoa_NgayChenhLech.Ngay
              )} đến ${formatDateTime(chisokhoa.Ngay)})`}
            </Typography>
          </Stack>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} spacing={1}>
            <Card
              sx={{
                fontWeight: "bold",
                color: darkMode ? "#FFF" : "#1939B7",
                backgroundColor: darkMode ? "#1D1D1D" : "#1939B7",
                boxShadow: 10,
              }}
            >
              <CardHeader
                title={""}
                sx={{ textAlign: "center", color: "#1939B7" }}
              />
              <CardContent>
                <Grid container spacing={1}>
                  {/* Grid items bên trong Card */}
                  <Grid item xs={12} sm={12} md={5.2}>
                    <Card
                      sx={{
                        fontWeight: "bold",
                        color: darkMode ? "#FFF" : "#1939B7",

                        boxShadow: 10,
                      }}
                    >
                      {`Doanh thu toàn viện (${selectedTrangThai})`}
                      {selectedTrangThai === "Duyệt kế toán" ? (
                        <MyPieChartForMoney
                          data={data_Pie_DuyetKeToan}
                          colors={colors}
                          other={{ height: 300 }}
                          dataEx={dataEx_DuyetKeToan}
                        />
                      ) : (
                        <MyPieChartForMoney
                          data={data_Pie_TheoChiDinh}
                          colors={colors}
                          other={{ height: 300 }}
                          dataEx={dataEx_TheoChiDinh}
                        />
                      )}
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={5.2}>
                    <Card
                      sx={{
                        fontWeight: "bold",
                        color: darkMode ? "#FFF" : "#1939B7",

                        boxShadow: 10,
                      }}
                    >
                      {`Tính chênh lệch doanh thu toàn viện (${selectedTrangThai})`}
                      {selectedTrangThai === "Duyệt kế toán" ? (
                        <MyPieChartForMoney
                          data={data_Pie_DuyetKeToan_ChenhLech}
                          colors={colors}
                          other={{ height: 300 }}
                          dataEx={dataEx_ChenhLech_DuyetKeToan}
                        />
                      ) : (
                        <MyPieChartForMoney
                          data={data_Pie_TheoChiDinh_ChenhLech}
                          colors={colors}
                          other={{ height: 300 }}
                          dataEx={dataEx_ChenhLech_TheoChiDinh}
                        />
                      )}
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={1.6}>
                    <Card
                      sx={{
                        fontWeight: "bold",
                        color: darkMode ? "#FFF" : "#1939B7",
                        height: 325,
                        boxShadow: 10,
                        alignItems: "center",
                      }}
                    >
                      Chọn tiêu chí:
                      <Card>
                        <FormProvider methods={methods}>
                          <FRadioGroup
                            name="TrangThai"
                            value={selectedTrangThai}
                            onChange={(e) => {
                              setSelectedTrangThai(e.target.value);
                              console.log("trangthia", selectedTrangThai);
                            }}
                            options={["Duyệt kế toán", "Theo chỉ định"]}
                            // options={allOptions.slice(4)}

                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 50,
                                p: 2,
                              },
                            }}
                          />
                        </FormProvider>
                      </Card>
                      <Card sx={{ marginTop: 3 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{ m: 1 }}
                            label="Ngày tính chênh lệch"
                            value={dateChenhLech}
                            onChange={handleDateChenhLechChange}
                          />
                        </LocalizationProvider>
                      </Card>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}></Stack>{" "}
      </Card>
      <Card sx={{ my: 3, py: 3 }}>
        {selectedTrangThai === "Duyệt kế toán"
          ? (
            <TableDoanhThuKhoaBacSi
            doanhthu_table ={doanhthu_table_DuyetKeToan}
            doanhthu_ChenhLech={doanhthu_ChenhLech_DuyetKeToan}
            />
          )
          : (
            <TableDoanhThuKhoaBacSi
            doanhthu_table ={doanhthu_table_TheoChiDinh}
            doanhthu_ChenhLech={doanhthu_ChenhLech_TheoChiDinh}
            />
          )}
         
      </Card>

      <Card sx={{ my: 3, py: 3 }}>
      <TableCanLamSangKhoa
          canlamsangDuyetKeToan={CanLamSangDuyetKeToan}
          canlamsangChiDinh={CanLamSangTheoChiDinh}
       
        />
      </Card>
    </Stack>
  );
}

export default DashBoardKhoa;
