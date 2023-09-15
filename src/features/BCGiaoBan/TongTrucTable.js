import React, { useState, useEffect } from "react";
import { Stack, Card, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";



function TongTrucTable() {
  // ... (Previous code for TongTrucTable)
  // Initialize mock data
const fromDate = dayjs("2023-09-01").hour(7).minute(0).second(0).millisecond(0);
const toDate = dayjs("2023-09-07").hour(7).minute(0).second(0).millisecond(0);

  const calculateDaysBetween = (fromDate, toDate) => {
    let days = [];
    let cursorDate = fromDate;
  
  
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const calculateDaysBetween = (fromDate, toDate) => {
      let days = [];
      let cursorDate = fromDate;

      while (cursorDate.isSameOrBefore(toDate)) {
        const dayOfWeek = cursorDate.format("dddd"); // e.g., Monday, Tuesday, etc.
        const formattedDate = cursorDate.format("DD-MM-YYYY"); // e.g., 01-09-2023
        const trucLanhDao = "John Doe"; // Mock data
        const tongTrucHeNoi = 5; // Mock data
        const tongTrucNgoai = 3; // Mock data

        days.push({
          dayOfWeek,
          formattedDate,
          trucLanhDao,
          tongTrucHeNoi,
          tongTrucNgoai,
        });

        cursorDate = cursorDate.add(1, "day");
      }

      return days;
    };

    const daysBetween = calculateDaysBetween(fromDate, toDate);
    setTableData(daysBetween);
  }, [fromDate, toDate]);

  return (
    <Stack>
      {/* ... (Previous code for DatePicker) */}
      <Card sx={{ my: 3, py: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thứ</TableCell>
              <TableCell>Ngày tháng</TableCell>
              <TableCell>Trực lãnh đạo</TableCell>
              <TableCell>Tổng trực hệ nội</TableCell>
              <TableCell>Tổng trực Ngoại</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.dayOfWeek}</TableCell>
                <TableCell>{row.formattedDate}</TableCell>
                <TableCell>{row.trucLanhDao}</TableCell>
                <TableCell>{row.tongTrucHeNoi}</TableCell>
                <TableCell>{row.tongTrucNgoai}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Stack>
  );
}
}
export default TongTrucTable;
