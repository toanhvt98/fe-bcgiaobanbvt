import React from 'react';
import { Container, Grid, Card, CardContent, Typography, AppBar, Toolbar, Stack } from '@mui/material';

const ChiSoChatLuong = () => {
    // Dữ liệu giả định, thay thế bằng dữ liệu thực từ server hoặc API
    const data = [
        { name: "Bệnh nhân đăng ký khám", value: "800" },
        { name: "Bệnh nhân đã gọi khám", value: "250" },
        { name: "Chờ trung bình khám toàn viện", value: "20 phút" },
        { name: "Chờ lâu nhất", value: "45 phút" },
        { name: "Chờ nhanh nhất", value: "45 phút" },
      
        // Thêm các chỉ số khác tương tự
    ];

    return (
        <Stack>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">THỜI GIAN CHỜ KHÁM BỆNH</Typography>
                </Toolbar>
            </AppBar>

            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={4} md={2} key={index}>
                        <Card>
                            <CardContent>
                                <Typography >{item.name}</Typography>
                                <Typography variant="h6">{item.value}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">THỜI GIAN KHÁM BỆNH BÁC SĨ</Typography>
                </Toolbar>
            </AppBar>
            
            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={4} md={2} key={index}>
                        <Card>
                            <CardContent>
                                <Typography >{item.name}</Typography>
                                <Typography variant="h6">{item.value}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">THỜI GIAN KHÁM BỆNH BÁC SĨ</Typography>
                </Toolbar>
            </AppBar>
            
            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={4} md={2} key={index}>
                        <Card>
                            <CardContent>
                                <Typography >{item.name}</Typography>
                                <Typography variant="h6">{item.value}</Typography>
                                <Typography variant="h6">{item.value}</Typography>
                                <Typography variant="h6">{item.value}</Typography>
                                <Typography variant="h6">{item.value}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>


        </Stack>
    );
}

export default ChiSoChatLuong;
