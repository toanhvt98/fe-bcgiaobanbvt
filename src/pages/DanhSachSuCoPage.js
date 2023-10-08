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
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

function DanhSachSuCoPage() {
  const {khoas} = useSelector((state)=>state.baocaongay)
  const {baocaosucos} =useSelector((state)=>state.baocaosuco)

    const [userEdit,setUserEdit] =useState({_id:0})
const handleEditUser =(userId)=>{
   
    setOpenEdit(true)

}

const handleClickDeleteUser =(userId)=>{
  
  setOpenDelete(true)
}
const handleCloseDeleteForm =()=>{
  setOpenDelete(false)
}
const dispatch = useDispatch()
const handleDeleteUser =()=>{
//  dispatch(deleteUser(userEdit._id))
setOpenDelete(false)
}

const handleResetPass =(userId)=>{
    // const bn= users.find(user=>user._id === userId)
    // console.log("user suwar",userEdit)
    // setUserEdit(bn)
    setOpenResetPass(true)

}


const [openDelete, setOpenDelete] = useState(false);
const [openEdit, setOpenEdit] = useState(false);
const [openResetPass, setOpenResetPass] = useState(false);

  const handleCloseEditForm = ()=>{
    setOpenEdit(false);
  }
  const handleSaveEditForm = ()=>{
    console.log("handleSaveEdit form")
  } 

  const handleCloseResetPassForm = ()=>{
    setOpenResetPass(false);
  }
  const handleSaveResetPassForm = ()=>{
    console.log("handle reset pass form")
  } 
  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer >
      {/* <TableContainer sx={{ minWidth: 800 }}> */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                Mã sự cố
              </TableCell>
              <TableCell
                sx={{ display: { xs: "none", sm: "table-cell" }, width: "20%" }}
              >
               Ngày sự cố
              </TableCell>

              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Khoa
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Mô tả sự cố
              </TableCell>
             
              <TableCell  sx={{ display: { xs: "none", md: "table-cell" } }}>Action</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {baocaosucos.map((user) => {
            //   const { status, action } = getActionsAndStatus(user);
             
              return (
                <TableRow key={user._id} hover>
                
                  <TableCell
                    align="left"
                    // sx={{ display: { xs: "none", md: "table-cell" } }}
                    // sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user.UserName}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user.HoTen}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                  >
                     {user.TenKhoa}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                  >
                     {user.PhanQuyen}
                  </TableCell>
                  <TableCell
                    align="left"
                    // sx={{ display: { xs: "none", sm: "table-cell" } }}
                  >
                     <Button
      sx={{ fontSize: "0.6rem" }}
      size="small"
      variant="contained"
      onClick={()=> (handleEditUser(user._id))}
    >
      Sửa
    </Button>
    <Button
      sx={{ fontSize: "0.6rem" }}
      size="small"
      variant="contained"
      color="error"
     onClick={()=> (handleClickDeleteUser(user._id))}
    >
      Xóa
    </Button>

    <Button
      sx={{ fontSize: "0.6rem" }}
      size="small"
      variant="contained"
    //   color="error"
     onClick={()=> (handleResetPass(user._id))}
    >
      Reset Pass
    </Button>

                  </TableCell>
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
     
           <Dialog
          open={openDelete}
          onClose={handleCloseDeleteForm}
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
            <Button variant ="contained" onClick={handleCloseDeleteForm} color="primary">
              Hủy
            </Button>
            <Button variant ="contained" onClick={handleDeleteUser} color="error" autoFocus>
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
    </Box>
  );
}

export default DanhSachSuCoPage;
