import { DatePicker, DateTimePicker } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import FDatePicker from "../components/form/FDatePicker";
import BenhNhanInBaoCao from "./BenhNhan/BenhNhanInBaoCao";
import { useSelector } from "react-redux";
import ChuyenTiepForm from "./BaoCaoNgay/ChuyenTiepForm";

import ThongKeHeNgoai from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/ThongKeHeNgoai";
import ThongKeHeNoi from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/ThongKeHeNoi";
import ThongKeGMHS from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/ThongKeGMHS";
import ThongKeTrungTamCLC from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/ThongKeTrungTamCLC";
import ThongKeCanLamSang from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/ThongKeCanLamSang";
import ThongKeHuyetHocTM from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/ThongKeHuyetHocTM";
import ThongKeKhoaKhamBenh from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/ThongKeKhoaKhamBenh";
import ThongKeVaoVien from "./BCGiaoBan/BaoCaoSoLieuGiaoBan/ThongKeVaoVien";

function Content() {
  const {
    noiBNTuvongs,
    noiBNChuyenViens,
    noiBNXinVes,
    noiBNNangs,
    noiBNNgoaiGios,

    ngoaiBNTuvongs,
    ngoaiBNChuyenViens,
    ngoaiBNXinVes,
    ngoaiBNNangs,
    ngoaiBNPhauThuats,
    ngoaiBNNgoaiGios,

    clcBNTuvongs,
    clcBNChuyenViens,
    clcBNXinVes,
    clcBNNangs,
    hsccycBNNgoaiGios,
    noiycBNNgoaiGios,
    ngoaiycBNNgoaiGios,
    ngoaiycBNPhauThuats,
    baocaongays,
  } = useSelector((state) => state.bcgiaoban);

  const excludedMaKhoa = ["NoiYC", "NgoaiYC", "HSCCYC"];
  const bcHeNoi = baocaongays.filter((baocaongay) => {
    return (
      baocaongay.KhoaID.LoaiKhoa === "noi" 
      // && !excludedMaKhoa.includes(baocaongay.KhoaID.MaKhoa)
    );
  });
  const bcHeNgoai = baocaongays.filter((baocaongay) => {
    return (
      baocaongay.KhoaID.LoaiKhoa === "ngoai" 
      // && !excludedMaKhoa.includes(baocaongay.KhoaID.MaKhoa)
    );
  });
const bcGMHS = baocaongays.filter((baocaongay)=>{
  return (baocaongay.KhoaID.MaKhoa==='GMHS')
})


const handleScroll = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

console.log('bcgmhs',bcGMHS);
  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "calc(100vh - 64px - 64px)", // Chỉnh sửa số pixel cho phù hợp với chiều cao của Header và Footer
      }}
    >
      <ThongKeVaoVien/>
      <ThongKeKhoaKhamBenh/>
      <ChuyenTiepForm title="PHẦN BÁO CÁO TỔNG TRỰC HỆ NỘI" id ='henoi'/>
      <ThongKeHeNoi baocaongays={bcHeNoi} />
      {noiBNTuvongs.map((noiBNTuvong) => (
        <BenhNhanInBaoCao key={noiBNTuvong._id} benhnhan={noiBNTuvong} />
      ))}
      {noiBNChuyenViens.map((noiBNChuyenVien) => (
        <BenhNhanInBaoCao
          key={noiBNChuyenVien._id}
          benhnhan={noiBNChuyenVien}
        />
      ))}

      {noiBNXinVes.map((noiBNXinVe) => (
        <BenhNhanInBaoCao key={noiBNXinVe._id} benhnhan={noiBNXinVe} />
      ))}
      {noiBNNangs.map((noiBNNang) => (
        <BenhNhanInBaoCao key={noiBNNang._id} benhnhan={noiBNNang} />
      ))}
      {/* {noiBNNgoaiGios.length > 0 && (
        <ChuyenTiepForm title="BỆNH NHÂN VÀO VIỆN NGOÀI GIỜ HỆ NỘI" id= 'ngoaigiohenoi'/>
      )} */}
      <ChuyenTiepForm title="BỆNH NHÂN VÀO VIỆN NGOÀI GIỜ HỆ NỘI" id= 'ngoaigiohenoi'/>
      {noiBNNgoaiGios.map((noiBNNgoaiGio) => (
        <BenhNhanInBaoCao key={noiBNNgoaiGio._id} benhnhan={noiBNNgoaiGio} />
      ))}

     
      <ChuyenTiepForm title="PHẦN BÁO CÁO TỔNG TRỰC HỆ NGOẠI" id ='hengoai'/>
      <ThongKeHeNgoai baocaongays={bcHeNgoai} />
{bcGMHS.length>0 && (<ThongKeGMHS bcGM={bcGMHS[0]}/>)}
      {ngoaiBNTuvongs.map((ngoaiBNTuvong) => (
        <BenhNhanInBaoCao key={ngoaiBNTuvong._id} benhnhan={ngoaiBNTuvong} />
      ))}
      {ngoaiBNChuyenViens.map((ngoaiBNChuyenVien) => (
        <BenhNhanInBaoCao
          key={ngoaiBNChuyenVien._id}
          benhnhan={ngoaiBNChuyenVien}
        />
      ))}
      {ngoaiBNXinVes.map((ngoaiBNXinVe) => (
        <BenhNhanInBaoCao key={ngoaiBNXinVe._id} benhnhan={ngoaiBNXinVe} />
      ))}
      {ngoaiBNNangs.map((ngoaiBNNang) => (
        <BenhNhanInBaoCao key={ngoaiBNNang._id} benhnhan={ngoaiBNNang} />
      ))}
      {ngoaiBNPhauThuats.map((ngoaiBNNang) => (
        <BenhNhanInBaoCao key={ngoaiBNNang._id} benhnhan={ngoaiBNNang} />
      ))}
 <ChuyenTiepForm title="BỆNH NHÂN VÀO VIỆN NGOÀI GIỜ HỆ NGOẠI" id= 'ngoaigiohengoai' />
      {/* {ngoaiBNNgoaiGios.length > 0 && (
        <ChuyenTiepForm title="BỆNH NHÂN VÀO VIỆN NGOÀI GIỜ HỆ NGOẠI" id= 'ngoaigiohengoai' />
      )} */}
      {ngoaiBNNgoaiGios.map((ngoaiBNNgoaiGio) => (
        <BenhNhanInBaoCao
          key={ngoaiBNNgoaiGio._id}
          benhnhan={ngoaiBNNgoaiGio}
        />
      ))}

