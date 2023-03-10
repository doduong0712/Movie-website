import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import useMedia from "../../Hook/useMedia";
import NavTabLogo from "../NavTabLogo";
import TabPanel from "../TabPanel";
import { DESKTOP_MEDIA } from "../../constants/config";

import TheaterPanelItems from "./TheaterPanelItems";
import GroupMoviesInCinema from "./GroupMoviesInCinema";

const setTimeClick = () => {
  //xoa het class acctive cua link
  document
    .querySelectorAll(".theaterList__details .tab-pane .logo__wrapper")
    .forEach((link) => {
      //console.log(link);

      link.classList.remove("active");
    });
  // async sau click vao link (se tu them class active da xoa vao phan tu dau tien cua pane co class active (do lick vao tam hinh))
  setTimeout(() => {
    document
      .querySelectorAll(".theaterList__details .tab-pane")
      .forEach((tab) => {
        //console.log(tab);

        if (tab.classList.contains("active")) {
          //The contains() trả về một giá trị Boolean cho biết liệu một nút có phải là con của một nút được chỉ định hay không.
          tab.firstElementChild.firstElementChild.click();
        }
      });
  }, 250);
};

function TheaterList(props) {
  const { listHeThongLichChieu } = props;
  //console.log(listHeThongLichChieu);

  // useEffect(() => {
  //   fetchListHeThongRap();
  //   fetchListHeThongLichChieu();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    // khi bam vao logo thi se tu dong (wait 0.25s) bam vao link dau tien co .active
    const imgs = document.querySelectorAll(
      ".theaterList__logos .logo__wrapper"
    );
    //console.log(imgs);

    imgs.forEach((img) => {
      img.addEventListener("click", () => {
        setTimeClick();
        //console.log(setTimeClick());
      });
    });
    //console.log("did mount");
  });

  const isDesktop = useMedia(DESKTOP_MEDIA);

  return (
    <section className="theaterList" id="theaterList">
      <div className="myContainer">
        <div className="row flex-md-row flex-column">
          {/*  */}
          {/* COT THU 1*/}
          {/*  */}
          {/* NAV THEATER LOGO */}
          <div className="nav nav-tabs theaterList__logos flex-md-column">
            <NavTabLogo hasLabel={false} />
          </div>
          {/*  */}
          {/* COT THU 2 */}
          {/*  */}
          {/* NAV THEATER DETAILS */}
          <div className="tab-content theaterList__details">
            {listHeThongLichChieu &&
              listHeThongLichChieu.length > 0 &&
              listHeThongLichChieu.map((item, index) => {
                const setting = {
                  className: `tab-pane fade ${
                    index === 0 ? "show active" : ""
                  }`,
                  id: item.maHeThongRap,
                };
                return (
                  <TabPanel settings={setting} key={item.maHeThongRap}>
                    <div className="nav nav-tabs">
                      <TheaterPanelItems heThongRap={item} />
                    </div>
                  </TabPanel>
                );
              })}
          </div>
          {/*  */}
          {/* COT THU 3 */}
          {/*  */}
          {/* MOVIE LIST : Chỉ render desktop view*/}
          {isDesktop && (
            <div className="tab-content theaterList__movies">
              {/* Hiển thị toàn bộ phim của tất cả cụm rạp */}
              {/* <TabContentMovies /> */}
              {listHeThongLichChieu &&
                listHeThongLichChieu.length > 0 &&
                listHeThongLichChieu.map((heThongLichChieu, index) => {
                  return (
                    <Fragment key={heThongLichChieu.maHeThongRap}>
                      {heThongLichChieu.lstCumRap.map((cumRap, j) => {
                        return (
                          <GroupMoviesInCinema
                            key={cumRap.maCumRap}
                            cumRap={cumRap}
                            index={index}
                            j={j}
                          />
                        );
                      })}
                    </Fragment>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    listHeThongLichChieu: state.listHeThongRapReducer.listHeThongLichChieu,
  };
};

export default connect(mapStateToProps, null)(TheaterList);
