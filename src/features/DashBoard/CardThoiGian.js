import { Box, Card, CardContent, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";

function CardThoiGian({ data }) {
  return (
    <Container sx={{mb:1,p:1}}>
        <Typography variant="h6" sx={{ textAlign:'center',}}>{data.Title}</Typography>
        <Typography sx={{ textAlign:'center'}}>{data.GhiChu}</Typography>
      
      <Grid container spacing={3} margin={1}>
        {data.ChiSos && data.ChiSos.map((item, index) => (
          <Grid item xs={12} sm={12} md={4} key={index}>
            <Card >
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
