import {
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import React from "react";
import { FRadioGroup, FTextField, FormProvider } from "../components/form";
import { useForm } from "react-hook-form";

function PhanTichSuCoPage() {
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

  const allOptions = [
    "Không có sự đồng ý của người bệnh/người nhà (đối với những kỹ thuật, thủ thuật quy định phải ký cam kết)",
    "Không thực hiện khi có chỉ định",
    "Thực hiện sai người bệnh",
    "Thực hiện sai thủ thuật/quy trình/ phương pháp điều trị",
    "Nhiễm khuẩn huyết",
    "Viêm phổi",
    "Các loại nhiễm khuẩn khác",
    "Nhiễm khuẩn vết mổ"
  ];

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
            title={"A. Dành cho nhân viên chuyên trách"}
          />
          <Card>
            <CardHeader title={"I. Mô tả chi tiết sự cố"} />
            <FTextField multiline name="HoTen" label="Mô tả chi tiết sự cố" />
          </Card>
          <Card>
            <CardHeader
              title={"I. Phân loại sự cố theo nhóm sự cố (Incident type)"}
            />
            <Card sx={{ display: "flex", flexDirection: "row" }}>
              <CardHeader title="Thực hiện quy trình kỹ thuật " />
              <CardContent>
                <FRadioGroup
                  row={false}
                  name="HinhThuc"
                //   options={[
                //     "Không có sự đồng ý của người bệnh/người nhà (đối với những kỹ thuật, thủ thuật quy định phải ký cam kết)",
                //     "Không thực hiện khi có chỉ định",
                //     "Thực hiện sai người bệnh",
                //     "Thực hiện sai thủ thuật/quy trình/ phương pháp điều trị",
                //   ]}
                options={allOptions.slice(0, 4)}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Card>

        
            <Card sx={{ display: "flex", flexDirection: "row" }}>
              <CardHeader title="Nhiễm khuẩn bệnh viện " />
              <CardContent>
                <FRadioGroup
                  row={false}
                  name="HinhThuc"
                //   options={[
                //     "Nhiễm khuẩn huyết ",
                //     "Viêm phổi ",
                //     "Các loại nhiễm khuẩn khác",
                //     "Nhiễm khuẩn vết mổ",
                //   ]}
                options={allOptions.slice(4)}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </CardContent>
            </Card>
          
        </Card>
      </FormProvider>
    </Container>
  );
}

export default PhanTichSuCoPage;
