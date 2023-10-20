import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
  Stack,
  Typography,
  Card,
  Box,
  TablePagination,
  Container,
  Button,
} from "@mui/material";
// import SearchInput from '../../components/SearchInput';
import UserTable from '../features/User/UserTable';
import SearchInput from '../components/SearchInput';
import { getUsers } from '../features/User/userSlice';

import UserInsertForm from '../features/User/UserInsertForm';
import DSSuCoTable from '../features/BaoCaoSuCo/DSSuCoTable';
import { getBaoCaoSuCos } from '../features/BaoCaoSuCo/baocaosucoSlice';
import { useParams } from 'react-router-dom';
import DSSuCoDataGrid from '../features/BaoCaoSuCo/DSSuCoDataGrid';



// import UserTable from './UserTable';

function DanhSachSuCoDataGridPage() {
  const params = useParams();
  const sucoId = params.sucoId;

  const [filterName, setFilterName] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const {users} =useSelector((state)=>state.user)
 
  useEffect(()=>{
if(sucoId) {
  
}
 })
const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBaoCaoSuCos({ filterName, page: page + 1, limit: rowsPerPage }));
  }, [filterName, page, rowsPerPage, dispatch]);
const {totalSuCo} =useSelector((state)=>state.baocaosuco)
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEditForm = ()=>{
    setOpenEdit(true);
  }
  const handleCloseEditForm = ()=>{
    setOpenEdit(false);
  }
  const handleSaveEditForm = ()=>{
    console.log("handleSaveEdit form")
  }

  return (
    <Stack>
      <Typography variant="h4" sx={{ mb: 3 }}>
       Danh sách báo cáo sự cố y khoa
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />

            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalSuCo > 1
                ? `${totalSuCo} sự cố tìm thấy`
                : totalSuCo === 1
                ? `${totalSuCo} sự cố tìm thấy`
                : "0 sự cố tìm thấy"}
            </Typography>
           
            <Box sx={{ flexGrow: 1 }} />
           
            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                  {
                    display: { xs: "none", md: "block" },
                  },
              }}
              component="div"
              count={totalSuCo ? totalSuCo : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
           
          <UserInsertForm
            open={openEdit}
            handleClose={handleCloseEditForm}
            handleSave={handleSaveEditForm}
           user ={{_id:0,PhanQuyen:'nomal'}}
          />
          </Stack>
      <DSSuCoDataGrid />
        </Stack>
      </Card>
    </Stack>
  )
}

export default DanhSachSuCoDataGridPage