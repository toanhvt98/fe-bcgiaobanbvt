import React from 'react';
import { Container, Grid, Card, CardContent, Typography, AppBar, Toolbar } from '@mui/material';

const ChiSoChatLuong = () => {
    // Dữ liệu giả định, thay thế bằng dữ liệu thực từ server hoặc API
    const data = [
        { name: "Chờ trung bình khám toàn viện", value: "20 phút" },
        { name: "Chờ lâu nhất", value: "45 phút" },
        // Thêm các chỉ số khác tương tự
    ];

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Dashboard Chỉ Số Chất Lượng</Typography>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{item.name}</Typography>
                                <Typography variant="h6">{item.value}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ChiSoChatLuong;
