import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Card,
  
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { commonStyle, commonStyleLeft, getObjectByMaKhoa } from "../../../utils/heplFuntion";
import { useTheme } from "@emotion/react";

function ThongKeVaoVien() {
  const theme = useTheme();
  const {darkMode} = useSelector((state)=>state.mytheme)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  let commonStyleReponsive = isSmallScreen ? {...commonStyle, fontSize: '0.8rem'} : {...commonStyle};
  let commonStyleLeftReponsive = isSmallScreen ? {...commonStyleLeft, fontSize: '0.8rem'} : {...commonStyleLeft};
  
  commonStyleReponsive = darkMode?{...commonStyleReponsive,color:"#FFF"}:{...commonStyleReponsive}
  commonStyleLeftReponsive = darkMode?{...commonStyleLeftReponsive,color:'#FFF'}:{...commonStyleLeftReponsive}

  const { baocaongays, chiso } = useSelector((state) => state.bcgiaoban);
  const bcFilterTheoMaKhoa = getObjectByMaKhoa(baocaongays,'KCC');
  let bcNgayKhoaCC = {BSTruc:"",DDTruc:""};
  if (bcFilterTheoMaKhoa.length > 0) bcNgayKhoaCC=bcFilterTheoMaKhoa[0];

  
  const bcLamSang = baocaongays
    .filter((baocaongay) => {
      return (
        (baocaongay.KhoaID.LoaiKhoa === "noi" && baocaongay.KhoaID.MaKhoa !== 'CDHA') ||
        baocaongay.KhoaID.LoaiKhoa === "ngoai"
      );
    })
    .sort((a, b) => {
      return a.KhoaID.STT - b.KhoaID.STT;
    });
  const getRowData = () => {
    let totalRow = {
      TenKhoa: "Tổng",

      "ls-NgoaiGio": 0,
    };
    let stt = 0;
    const rows = bcLamSang.map((entry) => {
      const row = {
        TenKhoa: entry.KhoaID.TenKhoa,
        BSTruc: entry.BSTruc,
      };

      ["ls-NgoaiGio"].forEach((code) => {
        row[code] = 0;
      });

      entry.ChiTietChiSo.forEach((chitiet) => {
        if (row.hasOwnProperty(chitiet.ChiSoCode)) {
          row[chitiet.ChiSoCode] = chitiet.SoLuong;
          totalRow[chitiet.ChiSoCode] += chitiet.SoLuong;
        }
      });
      stt++;
      row["STT"] = stt;
      return row;
    });

    rows.unshift(totalRow);

    return rows;
  };

  const rows = getRowData();

  return (
    <Container sx={{ my: 1 }} id = 'khoacapcuu'>
      <TableContainer component={Paper} style={{ }}>
        <Card
          sx={{
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#1939B7",
            p: 1,
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <Typography sx={{ fontSize:isSmallScreen?"1rem":"1.3rem" }}>
            {" "}
            Trực khoa cấp cứu {" "}
          </Typography>
          <Typography sx={{ fontSize:isSmallScreen?"1rem":"1.3rem" }}> Kíp trực: {" "+bcNgayKhoaCC?.BSTruc + "  "+bcNgayKhoaCC?.DDTruc} </Typography>
        </Card>
       
<Card >
        <Table >
        <TableBody>
          <TableRow>
          <TableCell style={commonStyleReponsive} rowSpan={2}>Khám ngoài giờ khoa cấp cứu</TableCell>
            <TableCell style={commonStyleReponsive}>Khám cấp cứu</TableCell>
            <TableCell style={commonStyleReponsive}>Vào viện</TableCell>
           
          </TableRow>
       
            <TableRow >
             
              <TableCell  style={commonStyleReponsive}>{chiso['kcc-TongKham']}</TableCell>
              <TableCell  style={commonStyleReponsive}>{chiso['kcc-VaoVien']}</TableCell>
              
            </TableRow>
          
        </TableBody>
      </Table>
      </Card>
      <Typography variant="h5" sx={{ color: "#bb1515", my: 2 ,textAlign:'center',fontSize:isSmallScreen?"1rem":"1.3rem"}}>
         Bệnh nhân vào viện các khoa
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style ={commonStyleReponsive}
              >
                STT
              </TableCell>

              <TableCell
                style ={commonStyleReponsive}
              >
                Khoa
              </TableCell>

              <TableCell
                style ={commonStyleReponsive}
              >
                Vào viện
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell style={commonStyleReponsive}>
                  
                    {row['STT']}
                 
                </TableCell>

                <TableCell style={commonStyleLeftReponsive} >
                  
                    {row.TenKhoa}
                 
                </TableCell>

                <TableCell style={commonStyleReponsive}>
                  
                    {row["ls-NgoaiGio"]}
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ThongKeVaoVien;
