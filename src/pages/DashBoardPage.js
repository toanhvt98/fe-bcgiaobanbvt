import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Box, Card, Container, Stack, Tab, Tabs } from "@mui/material";
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';



import styled from "@emotion/styled";
import ChiSoChatLuong from "../features/DashBoard/ChiSoChatLuong";
import DieuHanh from "../features/DashBoard/DieuHanh";
import TaiChinh from "../features/DashBoard/TaiChinh";
import HaiLongNguoiBenh from "../features/DashBoard/HaiLongNguoiBenh";




const TabsWrapperStyled = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
//   backgroundColor: "#fff",
  
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

function DashBoardPage() {
  const { user } = useAuth();
  
  const [currentTab, setCurrentTab] = useState("CHỈ SỐ CHẤT LƯỢNG");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  
  const PROFILE_TABS = [
    {
      value: "CHỈ SỐ CHẤT LƯỢNG",
    //   icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      
      component: <ChiSoChatLuong />,
    },
    {
      value: "ĐIỀU HÀNH",
    //   icon: <PeopleAltIcon sx={{ fontSize: 24 }} />,
      component: <DieuHanh />,
    },
    {
      value: "TÀI CHÍNH",
    //   icon: <ContactMailIcon sx={{ fontSize: 24 }} />,
      component: <TaiChinh />,
    },
    {
      value: "HÀI LÒNG NGƯỜI BỆNH",
    //   icon: <SendTimeExtensionIcon sx={{ fontSize: 24 }} />,
      component: <HaiLongNguoiBenh />,
    },
    
  ];
  return (
    <Stack>
      
      <Card
        sx={{
          mb: 3,
          height: 50,
          position: "relative",
        }}
      >
        
        <TabsWrapperStyled>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={(tab.value)}
              />
            ))}
          </Tabs>
        </TabsWrapperStyled>
      </Card>
      {PROFILE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Stack>
  );
}

export default DashBoardPage;
