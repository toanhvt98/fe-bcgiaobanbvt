import pptxgen from "pptxgenjs";
export function slideKhoaCapCuu(benhnhans, n) {
    let pptx = new pptxgen();
  let slide = pptx.addSlide();
  let rows = [];

// Row One: cells will be formatted according to any options provided to `addTable()`
rows.push(["First", "Second", "Third"]);

// Row Two: set/override formatting for each cell
rows.push([
    { text: "1st", options: { color: "ff0000" } },
    { text: "2nd", options: { color: "00ff00" } },
    { text: "3rd", options: { color: "0000ff" } },
]);

slide.addTable(rows, { x: 0.5, y: 1.0, w: 9.0, color: "363636" });

// -------
// TABLE 2: Using word-level formatting inside cells
// -------
// NOTE: An array of text/options objects provides fine-grained control over formatting
let arrObjText = [
    { text: "Red ", options: { color: "FF0000" } },
    { text: "Green ", options: { color: "00FF00" } },
    { text: "Blue", options: { color: "0000FF" } },
];

// EX A: Pass an array of text objects to `addText()`
slide.addText(arrObjText, {
    x: 0.5,
    y: 2.0,
    w: 9,
    h: 1,
    margin: 0.1,
    fill: "232323",
});

// EX B: Pass the same objects as a cell's `text` value
let arrTabRows = [
    [
        { text: "Cell 1 A", options: { fontFace: "Arial" } },
        { text: "Cell 1 B", options: { fontFace: "Courier" } },
        { text: arrObjText, options: { fill: "232323" } },
    ],
];

slide.addTable(arrTabRows, { x: 0.5, y: 3.5, w: 9, h: 1, colW: [1.5, 1.5, 6] });
return slide
  } 