import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Badge from "@material-ui/core/Badge";
import Drawer from "@material-ui/core/Drawer";

import HomeIcon from "@material-ui/icons/Home";
import TableIcon from "@material-ui/icons/BorderAll";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FAQIcon from "@material-ui/icons/HelpOutline";
import MenuIcon from "@material-ui/icons/Menu";
import UIElementsIcon from "@material-ui/icons/FilterNone";
import LibraryIcon from "@material-ui/icons/LibraryBooks";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SupportIcon from "@material-ui/icons/QuestionAnswer";

import React, { useState } from "react";
import clsx from "clsx";
import { withRouter } from "react-router-dom"; // Lấy được location
import useAdminStyles from "../../../style/useAdminStyle";
import SiderbarLink from "./SiderbarLink";
import Title from "../Title";
import { USER_KEY } from "../../../constants/config";

const stucture = [
  {
    id: 0,
    label: "Movie Management",
    link: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    id: 1,
    label: "User Management",
    link: "",
    icon: <TableIcon />,
  },
  {
    id: 3,
    label: "Notifications",
    link: "",
    icon: <NotificationsIcon />,
  },
  {
    id: 4,
    label: "UI Elements",
    link: "",
    icon: <UIElementsIcon />,
  },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "HELP" },
  { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
  { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
  { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
  { id: 10, type: "divider" },
  { id: 11, type: "title", label: "PROJECTS" },
  {
    id: 12,
    label: "My recent",
    link: "",
    icon: <MenuIcon />,
  },
  {
    id: 13,
    label: "Starred",
    link: "",
    icon: <MenuIcon />,
  },
  {
    id: 14,
    label: "Background",
    link: "",
    icon: <MenuIcon />,
  },
];

const getAdminInfo = () => {
  const admin = localStorage.getItem(USER_KEY);
  if (admin) {
    return JSON.parse(admin).taiKhoan;
  }
  return "ADMIN";
};

function SideBar(props) {
  const classes = useAdminStyles();
  const [open, setOpen] = useState(true); // Lấy được location pathname , search,hash state
  /* console.log(props.location); */ return (
    <>
      <CssBaseline />{" "}
      {/* hêm một số kiểu trực quan mặc định vào các phần tử mặc định, đặt lại đệm và v.v. */}
      {/* Mini variant drawer //mater-UI
      https://material-ui.com/components/drawers/#mini-variant-drawer
 */}
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Xin chào {getAdminInfo()}
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={"0"} color="secondary">
              {/* Badge generates a small badge to the top-right of its child(ren). */}
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }} //Drawer
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Title className={classes.toolbarTitle}>DASHBOARD</Title>
          <IconButton onClick={() => setOpen(false)}>
            <ArrowBackIcon />
          </IconButton>
        </div>

        <List>
          {stucture.map((link) => (
            <SiderbarLink key={link.id} location={props.location} {...link} />
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default withRouter(SideBar);
