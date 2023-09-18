import { Button, Container } from "@mui/material";
import React from "react";
import pptxgen from "pptxgenjs";
import { useSelector } from "react-redux";
import { getObjectByMaKhoa } from "../utils/heplFuntion";
import { BASE_TABLE_OPTS, BASE_TEXT_OPTS_L, BASE_TEXT_OPTS_R } from "../utils/enums.mjs";
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
}
// margin: [0.5, 0.5, 0.5, 0.5], colSpan: 2
const styleCenterCell ={
	fontFace: "Arial", fontSize: 16,  align: "center", color: "1939B7",bold: true, 
	valign: "middle",
}
const styleLeftCell ={
	fontFace: "Arial", fontSize: 16, align: "left", color: "1939B7",bold: true,
	valign: "middle",
}
const styleTitle = {
    x: 0,
    y: 0,
    fontSize: 30,
    color: "FFFFFF",
    fill: { color: "1939B7" },
    align: "center",
    w: 10,
    h: 1,
  }
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
	chiso,
  } = useSelector((state) => state.bcgiaoban);



  //Du lieu khoa GMHS
  const bcGMHS = baocaongays.filter((baocaongay)=>{
	return (baocaongay.KhoaID.MaKhoa==='GMHS')
  })
  const bcGM=bcGMHS[0]

const handleGMHS =()=>{
	let pres = new pptxgen();


//Du lieu khoa cap cuu

const bcFilterTheoMaKhoa = getObjectByMaKhoa(baocaongays,'KCC');
  let bcNgayKhoaCC = {BSTruc:"",DDTruc:""};
  if (bcFilterTheoMaKhoa.length > 0) bcNgayKhoaCC=bcFilterTheoMaKhoa[0];

  
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
	  fontSize: 15,
	  fontFace: "Arial",
	  bold: true,
	  color: "FFFFFF",
	  fill: { color: "1939B7" },
	  align: "left",
	  w: 10,
	  h: 0.5,
	});

	slideKCC.addText(`Kíp trực: ${bcNgayKhoaCC?.BSTruc} ${bcNgayKhoaCC?.DDTruc}`, {
	  x: 0,
	  y: 0.5,
	  fontSize: 15,
	  fontFace: "Arial",
	  bold: true,
	  color: "FFFFFF",
	  fill: { color: "1939B7" },
	  align: "left",
	  w: 10,
	  h: 0.5,
	});
  
	// const table1Data = [
	// 	[
	// 	  { text: "Khám ngoài giờ khoa cấp cứu", options: { fontFace: "Arial", fontSize: 14, colSpan: 2, rowSpan: 2, align: "center", valign: "middle", color: "000000", fill: "F2F2F2" }},
	// 	  {}, // cell này sẽ bị "trộn" nên chúng ta để nó trống
	// 	  { text: "Khám cấp cứu", options: { fontFace: "Arial", fontSize: 14, align: "center", valign: "middle", color: "000000", fill: "F2F2F2" }},
	// 	  { text: "Vào viện", options: { fontFace: "Arial", fontSize: 14, align: "center", valign: "middle", color: "000000", fill: "F2F2F2" }},
	// 	],
	// 	[
	// 	  {}, // cell này sẽ bị "trộn" nên chúng ta để nó trống
	// 	  {}, // cell này sẽ bị "trộn" nên chúng ta để nó trống
	// 	  { text: chiso['kcc-TongKham'], options: { fontFace: "Arial", fontSize: 14, align: "center", valign: "middle", color: "000000" }},
	// 	  { text: chiso['kcc-VaoVien'], options: { fontFace: "Arial", fontSize: 14, align: "center", valign: "middle", color: "000000" }},
	// 	]
	// const styleCenterCell ={
	// 	fontFace: "Arial", fontSize: 14, colSpan: 2, align: "center", color: "1939B7", fill: "F2F2F2",bold: true, margin: [0.5, 0.5, 0.5, 0.5],
	// 	valign: "middle",
	// }
	//   ];
	  
	const table1Data = [
	  [
		{ text: "Khám ngoài giờ khoa cấp cứu", options: {...styleCenterCell,colSpan: 2, rowSpan: 2}},
		{},
		{ text: "Khám cấp cứu", options: styleCenterCell},
		{ text: "Vào viện", options: styleCenterCell},
	  ],
	  [
		{},
		{},
		{ text: chiso['kcc-TongKham'], options: { fontFace: "Arial", fontSize: 14, align: "center", valign: "middle", color: "000000" }},
		{ text: chiso['kcc-VaoVien'], options: { fontFace: "Arial", fontSize: 14, align: "center", valign: "middle", color: "000000" }},
	  ]
	];
	slideKCC.addTable(table1Data, {
		x: 0.5,
		y: 2.5,
		w: 9,
		h: 2,
		border: { type: "solid", color: "1939B7", pt: 1 },
	  });

	//Benh nhan vao vien cac khoa
	let slideBNVaoVienCacKhoa = pres.addSlide();
	slideBNVaoVienCacKhoa.addText("Bệnh nhân vào viện các khoa", {
		x: 0,
		y: 0,
		fontSize: 15,
		fontFace: "Arial",
		bold: true,
		color: "FFFFFF",
		fill: { color: "1939B7" },
		align: "center",
		w: 10,
		h: 1,
	  });
  
	const table2Data = [
	  [
		{ text: "STT", options: styleCenterCell},
		{ text: "Khoa", options: styleCenterCell},
		{ text: "Vào viện", options: styleCenterCell},
	  ],
	  ...rowsKhoaCC.map((row, index) => [
		{ text: row.STT, options: styleCenterCell},
		{ text: row.TenKhoa, options: styleLeftCell},
		{ text: row['ls-NgoaiGio'], options: styleCenterCell},
	  ])
	];
  
	slideBNVaoVienCacKhoa.addTable(table2Data, {
	  x: 0,
	  y: 1,
	  w: 10,
	  h: 4.5,
	  border: { type: "solid", color: "1939B7", pt: 1 },autoPage: true,
	});
  


