import React from "react";
import PropTypes from "prop-types";
import { MOBILE_MEDIA } from "../../constants/config";
import useMedia from "../../Hook/useMedia";
import TabPanel from "../TabPanel";
import CinemaDetailItem from "../CinemaDetailItem";
import GroupMoviesInCinema from "./GroupMoviesInCinema";

function TheaterPanelItems(props) {
  const { heThongRap } = props;
  const listCumRap = heThongRap.lstCumRap;
  const isMobile = useMedia(MOBILE_MEDIA);
  //console.log("ismobile", isMobile);
  //console.log(listCumRap);

  if (listCumRap && listCumRap.length > 0) {
    return listCumRap.map((cumRap, index) => {
      const settings = isMobile
        ? {
            className: `logo__wrapper collapse__mobile`,
          }
        : {
            className: `logo__wrapper ${index === 0 ? "active" : ""}`,
            "data-toggle": "tab",
            role: "tab",
            "data-target": `#${cumRap.maCumRap.trim()}`,
          };
      const settingsCollapse = {
        className: `collapsed main__collapse`,
        "data-toggle": "collapse",
        "data-target": `#${cumRap.maCumRap.trim()}`,
      };

      /* collapse group in mobile view */

      return (
        <TabPanel key={cumRap.maCumRap} settings={settings}>
          {isMobile ? (
            <>
              <TabPanel settings={settingsCollapse}>
                <CinemaDetailItem cinema={cumRap} system={heThongRap} />
              </TabPanel>
              {/* collapse group in mobile view */}
              <GroupMoviesInCinema cumRap={cumRap} />
            </>
          ) : (
            <CinemaDetailItem cinema={cumRap} system={heThongRap} />
          )}
        </TabPanel>
      );
    });
  }
}

TheaterPanelItems.propTypes = {
  heThongRap: PropTypes.object.isRequired,
};

export default TheaterPanelItems;
