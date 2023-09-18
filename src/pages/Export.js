import { Button, Container } from "@mui/material";
import React from "react";
import pptxgen from "pptxgenjs";
import { useSelector } from "react-redux";
import { getObjectByMaKhoa } from "../utils/heplFuntion";
import { BASE_TABLE_OPTS, BASE_TEXT_OPTS_L, BASE_TEXT_OPTS_R } from "../utils/enums.mjs";
function Export() {
 
  const handleExport1 = () => {
    // 1. Create a Presentation
let pptx = new pptxgen();

// 2. Add a Slide to the presentation
let slide = pptx.addSlide();
pptx.author = 'Brent Ely';
pptx.company = 'S.T.A.R. Laboratories';
pptx.revision = '15';
pptx.subject = 'Annual Report';
pptx.title = 'PptxGenJS Sample Presentation';

pptx.layout = 'LAYOUT_16x9';

pptx.theme = { headFontFace: "Arial Light" };
pptx.theme = { bodyFontFace: "Arial" };

// 3. Add 1+ objects (Tables, Shapes, etc.) to the Slide
slide.addText("Hello World from PptxGenJS...", {
    x: 1.5,
    y: 1.5,
    color: "363636",
    fill: { color: "F1F1F1" },
    align: pptx.AlignH.center,
});

let rows = [
  [
      { text: "Top Lft", options: { align: "left", fontFace: "Arial" } },
      { text: "Top Ctr", options: { align: "center", fontFace: "Verdana" } },
      { text: "Top Rgt", options: { align: "right", fontFace: "Courier" } },
  ],
];
slide.addTable(rows, { w: 9, rowH: 1, align: "left", fontFace: "Arial" });
// 4. Save the Presentation
pptx.writeFile({ fileName: "Sample Presentation.pptx" });
  };


  const { baocaongays, chiso } = useSelector((state) => state.bcgiaoban);
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

  const rows = getRowData();



  const handleExport = (rows, bcNgayKhoaCC, chiso) => {
    const pptx = new pptxgen();

    // Slide 1: Title slide
    const slide1 = pptx.addSlide();
    slide1.addText("I. Trực khoa cấp cứu", { fontSize: 24, bold: true });
    slide1.addText(`Kíp trực: ${bcNgayKhoaCC?.BSTruc} ${bcNgayKhoaCC?.DDTruc}`, {
      fontSize: 18,
      bold: true,
    });
  
    // Slide 2: Data Table
    const slide2 = pptx.addSlide();
    slide2.addText("Bệnh nhân vào viện các khoa", { fontSize: 24, bold: true });
  
    const table2 = slide2.addTable({
      x: 1,
      y: 2,
      w: 8,
      h: 4,
      colW: [1, 3, 3],
      autoPage: true,
    });
  
    table2.addRow({
      cells: [
        { text: "STT", bold: true },
        { text: "Khoa", bold: true },
        { text: "Vào viện", bold: true },
      ],
      fill: "363F4E",
      color: "FFFFFF",
      bold: true,
    });
  
    rows.forEach((row, index) => {
      table2.addRow({
        cells: [row["STT"], row.TenKhoa, row["ls-NgoaiGio"]],
        fill: index % 2 === 0 ? "E7E7E7" : "FFFFFF",
      });
    });
  
    // Slide 3: Additional data
    // const slide3 = pptx.addSlide();
    // slide3.addText("Khám ngoài giờ khoa cấp cứu", { fontSize: 24, bold: true });
  
    // const table3 = slide3.addTable({
    //   x: 1,
    //   y: 2,
    //   w: 8,
    //   h: 4,
    //   colW: [3, 3],
    //   autoPage: true,
    // });
  
    // table3.addRow({
    //   cells: [
    //     { text: "Khám cấp cứu", bold: true },
    //     { text: "Vào viện", bold: true },
    //   ],
    //   fill: "363F4E",
    //   color: "FFFFFF",
    //   bold: true,
    // });
  
    // table3.addRow([chiso["kcc-TongKham"], chiso["kcc-VaoVien"]]);
  
    // Save the presentation to a file
    pptx.writeFile("ThongKeVaoVien.pptx");
  } 
  const handleExportSlicemaster = () =>{
    let pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";

pptx.defineSlideMaster({
 title: "MASTER_SLIDE",
 background: { color: "FFFFFF" },
 objects: [
  { line: { x: 3.5, y: 1.0, w: 6.0, line: { color: "0088CC", width: 5 } } },
  { rect: { x: 0.0, y: 5.3, w: "100%", h: 0.75, fill: { color: "F1F1F1" } } },
  { text: { text: "Status Report", options: { x: 3.0, y: 5.3, w: 5.5, h: 0.75 } } },
  { image: { x: 11.3, y: 6.4, w: 1.67, h: 0.75, path: "images/logo.png" } },
 ],
 slideNumber: { x: 0.3, y: "90%" },
});

let slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
slide.addText("How To Create PowerPoint Presentations with JavaScript", { x: 0.5, y: 0.7, fontSize: 18 });
slide.addText("How To Create PowerPoint Presentations with JavaScript", { x: 0.5, y: 1, fontSize: 18 });
slide.addText("How To Create PowerPoint Pdsfsfsfresentations with JavaScript", { x: 0.5, y: 1.2, fontSize: 18 });
slide.addText("do trung kien", { x: 0.5, y: 1.56, fontSize: 18 });


let slide1 = pptx.addSlide({ masterName: "MASTER_SLIDE" });
slide.addText("How To Create PowerPoint Presentations with JavaScript", { x: 0.5, y: 0.7, fontSize: 18 });
slide.addText("How To Create PowerPoint Presentations with JavaScript", { x: 0.5, y: 1, fontSize: 18 });
slide.addText("How To Create PowerPoint Pdsfsfsfresentations with JavaScript", { x: 0.5, y: 1.2, fontSize: 18 });

pptx.writeFile();
  }

  const handlePlaceHolder = ()=>{
    let pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";

pptx.defineSlideMaster({
 title: "PLACEHOLDER_SLIDE",
 background: { color: "FFFFFF" },
 objects: [
  { rect: { x: 0, y: 0, w: "100%", h: 0.75, fill: { color: "F1F1F1" } } },
  { text: { text: "Status Report", options: { x: 0, y: 0, w: 6, h: 0.75 } } },
  {
   placeholder: {
    options: { name: "body", type: "body", x: 0.6, y: 1.5, w: 12, h: 5.25 },
    text: "(custom placeholder text!)",
   },
  },
 ],
 slideNumber: { x: 0.3, y: "95%" },
});

let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

// Add text, charts, etc. to any placeholder using its `name`
slide.addText("Body Placeholder here!", { placeholder: "body" });

pptx.writeFile();
  }

  const handleSliceSection = ()=>{
    let pptx = new pptxgen();

// STEP 1: Create a section
pptx.addSection({ title: "Tables" });

// STEP 2: Provide section title to a slide that you want in corresponding section
let slide = pptx.addSlide({ sectionTitle: "Tables" });

slide.addText("This slide is in the Tables section!", { x: 1.5, y: 1.5, fontSize: 18, color: "363636" });
pptx.writeFile({ fileName: "Section Sample.pptx" });
  }

  const handleAddNote =()=>{
    let pptx = new pptxgen();
let slide = pptx.addSlide();

slide.addText('Hello World!', { x:1.5, y:1.5, fontSize:18, color:'363636' });

slide.addNotes('This is my favorite slide!fdsfsdfsd');
slide.addImage({ path: "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg" });
pptx.writeFile('Sample Speaker Notes');
  }

  const handleShapes =()=>{
    let pptx = new pptxgen();
let slide = pptx.addSlide()
    // Shapes without text
// slide.addShape(pptx.ShapeType.rect, { fill: { color: "FF0000" } });

// slide.addShape(pptx.ShapeType.line, { line: { color: "FF0000", width: 1 } });

// Shapes with text
slide.addText("ShapeType.recthgfhfg", {
  shape: pptx.ShapeType.rect,
  fill: { color: "FF0000" },
});

pptx.writeFile('Shapes');
  }


  const handleShapesWithoutText =()=>{
    let pptx =new pptxgen()
    let slide = pptx.addSlide();

	slide.addTable([[{ text: "Shape Examples 1: Misc Shape Types (no text)", options: BASE_TEXT_OPTS_L }, BASE_TEXT_OPTS_R]], BASE_TABLE_OPTS);
	slide.addNotes("API Docs: https://gitbrent.github.io/PptxGenJS/docs/api-shapes.html");

	// TOP-ROW

	slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 0.8, w: 1.5, h: 3.0, fill: { color: pptx.colors.ACCENT1 }, line: { type: "none" } });
	slide.addShape(pptx.shapes.OVAL, { x: 2.2, y: 0.8, w: 3.0, h: 1.5, fill: { type: "solid", color: pptx.colors.ACCENT2 } });
	slide.addShape(pptx.shapes.CUSTOM_GEOMETRY, {
		x: 2.5,
		y: 2.6,
		w: 2.0,
		h: 1.0,
		fill: { color: pptx.colors.ACCENT3 },
		line: { color: "151515", width: 1 },
		points: [
			{ x: 0.0, y: 0.0 },
			{ x: 0.5, y: 1.0 },
			{ x: 1.0, y: 0.8 },
			{ x: 1.5, y: 1.0 },
			{ x: 2.0, y: 0.0 },
			{ x: 0.0, y: 0.0, curve: { type: "quadratic", x1: 1.0, y1: 0.5 } },
			{ close: true },
		],
	});
	slide.addShape(pptx.shapes.RECTANGLE, { x: 5.7, y: 0.8, w: 1.5, h: 3.0, fill: { color: pptx.colors.ACCENT4 }, rotate: 45 });
	slide.addShape(pptx.shapes.OVAL, { x: 7.4, y: 1.5, w: 3.0, h: 1.5, fill: { color: pptx.colors.ACCENT6 }, rotate: 90 }); // TEST: no type
	slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
		x: 10,
		y: 0.8,
		w: 3.0,
		h: 1.5,
		rectRadius: 1,
		fill: { color: pptx.colors.ACCENT5 },
		line: "151515",
		lineSize: 1,
	}); // TEST: DEPRECATED: `fill`,`line`,`lineSize`
	slide.addShape(pptx.shapes.ARC, { x: 10.75, y: 2.45, w: 1.5, h: 1.45, fill: { color: pptx.colors.ACCENT3 }, angleRange: [45, 315] });

	// BOTTOM ROW

	slide.addShape(pptx.shapes.LINE, { x: 4.2, y: 4.4, w: 5.0, h: 0.0, line: { color: pptx.colors.ACCENT2, width: 1, dashType: "lgDash" } });
	slide.addShape(pptx.shapes.LINE, {
		x: 4.2,
		y: 4.8,
		w: 5.0,
		h: 0.0,
		line: { color: pptx.colors.ACCENT2, width: 2, dashType: "dashDot" },
		lineHead: "arrow",
	}); // TEST: DEPRECATED: lineHead
	slide.addShape(pptx.shapes.LINE, { x: 4.2, y: 5.2, w: 5.0, h: 0.0, line: { color: pptx.colors.ACCENT2, width: 3, endArrowType: "triangle" } });
	slide.addShape(pptx.shapes.LINE, {
		x: 4.2,
		y: 5.6,
		w: 5.0,
		h: 0.0,
		line: { color: pptx.colors.ACCENT2, width: 4, beginArrowType: "diamond", endArrowType: "oval" },
	});

	slide.addShape(pptx.shapes.RIGHT_TRIANGLE, {
		x: 0.4,
		y: 4.3,
		w: 6.0,
		h: 3.0,
		fill: { color: pptx.colors.ACCENT5 },
		line: { color: pptx.colors.ACCENT1, width: 3 },
		shapeName: "First Right Triangle",
	});
	slide.addShape(pptx.shapes.RIGHT_TRIANGLE, {
		x: 7.0,
		y: 4.3,
		w: 6.0,
		h: 3.0,
		fill: { color: pptx.colors.ACCENT5 },
		line: { color: pptx.colors.ACCENT1, width: 2 },
		flipH: true,
	});
  pptx.writeFile("Shape no text")
  }

