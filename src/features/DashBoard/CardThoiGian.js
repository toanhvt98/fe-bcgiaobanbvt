import { useTheme } from "@emotion/react";
import { Box, Card, CardContent, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function CardThoiGian({ data }) {
    const theme = useTheme();
    const { darkMode } = useSelector((state) => state.mytheme);
  return (
    <Container sx={{mb:1,p:1}}>
        <Typography variant="h6" sx={{ textAlign:'center',color:darkMode?"#FFF":"#1939B7",}}>{data.Title}</Typography>
        <Typography sx={{ textAlign:'center',color:darkMode?"#FFF":"#1939B7"}}>{data.GhiChu}</Typography>
      
      <Grid container spacing={3} margin={1}>
        {data.ChiSos && data.ChiSos.map((item, index) => (
          <Grid item xs={12} sm={12} md={4} key={index}>
            <Card  sx={{
            fontWeight: "bold",
            color: "#f2f2f2",
            backgroundColor: "#1939B7",
            // p: 1,
            boxShadow: 10,
            borderRadius: 3,
          }}>
              <CardContent>
                <Typography sx={{textAlign:'center'}}>{item.Name}</Typography>
                <Typography variant="h4" sx={{ textAlign:'center'}}>{item.Value} phút</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CardThoiGian;
