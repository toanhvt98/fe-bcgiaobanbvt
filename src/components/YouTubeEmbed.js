import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const YouTubeEmbed = ({ link }) => {
    // Lấy ID của video từ đường dẫn YouTube
    const videoId = link.split('v=')[1]?.split('&')[0];

    // Kiểm tra nếu không có videoId
    if (!videoId) {
        return <Typography variant="body2">Đường dẫn không hợp lệ</Typography>;
    }

    // Tạo URL nhúng video
    const embedLink = `https://www.youtube.com/embed/${videoId}`;

    return (
        <Card variant="outlined" style={{ maxWidth: '480px', margin: '20px auto' }}>
            <CardMedia
                component="iframe"
                height="270"
                src={embedLink}
                title="YouTube Video"
            />
            <CardContent>
                <Typography variant="body2">
                    Đường dẫn video: {link}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default YouTubeEmbed;
