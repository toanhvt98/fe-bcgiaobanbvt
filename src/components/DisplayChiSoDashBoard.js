import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
function DisplayChiSoDashBoard({ ChiSoDashBoard }) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {/* <Button variant="contained" color="secondary" onClick={handleOpen}>
          
         {khoaHienThis.length} khoa {type}
        </Button> */}

      <IconButton onClick={handleOpen}>
        <MenuIcon />
      </IconButton>
      <ThemeProvider theme={darkTheme}>
        <div>
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80vw",
                maxHeight: "80vh", // Giới hạn chiều cao tối đa
                overflowY: "auto", // Hiển thị thanh cuộn
                bgcolor: theme.palette.background.paper,
                boxShadow: 24,
                borderRadius: 2,
                p: 3,
              }}
            >
              <Typography variant="h6" gutterBottom align="center">
                Danh sách các chỉ số 
              </Typography>
              <Grid
                container
                spacing={3}
                direction={isSmallScreen ? "column" : "row"}
              >
                {ChiSoDashBoard && ChiSoDashBoard.map((ChiSo, index) => (
                  <Grid item xs={isSmallScreen ? 12 : 6} key={index}>
                    <Typography variant="body2"> {ChiSo.Code} : {ChiSo.Value} </Typography>
                    <Divider />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Modal>
        </div>
      </ThemeProvider>
    </Box>
  );
}

export default DisplayChiSoDashBoard;