//Export khoa kham benh
let slideKhoaKhamBenh = pres.addSlide();

// Adding Title
slideKhoaKhamBenh.addText("II. Khoa khám bệnh", {
  x: 0.5,
  y: 0.5,
  fontSize: 20,
  fontFace: "Arial",
  bold: true,
  color: "FFFFFF",
  fill: { color: "1939B7" },
  align: "center",
  w: 9,
  h: 1,
});

// Adding Table
const tableData = [
  [
	{ text: "Tổng khám", options: { rowSpan: 3 } },
	{ text: "Bảo hiểm", options: { rowSpan: 3 } },
	{ text: "Viện phí", options: { rowSpan: 3 } },
	{ text: "Khám yêu cầu", options: { rowSpan: 3 } },
	{ text: "Vào viện", options: { rowSpan: 3 } },
	{ text: "Chuyển viện", options: { colSpan: 2 } },
	{ text: "Ngoại tỉnh", options: { colSpan: 4 } },
  ],
  [
	"", "", "", "", "",
	{ text: "Nội Trú", options: { rowSpan: 2 } },
	{ text: "Ngoại Trú", options: { rowSpan: 2 } },
	{ text: "Ngoại trú", options: { colSpan: 2 } },
	{ text: "Nội trú", options: { colSpan: 2 } },
  ],
  [
	"", "", "", "", "", "", "",
	"Bảo hiểm", "Viện phí", "Bảo hiểm", "Viện phí"
  ],
  [
	chiso['kkb-TongKham'], chiso['kkb-BaoHiem'], chiso['kkb-VienPhi'], chiso['kkb-YeuCau'], chiso['kkb-NBVaoVien'],
	chiso['kkb-CVNoiTru'], chiso['kkb-CVNgoaiTru'], 
	chiso['kkb-NgoaiTinhNgoaiTruBH'], chiso['kkb-NgoaiTinhNgoaiTruVP'], 
	chiso['kkb-NgoaiTinhNoiTruBH'], chiso['kkb-NgoaiTinhNoiTruVP']
  ]
];

slideKhoaKhamBenh.addTable(tableData, {
  x: 0.5,
  y: 1.5,
  w: '90%',
  h: 4,
  border: { type: "solid", color: "000000", pt: 1 },
  fill: { color: "F2F2F2" },
  colW: [1.5, 1.5, 1.5, 1.5, 1.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  fontFace: "Arial",
  fontSize: 12,
  color: "000000",
  align: "center",
  valign: "middle"
});


	//Export du lieu khoa GMHS
  let slide = pres.addSlide();
  slide.addText("Báo cáo khoa gây mê hồi sức", styleTitle);

  const row = {
    BSTruc: bcGM?.BSTruc ||"",
    DDTruc: bcGM?.DDTruc || "",
  };
  ['gmhs-TongMo', 'gmhs-TrongGio','gmhs-NgoaiGio'].forEach((code) => {
    row[code] = 0;
  });

  bcGM?.ChiTietChiSo?.forEach((chitiet) => {
    if (row.hasOwnProperty(chitiet.ChiSoCode)) {
      row[chitiet.ChiSoCode] = chitiet.SoLuong;
    }
  });

  const rows = [
    ["Bác sĩ trực", "KTV, điều dưỡng trực", "Số ca phẫu thuật", "Số ca mổ trong giờ", "Số ca mổ ngoài giờ"],
    [row.BSTruc, row.DDTruc, row['gmhs-TongMo'], row['gmhs-TrongGio'], row['gmhs-NgoaiGio']],
  ];

  slide.addTable(rows, styleCenterTable);

  pres.writeFile("BaoCaoKhoaGayMeHoiSuc.pptx");
}
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
