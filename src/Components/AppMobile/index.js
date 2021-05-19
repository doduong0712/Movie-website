import React, { memo } from "react";
import sliderMobileData from "../../constants/sliderMobileData";
import SliderSlick from "../SliderSlick";

const mobile = require("../../images/mobile.png");

const customSlick = {
  speed: 500,
  dots: false,
  arrows: false,
};

function AppMobile() {
  return (
    <section id="mobile" className="mobile">
      <div className="myContainer">
        <div className="row">
          <div className="col-12 col-lg-6 text-center text-lg-left app_mobile_left">
            <p className="mobile_title">Ứng dụng tiện lợi dành cho</p>
            <p className="mobile_title">người yêu điện ảnh</p>
            <span className="mobile_text">
              Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và
              đổi quà hấp dẫn.
            </span>

            <button className="btnDowloadapp">
              App miễn phí - Tải về ngay!
            </button>
            <p className="mobile_text">
              TIX có hai phiên bản <a href="#!">iOS</a> &amp;
              <a href="#!">Android</a>
            </p>
          </div>
          <div className="col-12 col-lg-6 img-app-right">
            <img className="img_mobile" src={mobile} alt="mobile" />
            <div className="slider-mobile">
              {
                <SliderSlick customSlick={customSlick}>
                  {sliderMobileData.map((img, index) => (
                    <div key={index}>
                      <img src={img} className="img-fluid" alt="img-app" />
                    </div>
                  ))}
                </SliderSlick>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AppMobile);
