import { Button, Container } from "@mui/material";
import React from "react";
import pptxgen from "pptxgenjs";
function Export() {
 
  const handleExport = () => {
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
  return (
    <Container>
      <h1>Export</h1>
      <Button onClick={handleExport} variant="contained">
        Export
      </Button>
    </Container>
  );
}

export default Export;
