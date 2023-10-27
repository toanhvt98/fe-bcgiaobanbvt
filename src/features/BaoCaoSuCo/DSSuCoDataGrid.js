import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import ActionSuco from "./ActionSuco";

function DSSuCoDataGrid() {
  const { baocaosucos } = useSelector((state) => state.baocaosuco);
  function renderHeaderWithCustomTitle(title) {
    return (params) => (
      <Typography
        variant="h4"
        sx={{
          my: 1,
          fontSize: "1rem",
          color: "#1939B7",
          fontWeight: "bold",
          flexWrap: "wrap",
        }}
        textAlign="center"
      >
        {title}
      </Typography>
    );
  }
  function renderHeaderWithCustomTitle1(title1,title2) {
    return (params) => (
      <Stack>
<Typography
        variant="h4"
        sx={{
          my: 1,
          fontSize: "1rem",
          color: "#1939B7",
          fontWeight: "bold",
          flexWrap: "wrap",
        }}
        textAlign="center"
      >
        {title1}
      </Typography>
<Typography
        variant="h4"
        sx={{
          my: 1,
          fontSize: "1rem",
          color: "#1939B7",
          fontWeight: "bold",
          flexWrap: "wrap",
        }}
        textAlign="center"
      >
        {title2}
      </Typography>
<Typography
        variant="h4"
        sx={{
          my: 1,
          fontSize: "1rem",
          color: "#1939B7",
          fontWeight: "bold",
          flexWrap: "wrap",
        }}
        textAlign="center"
      >
        {title2}
      </Typography>
      </Stack>
      
    );
  }
  const columns = [
    {
      field: "action",
      renderHeader: renderHeaderWithCustomTitle("Actions"),
      renderCell: (params) => (
        <ActionSuco params={params} />
      ),
    },
    {
      field: "MaBC",
      renderHeader: renderHeaderWithCustomTitle("Mã"),
      resizable: false,
    },
    {
      field: "HinhThuc",
      renderHeader: renderHeaderWithCustomTitle("Hình thức"),
      width: 100,
    },
    {
      field: "NgaySuCo",
      renderHeader: renderHeaderWithCustomTitle("Ngày sự cố"),
      width: 150,
      type: "date",
      // valueGetter: ({ value }) => value && new Date(value),
      valueFormatter: (params) => {
        const date =
          params.value instanceof Date ? params.value : new Date(params.value);
        if (!isNaN(date.getTime())) {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        } else {
          return "";
        }
      },
    },

    {
      field: "TenBN",
      renderHeader: renderHeaderWithCustomTitle("Tên BN"),
      width: 150,
    },
    {
      field: "KhoaSuCo",
      width: 150,

      valueGetter: ({ value }) => value && value.TenKhoa,
      renderHeader: (params) => (
        <Typography
          variant="h4"
          sx={{ my: 1, fontSize: "1rem", color: "#1939B7", fontWeight: "bold" }}
          textAlign="center"
        >
          Khoa
        </Typography>
      ),
    },
    {
      field: "MoTa",
      // headerName: "Mô tả thông báo sự cố",
      renderHeader: renderHeaderWithCustomTitle("Mô tả sự cố"),
      width: 150,

      // flex: 1,
    },
    {
      field: "GiaiPhap",
      renderHeader: renderHeaderWithCustomTitle("Giải pháp ban đầu"),
      width: 150,
      headerAlign: "center",
    },

    {
      field: "LyDoKhongTiepNhan",
      renderHeader: renderHeaderWithCustomTitle("Lý do không tiếp nhận"),
      width: 200,
      headerAlign: "center",
    },

    {
      field: "ChiTietNhomSuCo",
      renderHeader: renderHeaderWithCustomTitle("Đánh giá nhóm sự cố"),
      width: 200,
      headerAlign: "center",
    },
    {
      field: "ChiTietNguyenNhan",
      renderHeader: renderHeaderWithCustomTitle("Đánh giá nguyên nhân"),
      width: 180,
      headerAlign: "center",
    },
    {
      field: "DanhGiaTruongNhom",
      renderHeader: renderHeaderWithCustomTitle("Đánh giá trưởng nhóm"),
      width: 180,
      headerAlign: "center",
    },
    {
      field: "TonThuongChiTiet",
      renderHeader: renderHeaderWithCustomTitle("Tổn thương NB"),
      width: 100,
      headerAlign: "center",
    },
    {
      field: "HanhDongKhacPhuc",
      renderHeader: renderHeaderWithCustomTitle("Hành động khắc phục"),
    },
  ];

  return (
    <Box sx={{ overflowX: "auto" , height:820}}>
      <DataGrid
        rows={baocaosucos}
        columns={columns}
        getRowId={(row) => row._id}
        getRowHeight={() => "auto"}
        
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            textOverflow: "clip",
            whiteSpace: "break-spaces",
            lineHeight: 3,
          },
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}

export default DSSuCoDataGrid;
  