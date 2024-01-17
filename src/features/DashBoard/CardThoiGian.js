import { Box, Card, CardContent, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";

function CardThoiGian({ data }) {
  return (
    <Container sx={{mb:3,p:1}}>
      {data.Title}
      <Grid container spacing={3} margin={2}>
        {data.ChiSos && data.ChiSos.map((item, index) => (
          <Grid item xs={12} sm={12} md={4} key={index}>
            <Card >
              <CardContent>
                <Typography sx={{ mb: 3,textAlign:'center'}}>{item.Name}</Typography>
                <Typography variant="h5" sx={{ mb: 3,textAlign:'center'}}>{item.Value} phút</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CardThoiGian;
