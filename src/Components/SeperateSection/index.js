import React, { memo } from "react";
const spaceimg = require("../../images/section.png");

function SeperateSection() {
  const styles = {
    background: `url(${spaceimg})  center center/cover`,
    marginTop: "20px",
    paddingTop: "10%",
  };
  return <section style={styles}></section>;
}
export default memo(SeperateSection);
