import { Button, Container } from '@mui/material'
import React from 'react'
import pptxgen from "pptxgenjs";
function Export() {
    // 1. Create a new Presentation
let pres = new pptxgen();

// 2. Add a Slide
let slide = pres.addSlide();

// 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
let textboxText = "Hello World from PptxGenJS!";
let textboxOpts = { x: 1, y: 1, color: "363636" };
slide.addText(textboxText, textboxOpts);
const handleExport = () =>{
    let pres = new pptxgen();

// 2. Add a Slide
let slide = pres.addSlide();

// 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
let textboxText = "Hello World from PptxGenJS!";
let textboxOpts = { x: 1, y: 1, color: "363636" };
slide.addText(textboxText, textboxOpts);
pres.writeFile()
}
  return (
    <Container>

    <h1>
        Export
    </h1>
    <Button variant='contained'>Export</Button>
    </Container>
  )
}

export default Export
