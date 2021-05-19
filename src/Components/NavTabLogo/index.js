import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TabPanel from "../TabPanel";
import LogoHeThong from "../LogoHeThongRap";

function NavTabLogo(props) {
  const { listHeThongRap, hasLabel } = props;

  const renderLogo = () => {
    return listHeThongRap.map((item, index) => {
      const settings = {
        className: `logo__wrapper ${index === 0 ? "active" : ""}`,
        "data-toggle": "tab",
        role: "tab",
        "data-target": `#${item.maHeThongRap}`,
      };

      return (
        <TabPanel key={item.maHeThongRap} settings={settings}>
          <LogoHeThong hasLabel={hasLabel} heThong={item} />
        </TabPanel>
      );
    });
  };

  return <>{renderLogo()}</>;
}
const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
  };
};

NavTabLogo.propTypes = {
  listHeThongRap: PropTypes.array.isRequired,
  hasLabel: PropTypes.bool.isRequired,
};
NavTabLogo.dafaultProps = {
  listHeThongRap: [],
  hasLabel: false,
};

export default connect(mapStateToProps, null)(NavTabLogo);
