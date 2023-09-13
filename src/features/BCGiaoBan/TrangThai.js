import React from 'react';
import Chip from '@mui/material/Chip';

const TrangThai = ({ trangthai }) => {
  if (trangthai) {
    return (
      <Chip
        label="Đã duyệt"
        style={{
          backgroundColor: '#1939B7',
        //   backgroundColor: '#08099a',
          color: 'white',
          fontSize: '1rem',
          padding: '4px',
          borderRadius: '8px'
        }}
      />
    );
  } else {
    return (
      <Chip
        label="Chưa duyệt"
        style={{
        //   backgroundColor: '#d4aabf',
          backgroundColor: '#bb1515',
        //   backgroundColor: '#fe0808',
        //   backgroundColor: 'red',
          color: 'white',
          fontSize: '1rem',
          padding: '4px',
          borderRadius: '8px'
        }}
      />
    );
  }
};

export default TrangThai;
