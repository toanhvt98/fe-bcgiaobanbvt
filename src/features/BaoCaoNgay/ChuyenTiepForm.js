
import { useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  Typography,
  Link,
  Divider,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
  Container,
  Grid,
  ImageList,
  ImageListItem,
} from "@mui/material";

function ChuyenTiepForm({title,id}) {
  // backgroundColor: "#f2f2f2"
  return (
    <Container id ={id}>
      <Paper elevation={3} sx={{ backgroundColor: "#fce1ac", p: 3 }}>
        {/* Tiêu đề */}
        <Typography variant="h4" sx={{ color: "#004d99", marginBottom: 1 ,textAlign:'center'}}>
         {title}
        </Typography>

        {/* Đường phân tách */}
       
      </Paper>
    </Container>
  );
}

export default ChuyenTiepForm;
