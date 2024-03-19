import * as XLSX from 'xlsx';

export const ExportToExcell = (data, fileName) => {
  // Tạo một Workbook mới
  const wb = XLSX.utils.book_new();

  // Chuyển đổi dữ liệu JSON thành một worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Thêm worksheet vào workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Tạo một blob và tải xuống
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

  // Tạo và kích hoạt một liên kết tạm thời để tải file
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.xlsx`;
  document.body.appendChild(a);
  a.click();

  // Dọn dẹp
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Hỗ trợ hàm chuyển đổi
const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
};

// Dữ liệu mẫu và sử dụng hàm

