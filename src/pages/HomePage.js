import React from "react";
import { Card, Divider, Grid } from '@mui/material';

import { Container, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SideBar from "../features/SideBar";
import Content from "../features/Content";
import CustomMenu from "../features/CustomMenu";
import Sumary from "../features/Sumary";

function HomePage() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  
  return (
    <Container>
      <Sumary/>
      <Card>
      <Typography variant="h4" sx={{ my: 1,fontSize:isSmallScreen?'1.5rem':'2rem'  }} textAlign='center'>
             NỘI DUNG GIAO BAN
            </Typography>
            <Divider/>
    <Grid container>
            <Grid item xs={isSmallScreen ? 0 : 2}>
      {isSmallScreen ? null : <SideBar handleScroll={handleScroll} />}
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : 10}>
      {isSmallScreen && <CustomMenu handleScroll={handleScroll}/>}
      <Content/>
      </Grid>
    </Grid>
    </Card>
    </Container>
  );
}

export default HomePage;
