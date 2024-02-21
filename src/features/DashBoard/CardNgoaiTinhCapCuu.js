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

function CardNgoaiTinhCapCuu() {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const { chisosObj } = useSelector((state) => state.dashboard);
  return (
    <Card>
     
      <Card
        sx={{
          fontWeight: "bold",
          color: "#f2f2f2",
          backgroundColor: "#1939B7",
          // p: 1,
          boxShadow: 10,
          borderRadius: 3,
          m:0.5
        }}
      >
        <CardContent>
          <Typography sx={{ textAlign: "center",fontSize:"0.8rem" }}>Cấp cứu</Typography>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {chisosObj.ngoaitru_capcuu}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          fontWeight: "bold",
          color: "#f2f2f2",
          backgroundColor: "#1939B7",
          // p: 1,
          boxShadow: 10,
          borderRadius: 3,
          m:0.5,
          
        }}
      >
        <CardContent>
          <Typography sx={{ textAlign: "center",fontSize:"0.8rem" }}>Ngoại tỉnh</Typography>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {chisosObj.ngoaitru_ngoaitinh}
          </Typography>
        </CardContent>
      </Card>

    </Card>
  );
}

export default CardNgoaiTinhCapCuu;