const handleShapeWithText=()=>{
  let pptx = new pptxgen()
  let slide = pptx.addSlide();

	slide.addTable([[{ text: "Shape Examples 2: Misc Shape Types (with text)", options: BASE_TEXT_OPTS_L }, BASE_TEXT_OPTS_R]], BASE_TABLE_OPTS);
	slide.addNotes("API Docs: https://gitbrent.github.io/PptxGenJS/docs/api-shapes.html");

	slide.addText("RECTANGLE", {
		shape: pptx.shapes.RECTANGLE,
		x: 0.5,
		y: 0.8,
		w: 1.5,
		h: 3.0,
		fill: { color: pptx.colors.ACCENT1 },
		align: "center",
		fontSize: 14,
	});
	slide.addText("OVAL (transparency:50)", {
		shape: pptx.shapes.OVAL,
		x: 2.2,
		y: 0.8,
		w: 3.0,
		h: 1.5,
		fill: { type: "solid", color: pptx.colors.ACCENT2, transparency: 50 },
		align: "center",
		fontSize: 14,
	});
	slide.addText("CUSTOM", {
		shape: pptx.shapes.CUSTOM_GEOMETRY,
		x: 2.5,
		y: 2.6,
		w: 2.0,
		h: 1.0,
		fill: { color: pptx.colors.ACCENT3 },
		line: { color: "151515", width: 1 },
		points: [
			{ x: 0.0, y: 0.0 },
			{ x: 0.5, y: 1.0 },
			{ x: 1.0, y: 0.8 },
			{ x: 1.5, y: 1.0 },
			{ x: 2.0, y: 0.0 },
			{ x: 0.0, y: 0.0, curve: { type: "quadratic", x1: 1.0, y1: 0.5 } },
			{ close: true },
		],
		align: "center",
		fontSize: 14,
	});
	slide.addText("RECTANGLE (rotate:45)", {
		shape: pptx.shapes.RECTANGLE,
		x: 5.7,
		y: 0.8,
		w: 1.5,
		h: 3.0,
		fill: { color: pptx.colors.ACCENT4 },
		rotate: 45,
		align: "center",
		fontSize: 14,
	});
	// TEST: DEPRECATED: `alpha`
	slide.addText("OVAL (rotate:90, transparency:75)", {
		shape: pptx.shapes.OVAL,
		x: 7.4,
		y: 1.5,
		w: 3.0,
		h: 1.5,
		fill: { type: "solid", color: pptx.colors.ACCENT6, alpha: 75 },
		rotate: 90,
		align: "center",
		fontSize: 14,
	});
	slide.addText("ROUNDED-RECTANGLE\ndashType:dash\nrectRadius:1", {
		shape: pptx.shapes.ROUNDED_RECTANGLE,
		x: 10,
		y: 0.8,
		w: 3.0,
		h: 1.5,
		fill: { color: pptx.colors.ACCENT5 },
		align: "center",
		fontSize: 14,
		line: { color: "151515", size: 1, dashType: "dash" },
		rectRadius: 1,
	});
	slide.addText("ARC", {
		shape: pptx.shapes.ARC,
		x: 10.75,
		y: 2.45,
		w: 1.5,
		h: 1.45,
		fill: { color: pptx.colors.ACCENT3 },
		angleRange: [45, 315],
		line: { color: "151515", width: 1 },
		fontSize: 14,
	});
	//
	slide.addText("LINE size=1", {
		shape: pptx.shapes.LINE,
		align: "center",
		x: 4.15,
		y: 4.4,
		w: 5,
		h: 0,
		line: { color: pptx.colors.ACCENT2, width: 1, dashType: "lgDash" },
	});
	slide.addText("LINE size=2", {
		shape: pptx.shapes.LINE,
		align: "left",
		x: 4.15,
		y: 4.8,
		w: 5,
		h: 0,
		line: { color: pptx.colors.ACCENT2, width: 2, dashType: "dashDot", endArrowType: "arrow" },
	});
	slide.addText("LINE size=3", {
		shape: pptx.shapes.LINE,
		align: "right",
		x: 4.15,
		y: 5.2,
		w: 5,
		h: 0,
		line: { color: pptx.colors.ACCENT2, width: 3, beginArrowType: "triangle" },
	});
	slide.addText("LINE size=4", {
		shape: pptx.shapes.LINE,
		x: 4.15,
		y: 5.6,
		w: 5,
		h: 0,
		line: { color: pptx.colors.ACCENT2, width: 4, beginArrowType: "diamond", endArrowType: "oval", transparency: 50 },
	});
	//
	slide.addText("RIGHT-TRIANGLE", {
		shape: pptx.shapes.RIGHT_TRIANGLE,
		align: "center",
		x: 0.4,
		y: 4.3,
		w: 6,
		h: 3,
		fill: { color: pptx.colors.ACCENT5 },
		line: { color: "696969", width: 3 },
	});
	slide.addText("HYPERLINK-SHAPE", {
		shape: pptx.shapes.RIGHT_TRIANGLE,
		align: "center",
		x: 7.0,
		y: 4.3,
		w: 6,
		h: 3,
		fill: { color: pptx.colors.ACCENT5 },
		line: { color: "696969", width: 2 },
		flipH: true,
		hyperlink: { url: "https://github.com/gitbrent/pptxgenjs", tooltip: "Visit Homepage" },
	});
  pptx.writeFile('Shape with text')
}
 
