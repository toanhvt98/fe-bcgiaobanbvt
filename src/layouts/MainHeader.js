import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PersonIcon from '@mui/icons-material/Person';
import useAuth from "../hooks/useAuth";
import Logo from "../components/form/Logo";
import { Avatar, Divider, useMediaQuery } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import ResetPassForm from "../features/User/ResetPassForm";
import UserResetPassForm from "../features/User/UserResetPassForm";
function MainHeader() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, logout } = useAuth();
  // const { user, logout } ={};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [openResetPass, setOpenResetPass] = useState(false);
  const handleCloseResetPassForm = ()=>{
    setOpenResetPass(false);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("user", user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleResetPass =(userId)=>{
  
    setOpenResetPass(true)
console.log(userId)
}
  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.UserName}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {user?.KhoaID.TenKhoa}
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
       Home
      </MenuItem>
{user.PhanQuyen==='admin'&&(

      <MenuItem
        onClick={handleMenuClose}
        to="/admin"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
       Admin
      </MenuItem>
) }

      <MenuItem
        onClick={handleMenuClose}
        to="/tongtruc"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
       Lịch tổng trực
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleResetPass}
               component={RouterLink}
        sx={{ mx: 1 }}
      >
        Đổi mật khẩu
      </MenuItem>

      <MenuItem
        onClick={handleLogout}
               component={RouterLink}
        sx={{ mx: 1 }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontSize:isSmallScreen?'1rem':'1.3rem' }}>
            Bệnh viện đa khoa tỉnh Phú Thọ
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            {/* <Avatar
              src={user.UserName}
              alt={user.UserName}
              onClick={handleProfileMenuOpen}
            /> */}
             <IconButton onClick={handleProfileMenuOpen}>
              <PersonIcon />
            </IconButton>
          </Box>
          {renderMenu}
        </Toolbar>
      </AppBar>

      <UserResetPassForm
            open={openResetPass}
            handleClose={handleCloseResetPassForm}
            
           user ={user}
          />
    </Box>
  );
}
export default MainHeader;
