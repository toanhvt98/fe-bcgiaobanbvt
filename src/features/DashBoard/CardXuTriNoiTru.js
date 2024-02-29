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

function CardXuTriNoiTru() {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const { chisosObj } = useSelector((state) => state.dashboard);
  const data = [];
  data.push({ Name: "Chờ nhập viện", Value: chisosObj.noitru_chonhapvien});
  data.push({ Name: "Đang điều trị", Value: chisosObj.noitru_dangdieutri });
  data.push({ Name: "Ra viện", Value: chisosObj.noitru_ravien  });
  data.push({ Name: "Chuyển viện", Value: chisosObj.noitru_chuyenvien  });
  data.push({ Name: "Tử vong", Value: chisosObj.noitru_tuvong  });
  
  return (
   
      <Card sx ={{pl:0,pr:2}}>
        <Grid container spacing={0.5} margin={0.5}>
          {data &&
            data.map((item, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
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
                    <Typography sx={{ textAlign: "center",fontSize:'0.8rem' }}>
                      {item.Name}
                    </Typography>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                      {item.Value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Card>
   
  );
}

export default CardXuTriNoiTru;
