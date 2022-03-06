import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import WindowDimension from "./windowDimension";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import GateLogo from "../assets/Logo.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
export default function ButtonAppBar() {
  const { height, width } = WindowDimension();
  const [sideBar, setSideBar] = React.useState(false);
  function handleClick(e) {
    console.log(e);
    setSideBar(!sideBar);
  }
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <List>
        <ListItem>
          <img
            src={GateLogo}
            alt="GateLogo"
            width={"40%"}
            height={"40%"}
            style={{
              paddingLeft: "25%",
            }}
          />
        </ListItem>
        {["Profile", "Edit Profile", "New Request"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index == 0 ? <AccountCircleIcon /> : <></>}
              {index == 1 ? <EditIcon /> : <></>}
              {index == 2 ? <AddCircleOutlineIcon /> : <></>}
            </ListItemIcon>
            <ListItemText style={{ marginLeft: "-10px" }}>
              <Typography variant="HeadingList">{text}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="Heading"
            style={{
              flexGrow: 1,
              backgroundColor: "",
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              textAlign: "center",
            }}
          >
            Welcome to Gate Pass System
          </Typography>
          <Button color="inherit" variant="outlined">
            <LogoutIcon />
            {width <= 414 ? `` : `Logout`}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={sideBar} onClose={handleClick}>
        {list("left")}
      </Drawer>
    </Box>
  );
}
