export function removeAndRenumber(benhnhans, n) {
  // Remove the element with Stt = n
  const filteredBenhnhans = benhnhans.filter((benhNhan) => benhNhan.Stt !== n);

  // Renumber the Stt for remaining elements
  return filteredBenhnhans.map((benhNhan, index) => {
    return { ...benhNhan, Stt: index + 1 }; // Stt starts from 1
  });
}
export function getTextFromNumber(number) {
  const mapping = {
    1: "Tử vong",
    2: "Chuyển viện",
    3: "Nặng xin về",
    4: "Nặng tại khoa",
    5: "Phẫu thuật",
    6: "Vào viện ngoài giờ",
  };
  return mapping[number] || "Invalid input";
}
// export function filterChiTietBenhNhans(baocaongays, LoaiBN, LoaiKhoa) {
//   return baocaongays
//     .filter(baocaongay => baocaongay.KhoaID.LoaiKhoa === LoaiKhoa)
//     .map(baocaongay => baocaongay.ChiTietBenhNhan)
//     .reduce((acc, chitietArray) => {
//       const filtered = chitietArray.filter(chitiet => chitiet.LoaiBN === LoaiBN);
//       return acc.concat(filtered);
//     }, []);
// }

export function filterChiTietBenhNhansNotExcludeTTCLC(baocaongays, LoaiBN, LoaiKhoa) {
  // Mảng các MaKhoa không được phép
    // const excludedMaKhoa = ["NoiYC", "NgoaiYC", "HSCCYC"]; //tam ngung chuc nang nay

    const excludedMaKhoa = [""]; //tam ngung nen sua tam

  return baocaongays
    .filter((baocaongay) => {
      // Kiểm tra LoaiKhoa và MaKhoa không nằm trong mảng excludedMaKhoa
      return (
        baocaongay.KhoaID.LoaiKhoa === LoaiKhoa &&
        !excludedMaKhoa.includes(baocaongay.KhoaID.MaKhoa)
      );
    })
    .map((baocaongay) => {
      const tenKhoa = baocaongay.KhoaID.TenKhoa;
      return baocaongay.ChiTietBenhNhan.map((chitiet) => {
        // Thêm trường TenKhoa vào mỗi ChiTietBenhNhan
        return { ...chitiet, TenKhoa: tenKhoa };
      });
    })
    .reduce((acc, chitietArray) => {
      const filtered = chitietArray.filter(
        (chitiet) => chitiet.LoaiBN === LoaiBN
      );
      return acc.concat(filtered);
    }, []);
}
export function filterChiTietBenhNhansHasExcludeTTCLC(baocaongays, LoaiBN, LoaiKhoa) {
  // Mảng các MaKhoa không được phép
    const excludedMaKhoa = ["NoiYC", "NgoaiYC", "HSCCYC"];
  return baocaongays
    .filter((baocaongay) => {
      // Kiểm tra LoaiKhoa và MaKhoa không nằm trong mảng excludedMaKhoa
      return (
        baocaongay.KhoaID.LoaiKhoa === LoaiKhoa &&

        
        !excludedMaKhoa.includes(baocaongay.KhoaID.MaKhoa)
      );
    })
    .map((baocaongay) => {
      const tenKhoa = baocaongay.KhoaID.TenKhoa;
      return baocaongay.ChiTietBenhNhan.map((chitiet) => {
        // Thêm trường TenKhoa vào mỗi ChiTietBenhNhan
        return { ...chitiet, TenKhoa: tenKhoa };
      });
    })
    .reduce((acc, chitietArray) => {
      const filtered = chitietArray.filter(
        (chitiet) => chitiet.LoaiBN === LoaiBN
      );
      return acc.concat(filtered);
    }, []);
}

export function filterChiTietBenhNhansCLC(baocaongays, LoaiBN, MaKhoas) {
  return baocaongays
    .filter((baocaongay) => {
      // Kiểm tra MaKhoa có nằm trong mảng MaKhoas hay không
      return MaKhoas.includes(baocaongay.KhoaID.MaKhoa);
    })
    .map((baocaongay) => {
      const tenKhoa = baocaongay.KhoaID.TenKhoa;
      return baocaongay.ChiTietBenhNhan.map((chitiet) => {
        // Thêm trường TenKhoa vào mỗi ChiTietBenhNhan
        return { ...chitiet, TenKhoa: tenKhoa };
      });
    })
    .reduce((acc, chitietArray) => {
      const filtered = chitietArray.filter(
        (chitiet) => chitiet.LoaiBN === LoaiBN
      );
      return acc.concat(filtered);
    }, []);
}

