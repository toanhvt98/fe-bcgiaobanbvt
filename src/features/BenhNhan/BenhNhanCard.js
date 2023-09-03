import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  Typography,
  Link,
  Divider,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { removeBenhNhanInList } from "../BaoCaoNgay/baocaongaySlice";
import BenhNhanEditForm from "./BenhNhanEditForm";

// import useAuth from "../../hooks/useAuth";
// import ActionButton from "./ActionButton";

function BenhNhanCard({ benhnhan }) {
  const {
    TenBenhNhan,
    Tuoi,
    DiaChi,
    LoaiBN,
    VaoVien,
    GioiTinh,
    LyDoVV,
    DienBien,
    ChanDoan,
    XuTri,
    HienTai,
    Images,
    Stt,
  } = benhnhan;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenEdit(true);
    console.log("benhnhan",benhnhan);
    setAnchorEl(null);
  };
  const handleRemove = () => {
    dispatch(removeBenhNhanInList(benhnhan));
    console.log("BN del", benhnhan);
    setAnchorEl(null);
    setOpen(false);
  };

  //dialogDelete
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  //dialog Edit Post
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEditForm = () => {
    setOpenEdit(true);
  };

  const handleCloseEditForm = () => {
    setOpenEdit(false);
  };

  return (
    <Card
      sx={{
        alignItems: "center",
        p: 3,
        boxShadow: 3,
        backgroundColor: "#F9FAFB",
      }}
    >
      <Stack direction="row">
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {Stt}. {TenBenhNhan} - {GioiTinh}- {Tuoi} tuổi - {DiaChi}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleClick}>
          <MoreVertIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit} sx={{ fontSize: 12 }}>
            Sửa
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClickOpen} sx={{ fontSize: 12 }}>
            {" "}
            Xóa
          </MenuItem>
        </Menu>
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Cảnh báo!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có chắc muốn xóa bệnh nhân này?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Hủy
            </Button>
            <Button onClick={handleRemove} color="primary" autoFocus>
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
        <BenhNhanEditForm
        open={openEdit}
        handleClose={handleCloseEditForm}
        // handleSave={handleSaveEditPostForm}
        // tenLoaiBN={tenLoaiBN}
        // loaiBN = {loaiBN}
        benhnhan={benhnhan}
        />
      </Stack>

      <Divider />
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Vaò viện: {VaoVien}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Lý do vào viện: {LyDoVV}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Diễn biến: {DienBien}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Chẩn đoán: {ChanDoan}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Xử trí: {XuTri}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Hiện tại: {HienTai}
      </Typography>
    </Card>
  );
}

export default BenhNhanCard;