const exportToPpt=(bcGM)=> {
  let pres = new pptxgen();

  let slide = pres.addSlide();

  slide.addText("Báo cáo khoa gây mê hồi sức", {
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

  const row = {
    BSTruc: bcGM.BSTruc,
    DDTruc: bcGM.DDTruc,
  };
  ['gmhs-TongMo', 'gmhs-TrongGio', 'gmhs-NgoaiGio'].forEach((code) => {
    row[code] = 0;
  });

  bcGM.ChiTietChiSo.forEach((chitiet) => {
    if (row.hasOwnProperty(chitiet.ChiSoCode)) {
      row[chitiet.ChiSoCode] = chitiet.SoLuong;
    }
  });

  const rows = [
    [
      { text: "Bác sĩ trực", options: { fontFace: "Arial", bold: true, fontSize: 14, align: "center", valign: "middle", color: "000000", fill: "F2F2F2" }},
      { text: "KTV, điều dưỡng trực", options: { fontFace: "Arial", bold: true, fontSize: 14, align: "center", valign: "middle", color: "000000", fill: "F2F2F2" }},
      { text: "Số ca phẫu thuật", options: { fontFace: "Arial", bold: true, fontSize: 14, align: "center", valign: "middle", color: "000000", fill: "F2F2F2" }},
      { text: "Số ca mổ trong giờ", options: { fontFace: "Arial", bold: true, fontSize: 14, align: "center", valign: "middle", color: "000000", fill: "F2F2F2" }},
      { text: "Số ca mổ ngoài giờ", options: { fontFace: "Arial", bold: true, fontSize: 14, align: "center", valign: "middle", color: "000000", fill: "F2F2F2" }}
    ],
    [
      { text: row.BSTruc, options: { fontFace: "Arial", fontSize: 14, align: "center", valign: "middle", color: "000000" }},
      { text: row.DDTruc, options: { fontFace: "Arial", fontSize: 14, align: "center", valign: "middle", color: "000000" }},
      { text: row['gmhs-TongMo'], options: { fontFace: "Arial", fontSize: 14, align: "center", valign: "middle", color: "000000" }},
      { text: row['gmhs-TrongGio'], options: { fontFace: "Arial", fontSize: 14, align: "center", valign: "middle", color: "000000" }},
      { text: row['gmhs-NgoaiGio'], options: { fontFace: "Arial", fontSize: 14, align: "center", valign: "middle", color: "000000" }}
    ],
  ];

  slide.addTable(rows, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 3,
    border: { type: "solid", color: "000000", pt: 1 },
  });

  pres.writeFile("BaoCaoKhoaGayMeHoiSuc.pptx");
}




const handleTable1 =()=>{
  let pptx = new pptxgen()
  let slide = pptx.addSlide()
//   let rows = [["Cell 1", "Cell 2", "Cell 3"]];
// slide.addTable(rows, { w: 9 });

// TABLE 2: Multi-row table
// - each row's array element is an array of cells
// let rows = [["A1", "B1", "C1"]];
// slide.addTable(rows, { align: "left", fontFace: "Arial" });

// TABLE 3: Formatting at a cell level
// - use this to selectively override the table's cell options
let rows = [
    [
        { text: "Top Lft", options: { align: "left", fontFace: "Arial" } },
        { text: "Top Ctr", options: { align: "center", fontFace: "Verdana" } },
        { text: "Top Rgt", options: { align: "right", fontFace: "Courier" } },
    ],
];
slide.addTable(rows, { w: 9, rowH: 1, align: "left", fontFace: "Arial" });
pptx.writeFile('table')
}

const handleTable2 = ()=>{
 let pptx = new pptxgen();

pptx.writeFile('table 2')
}
  return (
    <Container>
      <h1>Export</h1>
      <Button onClick={handleTable2} variant="contained">
      {/* <Button onClick={()=>handleExport(rows,bcNgayKhoaCC,chiso)} variant="contained"> */}
        Export
      </Button>
    </Container>
  );
}

export default Export;

