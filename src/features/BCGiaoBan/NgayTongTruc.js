import React, { useState, useEffect } from "react";
import { Stack, Card, Table, TableHead, TableRow, TableCell, TableBody, TextField, Input, Divider, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import AdapterDayjs from "@mui/lab/AdapterDayjs/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { InsertOrUpdateBCGiaoBanByFromDateToDate, getDataBCGiaoBanByFromDateToDate } from "./bcgiaobanSlice";
import TrangThai from "./TrangThai";

function NgayTongTruc() {
  // Initialize state for "Từ ngày" (fromDate) and "Đến ngày" (toDate)
  const [fromDate, setFromDate] = useState(
    dayjs().startOf("month").hour(7).minute(0).second(0).millisecond(0)
  );
  const [toDate, setToDate] = useState(
    dayjs().endOf("month").hour(7).minute(0).second(0).millisecond(0)
  );

  const handleFromDateChange = (newDate) => {
    handleDateChange(newDate, setFromDate);
  };

  const handleToDateChange = (newDate) => {
    handleDateChange(newDate, setToDate);
  };

  const handleDateChange = (newDate, setDateFunction) => {
    if (newDate instanceof Date) {
      newDate.setHours(7, 0, 0, 0);
      setDateFunction(dayjs(newDate));
    } else if (dayjs.isDayjs(newDate)) {
      const updatedDate = newDate.hour(7).minute(0).second(0).millisecond(0);
      setDateFunction(updatedDate);
    }
    // const fromDateISO = fromDate.toISOString();
    // const toDateISO = toDate.toISOString();
    // console.log("From Date:", fromDateISO);
    // console.log("To Date:", toDateISO);
  };
const dispatch = useDispatch();
  useEffect(() => {
    const fromDateISO = fromDate.toISOString();
    const toDateISO = toDate.toISOString();
    console.log("From Date:", fromDateISO);
    console.log("To Date:", toDateISO);
dispatch(getDataBCGiaoBanByFromDateToDate(fromDateISO,toDateISO))
  }, [fromDate, toDate,dispatch]);
  
  const [tableData, setTableData] = useState([]);

  const {bcGiaoBans} = useSelector((state)=>state.bcgiaoban)
  useEffect(() => {
    
    setTableData(bcGiaoBans);
  }, [bcGiaoBans]);

  const handleInputChange = (event, rowIndex, field) => {
   
    const value = event.target.value;
  setTableData((prevTableData) => {
    const newTableData = [...prevTableData];
    newTableData[rowIndex] = { ...newTableData[rowIndex], [field]: value };
    return newTableData;
  });
  };
const handleCapnhat = () => {
dispatch(InsertOrUpdateBCGiaoBanByFromDateToDate(tableData))
}
  return (
    <Card>
    <Stack>
      <Card sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Từ ngày"
              value={fromDate}
              onChange={handleFromDateChange}
            />
            <DatePicker
              label="Đến ngày"
              value={toDate}
              onChange={handleToDateChange}
            />
          </LocalizationProvider>
          <Button variant="contained" onClick={handleCapnhat}>Cập nhật</Button>
        </Stack>
      </Card>

<Card sx={{ my: 3, py: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Thứ</TableCell>
              <TableCell>Ngày tháng</TableCell>
              <TableCell>Trực lãnh đạo</TableCell>
              <TableCell>Tổng trực hệ nội</TableCell>
              <TableCell>Tổng trực hệ ngoại</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
                 <React.Fragment key={`fragment-${index}`}>
              <TableRow key={index} >
                <TableCell>{row.Thu}</TableCell>
                <TableCell>{dayjs(row.Ngay).format('DD-MM-YYYY')}</TableCell>
                <TableCell>
                  <Input
                    value={row.TrucLanhDao}
                    onChange={(e) => handleInputChange(e, index, 'TrucLanhDao')}
                    sx={{ padding: "2px", margin: "0", fontSize: "1rem" }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.TTHeNoi}
                    onChange={(e) => handleInputChange(e, index, 'TTHeNoi')}
                    
                    sx={{ padding: "1px", margin: "0", fontSize: "1rem" }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.TTHeNgoai}
                    onChange={(e) => handleInputChange(e, index, 'TTHeNgoai')}
                    
                    sx={{ padding: "2px", margin: "0", fontSize: "1rem" }}
                  />
                </TableCell>
                <TableCell><TrangThai trangthai={row.TrangThai}/></TableCell>
              </TableRow>
               {/* Insert a Divider if it's a Sunday (Chủ nhật) */}
               {row.Thu === 'Chủ Nhật' && (
                <TableRow>
                  <TableCell colSpan={6}>
                  <Divider sx={{ 
                        height: '3px', 
                        backgroundColor: 'grey' 
                      }} />
                  </TableCell>
                </TableRow>
              )}
             </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Card>

    </Stack>
    </Card>
  );
}

export default NgayTongTruc;
