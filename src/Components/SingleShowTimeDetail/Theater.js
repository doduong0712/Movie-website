import React from "react";
import { connect } from "react-redux";
import TabPanel from "../TabPanel";
import LogoHeThongRap from "../LogoHeThongRap";
import useMedia from "../../Hook/useMedia";
import NavTabLogo from "../NavTabLogo";
import { MOBILE_MEDIA } from "../../constants/config";
import TheaterPanel from "./TheaterPanel";

const renderLogoAsCollapse = (listHeThongRap) => {
  if (listHeThongRap && listHeThongRap.length > 0) {
    return listHeThongRap.map((item) => {
      const settingsCollapse = {
        className: "collapsed MOBILE wrapper__collapse?",
        "data-toggle": "collapse",
        "data-target": `#${item.maHeThongRap}`,
      };
      return (
        <div className="logo__wrapper collapse__mobile" key={item.maHeThongRap}>
          <TabPanel settings={settingsCollapse}>
            <LogoHeThongRap heThong={item} hasLabel={true} />
          </TabPanel>
          {/* collapse items */}
          <TheaterPanel heThongRap={item} />
        </div>
      );
    });
  }
};

function Theater(props) {
  const { listHeThongRap } = props;

  const isMobile = useMedia(MOBILE_MEDIA);

  return (
    <>
      {isMobile ? (
        <> {renderLogoAsCollapse(listHeThongRap)} </>
      ) : (
        <NavTabLogo hasLabel={true} />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
  };
};

export default connect(mapStateToProps, null)(Theater);
