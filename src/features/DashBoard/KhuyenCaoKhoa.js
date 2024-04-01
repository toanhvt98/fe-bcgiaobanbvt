import React, { useState, useEffect } from "react";
import { Stack, Card, Table, TableHead, TableRow, TableCell, TableBody,  Input, Divider, Button, Select, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import AdapterDayjs from "@mui/lab/AdapterDayjs/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { InsertOrUpdateBCGiaoBanByFromDateToDate, getDataBCGiaoBanByFromDateToDate } from "../BCGiaoBan/bcgiaobanSlice";
import { InsertOrUpdateKhuyenCaoKhoa, getKhuyenCaoKhoaByThangNam } from "./dashboardSlice";



function KhuyenCaoKhoa() {
  // Initialize state for "Từ ngày" (fromDate) and "Đến ngày" (toDate)

  const thangs =[1,2,3,4,5,6,7,8,9,10,11,12]
  const nams=[2024,2025,2026,2027]

  const [thang,setThang] = useState(1);
  const [nam,setNam] =useState(2024)
 
const dispatch = useDispatch();
  useEffect(() => {
   
dispatch(getKhuyenCaoKhoaByThangNam(thang,nam))
  }, [thang,nam,dispatch]);
  
  useEffect(()=>{

  })
  const [tableData, setTableData] = useState([]);

  const {khuyencaokhoa} = useSelector((state)=>state.dashboard)
  useEffect(() => {
    
    setTableData(khuyencaokhoa);
  }, [khuyencaokhoa]);

  const handleInputChange = (event, rowIndex, field) => {
   
    const value = event.target.value;
  setTableData((prevTableData) => {
    const newTableData = [...prevTableData];
    newTableData[rowIndex] = { ...newTableData[rowIndex], [field]: value };
    return newTableData;
  });
  };
const handleCapnhat = () => {
  const khuyencaokhoaUpdateOrInsert ={
    Thang:thang,
    Nam:nam,
    KhuyenCao:tableData
  }
dispatch(InsertOrUpdateKhuyenCaoKhoa(thang,nam,khuyencaokhoaUpdateOrInsert))
}

const handleSelect1Change = (e) => {
    setThang(e.target.value);
    console.log("thang nam",thang,nam)
   
  };
const handleSelect2Change = (e) => {
    setNam(e.target.value);
    console.log("thang nam",thang,nam)
  };

  return (
    <Card>
    <Stack>
        <Stack direction="row" spacing={2}>
        <Select value={thang||1} onChange={handleSelect1Change}>
              {thangs &&
                thangs.length > 0 &&
                thangs.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
            </Select>

        <Select value={nam||2024} onChange={handleSelect2Change}>
              {nams &&
                nams.length > 0 &&
                nams.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
            </Select>
            <Button variant="contained" onClick={handleCapnhat}>Cập nhật</Button>
            <Button variant="contained" >Import</Button>
        </Stack>
    
<Card sx={{ my: 3, py: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>STT</TableCell>
              <TableCell>Mã khoa</TableCell>
              <TableCell>Tên khoa</TableCell>
              <TableCell>KC doanh thu</TableCell>
              <TableCell>KC tỷ lệ BHYT(%)</TableCell>
              <TableCell>KC BHYT</TableCell>
              <TableCell>KC Thu trực tiếp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
                 <React.Fragment key={`fragment-${index}`}>
              <TableRow key={index} >
                <TableCell>{row.Thu}</TableCell>
                <TableCell>{row.MaKhoa}</TableCell>
                <TableCell>
                  
                    {row.TenKhoa}
                
                </TableCell>
                <TableCell>
                  <Input
                    value={row.DoanhThu}
                    onChange={(e) => handleInputChange(e, index, 'DoanhThu')}
                    
                    sx={{ padding: "1px", margin: "0", fontSize: "1rem" }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.TyLeBHYT}
                    onChange={(e) => handleInputChange(e, index, 'TyLeBHYT')}
                    
                    sx={{ padding: "px", margin: "0", fontSize: "1rem" }}
                  />
                </TableCell>
                <TableCell>{row.BHYT}</TableCell>
                <TableCell>{row.ThuTrucTiep}</TableCell>
              </TableRow>
             
             </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Card>

    </Stack>
    </Card>
  );
}

export default KhuyenCaoKhoa;