<ChuyenTiepForm title="PHẦN BÁO CÁO TRUNG TÂM KCB CHẤT LƯỢNG CAO" id ='trungtamclc'/>
      <ThongKeTrungTamCLC/>
      {/* bo cuc trinh chieu theo thu tu cu */}
      {/* {clcBNTuvongs.map((clcBNTuvong) => (
        <BenhNhanInBaoCao key={clcBNTuvong._id} benhnhan={clcBNTuvong} />
      ))}
      {clcBNChuyenViens.map((clcBNChuyenVien) => (
        <BenhNhanInBaoCao
          key={clcBNChuyenVien._id}
          benhnhan={clcBNChuyenVien}
        />
      ))}
      {clcBNXinVes.map((clcBNXinVe) => (
        <BenhNhanInBaoCao key={clcBNXinVe._id} benhnhan={clcBNXinVe} />
      ))}
      {clcBNNangs.map((clcBNNang) => (
        <BenhNhanInBaoCao key={clcBNNang._id} benhnhan={clcBNNang} />
      ))} */}

      {hsccycBNNgoaiGios.map((BN) => (
        <BenhNhanInBaoCao key={BN._id} benhnhan={BN} />
      ))}
      {noiycBNNgoaiGios.map((BN) => (
        <BenhNhanInBaoCao key={BN._id} benhnhan={BN} />
      ))}
      {ngoaiycBNNgoaiGios.map((BN) => (
        <BenhNhanInBaoCao key={BN._id} benhnhan={BN} />
      ))}
      {/* {ngoaiycBNPhauThuats.map((BN) => (
        <BenhNhanInBaoCao key={BN._id} benhnhan={BN} />
      ))} */}


      <ChuyenTiepForm title="PHẦN BÁO CÁO CẬN LÂM SÀNG" id ='canlamsang'/>
      <ThongKeCanLamSang/>
      <ThongKeHuyetHocTM/>
    </Box>
  );
}

export default Content;
