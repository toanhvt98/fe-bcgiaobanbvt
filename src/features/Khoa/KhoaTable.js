import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
function KhoaTable() {
  const dskhoa = useSelector((state) => state.khoa);
  let _stt = 1;
  const mapingLoaiKhoa = {
    ngoai: "Ngoại",
    tdcn: "Thăm dò chức năng",
    noi: "Nội",
    xnvs: "Xét nghiệm vi sinh",
    kkb: "Khoa khám bệnh",
    xnhs: "Xét nghiệm hóa sinh",
    hhtm: "Huyết học truyền máu",
    gmhs: "Gây mê hồi sức",
    hhtm: "Huyết học truyền máu",
    clc: "Chất lượng cao",
    cdha: "Chuẩn đoán hình ảnh",
    xnhh: "Xét nghiệm huyết học",
  };
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "STT",
      headerName: "STT",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stt",
      headerName: "STT",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "TenKhoa",
      headerName: "Tên khoa",
      minWidth: 450,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "LoaiKhoa",
      headerName: "Loại Khoa",
      minWidth: 150,
    },
    {
      field: "TenLoaiKhoa",
      headerName: "Loại Khoa",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "MaKhoa",
      headerName: "Mã Khoa",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      minWidth: 150,
      renderCell: (params) => {
        return (
          <Stack direction="row" sx={3}>
            <Button variant="contained" color="success">
              <EditIcon />
            </Button>
            <Button variant="contained" color="error">
              <DeleteIcon />
            </Button>
          </Stack>
        );
      },
      headerAlign: "center",
      align: "center",
    },
  ];
  const rows = [];
  dskhoa.listKhoa.map((khoa) => {
    rows.push({
      _id: khoa._id,
      STT: khoa.STT,
      stt: _stt++,
      TenKhoa: khoa.TenKhoa,
      LoaiKhoa: khoa.LoaiKhoa,
      TenLoaiKhoa: mapingLoaiKhoa[khoa.LoaiKhoa],
      MaKhoa: khoa.MaKhoa,
    });
  });
  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <DataGrid
        initialState={{
          columns: {
            columnVisibilityModel: {
              _id: false,
              LoaiKhoa: false,
              STT: false,
            },
            pagination: {
              paginationModel: {
                pageSize: dskhoa.count,
              },
            },
          },
        }}
        sx={{
          m: 1,
        }}
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default KhoaTable;
