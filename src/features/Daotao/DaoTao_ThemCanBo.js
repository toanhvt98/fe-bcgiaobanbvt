import React, { useState } from "react";
import { useSelector } from "react-redux";

function DaoTao_ThemCanBo() {
  const khoa = useSelector((state) => state.baocaongay.khoas);
  console.log(khoa);
  return <div>DaoTao_ThemCanBo</div>;
}

export default DaoTao_ThemCanBo;
