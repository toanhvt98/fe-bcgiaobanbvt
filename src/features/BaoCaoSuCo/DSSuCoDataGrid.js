import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import ActionSuco from "./ActionSuco";

function DSSuCoDataGrid() {
  const { baocaosucos } = useSelector((state) => state.baocaosuco);
  function renderHeaderWithCustomTitle(title) {
    return (params: GridColumnHeaderParams) => (
      <Typography
        variant="h4"
        sx={{ my: 1, fontSize: "1rem", color: "#1939B7", fontWeight: "bold" }}
        textAlign="center"
      >
        {title}
      </Typography>
    );
  }
  const columns: GridColDef[] = [
    {
      field: "action",
      renderHeader:renderHeaderWithCustomTitle('Actions'),
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <ActionSuco params={params} />
      ),
    },
    { field: "MaBC", renderHeader:renderHeaderWithCustomTitle('Mã'), resizable: false },
    { field: "HinhThuc", renderHeader:renderHeaderWithCustomTitle('Hình thức'), width: 100 },
    {
      field: "NgaySuCo",
      renderHeader:renderHeaderWithCustomTitle('Ngày sự cố'),
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

    { field: "TenBN", renderHeader:renderHeaderWithCustomTitle('Tên BN'),width: 150 },
    {
      field: "KhoaSuCo",
      width: 150,

      valueGetter: ({ value }) => value && value.TenKhoa,
      renderHeader: (params: GridColumnHeaderParams) => (
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
      renderHeader:renderHeaderWithCustomTitle('Mô tả sự cố'),
      width: 150,
      
      // flex: 1,
    },
    {
      field: "GiaiPhap",
      headerName: "Giải pháp",
      width: 150,
      headerAlign: "center",
    },
  ];

  return (
    <Box sx={{ overflowX: "auto" }}>
      <DataGrid
        rows={baocaosucos}
        columns={columns}
        getRowId={(row) => row._id}
        getRowHeight={() => "auto"}
      />
    </Box>
  );
}

export default DSSuCoDataGrid;
