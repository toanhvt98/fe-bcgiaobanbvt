import {
  
  Container,
  
  Stack,
  
} from "@mui/material";
import React from "react";

import ControllerDisplay from "../features/BaoCaoNgay/ControllerDisplay";

function BCKhoaPage() {
  
  return (
    <Container>
      <Stack>
        <ControllerDisplay />
        {/* <BCNgayLamSang/> */}
      </Stack>
    </Container>
  );
}

export default BCKhoaPage;
