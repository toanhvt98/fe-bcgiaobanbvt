import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CardBenhNhanTuVong from "./CardBenhNhanTuVong";
import CardBenhNhanChuyenVien from "./CardBenhNhanChuyenVien";
import CardCT128BHYT from "./CardCT128BHYT";

function CardXuTriNoiTru() {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const { chisosObj, bnnoitruchuyenvien,bnnoitrutuvong,chitiet_ct128_bhyt_noitru } = useSelector(
    (state) => state.dashboard
  );
  const data = [];
  data.push({ Name: "Chờ nhập viện", Value: chisosObj.noitru_chonhapvien });
  data.push({ Name: "Đang điều trị", Value: chisosObj.noitru_dangdieutri });
  data.push({ Name: "Ra viện", Value: chisosObj.noitru_ravien });
  data.push({ Name: "Chuyển viện", Value: chisosObj.noitru_chuyenvien });
  data.push({ Name: "Tử vong", Value: chisosObj.noitru_tuvong });
  data.push({ Name: "CT128 (BH)", Value: chisosObj.ct128_noitru_bhyt });

  return (
    <Card sx={{ pl: 0, pr: 2 }}>
      <Grid container spacing={0.5} margin={0.5}>
        {data &&
          data.map((item, index) => (
            <Grid item xs={12} sm={12} md={4} key={index}>
              {item.Name === "Chuyển viện" ? (
                <CardBenhNhanChuyenVien
                  databenhnhan={bnnoitruchuyenvien}
                  title={item.Name}
                  value={item.Value}
                  titleMore="Bệnh nhân nội trú chuyển viện"
                  type="noi tru"
                />
              ) : item.Name === "Tử vong" ?  (
                <CardBenhNhanTuVong 
                databenhnhan={bnnoitrutuvong}
                  title={item.Name}
                  value={item.Value}
                  titleMore="Bệnh nhân nội trú tử vong"
                  />
              ) : item.Name === "CT128 (BH)"?(
                <CardCT128BHYT
                title={item.Name} value ={item.Value} 
                databenhnhan={chitiet_ct128_bhyt_noitru}
                titleMore="Chỉ định dịch vụ  CT 128 nội trú BHYT "
                type ="clvt"
                />
              ):(
                <Card
                  sx={{
                    fontWeight: "bold",
                    color: "#f2f2f2",
                    backgroundColor: "#1939B7",
                    // p: 1,
                    boxShadow: 10,
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ textAlign: "center", fontSize: "0.8rem" }}
                    >
                      {item.Name}
                    </Typography>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                      {item.Value}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          ))}
      </Grid>
    </Card>
  );
}

export default CardXuTriNoiTru;
