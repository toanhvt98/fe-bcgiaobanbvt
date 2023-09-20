import { Button, Container } from "@mui/material";
import React from "react";
import pptxgen from "pptxgenjs";
import { useSelector } from "react-redux";
import { getObjectByMaKhoa } from "../utils/heplFuntion";

function ExportPptx() {
  const styleCenterTable = {
    x: 0,
    y: 1,
    w: 10,
    h: 4.5,
    fontFace: "Arial",
    bold: true,
    color: "1939B7",
    fill: { color: "FFFFFF" },
    border: { type: "solid", color: "1939B7", pt: 1 },
    fontSize: 16,
    margin: [0.5, 0.5, 0.5, 0.5], // [Left, Top, Right, Bottom] margins for text in cell
    valign: "middle",
  };
  // margin: [0.5, 0.5, 0.5, 0.5], colSpan: 2
  const styleCenterCell = {
    fontFace: "Arial",
    fontSize: 16,
    align: "center",
    color: "1939B7",
    bold: true,
    valign: "middle",
  };
  const styleLeftCell = {
    fontFace: "Arial",
    fontSize: 16,
    align: "left",
    color: "1939B7",
    bold: true,
    valign: "middle",
  };
  const styleTitle = {
    x: 0,
    y: 0,
    fontSize: 30,
    color: "FFFFFF",
    fill: { color: "1939B7" },
    align: "left",
    w: 10,
    h: 1,
  };
  const styleTextChuyenForm = {
    x: 0.7,
    y: 2,
    fontSize: 40,
    color: "bb1515",
	fontFace: "Arial",
    align: "center",
    w: 8,
    h: 2,
  };
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
	bcGiaoBanCurent,
    clcBNTuvongs,
    clcBNChuyenViens,
    clcBNXinVes,
    clcBNNangs,
    hsccycBNNgoaiGios,
    noiycBNNgoaiGios,
    ngoaiycBNNgoaiGios,
    ngoaiycBNPhauThuats,
    baocaongays,
    chiso,
  } = useSelector((state) => state.bcgiaoban);

  //Du lieu khoa GMHS
  const bcGMHS = baocaongays.filter((baocaongay) => {
    return baocaongay.KhoaID.MaKhoa === "GMHS";
  });
  const bcGM = bcGMHS[0];

  const handleGMHS = () => {
    let pres = new pptxgen();

    //Du lieu khoa cap cuu

    const bcFilterTheoMaKhoa = getObjectByMaKhoa(baocaongays, "KCC");
    let bcNgayKhoaCC = { BSTruc: "", DDTruc: "" };
    if (bcFilterTheoMaKhoa.length > 0) bcNgayKhoaCC = bcFilterTheoMaKhoa[0];

    const bcLamSang = baocaongays
      .filter((baocaongay) => {
        return (
          baocaongay.KhoaID.LoaiKhoa === "noi" ||
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

    const rowsKhoaCC = getRowData();

    let slideKCC = pres.addSlide();

    slideKCC.addText("Trực khoa cấp cứu", {
      x: 0,
      y: 0,
      fontSize: 20,
      fontFace: "Arial",
      bold: true,
      color: "FFFFFF",
      fill: { color: "1939B7" },
      align: "left",
      w: 10,
      h: 0.5,
    });

    slideKCC.addText(
      `Kíp trực: ${bcNgayKhoaCC?.BSTruc} ${bcNgayKhoaCC?.DDTruc}`,
      {
        x: 0,
        y: 0.5,
        fontSize: 20,
        fontFace: "Arial",
        bold: true,
        color: "FFFFFF",
        fill: { color: "1939B7" },
        align: "left",
        w: 10,
        h: 0.5,
      }
    );

    const table1Data = [
      [
        {
          text: "Khám ngoài giờ khoa cấp cứu",
          options: { ...styleCenterCell},
        },
        {},
        { text: "Khám cấp cứu", options: styleCenterCell },
        { text: "Vào viện", options: styleCenterCell },
      ],
      [
        {},
        {},
        {
          text: chiso["kcc-TongKham"],
          options: {
            fontFace: "Arial",
            fontSize: 16,
            align: "center",
            valign: "middle",
            color: "000000",
          },
        },
        {
          text: chiso["kcc-VaoVien"],
          options: {
            fontFace: "Arial",
            fontSize: 16,
            align: "center",
            valign: "middle",
            color: "000000",
          },
        },
      ],
    ];
    slideKCC.addTable(table1Data, {
      x: 0.5,
      y: 2,
      w: 9,
      h: 2,
	  colW: [2,1,3,3],
      border: { type: "solid", color: "1939B7", pt: 1 },
    });
	
	slideKCC.addShape(pres.shapes.RECTANGLE, {
		x: 0.5,
		y: 2,
		w: 3,
		h: 2,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
	  slideKCC.addText("Khám ngoài giờ khoa cấp cứu", {
		x: 0.5, // Điều chỉnh tọa độ x và y sao cho phù hợp
		y: 2, // với vị trí của các ô bạn muốn "trộn"
		w: 3, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
		h: 2, // với kích thước của các ô bạn muốn "trộn"
		fontSize: 16,
		fontFace: "Arial",
		align: "center",
		valign: "middle",
		color: "1939B7",
		bold: true,
	  });
    //Benh nhan vao vien cac khoa
    let slideBNVaoVienCacKhoa = pres.addSlide();
    slideBNVaoVienCacKhoa.addText("Bệnh nhân vào viện các khoa", {
      x: 0,
      y: 0,
      fontSize: 25,
      fontFace: "Arial",
      bold: true,
      color: "FFFFFF",
      fill: { color: "1939B7" },
      align: "left",
      w: 10,
      h: 1,
    });

    const table2Data = [
      [
        { text: "STT", options: styleCenterCell },
        { text: "Khoa", options: styleCenterCell },
        { text: "Vào viện", options: styleCenterCell },
      ],
      ...rowsKhoaCC.map((row, index) => [
        { text: row.STT, options: styleCenterCell },
        { text: row.TenKhoa, options: styleLeftCell },
        { text: row["ls-NgoaiGio"], options: styleCenterCell },
      ]),
    ];

    slideBNVaoVienCacKhoa.addTable(table2Data, {
      x: 0,
      y: 1,
      w: 10,
      h: 4.5,
      border: { type: "solid", color: "1939B7", pt: 1 },
      autoPage: true,
    });

    //Export khoa kham benh
    let slideKhoaKhamBenh = pres.addSlide();

    // Adding Title
    slideKhoaKhamBenh.addText("Khoa khám bệnh",styleTitle);

    // Adding Table
    const tableData = [
      [
        { text: "Tổng khám", options: { rowSpan: 3 } },
        { text: "Bảo hiểm", options: { rowSpan: 3 } },
        { text: "Viện phí", options: { rowSpan: 3 } },
        { text: "Khám yêu cầu", options: { rowSpan: 3 } },
        { text: "Vào viện", options: { rowSpan: 3 } },
        { text: "Chuyển viện", options: { colSpan: 2 } },
        { text: "Chuyển viện", options: { colSpan: 2 } },
        { text: "Ngoại tỉnh", options: { colSpan: 4 } },
        { text: "Ngoại tỉnh", options: { colSpan: 4 } },
        { text: "Ngoại tỉnh", options: { colSpan: 4 } },
        { text: "Ngoại tỉnh", options: { colSpan: 4 } },
      ],
      [
        "",
        "",
        "",
        "",
        "",
        { text: "Nội Trú", options: { rowSpan: 2 } },
        { text: "Ngoại Trú", options: { rowSpan: 2 } },
        { text: "Ngoại trú", options: { colSpan: 2 } },
        { text: "Ngoại trú", options: { colSpan: 2 } },
        { text: "Nội trú", options: { colSpan: 2 } },
        { text: "Nội trú", options: { colSpan: 2 } },
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Bảo hiểm",
        "Viện phí",
        "Bảo hiểm",
        "Viện phí",
      ],
      [
        chiso["kkb-TongKham"],
        chiso["kkb-BaoHiem"],
        chiso["kkb-VienPhi"],
        chiso["kkb-YeuCau"],
        chiso["kkb-NBVaoVien"],
        chiso["kkb-CVNoiTru"],
        chiso["kkb-CVNgoaiTru"],
        chiso["kkb-NgoaiTinhNgoaiTruBH"],
        chiso["kkb-NgoaiTinhNgoaiTruVP"],
        chiso["kkb-NgoaiTinhNoiTruBH"],
        chiso["kkb-NgoaiTinhNoiTruVP"],
      ],
    ];

    slideKhoaKhamBenh.addTable(tableData, {
      x: 0,
      y: 1,
      w: 10,
      h: 4,
      border: { type: "solid", color: "1939B7", pt: 1 },
      fill: { color: "FFFFFF" },
      colW: [1, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
      fontFace: "Arial",
	  bold: true,
      fontSize: 13,
      color: "1939B7",
      align: "center",
      valign: "middle",
    });

    //meger cell
	const styleMegerCellKhoaKhamBenh ={
		fontSize: 14,
		fontFace: "Arial",
		align: "center",
		valign: "middle",
		color: "1939B7",
		bold: true,
		// fill: { color: "FFFFFF" },
		// border: { type: "solid", color: "1939B7", pt: 1 }, // Thêm viền nếu cần
	}
	
	slideKhoaKhamBenh.addShape(pres.shapes.RECTANGLE, {
		x: 0,
		y: 1,
		w: 1,
		h: 3,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
    slideKhoaKhamBenh.addText("Tổng khám", {
      x: 0, // Điều chỉnh tọa độ x và y sao cho phù hợp
      y: 1, // với vị trí của các ô bạn muốn "trộn"
      w: 1, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
      h: 3, // với kích thước của các ô bạn muốn "trộn"
      ...styleMegerCellKhoaKhamBenh
    });

	slideKhoaKhamBenh.addShape(pres.shapes.RECTANGLE, {
		x: 1,
		y: 1,
		w: 0.9,
		h: 3,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
    slideKhoaKhamBenh.addText("Bảo hiểm", {
      x: 1, // Điều chỉnh tọa độ x và y sao cho phù hợp
      y: 1, // với vị trí của các ô bạn muốn "trộn"
      w: 0.9, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
      h: 3, // với kích thước của các ô bạn muốn "trộn"
      ...styleMegerCellKhoaKhamBenh
    });

	slideKhoaKhamBenh.addShape(pres.shapes.RECTANGLE, {
		x: 1.9,
		y: 1,
		w: 0.9,
		h: 3,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
    slideKhoaKhamBenh.addText("Viện phí", {
      x: 1.9, // Điều chỉnh tọa độ x và y sao cho phù hợp
      y: 1, // với vị trí của các ô bạn muốn "trộn"
      w: 0.9, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
      h: 3, // với kích thước của các ô bạn muốn "trộn"
      ...styleMegerCellKhoaKhamBenh
    });

	slideKhoaKhamBenh.addShape(pres.shapes.RECTANGLE, {
		x: 2.8,
		y: 1,
		w: 0.9,
		h: 3,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
    slideKhoaKhamBenh.addText("Khám yêu cầu", {
      x: 2.8, // Điều chỉnh tọa độ x và y sao cho phù hợp
      y: 1, // với vị trí của các ô bạn muốn "trộn"
      w: 0.9, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
      h: 3, // với kích thước của các ô bạn muốn "trộn"
      ...styleMegerCellKhoaKhamBenh
    });

	slideKhoaKhamBenh.addShape(pres.shapes.RECTANGLE, {
		x: 3.7,
		y: 1,
		w: 0.9,
		h: 3,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
    slideKhoaKhamBenh.addText("Vào viện", {
      x: 3.7, // Điều chỉnh tọa độ x và y sao cho phù hợp
      y: 1, // với vị trí của các ô bạn muốn "trộn"
      w: 0.9, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
      h: 3, // với kích thước của các ô bạn muốn "trộn"
      ...styleMegerCellKhoaKhamBenh
    });
	slideKhoaKhamBenh.addShape(pres.shapes.RECTANGLE, {
		x: 4.6,
		y: 1,
		w: 1.8,
		h: 1,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
    slideKhoaKhamBenh.addText("Chuyển viện", {
      x: 4.6, // Điều chỉnh tọa độ x và y sao cho phù hợp
      y: 1, // với vị trí của các ô bạn muốn "trộn"
      w: 1.8, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
      h: 1, // với kích thước của các ô bạn muốn "trộn"
      ...styleMegerCellKhoaKhamBenh
    });
	slideKhoaKhamBenh.addShape(pres.shapes.RECTANGLE, {
		x: 4.6,
		y: 2,
		w: 0.9,
		h: 2,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
    slideKhoaKhamBenh.addText("Nội trú", {
      x: 4.6, // Điều chỉnh tọa độ x và y sao cho phù hợp
      y: 2, // với vị trí của các ô bạn muốn "trộn"
      w: 0.9, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
      h: 2, // với kích thước của các ô bạn muốn "trộn"
      ...styleMegerCellKhoaKhamBenh
    });
	slideKhoaKhamBenh.addShape(pres.shapes.RECTANGLE, {
		x: 5.5,
		y: 2,
		w: 0.9,
		h: 2,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
    slideKhoaKhamBenh.addText("Ngoại trú", {
      x: 5.5, // Điều chỉnh tọa độ x và y sao cho phù hợp
      y: 2, // với vị trí của các ô bạn muốn "trộn"
      w: 0.9, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
      h: 2, // với kích thước của các ô bạn muốn "trộn"
      ...styleMegerCellKhoaKhamBenh
    });
	slideKhoaKhamBenh.addShape(pres.shapes.RECTANGLE, {
		x: 6.4,
		y: 1,
		w: 3.6,
		h: 1,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
    slideKhoaKhamBenh.addText("Ngoại tỉnh", {
      x: 6.4, // Điều chỉnh tọa độ x và y sao cho phù hợp
      y: 1, // với vị trí của các ô bạn muốn "trộn"
      w: 3.6, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
      h: 1, // với kích thước của các ô bạn muốn "trộn"
      ...styleMegerCellKhoaKhamBenh
    });
	slideKhoaKhamBenh.addShape(pres.shapes.RECTANGLE, {
		x: 6.4,
		y: 2,
		w: 1.8,
		h: 1,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
    slideKhoaKhamBenh.addText("Ngoại trú", {
      x: 6.4, // Điều chỉnh tọa độ x và y sao cho phù hợp
      y: 2, // với vị trí của các ô bạn muốn "trộn"
      w: 1.8, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
      h: 1, // với kích thước của các ô bạn muốn "trộn"
      ...styleMegerCellKhoaKhamBenh
    });
	slideKhoaKhamBenh.addShape(pres.shapes.RECTANGLE, {
		x: 8.2,
		y: 2,
		w: 1.8,
		h: 1,
		fill: { color: "FFFFFF" },
		line: { color: '1939B7', width: 1 },
	  });
    slideKhoaKhamBenh.addText("Nội trú", {
      x: 8.2, // Điều chỉnh tọa độ x và y sao cho phù hợp
      y: 2, // với vị trí của các ô bạn muốn "trộn"
      w: 1.8, // Điều chỉnh chiều rộng và chiều cao sao cho phù hợp
      h: 1, // với kích thước của các ô bạn muốn "trộn"
      ...styleMegerCellKhoaKhamBenh
    });

//Export du lieu tong truc he noi


let slideChuyenHeNoi = pres.addSlide();
slideChuyenHeNoi.addText("BÁO CÁO GIAO BAN", {...styleTitle,align: "center",});
slideChuyenHeNoi.addText("PHẦN BÁO CÁO TỔNG TRỰC HỆ NỘI", styleTextChuyenForm);

let slideBCTongTrucHeNoi = pres.addSlide();

slideBCTongTrucHeNoi.addText("Trực lãnh đạo: " + (bcGiaoBanCurent?.TrucLanhDao || ""),{...styleTitle,h:0.5});

slideBCTongTrucHeNoi.addText("Tổng trực: " + (bcGiaoBanCurent?.TTHeNoi || ""), {
 ...styleTitle,y:0.5,h:0.5
});

let rowTongTrucHeNoi = baocaongays.map((entry) => {
  let row = [];
  row.push(entry.KhoaID.TenKhoa);
  row.push(entry.BSTruc);
  
  ['ls-TongNB', 'ls-NgoaiGio', 'ls-ChuyenVien', 'ls-TuVong', 'ls-Nang', 'ls-XinVe'].forEach((code) => {
	row.push(entry[code] || 0);
  });

  return row;
});

rowTongTrucHeNoi.unshift(["Khoa", "Bác sĩ trực", "Tổng số", "Vào viện", "Chuyển viện", "Tử vong", "NB nặng", "Xin về"]);

slideBCTongTrucHeNoi.addTable(rowTongTrucHeNoi, {
  x: 0,
  y: 1,
  w: 10,
  h: 4.5,
  border: { type: 'solid', color: '1939B7', pt: 1 },
  color: "1939B7",
  colW:[2.6,2.5,0.8,0.8,0.9,0.8,0.8,0.8],
  fontFace: "Arial",
  fontSize: 14,
  autoPage: true,
});

//Export BN noi tu vong
if (noiBNTuvongs.length>0) {

	for (let benhnhan of noiBNTuvongs) {
		// Slide chính với thông tin bệnh nhân
		let slide = pres.addSlide();
		slide.addText(`Loại BN: ${benhnhan.LoaiBN}`, { x: 0.5, y: 0.5, w: 8, h: 1 });
		slide.addText(`Tên Khoa: ${benhnhan.TenKhoa}`, { x: 0.5, y: 1.5, w: 8, h: 1 });
		slide.addText(`Tên Bệnh Nhân: ${benhnhan.TenBenhNhan}`, { x: 0.5, y: 2.5, w: 8, h: 1 });
		slide.addText(`Lý do vào viện: ${benhnhan.LyDoVV}`, { x: 0.5, y: 3.5, w: 8, h: 1 });
		slide.addText(`Diễn biến: ${benhnhan.DienBien}`, { x: 0.5, y: 4.5, w: 8, h: 1 });
		slide.addText(`Chẩn đoán: ${benhnhan.ChanDoan}`, { x: 0.5, y: 5.5, w: 8, h: 1 });
		// ... (thêm các thông tin khác tương tự)
	
		// Tạo slide cho mỗi ảnh
		for (let img of benhnhan.Images) {
		  let imgSlide = pres.addSlide();
		  imgSlide.addImage({ path: img, x: 0.5, y: 0.5, w: 8, h: 4.5 });   
		}
	  }
}

//Export du lieu he ngoai

let slideChuyenHeNgoai = pres.addSlide();
slideChuyenHeNgoai.addText("BÁO CÁO GIAO BAN", {...styleTitle,align: "center",});
slideChuyenHeNgoai.addText("PHẦN BÁO CÁO TỔNG TRỰC HỆ NGOẠI", styleTextChuyenForm);

let slideBCTongTrucHeNgoai = pres.addSlide();

slideBCTongTrucHeNgoai.addText("Trực lãnh đạo: " + (bcGiaoBanCurent?.TrucLanhDao || ""),{...styleTitle,h:0.5});

slideBCTongTrucHeNgoai.addText("Tổng trực: " + (bcGiaoBanCurent?.TTHeNgoai || ""), {
 ...styleTitle,y:0.5,h:0.5
});
let rowTongTrucHeNgoai = baocaongays.map((entry) => {
    let row = [];
    row.push(entry.KhoaID.TenKhoa);
    row.push(entry.BSTruc);
    
    ['ls-TongNB', 'ls-NgoaiGio', 'ls-ChuyenVien', 'ls-TuVong', 'ls-Nang', 'ls-XinVe', 'ls-PhauThuat'].forEach((code) => {
      row.push(entry[code] || 0);
    });

    return row;
  });

  rowTongTrucHeNgoai.unshift(["Khoa", "Bác sĩ trực", "Tổng số", "Vào viện", "Chuyển viện", "Tử vong", "NB nặng", "Xin về", "Phẫu thuật"]);

  slideBCTongTrucHeNgoai.addTable(rowTongTrucHeNgoai, {
    x: 0,
    y: 1,
    w: 10,
    h: 4.5,
    border: { type: 'solid', color: '1939B7', pt: 1 },
	colW:[2.2,2.1,0.8,0.8,0.9,0.8,0.8,0.8,0.8],
    color: "1939B7",
     fontFace: "Arial",
    fontSize: 14,
  });


//Export du lieu Trung tam CLC
let slideChuyenTrungTamCLC = pres.addSlide();
slideChuyenTrungTamCLC.addText("BÁO CÁO GIAO BAN", {...styleTitle,align: "center",});
slideChuyenTrungTamCLC.addText("PHẦN BÁO CÁO TRUNG TÂM KCB CHẤT LƯỢNG CAO", styleTextChuyenForm);


let slideThongKeGiuong = pres.addSlide();

slideThongKeGiuong.addText("Trung tâm khám chữa bệnh chất lượng cao",styleTitle);

const filterBCs = baocaongays.filter(baocaongay => baocaongay.KhoaID.MaKhoa === 'CLC');
let rowThongKeGiuong = {};
['clc-TongNB', 'clc-VaoThang', 'clc-ChuyenSang', 'clc-GiuongTrong'].forEach((code) => {
  rowThongKeGiuong[code] = 0;
});

if (filterBCs.length > 0) {
  const bcCLC = filterBCs[0];
  bcCLC.ChiTietChiSo.forEach((chitiet) => {
	if (rowThongKeGiuong.hasOwnProperty(chitiet.ChiSoCode)) {
	  rowThongKeGiuong[chitiet.ChiSoCode] = chitiet.SoLuong;
	}
  });
}

const tableThongKeGiuong = [
  ["Tổng số NB", "NB vào thẳng", "NB từ các khoa chuyển sang", "Số giường trống"],
  [rowThongKeGiuong['clc-TongNB'], rowThongKeGiuong['clc-VaoThang'], rowThongKeGiuong['clc-ChuyenSang'], rowThongKeGiuong['clc-GiuongTrong']],
];

slideThongKeGiuong.addTable(tableThongKeGiuong, {
  x: 0,
  y: 1,
  w: 10,
  h: 1,
  border: { type: 'solid', color: '1939B7', pt: 1 },
  color: "1939B7",
  align: "center",
  fontFace: "Arial",
  fontSize: 14,
});

  const bcTrungTamCLC = baocaongays.filter(
    baocaongay => ["NoiYC", "NgoaiYC", "HSCCYC"].includes(baocaongay.KhoaID.MaKhoa)
  );

  let totalRow = {
    TenKhoa: 'Tổng',
    BSTruc: '',
    'ls-TongNB': 0,
    'ls-NgoaiGio': 0,
    'ls-ChuyenVien': 0,
    'ls-TuVong': 0,
    'ls-Nang': 0,
    'ls-XinVe': 0,
    'ls-PhauThuat': 0,
  };

  const rowThongKeTrungTamCLC = bcTrungTamCLC.map((entry) => {
    const row = {
      TenKhoa: entry.KhoaID.TenKhoa,
      BSTruc: entry.BSTruc,
    };

    ['ls-TongNB', 'ls-NgoaiGio', 'ls-ChuyenVien', 'ls-TuVong', 'ls-Nang', 'ls-XinVe', 'ls-PhauThuat'].forEach((code) => {
      row[code] = 0;
    });

    entry.ChiTietChiSo.forEach((chitiet) => {
      if (row.hasOwnProperty(chitiet.ChiSoCode)) {
        row[chitiet.ChiSoCode] = chitiet.SoLuong;
        totalRow[chitiet.ChiSoCode] += chitiet.SoLuong;
      }
    });

    return row;
  });

  rowThongKeTrungTamCLC.unshift(totalRow);

  const tableThongKeTrungTamCLC = [
    ["Khoa", "Bác sĩ trực", "Tổng số", "Vào viện", "Chuyển viện", "Tử vong", "NB nặng", "Xin về", "Phẫu thuật"],
    ...rowThongKeTrungTamCLC.map(row => [
      row.TenKhoa, 
      row.BSTruc, 
      row['ls-TongNB'], 
      row['ls-NgoaiGio'], 
      row['ls-ChuyenVien'], 
      row['ls-TuVong'], 
      row['ls-Nang'], 
      row['ls-XinVe'], 
      row['ls-PhauThuat']
    ]),
  ];

  slideThongKeGiuong.addTable(tableThongKeTrungTamCLC, {
    x: 0,
    y: 2.1,
    w: 10,
    h: 3.5,
	margin: [0.5, 0.5, 0.5, 0.5],
	colW:[2.2,2.1,0.8,0.8,0.9,0.8,0.8,0.8,0.8],
	align: "center",
    border: { type: 'solid', color: '1939B7', pt: 1 },
    color: "1939B7",
    fontFace: "Arial",
    fontSize: 14,
  });

//Export du lieu Can lam sang
let slideChuyenCanLamSang = pres.addSlide();
slideChuyenCanLamSang.addText("BÁO CÁO GIAO BAN", {...styleTitle,align: "center",});
slideChuyenCanLamSang.addText("BÁO CÁO CẬN LÂM SÀNG", styleTextChuyenForm);

let slideCanLamSang = pres.addSlide();

slideCanLamSang.addText("Báo cáo cận lâm sàng",styleTitle);

const bcKhoaCLS = baocaongays.filter((baocaongay) =>
  ["CDHA", "TDCN", "XNHoaSinh", "XNViSinh", "XNHuyetHoc"].includes(baocaongay.KhoaID.MaKhoa)
).sort((a, b) => a.KhoaID.STT - b.KhoaID.STT);

const rowCamLamSang = bcKhoaCLS.map((entry) => {
  const row = {
	TenKhoa: entry.KhoaID.TenKhoa,
	BSTruc: entry.BSTruc,
  };

  [
	"cdha-Xquang",
	"cdha-CT16",
	"cdha-CT128",
	"cdha-MRI",
	"tdcn-SieuAm",
	"tdcn-NoiSoi",
	"xn-HuyetHoc",
	"xn-HoaSinh",
	"xn-ViSinh",
  ].forEach((code) => {
	row[code] = "";
  });

  entry.ChiTietChiSo.forEach((chitiet) => {
	if (row.hasOwnProperty(chitiet.ChiSoCode)) {
	  row[chitiet.ChiSoCode] = chitiet.SoLuong;
	}
  });

  return row;
});

const tableCanLamSang = [
  ["Khoa", "BS trực", "XQ", "CT16", "CT128", "MRI", "Siêu âm", "Nội soi", "XNHH", "Sinh hóa", "Vi sinh"],
  ...rowCamLamSang.map(row => [
	row.TenKhoa, 
	row.BSTruc, 
	row["cdha-Xquang"], 
	row["cdha-CT16"], 
	row["cdha-CT128"], 
	row["cdha-MRI"], 
	row["tdcn-SieuAm"], 
	row["tdcn-NoiSoi"], 
	row["xn-HuyetHoc"], 
	row["xn-HoaSinh"], 
	row["xn-ViSinh"]
  ]),
];

slideCanLamSang.addTable(tableCanLamSang, {
  x: 0,
  y: 1,
  w:10,
  h: 4.6,
  align: "center",
  border: { type: 'solid', color: '1939B7', pt: 1 },
  color: "1939B7",
  colW:[1.8,1.7,0.7,0.7,0.9,0.7,0.7,0.7,0.7,0.7,0.7],
  fontFace: "Arial",
  fontSize: 14,
});

//Export du lieu Huyet hoc truyen mau



let slideHuyethocTruyenMau = pres.addSlide();

slideHuyethocTruyenMau.addText("Báo cáo ĐV huyết học truyền máu",styleTitle);

const filterBCHuyetHocTM = baocaongays.filter(baocaongay => baocaongay.KhoaID.MaKhoa === 'HHTM');

const rowHHTM = {};
['Bacsi', 'hhtm-HongCau', 'hhtm-HuyetTuong', 'hhtm-TieuCau', "hhtm-TongXN"].forEach((code) => {
  rowHHTM[code] = "";
});

if(filterBCHuyetHocTM.length > 0) {
  const bcHHTM = filterBCHuyetHocTM[0];
  bcHHTM.ChiTietChiSo.forEach((chitiet) => {
	if (rowHHTM.hasOwnProperty(chitiet.ChiSoCode)) {
	  rowHHTM[chitiet.ChiSoCode] = chitiet.SoLuong;
	  rowHHTM['Bacsi'] = bcHHTM.BSTruc;
	}
  });
}

const tableHHTruyenMau = [
  ["Bác sĩ", "Khối hồng cầu", "Huyết tương tươi", "Tiểu cầu máy", "Tổng xét nghiệm"],
  [rowHHTM['Bacsi'], rowHHTM['hhtm-HongCau'], rowHHTM['hhtm-HuyetTuong'], rowHHTM['hhtm-TieuCau'], rowHHTM["hhtm-TongXN"]]
];

slideHuyethocTruyenMau.addTable(tableHHTruyenMau, {
  x: 0,
  y: 1,
  w: 10,
  h: 3,
  margin: [0.5, 0.5, 0.5, 0.5],
  border: { type: 'solid', color: '1939B7', pt: 1 },
  color: "1939B7",
  align: "center",
  fontFace: "Arial",
  fontSize: 14,
});


    //Export du lieu khoa GMHS
    let slide= pres.addSlide();
    slide.addText("Báo cáo khoa gây mê hồi sức", styleTitle);

    const row = {
      BSTruc: bcGM?.BSTruc || "",
      DDTruc: bcGM?.DDTruc || "",
    };
    ["gmhs-TongMo", "gmhs-TrongGio", "gmhs-NgoaiGio"].forEach((code) => {
      row[code] = 0;
    });

    bcGM?.ChiTietChiSo?.forEach((chitiet) => {
      if (row.hasOwnProperty(chitiet.ChiSoCode)) {
        row[chitiet.ChiSoCode] = chitiet.SoLuong;
      }
    });

    const rows = [
      [
        "Bác sĩ trực",
        "KTV, điều dưỡng trực",
        "Số ca phẫu thuật",
        "Số ca mổ trong giờ",
        "Số ca mổ ngoài giờ",
      ],
      [
        row.BSTruc,
        row.DDTruc,
        row["gmhs-TongMo"],
        row["gmhs-TrongGio"],
        row["gmhs-NgoaiGio"],
      ],
    ];

    slide.addTable(rows, styleCenterTable);
    slide.addImage({ path: "../../public/logoBVTPT.png" });
    pres.writeFile("BaoCaoKhoaGayMeHoiSuc.pptx");
  };
  return (
    <Container>
      <h1>Export Pptx</h1>
      <Button onClick={handleGMHS} variant="contained">
        {/* <Button onClick={()=>handleExport(rows,bcNgayKhoaCC,chiso)} variant="contained"> */}
        Export
      </Button>
    </Container>
  );
}

export default ExportPptx;