export function findKhoasInBaocaongays(baocaongays, khoas) {
  // Tạo một Set để lưu trữ các _id của khoa đã xuất hiện trong baocaongays
  console.log("bcngay in find",baocaongays);
  console.log("khoas in find",khoas);
  const khoaIdsInBaocaongays = new Set(
    baocaongays.map((baocaongay) => baocaongay.KhoaID._id)
  );
  console.log("set", khoaIdsInBaocaongays);
  // Lọc ra các khoa có _id tồn tại trong baocaongays
  const KhoaDaGuis = khoas.filter((khoa) => khoaIdsInBaocaongays.has(khoa._id));

  // Lọc ra các khoa có _id không tồn tại trong baocaongays
  const KhoaChuaGuis = khoas.filter(
    (khoa) => !khoaIdsInBaocaongays.has(khoa._id)
  );

  return { KhoaDaGuis, KhoaChuaGuis };
}

//hàm gom giá trị các chỉ số vào object
export function extractChiSo(baocaongays, chisoCodes) {
  // Khởi tạo một đối tượng để lưu trữ SoLuong của từng chỉ số
  const chiso = {};

  // Đặt giá trị ban đầu là 0 cho tất cả các key trong chisoCodes
  chisoCodes.forEach((code) => {
    chiso[code] = 0;
  });

  // Duyệt qua tất cả các baocaongays để lấy SoLuong của các chỉ số
  baocaongays.forEach((baocaongay) => {
    baocaongay.ChiTietChiSo.forEach((chitiet) => {
      if (chiso.hasOwnProperty(chitiet.ChiSoCode)) {
        chiso[chitiet.ChiSoCode] = chitiet.SoLuong;
      }
    });
  });

  return chiso;
}

export function TinhTongTheoChiSo(baocaongays, chisoCodes) {
  // Khởi tạo một đối tượng để lưu trữ tổng của từng chỉ số
  const chiso = {};

  // Đặt giá trị ban đầu là 0 cho tất cả các key trong chisoCodes
  chisoCodes.forEach((code) => {
    chiso[code] = 0;
  });

  // Duyệt qua tất cả các baocaongays để tính tổng các chỉ số
  baocaongays.forEach((baocaongay) => {
    baocaongay.ChiTietChiSo.forEach((chitiet) => {
      if (chiso.hasOwnProperty(chitiet.ChiSoCode)) {
        chiso[chitiet.ChiSoCode] += chitiet.SoLuong;
      }
    });
  });

  return chiso;
}

export function CheckDisplayKhoa(phanquyen, trangthaiduyet, makhoaUser, makhoaCurent) {
  // If trangthaiduyet is true, return false
  if (trangthaiduyet) {
    return false;
  }

  // If phanquyen is 'admin', return true
  if (phanquyen === 'admin') {
    return true;
  }

  // Return whether makhoaUser matches makhoaCurent
  return makhoaUser === makhoaCurent;
}
export const commonStyle = {
  color: '#1939B7',
  fontWeight: 'bold',
  fontSize: '1rem',
  textAlign: 'center',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  border: '1px solid #1939B7',
};
export const commonStyleLeft = {
  color: '#1939B7',
  fontWeight: 'bold',
  fontSize: '1rem',
  
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  border: '1px solid #1939B7',
};
export function getObjectByMaKhoa(arr, maKhoa) {
  return arr.filter((item) => item.KhoaID.MaKhoa === maKhoa);
}

export function addTenKhoaToUsers(users, khoas) {
  // Create a mapping from KhoaID to TenKhoa
  const khoaDict = {};
  khoas.forEach(khoa => {
    khoaDict[khoa._id] = khoa.TenKhoa;
  });

  // Use map to create a new array of updated user objects
  const updatedUsers = users.map(user => {
    const khoaID = user.KhoaID;
    if (khoaDict.hasOwnProperty(khoaID)) {
      return {
        ...user,
        TenKhoa: khoaDict[khoaID]
      };
    }
    return user;
  });

  return updatedUsers;
};
