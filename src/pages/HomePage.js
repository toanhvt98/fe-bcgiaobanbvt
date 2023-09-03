import React from "react";
import { Card, Divider, Grid, Stack } from '@mui/material';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
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
      <Typography variant="h4" sx={{ my: 1 }} textAlign='center'>
             NỘI DUNG GIAO BAN
            </Typography>
            <Divider/>
    <Grid container>
            <Grid item xs={isSmallScreen ? 0 : 2}>
      {isSmallScreen ? null : <SideBar handleScroll={handleScroll} />}
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : 10}>
      {isSmallScreen && <CustomMenu />}
      <Content/>
      </Grid>
    </Grid>
    </Card>
    </Container>
  );
}

export default HomePage;
