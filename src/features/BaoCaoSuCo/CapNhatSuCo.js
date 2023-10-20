import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Link,
  Card,
  Container,
  Grid,
  TextField,
  FormHelperText,
  CardHeader,
  Typography,
  Box,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import {
  getDataBCNgay,
  getKhoas,
} from "../features/BaoCaoNgay/baocaongaySlice";
import useAuth from "../hooks/useAuth";
import { FRadioGroup, FTextField, FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { InsertOne } from "../features/BaoCaoSuCo/baocaosucoSlice";

function CapNhatSuCo(open, handleClose, handleSave, handleChange, baocaosuco) {
  const { user } = useAuth();
  const { khoas } = useSelector((state) => state.baocaongay);
  const { baocaosucoCurent } = useSelector((state) => state.baocaosuco);
  const { watch, control } = useForm();
  const selectedValue = watch("NguoiBaoCao");
  const styleCardHeader = {
    ".MuiCardHeader-title": {
      fontSize: "20px", // Bạn có thể thay đổi giá trị này để điều chỉnh cỡ chữ mong muốn
    },
  };
  // Lấy thời gian hiện tại theo múi giờ của Việt Nam
  const now = dayjs().tz("Asia/Ho_Chi_Minh");

  // Thiết lập giá trị mặc định cho date dựa trên giờ hiện tại

  const [ngayBaoCao, setNgayBaoCao] = useState(now);
  const [ngaySinh, setNgaySinh] = useState(now);
  const [ngaySuCo, setNgaySuCo] = useState(now);

  const [selectedDepartment, setSelectedDepartment] = useState(user.KhoaID._id);
  const [selectedKhoaNguoiBenh, setSelectedKhoaNguoiBenh] = useState(
    user.KhoaID._id
  );
  const [selectedKhoaSuCo, setSelectedKhoaSuCo] = useState(user.KhoaID._id);
  const [loaikhoa, setLoaikhoa] = useState("noi");
  const [makhoa, setMakhoa] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKhoas());
  }, [dispatch]);

  useEffect(() => {
    // Update selectedDepartment when khoas changes
    if (khoas && khoas.length > 0) {
      // setSelectedDepartment(khoas[0]._id);
      setSelectedDepartment(user.KhoaID._id);
    }
  }, [khoas, user.KhoaID._id]);

  const handleNgayBaoCaoChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào
    console.log("Chay day khong");
    if (newDate instanceof Date) {
      //   newDate.setHours(7, 0, 0, 0);
      setNgayBaoCao(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);
      //   const updatedDate = newDate.hour(7).minute(0).second(0).millisecond(0);
      //   console.log("updateDate", updatedDate);
      setNgayBaoCao(newDate);
    }
  };

  const handleNgaySinhChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào
    console.log("Chay day khong");
    if (newDate instanceof Date) {
      //   newDate.setHours(7, 0, 0, 0);
      setNgaySinh(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);
      //   const updatedDate = newDate.hour(7).minute(0).second(0).millisecond(0);
      //   console.log("updateDate", updatedDate);
      setNgaySinh(newDate);
    }
  };

  const handleNgaySuCoChange = (newDate) => {
    // Chuyển đổi về múi giờ VN, kiểm tra đầu vào
    console.log("Chay day khong");
    if (newDate instanceof Date) {
      //   newDate.setHours(7, 0, 0, 0);
      setNgaySuCo(new Date(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      console.log("newdate", newDate);
      //   const updatedDate = newDate.hour(7).minute(0).second(0).millisecond(0);
      //   console.log("updateDate", updatedDate);
      setNgaySuCo(newDate);
    }
  };

  const handleSelectKhoaNguoiBenhChange = (e) => {
    setSelectedKhoaNguoiBenh(e.target.value);
  };
  const handleSelectKhoaSuCoChange = (e) => {
    setSelectedKhoaSuCo(e.target.value);
  };
  const handleSelectChange = (e) => {
    setSelectedDepartment(e.target.value);
    //setLoaikhoa de hien thi giao dien tuong ung
    const loai_khoa = khoas.find(
      (khoa) => khoa._id === e.target.value
    )?.LoaiKhoa;
    const ma_khoa = khoas.find((khoa) => khoa._id === e.target.value)?.MaKhoa;

    console.log("loaikhoa", loai_khoa);
    setLoaikhoa(loai_khoa);
    setMakhoa(ma_khoa);
  };
  const defaultValues = {
    HinhThuc: baocaosuco.HinhThuc || "",
    TenBN: baocaosuco.TenBN || "",
    SoBA: baocaosuco.SoBA || "",
    GioiTinh: baocaosuco.GioiTinh || "",
    DoiTuongSuCo: baocaosuco.DoiTuongSuCo || "",
    ViTri: baocaosuco.ViTri || "",
    MoTa: baocaosuco.MoTa || "",
    GiaiPhap: baocaosuco.GiaiPhap || "",
    XuLyDaLam: baocaosuco.XuLyDaLam || "",
    ThongBaoBacSi: baocaosuco.ThongBaoBacSi || "",
    GhiNhanHoSo: baocaosuco.GhiNhanHoSo || "",
    ThongBaoNguoiNha: baocaosuco.ThongBaoNguoiNha || "",
    ThongBaoNguoiBenh: baocaosuco.ThongBaoNguoiBenh || "",
    PhanLoaiBanDau: baocaosuco.PhanLoaiBanDau || "",
    DanhGiaBanDau: baocaosuco.DanhGiaBanDau || "",
    TenNguoiBC: baocaosuco.TenNguoiBC || "",
    SDTNguoiBC: baocaosuco.SDTNguoiBC || "",
    Email: baocaosuco.Email || "",
    LoaiNguoiBC: baocaosuco.LoaiNguoiBC || "",
    GhiChuNguoiBC: baocaosuco.GhiChuNguoiBC || "",
    NguoiChungKien: baocaosuco.NguoiChungKien || "",
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

  const handleCapNhatDuLieu = (data) => {
    console.log("data", data);
    console.log("ngayBC", ngayBaoCao);
    console.log("ngaysinh", ngaySinh);
    console.log("ngaysuco", ngaySuCo);
    if (baocaosuco._id) {
      const baocaosucoUpdate = {
        ...baocaosuco,
        ...data,
        NgayBC: ngayBaoCao,
        NgaySinh: ngaySinh,
        NgaySuCo: ngaySuCo,
        KhoaBC: selectedDepartment,
        KhoaBN: selectedKhoaNguoiBenh,
        KhoaSuCo: selectedKhoaSuCo,
      };
    } else {
      const baocaosucoInsert = {
        ...data,
        NgayBC: ngayBaoCao,
        NgaySinh: ngaySinh,
        NgaySuCo: ngaySuCo,
        KhoaBC: selectedDepartment,
        KhoaBN: selectedKhoaNguoiBenh,
        KhoaSuCo: selectedKhoaSuCo,
      };
      dispatch(InsertOne(baocaosucoInsert));
    }
  };
  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ my: 1, fontSize: "2rem" }}
        textAlign="center"
      >
        BÁO CÁO SỰ CỐ Y KHOA BỆNH VIỆN ĐA KHOA TỈNH PHÚ THỌ
      </Typography>
      <Stack>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(handleCapNhatDuLieu)}
        >
          <Grid container spacing={3} my={1}>
            <Grid item xs={12} md={5}>
              <Card sx={{ p: 2 }}>
                <CardHeader
                  sx={styleCardHeader}
                  title={"HÌNH THỨC BÁO CÁO SỰ CỐ Y KHOA"}
                />

                <FRadioGroup
                  name="HinhThuc"
                  options={["Tự nguy", "Bắt buộc"]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card sx={{ p: 2 }}>
                <Stack mb={3}>Số báo cáo/Mã số sự cố:</Stack>
                <Stack direction={"row"} spacing={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Ngày báo cáo:"
                      value={ngayBaoCao}
                      onChange={handleNgayBaoCaoChange}
                      //   ampm={false}
                      //   format="HH:mm:ss"
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>

                  <FormControl>
                    <InputLabel sx={{ my: -1 }}>Đơn vị báo cáo</InputLabel>
                    <Select
                      value={selectedDepartment}
                      onChange={handleSelectChange}
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
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 2 }}>
                <CardHeader
                  sx={styleCardHeader}
                  title={"Thông tin người bệnh"}
                />
                <Stack direction="row" spacing={1} mb={3}>
                  <FTextField name="TenBN" label="Họ và tên:" />
                  <FTextField name="SoBA" label="Số bệnh án:" />
                </Stack>
                <Stack direction={"row"} spacing={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Ngày sinh"
                      value={ngaySinh}
                      onChange={handleNgaySinhChange}
                      //   ampm={false}
                      //   format="HH:mm:ss"
                      // format="DD/MM/YYYY HH:mm:ss"
                    />
                  </LocalizationProvider>

                  <FRadioGroup
                    row={false}
                    name="GioiTinh"
                    options={["Nam", "Nữ"]}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />

                  <FormControl>
                    <InputLabel sx={{ my: -1 }}>Khoa</InputLabel>
                    <Select
                      value={selectedKhoaNguoiBenh}
                      onChange={handleSelectKhoaNguoiBenhChange}
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
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2 }}>
                <CardHeader
                  sx={styleCardHeader}
                  title={"Đối tượng xảy ra sự cố"}
                />

                <FRadioGroup
                  row={false}
                  name="DoiTuongSuCo"
                  options={[
                    "Người bệnh",
                    "Người nhà/Khách đến thăm",
                    "Nhân viên y tế",
                    "Trang thiết bị/cơ sở hạ tầng",
                  ]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 2 }}>
                <CardHeader sx={styleCardHeader} title={"Nơi xảy ra sự cố"} />

                <Grid container spacing={3} my={1}>
                  <Grid item xs={12} md={2.5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Thời gian xảy ra sự cố"
                        value={ngaySuCo}
                        onChange={handleNgaySuCoChange}
                        //   ampm={false}
                        //   format="HH:mm:ss"
                        format="DD/MM/YYYY HH:mm:ss"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={3.3}>
                    <FormControl>
                      <InputLabel sx={{ my: -1 }}>Khoa</InputLabel>
                      <Select
                        value={selectedKhoaSuCo}
                        onChange={handleSelectKhoaSuCoChange}
                      >
                        {khoas &&
                          khoas.length > 0 &&
                          khoas.map((department) => (
                            <MenuItem
                              key={department._id}
                              value={department._id}
                            >
                              {department.TenKhoa}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6.2}>
                    <FTextField multiline name="ViTri" label="Vị trí cụ thể:" />
                  </Grid>
                </Grid>
                <Stack spacing={1}>
                  <FTextField
                    multiline
                    name="MoTa"
                    label="Mô tả ngắn gọn về sự cố:"
                  />
                  <FTextField
                    multiline
                    name="GiaiPhap"
                    label="Đề xuất giải pháp ban đầu:"
                  />
                  <FTextField
                    multiline
                    name="XuLyDaLam"
                    label="Điều trị/xử lý ban đầu đã thực hiện"
                  />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2 }}>
                <CardHeader
                  sx={styleCardHeader}
                  title={"Thông báo cho Bác sĩ điều trị/người có trách nhiệm"}
                />

                <FRadioGroup
                  name="ThongBaoBacSi"
                  options={["Có", "Không", "Không ghi nhận"]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2 }}>
                <CardHeader
                  sx={styleCardHeader}
                  title={"Ghi nhận vào hồ sơ bệnh án/giấy tờ liên quan"}
                />

                <FRadioGroup
                  name="GhiNhanHoSo"
                  options={["Có", "Không", "Không ghi nhận"]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2 }}>
                <CardHeader
                  sx={styleCardHeader}
                  title={"Thông báo cho người nhà/người bảo hộ"}
                />

                <FRadioGroup
                  name="ThongBaoNguoiNha"
                  options={["Có", "Không", "Không ghi nhận"]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2 }}>
                <CardHeader
                  sx={styleCardHeader}
                  title={"Thông báo cho người bệnh"}
                />

                <FRadioGroup
                  name="ThongBaoNguoiBenh"
                  options={["Có", "Không", "Không ghi nhận"]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2 }}>
                <CardHeader
                  sx={styleCardHeader}
                  title={"Phân loại ban đầu về sự cố"}
                />

                <FRadioGroup
                  name="PhanLoaiBanDau"
                  options={["Chưa xảy ra", "Đã xảy ra"]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2 }}>
                <CardHeader
                  sx={styleCardHeader}
                  title={"Đánh giá ban đầu về mức độ ảnh hưởng của sự cố"}
                />

                <FRadioGroup
                  name="DanhGiaBanDau"
                  options={["Nặng", "Trung bình", "Nhẹ"]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 2 }}>
                <CardHeader
                  sx={styleCardHeader}
                  title={"Thông tin người báo cáo"}
                />

                <Stack>
                  <Stack direction={"row"} mb={3}>
                    <FTextField name="TenNguoiBC" label="Họ tên:" />
                    <FTextField name="SDTNguoiBC" label="Số điện thoại:" />
                    <FTextField name="Email" label="Email:" />
                  </Stack>

                  <FRadioGroup
                    name="LoaiNguoiBC"
                    options={[
                      "Điều dưỡng",
                      "Người bệnh",
                      "Người nhà/khách đến thăm",
                      "Bác sỹ",
                      "Khác",
                    ]}
                    control={control} // truyền control vào để FRadioGroup sử dụng
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                  <FTextField name="GhiChuNguoiBC" label="Ghi chú:" />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <CardHeader sx={styleCardHeader} title={"Người chứng kiến"} />
              <Card sx={{ p: 2 }}>
                <FTextField name="NguoiChungKien" label="Người chứng kiến" />
              </Card>
            </Grid>
          </Grid>
          <Box
            sx={{
              m: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting}
            >
              Cập nhật
            </LoadingButton>
          </Box>
        </FormProvider>
      </Stack>
    </Container>
  );
}

export default CapNhatSuCo;
