import { Box, Paper, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";

export default function ProfileContent() {
  const [value, setvalue] = useState(0);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setvalue(newValue);
  };
  const tabContent = [
    { label: "About", content: <ProfileAbout /> },
    { label: "Photos", content: <ProfilePhotos /> },
    { label: "Events", content: <ProfileActivities/> },
    { label: "Followers", content: <ProfileFollowings activeTab={value}/> },
    { label: "Following", content: <ProfileFollowings activeTab={value}/>}
  ];

  return (
    <Paper
      sx={{
        mt: 2,
        p: 3,
        height: 500,
        display: "flex",
        alignItems: "flex-start",
        borderRadius: 3,
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, height: 450, minWidth: 200 }}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} sx={{ mr: 3 }} />
        ))}
      </Tabs>
      <Box sx={{flexGrow:1,p:3,pt:0}}>
        {tabContent[value].content}
      </Box>
    </Paper>
  );
}