import Divider from "@material-ui/core/Divider"; //Đường kẻ ngang chia các mục
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader"; //Style chữ mờ

import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import useAdminStyles from "../../../style/useAdminStyle";

function SiderbarLink(props) {
  const classes = useAdminStyles();
  const { link, icon, label, location, type } = props;

  const isLinkActive = link && location.pathname === link; // Chỉ tới các đường link và active link lên , nếu có link và location.pathname được click thì sẽ so sanh trong link để ra kết quả true hay false

  if (type === "title") {
    return <ListSubheader inset>{label}</ListSubheader>;
  }
  if (type === "divider") return <Divider />;

  return (
    <ListItem
      button
      component={link && Link}
      to={link}
      className={clsx(isLinkActive && classes.activeNavLink)}
    >
      <ListItemIcon className={clsx(isLinkActive && classes.activeNavLink)}>
        {icon}
      </ListItemIcon>
      <ListItemText
        className={clsx(isLinkActive && classes.activeNavLink)}
        primary={label}
      />
    </ListItem>
  );
}

export default SiderbarLink;
