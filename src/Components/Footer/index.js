import React from "react";
import {
  iconCoopLine1,
  iconCoopLine2,
  iconCoopLine3,
  iconCoopLine4,
} from "../../constants/inconCoop";

const logoapple = require("../../images/app2.png");
const logoandroid = require("../../images/app1.png");
const logofb = require("../../images/facebook.png");
const logozalo = require("../../images/zalo.png");
const logozion = require("../../images/coop20.jpg");
const logobct = require("../../images/bocongthuong.png");

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer_top">
        <div className="row myContainer">
          <div className="footer_item col-lg-4">
            <p className="footer_title">TIX</p>
            <div className="row">
              <div className="col-lg-6 ">
                <a href="#!" className="footer_link hidemobile">
                  FAQ
                </a>
                <a href="#!" className="footer_link hidemobile">
                  Brand Guidelines
                </a>
              </div>
              <div className="col-lg-6 mb-3">
                <a href="#!" className="footer_link">
                  Thỏa thuận sử dụng
                </a>
                <a href="#!" className="footer_link">
                  Chính sách bảo mật
                </a>
              </div>
            </div>
          </div>
          <div className="footer_item col-lg-4">
            <p className="footer_title">ĐỐI TÁC</p>
            <ul className="icon_coop_footer">
              <li>
                {iconCoopLine1.map((img, index) => (
                  <div key={index}>
                    <img className="iconCoop" src={img} alt="iconcoop" />
                  </div>
                ))}
              </li>
            </ul>
            <ul className="icon_coop_footer">
              <li>
                {iconCoopLine2.map((img, index) => (
                  <div key={index}>
                    <img className="iconCoop" src={img} alt="iconcoop" />
                  </div>
                ))}
              </li>
            </ul>
            <ul className="icon_coop_footer">
              <li>
                {iconCoopLine3.map((img, index) => (
                  <div key={index}>
                    <a href="#!">
                      <img className="iconCoop" src={img} alt="iconcoop" />
                    </a>
                  </div>
                ))}
              </li>
            </ul>
            <ul className="icon_coop_footer">
              <li>
                {iconCoopLine4.map((img, index) => (
                  <div key={index}>
                    <img className="iconCoop" src={img} alt="iconcoop" />
                  </div>
                ))}
              </li>
            </ul>
          </div>
          <div className="footer_item col-lg-2">
            <p className="footer_title">MOBILE APP</p>
            <div className="icon_app_footer">
              <img
                className="icon_coop_footer"
                src={logoapple}
                alt="logoapple"
              />
              <img
                className="icon_coop_footer"
                src={logoandroid}
                alt="logoandroid"
              />
            </div>
          </div>
          <div className="footer_item col-lg-2">
            <p className="footer_title">SOCIAL</p>
            <div className="icon_app_footer mb-3">
              <img className="text-center" src={logofb} alt="logofb" />
              <img className="text-center" src={logozalo} alt="logozalo" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <div className="row myContainer">
          <div className="col-lg-1 footer_bot_img pr-2 col-2">
            <img src={logozion} alt="logozion" />
          </div>
          <div className="col-lg-9 footer_bot_mid">
            <p className="footer_bot_title">
              TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
            </p>
            <span className="footer_bot_text">
              Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
              Chí Minh, Việt Nam.
            </span>
            <span className="footer_bot_text">
              Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
              <br /> đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do
              Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
            </span>
            <span className="footer_bot_text">
              Số Điện Thoại (Hotline): 1900 545 436 Email:
              <a href="#!">support@tix.vn</a>
            </span>
          </div>
          <div className="col-lg-2 col-3 text-center footer_bot_img">
            <img src={logobct} alt="logozion" />
          </div>
        </div>
      </div>
    </div>
  );
}
