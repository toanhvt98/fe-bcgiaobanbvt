import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DisplayKhoaButton({khoaHienThis,type}) {
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
      <Button variant="text" onClick={handleOpen}>
        
       {khoaHienThis.length} khoa {type}
      </Button>
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
                Danh sách các Khoa {type} báo cáo
              </Typography>
              <Grid
                container
                spacing={3}
                direction={isSmallScreen ? "column" : "row"}
              >
                {khoaHienThis.map((khoa, index) => (
                  <Grid item xs={isSmallScreen ? 12 : 6} key={index}>
                    <Typography variant="body2">{khoa.TenKhoa}</Typography>
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

export default DisplayKhoaButton;
