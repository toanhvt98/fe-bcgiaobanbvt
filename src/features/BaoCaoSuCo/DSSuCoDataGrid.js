import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
} from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { fDate } from "../../utils/formatTime";
import { useNavigate } from "react-router-dom";
import { UpdateTrangThaiSuCo, deleteOneSuCo } from "./baocaosucoSlice";
import { values } from "lodash";

function DSSuCoDataGrid() {
  const { khoas } = useSelector((state) => state.baocaongay);
  const { baocaosucos } = useSelector((state) => state.baocaosuco);
  const [selectedSuCoId, setSelectedSuCoId] = useState("");
  const [userEdit, setUserEdit] = useState({ _id: 0 });
  const handleEditUser = (userId) => {
    setOpenEdit(true);
  };

  const handleDeleteSuCo = (sucoId) => {
    setSelectedSuCoId(sucoId);
    setOpenDelete(true);
  };
  const handleCloseDeleteForm = () => {
    setOpenDelete(false);
  };
  const dispatch = useDispatch();
  const handleDeleteSuCoOnDB = () => {
    dispatch(deleteOneSuCo(selectedSuCoId));
    setOpenDelete(false);
  };

  const handleResetPass = (userId) => {
    // const bn= users.find(user=>user._id === userId)
    // console.log("user suwar",userEdit)
    // setUserEdit(bn)
    setOpenResetPass(true);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openResetPass, setOpenResetPass] = useState(false);

  const handleCloseEditForm = () => {
    setOpenEdit(false);
  };
  const handleSaveEditForm = () => {
    console.log("handleSaveEdit form");
  };

  const handleChangeTrangThai = (bcsuco) => {
    const sucoId = bcsuco._id;
    const trangthai = !(bcsuco.TrangThai || false);
    dispatch(UpdateTrangThaiSuCo(sucoId, trangthai));
  };
  const handleSaveResetPassForm = () => {
    console.log("handle reset pass form");
  };
  const handleTiepNhanSuCo = () => {};
  const navigate = useNavigate();

  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns: GridColDef[] = [

    { field: 'MaBC', headerName: 'Mã', resizable:false },
    { field: 'HinhThuc', headerName: 'Hình thức', width: 100 },
    { field: 'NgaySuCo', headerName: 'Ngày sự cố', width: 150, type:'date', valueGetter:({value})=>value&& new Date(value) },
    { field: 'TenBN', headerName: 'Tên NB', width: 150 },
    { field: 'KhoaSuCo', headerName: 'Khoa xảy ra sự cố',  type: 'singleSelect',
     width: 150, valueOptions:khoas ,getOptionValue:(value:any)=>value._id,getOptionLabel:(value:any)=>value.TenKhoa },
    { field: 'MoTa', headerName: 'Mô tả', width: 150 },
    { field: 'GiaiPhap', headerName: 'Giải pháp', width: 150 ,},
    
  ];
  
  return (
    <Box sx={{ overflowX: "auto" }}>
      <DataGrid rows={baocaosucos} columns={columns} getRowId={(row)=>row._id} getRowHeight={()=>'auto'} />
      <Dialog
        open={openDelete}
        onClose={handleCloseDeleteForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cảnh báo!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa sự cố này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCloseDeleteForm}
            color="primary"
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteSuCoOnDB}
            color="error"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DSSuCoDataGrid;
