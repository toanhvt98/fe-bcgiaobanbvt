import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export const GenerateDocument = async (data) => {
  try {
    // Tải file template
    const response = await fetch("/thongbaoscyk.docx");
    const blob = await response.blob();
    const content = await blob.arrayBuffer();

    // Tạo một instance của PizZip với nội dung file template
    const zip = new PizZip(content);

    // Tạo một instance của Docxtemplater
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Đổ dữ liệu vào template
    doc.setData(data);

    // Render document với dữ liệu
    doc.render();

    // Tạo blob từ document và lưu file
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Sử dụng FileSaver để tải file
    saveAs(out, "thong bao su co.docx");
  } catch (error) {
    console.error("Error generating document: ", error);
  }
};

// Ví dụ sử dụng
// export default GenerateDocument
