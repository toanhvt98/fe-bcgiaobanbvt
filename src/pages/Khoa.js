import {
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { listKhoa } from "../features/Khoa/khoaSlice";
import KhoaTable from "../features/Khoa/KhoaTable";
function Khoa() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listKhoa());
  }, [dispatch]);
  const [openCreate, setOpenCreate] = useState(false);
  const dskhoa = useSelector((state) => state.khoa);
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
        Quản lý Khoa
      </Typography>
      <Card sx={{ p: 3 }}>
        <Button
          variant="contained"
          onClick={() => {
            setOpenCreate(true);
          }}
        >
          <AddIcon />
          <Typography variant="subtitle" sx={{ ml: 1 }}>
            Thêm
          </Typography>
        </Button>
        <KhoaTable />
      </Card>
    </Container>
  );
}

export default Khoa;
