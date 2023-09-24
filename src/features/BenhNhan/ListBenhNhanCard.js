import React from "react";
import {
  
  Card,
  
  Grid,
  CardHeader,
} from "@mui/material";

import BenhNhanCard from "./BenhNhanCard";

// import useAuth from "../../hooks/useAuth";
// import ActionButton from "./ActionButton";

function ListBenhNhanCard({ benhnhans,title }) {
  return (
    <Card sx={{mt:3,px:1}}>
      <CardHeader title={title} />
      <Grid container spacing={2} my={1}>
        {benhnhans.map((benhnhan) => (
          <Grid key={benhnhan.Stt} item xs={12} md={6}>
            <BenhNhanCard benhnhan={benhnhan} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default ListBenhNhanCard;
