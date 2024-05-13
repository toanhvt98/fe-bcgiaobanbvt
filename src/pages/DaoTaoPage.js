import React, { useEffect } from "react";
import {
  Stack,
  Typography,
  Card,
  Box,
  TablePagination,
  Container,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DaoTao_ThongTinCanBo from "../features/Daotao/DaoTao_ThongTinCanBo";
import { useDispatch, useSelector } from "react-redux";
import {
  fn_GetDanhSachCanBo,
  fn_getDanhSachKhoa,
} from "../features/Daotao/daotaoSlice";
function DaoTaoPage() {
  const dispatch = useDispatch();
  const danhSachCanBo = useSelector((state) => state.daotao.danhsachcanbo);
  console.log(danhSachCanBo);
  useEffect(() => {
    // Gọi hàm để lấy danh sách cán bộ khi component được tạo
    dispatch(fn_getDanhSachKhoa());
    dispatch(fn_GetDanhSachCanBo());
  }, [dispatch]);
  return (
    <Stack direction="column" justifyContent="center">
      <Stack textAlign="center">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Đào tạo
        </Typography>
      </Stack>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Container>
            <Grid
              container
              direction="row"
              justifyContent="left"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={1}>
                <Box>
                  <ManageAccountsIcon sx={{ width: 45, height: 45 }} />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">Quản lý cán bộ</Typography>
              </Grid>
            </Grid>
          </Container>
        </AccordionSummary>
        <AccordionDetails>
          <DaoTao_ThongTinCanBo />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

export default DaoTaoPage;
