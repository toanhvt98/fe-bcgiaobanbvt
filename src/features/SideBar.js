
import React, { useState } from 'react';
import { List, ListItemText, Collapse, ListItemIcon, ListItemButton, Container, Card, Box } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector } from 'react-redux';

const treeData = [
  {
    id: 'khoacapcuu',
    name: 'Khoa cấp cứu',
    children: []
  },
  {
    id: 'khoakhambenh',
    name: 'Khoa khám bệnh',
    children: []
  },
  {
    id: 'henoi',
    name: 'Hệ nội',
    children: [
      {
        id: 'tongtruchenoi',
        name: 'BC tổng trực',
      },
      {
        id: 'ngoaigiohenoi',
        name: 'Vào viện ngoài giờ',
      }
    ]
  },
  {
    id: 'hengoai',
    name: 'Hệ ngoại',
    children: [
      {
        id: 'tongtruchengoai',
        name: 'BC tổng trực',
      },
      {
        id: 'ngoaigiohengoai',
        name: 'Vào viện ngoài giờ',
              }
    ]
  },
  {
    id: 'trungtamclc',
    name: 'Trung tâm KCB CLC',
    children: [
      {
        id: 'tinhhinhchungclc',
        name: 'Tình hình chung',
      },
      
    ]
  },

  {
    id: 'canlamsang',
    name: 'BC cận lâm sàng',
    children: []
  },
  // ... thêm các nút và phần tử con khác ở đây
];

const RenderTree = ({ nodes, level = 0, handleScroll }) => {
  const [open, setOpen] = useState(false);

  const hasChildren = nodes && Array.isArray(nodes.children) && nodes.children.length > 0;
 
  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    }
    handleScroll(nodes.id);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon style={{ minWidth: '30px', marginLeft: `${level * 20}px`, visibility: hasChildren ? 'visible' : 'hidden' }}>
          {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </ListItemIcon>
        <ListItemText primary={nodes.name} />
      </ListItemButton>
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {nodes.children.map(childNode => (
              <RenderTree key={childNode.id} nodes={childNode} level={level + 1} handleScroll={handleScroll} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

function SideBar({ handleScroll }) {
  const {noiBNTuvongs,
    noiBNChuyenViens,
    noiBNXinVes,
    noiBNNangs,
    noiBNNgoaiGios,
    
    ngoaiBNTuvongs,
    ngoaiBNChuyenViens,
    ngoaiBNXinVes,
    ngoaiBNNangs,
    ngoaiBNPhauThuats,
    ngoaiBNNgoaiGios,
    
    clcBNTuvongs,
    clcBNChuyenViens,
    clcBNXinVes,
    clcBNNangs,
    
    hsccycBNNgoaiGios,
    noiycBNNgoaiGios,
    ngoaiycBNPhauThuats,
    ngoaiycBNNgoaiGios,
  } = useSelector((state) => state.bcgiaoban)

  if (noiBNTuvongs.length >0 ) {

  }
  return (
   
    <List>
      {treeData.map(node => (
        <RenderTree key={node.id} nodes={node} handleScroll={handleScroll} />
      ))}
    </List>
  
  );
};

export default SideBar;