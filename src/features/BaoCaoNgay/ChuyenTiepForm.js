

import {
  
  Typography,
  
  Paper,
  Container,
 
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";

function ChuyenTiepForm({title,id}) {
  // backgroundColor: "#f2f2f2"
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container id ={id}>
      <Paper elevation={3} sx={{ backgroundColor: "white", p: 3 }}>
        {/* Tiêu đề */}
        <Typography variant="h5" sx={{fontSize:isSmallScreen?'1.2rem':'1.8rem', color: "#bb1515", marginBottom: 2 ,textAlign:'center'}}>
         {title}
        </Typography>

        {/* Đường phân tách */}
       
      </Paper>
    </Container>
  );
}

export default ChuyenTiepForm;
