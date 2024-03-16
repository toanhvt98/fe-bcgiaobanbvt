import React from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

function exportDocx(data) {
  // Load template (bạn cần chuyển đổi file .docx của mình thành base64 hoặc sử dụng một phương thức khác để tải file này vào)
  // Ví dụ, file này có thể được tải lên qua input type='file' hoặc được lưu trữ trên server
  const input = document.getElementById('upload').files[0];

  const reader = new FileReader();
  reader.onload = function(e) {
    const content = e.target.result;
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Thay thế các biến trong template với dữ liệu
    doc.render(data);

    const out = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    // Lưu file mới
    saveAs(out, 'output.docx');
  };

  reader.readAsBinaryString(input);
}

function ExportWord() {
  const data = {
    name: 'John Doe',
    address: '123 Main St.',
  };

  return (
    <div>
      <input type="file" id="upload" />
      <button onClick={() => exportDocx(data)}>Tạo Tài Liệu</button>
    </div>
  );
}

export default ExportWord;

