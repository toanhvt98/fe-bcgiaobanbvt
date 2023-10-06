import {
    Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FRadioGroup, FTextField, FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

function PhanTichSuCoPage() {
  const titleTypographyProps = { variant: "h6", style: { fontSize: "20px" } };
  const titleTypographyPropsTrenNB = { variant: "body2", style: { fontSize: "18px" }};
  const [selectedValueNhomSuCo, setSelectedValueNhomSuCo] = useState("");
  const [selectedValueNguyenNhan, setSelectedValueNguyenNhan] = useState("");
  const [selectedValueTonThuongNguoiBenh, setSelectedValueTonThuongNguoiBenh] = useState("");
  const [selectedValueTonThuongToChuc, setSelectedValueTonThuongToChuc] = useState("");
  const defaultValues = {
    BsTruc: "",
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
const divid = ( <Divider
    orientation="vertical"
    flexItem
    sx={{ display: { xs: "none", sm: "block" } }}
  />)
  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit}>
        <Typography
          variant="h4"
          sx={{ my: 1, fontSize: "2rem" }}
          textAlign="center"
        >
          BIÊN BẢN XÁC MINH VÀ PHÂN TÍCH SỰ CỐ
        </Typography>
        <Typography
          variant="h4"
          sx={{ my: 1, fontSize: "1.5rem" }}
          textAlign="center"
        >
          Số báo cáo/Mã số sự cố:
        </Typography>

        <Card>
          <CardHeader
            //   sx={styleCardHeader}
            title={"A. DÀNH CHO NHÂN VIÊN CHUYÊN TRÁCH"}
          />
          <Card>
            <CardHeader title={"I. MÔ TẢ CHI TIẾT SỰ CỐ"} />
            <FTextField multiline name="HoTen" label="Mô tả chi tiết sự cố" />
          </Card>
          <Card>
            <CardHeader
              title={`II. PHÂN LOẠI SỰ CỐ THEO NHÓM SỰ CỐ (INCIDENT TYPE)`}
            />
            {`${selectedValueNhomSuCo}`}
            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="1. Thực hiện quy trình kỹ thuật, thủ thuật chuyên môn"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  row={false}
                  name="HinhThuc1"
                  value={selectedValueNhomSuCo}
  onChange={(e) => setSelectedValueNhomSuCo(e.target.value)}
                  options={[
                    "Không có sự đồng ý của người bệnh/người nhà (đối với những kỹ thuật, thủ thuật quy định phải ký cam kết)",
                    "Không thực hiện khi có chỉ định",
                    "Thực hiện sai người bệnh",
                    "Thực hiện sai thủ thuật/quy trình/ phương pháp điều trị",
                    "Thực hiện sai vị trí phẫu thuật/thủ thuật",
                    "Bỏ sót dụng cụ, vật tư tiêu hao trong quá trình phẫu thuật",
                    "Tử vong trong thai kỳ",
                    "Tử vong khi sinh",
                    "Tử vong sơ sinh",
                  ]}
                  //   options={allOptions.slice(0, 4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>
            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="2. Nhiễm khuẩn bệnh viện "
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
              {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="HinhThuc1"
                  value={selectedValueNhomSuCo}
  onChange={(e) => setSelectedValueNhomSuCo(e.target.value)}
                  options={[
                    "Nhiễm khuẩn huyết ",
                    "Viêm phổi ",
                    "Các loại nhiễm khuẩn khác",
                    "Nhiễm khuẩn vết mổ",
                    "Nhiễm khuẩn tiết niệu",
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="3. Thuốc và dịch truyền"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="HinhThuc1"
                  value={selectedValueNhomSuCo}
  onChange={(e) => setSelectedValueNhomSuCo(e.target.value)}
                  options={[
                    "Cấp phát sai thuốc, dịch truyền",
                    "Thiếu thuốc",
                    "Sai liều, sai hàm lượng",
                    "Sai thời gian",
                    "Sai y lệnh",
                    "Bỏ sót thuốc/liều thuốc",
                    "Sai thuốc",
                    "Sai người bệnh",
                    "Sai đường dùng",
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="4. Máu và các chế phẩm máu"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="HinhThuc1"
                  value={selectedValueNhomSuCo}
  onChange={(e) => setSelectedValueNhomSuCo(e.target.value)}
                  options={[
                    "Phản ứng phụ, tai biến khi truyền máu",
                    "Truyền nhầm máu, chế phẩm máu",
                    "Truyền sai liều, sai thời điểm",
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>
            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="5. Thiết bị y tế "
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="HinhThuc1"
                  value={selectedValueNhomSuCo}
  onChange={(e) => setSelectedValueNhomSuCo(e.target.value)}
                  options={[
                    "Thiếu thông tin hướng dẫn sử dụng",
                    "Lỗi thiết bị",
                    "Thiết bị thiếu hoặc không phù hợp",
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="6. Hành vi"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="HinhThuc1"
                  value={selectedValueNhomSuCo}
  onChange={(e) => setSelectedValueNhomSuCo(e.target.value)}
                  options={[
                    "Khuynh hướng tự gây hại tự tử",
                    "Có hành động tự tử",
                    "Quấy rối tình dục bởi nhân viên",
                    "Trốn viện",
                    "Quấy rối tình dục bởi người bệnh/ khách đến thăm",
                    "Xâm hại cơ thể bởi người bệnh/khách đến thăm",
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>
            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="7. Tai nạn đối với người bệnh"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="HinhThuc1"
                  value={selectedValueNhomSuCo}
  onChange={(e) => setSelectedValueNhomSuCo(e.target.value)}
                  options={["Té ngã"]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="8. Hạ tầng cơ sở"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="HinhThuc1"
                  value={selectedValueNhomSuCo}
  onChange={(e) => setSelectedValueNhomSuCo(e.target.value)}
                  options={["Bị hư hỏng, bị lỗi ", "Thiếu hoặc không phù hợp"]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>
            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="9. Quản lý nguồn lực, tổ chức"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="HinhThuc1"
                  value={selectedValueNhomSuCo}
  onChange={(e) => setSelectedValueNhomSuCo(e.target.value)}
                  options={[
                    "Tính phù hợp, đầy đủ của dịch vụ khám bệnh, chữa bệnh",
                    "Tính phù hợp, đầy đủ của nguồn lực",
                    "Tính phù hợp, đầy đủ của chính sách, quy định, quy trình, hướng dẫn chuyên môn",
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>
            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="10. Hồ sơ, tài liệu, thủ tục hành chính"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="HinhThuc1"
                  value={selectedValueNhomSuCo}
  onChange={(e) => setSelectedValueNhomSuCo(e.target.value)}
                  options={[
                    "Tài liệu mất hoặc thiếu ",
                    "Tài liệu không rõ ràng, không hoàn chỉnh ",
                    "Thời gian chờ đợi kéo dài ",
                    "Cung cấp hồ sơ tài liệu chậm",
                    "Nhầm hồ sơ tài liệu",
                    "Thủ tục hành chính phức tạp",
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="11. Khác"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="HinhThuc1"
                  value={selectedValueNhomSuCo}
  onChange={(e) => setSelectedValueNhomSuCo(e.target.value)}
                  options={["Các sự cố không đề cập trong các mục từ 1 đến 10"]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Card>

          <Card>
            <CardHeader title={"III. Điều trị/ y lệnh đã được thực hiện"} />
            <FTextField
              multiline
              name="HoTen"
              label="Điều trị/ y lệnh đã được thực hiện"
            />
          </Card>

          <Card>
            <CardHeader
              title={"IV. PHÂN LOẠI SỰ CỐ THEO NHÓM NGUYÊN NHÂN GÂY RA SỰ CỐ"}
            />
            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="1. Nhân viên"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  row={false}
                  name="NguyenNhan"
                  value={selectedValueNguyenNhan}
                  onChange={(e) => setSelectedValueNguyenNhan(e.target.value)}
                  options={[
                    "Nhận thức (kiến thức, hiểu biết, quan niệm)",
                    "Thực hành (kỹ năng thực hành không đúng quy định, hướng dẫn chuẩn hoặc thực hành theo quy định, hướng dẫn sai)",
                    "Thái độ, hành vi, cảm xúc",
                    "Giao tiếp",
                    "Tâm sinh lý, thể chất, bệnh lý",
                    "Các yếu tố xã hội",
                  ]}
                  //   options={allOptions.slice(0, 4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>
            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="2. Người bệnh"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
             {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="NguyenNhan"
                  value={selectedValueNguyenNhan}
                  onChange={(e) => setSelectedValueNguyenNhan(e.target.value)}
                  options={[
                    "Nhận thức (kiến thức, hiểu biết, quan niệm) ",
                    "Thực hành (kỹ năng thực hành không đúng quy định, hướng dẫn chuẩn hoặc thực hành theo quy định, hướng dẫn sai) ",
                    "Thái độ, hành vi, cảm xúc ",
                    "Giao tiếp ",
                    "Tâm sinh lý, thể chất, bệnh lý ",
                    "Các yếu tố xã hội ",
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="3. Môi trường làm việc"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="NguyenNhan"
                  value={selectedValueNguyenNhan}
                  onChange={(e) => setSelectedValueNguyenNhan(e.target.value)}
                  options={[
                    "Cơ sở vật chất, hạ tầng, trang thiết bị",
                    "Khoảng cách đến nơi làm việc quá xa",
                    "Đánh giá về độ an toàn, các nguy cơ rủi ro của môi trường làm việc",
                    "Nội quy, quy định và đặc tính kỹ thuật",
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="4. Tổ chức/ dịch vụ"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="NguyenNhan"
                  value={selectedValueNguyenNhan}
                  onChange={(e) => setSelectedValueNguyenNhan(e.target.value)}
                  options={[
                    "Các chính sách, quy trình, hướng dẫn chuyên môn",
                    "Tuân thủ quy trình thực hành chuẩn",
                    "Văn hóa tổ chức ",
                    "Làm việc nhóm",
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>
            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="5. Yếu tố bên ngoài"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
               <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="NguyenNhan"
                  value={selectedValueNguyenNhan}
                  onChange={(e) => setSelectedValueNguyenNhan(e.target.value)}
                  options={[
                    "Môi trường tự nhiên",
                    "Sản phẩm, công nghệ và cơ sở hạ tầng",
                    "Quy trình, hệ thống dịch vụ",
                  ]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card sx={{ display: "flex", flexDirection: "row",my:0.5}}>
              <CardHeader
                title="6. Khác"
                sx={{flex:1, maxWidth: "25%" }}
                titleTypographyProps={titleTypographyProps}
              />
               {divid}
              <CardContent sx={{ flex: 3 }}>
                <FRadioGroup
                  name="NguyenNhan"
                  value={selectedValueNguyenNhan}
                  onChange={(e) => setSelectedValueNguyenNhan(e.target.value)}
                  options={["Các yếu tố không đề cập trong các mục từ 1 đến 5"]}
                  // options={allOptions.slice(4)}

                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Card>

          <Card>
            <CardHeader title={"V. HÀNH ĐỘNG KHẮC PHỤC SỰ CỐ"} />
            <FTextField
              multiline
              name="HoTen"
              label="Mô tả hành động xử lý sự cố"
            />
          </Card>

          <Card>
            <CardHeader title={"VI. ĐỀ XUẤT KHUYẾN CÁO PHÒNG NGỪA SỰ CỐ"} />
            <FTextField
              multiline
              name="HoTen"
              label="Ghi đề xuất khuyến cáo phòng ngừa"
            />
          </Card>
        </Card>

        <Card>
          <CardHeader
            //   sx={styleCardHeader}
            title={"B. DÀNH CHO CẤP QUẢN LÝ"}
          />

          <Card>
            <CardHeader title={"I. ĐÁNH GIÁ CỦA TRƯỞNG NHÓM CHUYÊN GIA"} />
            <FTextField
              multiline
              name="TruongNhom"
              label="Mô tả kết quả phát hiện được (không lặp lại các mô tả sự cố):"
            />
          </Card>

          <Card sx={{ p: 2 }}>
            <Grid container spacing={3} my={1}>
              <Grid item xs={12} md={6}>
                Đã thảo luận đưa khuyến cáo/hướng xử lý với người báo cáo :
              </Grid>
              <Grid item xs={12} md={6}>
                <FRadioGroup
                  name="NguyenNhan"
                  options={["Có", "Không", "Không ghi nhận"]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 2 }}>
            <Grid container spacing={3} my={1}>
              <Grid item xs={12} md={6}>
                Phù hợp với các khuyến cáo chính thức được ban hành
              </Grid>
              <Grid item xs={12} md={6}>
                <FRadioGroup
                  name="NguyenNhan"
                  options={["Có", "Không", "Không ghi nhận"]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
              <FTextField name="KhuyenCao" label="Ghi cụ thể khuyến cáo" />
              </Grid>
             
            </Grid>
          </Card>

          <Card>
            <CardHeader title={"I. ĐÁNH GIÁ MỨC ĐỘ TỔN THƯƠNG"} />

            <Grid container>
              <Grid item xs={12} md={6}>
                <Card sx={{p:2}}>
                <Typography fontWeight={'bold'}>Trên người bệnh</Typography>
                <Divider/>
                  <Card sx={{ display: "flex", flexDirection: "row", my: 0.1 }}>
                    <CardHeader
                      title="1. Chưa xảy ra"
                      sx={{ flex: 3, maxWidth: "85%" }}
                      titleTypographyProps={titleTypographyPropsTrenNB}
                    />
                    {divid}
                    <CardContent sx={{ flex: 1 }}>
                      <FRadioGroup
                        name="TonThuongNguoiBenh"
                        value ={selectedValueTonThuongNguoiBenh}
                        onChange={(e)=>setSelectedValueTonThuongNguoiBenh(e.target.value)}
                        options={["A"]}
                        // options={allOptions.slice(4)}

                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 15,
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                  <Card sx={{ display: "flex", flexDirection: "row", my: 0.1 }}>
                    <CardHeader
                      title="2. Tổn thương nhẹ (NC1)"
                      sx={{ flex: 3, maxWidth: "85%" }}
                      titleTypographyProps={titleTypographyPropsTrenNB}
                    />
                    {divid}
                    <CardContent sx={{ flex: 1 }}>
                      <FRadioGroup
                        name="TonThuongNguoiBenh"
                        value ={selectedValueTonThuongNguoiBenh}
                        onChange={(e)=>setSelectedValueTonThuongNguoiBenh(e.target.value)}
                        row ={false}
                        options={["B","C","D"]}
                        // options={allOptions.slice(4)}

                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 15,
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                  <Card sx={{ display: "flex", flexDirection: "row", my: 0.1 }}>
                    <CardHeader
                      title="3. Tổn thương trung bình (NC2)"
                      sx={{ flex: 3, maxWidth: "85%" }}
                      titleTypographyProps={titleTypographyPropsTrenNB}
                    />
                    {divid}
                    <CardContent sx={{ flex: 1 }}>
                      <FRadioGroup
                        name="TonThuongNguoiBenh"
                        value ={selectedValueTonThuongNguoiBenh}
                        onChange={(e)=>setSelectedValueTonThuongNguoiBenh(e.target.value)}
                        row ={false}
                        options={["E","F"]}
                        // options={allOptions.slice(4)}

                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 15,
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                  <Card sx={{ display: "flex", flexDirection: "row", my: 0.1 }}>
                    <CardHeader 
                      title="4. Tổn thương nặng (NC3)"
                      sx={{ flex: 3, maxWidth: "85%" }}
                      titleTypographyProps={titleTypographyPropsTrenNB}
                    />
                    {divid}
                    <CardContent sx={{ flex: 1 }}>
                      <FRadioGroup 
                        name="TonThuongNguoiBenh"
                        value ={selectedValueTonThuongNguoiBenh}
                        onChange={(e)=>setSelectedValueTonThuongNguoiBenh(e.target.value)}
                        row ={false}
                        options={["G","H","I"]}
                        // options={allOptions.slice(4)}

                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 15,
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} p={1}>
                <Card sx={{p:2}}> 
                <Typography fontWeight={'bold'}>Trên tổ chức</Typography>
                <Divider/>
                <FRadioGroup
                        name="TonThuongToChuc"
                        value ={selectedValueTonThuongToChuc}
                        onChange={(e)=>setSelectedValueTonThuongToChuc(e.target.value)}
                        row ={false}
                        options={[
                            "Tổn hại tài sản",
                            "Tăng nguồn lực phục vụ cho người bệnh",
                            "Quan tâm của truyền thông",
                            "Khiếu nại của người bệnh",
                            "Tổn hại danh tiếng",
                            "Can thiệp của pháp luật",
                            "Khác"
                        ]}
                        // options={allOptions.slice(4)}

                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 15,
                          },
                        }}
                      />
                      </Card>
              </Grid>
            </Grid>
          </Card>

        </Card>

        <Box
                  sx={{
                    m:2,
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
    </Container>
  );
}

export default PhanTichSuCoPage;
