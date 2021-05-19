import React from "react";
import { connect } from "react-redux";
import useMedia from "../../Hook/useMedia";
import { DESKTOP_MEDIA } from "../../constants/config";
import ListOfDay from "./ListOfDay";
import Theater from "./Theater";
import TheaterPanel from "./TheaterPanel";

function SingleShowTimeDetail(props) {
  const { listHeThongRap } = props;
  const isDesktop = useMedia(DESKTOP_MEDIA);

  return (
    <section className="detail">
      <div className="detail-wrapper">
        {/* LIST OF DAY */}

        <ListOfDay />
        {/* THEATER */}
        <div className="nav detail__theater" role="tablist">
          <Theater />
        </div>
        {/* SHOW LIST only show in desktop view*/}
        {isDesktop && (
          <div className="detail__showList tab-content">
            {/* <TheaterPanel /> */}
            {listHeThongRap &&
              listHeThongRap.length > 0 &&
              listHeThongRap.map((item, index) => {
                return (
                  <TheaterPanel
                    key={item.maHeThongRap}
                    index={index}
                    heThongRap={item}
                  />
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
  };
};

export default connect(mapStateToProps, null)(SingleShowTimeDetail);
