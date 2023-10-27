import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateForm from "./UpdateForm";
import DeleteForm from "./DeleteForm";

function KhoaTable() {
  const dskhoa = useSelector((state) => state.khoa);
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
    kcc: "Khoa cấp cứu",
  };
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setIsOpenUpdate(true);
  const handleCloseUpdate = () => setIsOpenUpdate(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const handleOpenRemove = () => setIsOpenRemove(true);
  const handleCloseRemove = () => setIsOpenRemove(false);

  const [data, setData] = useState({});

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
      field: "TenKhoa",
      headerName: "Tên khoa",
      minWidth: 400,
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
            <Button
              variant="contained"
              color="success"
              onClick={() => handleOpenUpdate()}
            >
              <EditIcon />
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleOpenRemove();
                setData({
                  _id: params.row._id,
                  STT: params.row.STT,
                  TenKhoa: params.row.TenKhoa,
                });
              }}
            >
              <DeleteIcon />
            </Button>
          </Stack>
        );
      },
      headerAlign: "center",
      align: "center",
      headerName: "Thao tác",
    },
  ];
  const rows = [];
  dskhoa.listKhoa.map((khoa) => {
    rows.push({
      _id: khoa._id,
      STT: khoa.STT,

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
          sorting: { sortModel: [{ field: "STT", sort: "asc" }] },
          columns: {
            columnVisibilityModel: {
              _id: false,
              LoaiKhoa: false,
            },
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          },
        }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[50, 100]}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
      />
      <UpdateForm isOpen={isOpenUpdate} isClose={() => handleCloseUpdate()} />
      <DeleteForm
        isOpen={isOpenRemove}
        isClose={() => handleCloseRemove()}
        khoa={data}
      />
    </Box>
  );
}

export default KhoaTable;
