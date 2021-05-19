import React from "react";
import newsAPI from "../../API/newsAPI";
import useFetchData from "../../Hook/useFetchData";
import { TogglePostProvider } from "../../context/TogglePostContext";

import NewsGruop from "./NewsGruop";
import NavigationTab from "../../Components/NavigationTab";
import BtnViewMore from "../../Components/BtnViewMore";
import newDatapromotion from "../../constants/newDatapromotion";

const items = {
  news: "Điện ảnh 24h",
  review: "Review",
  promotion: "Khuyến mãi",
};
const imglike = require("../../images/like.png");
const imgcm = require("../../images/comment.png");

function News() {
  const news = useFetchData(newsAPI.getNewsPost, "posts");
  const review = useFetchData(newsAPI.getReviewPost, "posts");
  //console.log(news);

  const renderNewsPromotion = () => {
    if (newDatapromotion && newDatapromotion.length > 0) {
      return newDatapromotion.map((item, index) => {
        return (
          <div className="newsblock_items" key={index}>
            <div className="img__items">
              <span>
                <a href={item.link}>
                  <img src={item.hinhAnh} alt="khuyenmai" />
                </a>
              </span>
            </div>
            <div className="info__items">
              <h3 className="info__items--title">
                <span>
                  <a href={item.link}>{item.tieuDe}</a>
                </span>
              </h3>
              <p className="info__items--detail">{item.noiDung}</p>
            </div>
            <div className="interact__wapper">
              <div className="interact__items">
                <span>
                  <img src={imglike} alt="khuyenmai" />
                  <span className="like__num">{item.like}</span>
                </span>
              </div>
              <div className="interact__items">
                <span>
                  <img src={imgcm} alt="khuyenmai" />
                  <span className="comment__num">{item.comment}</span>
                </span>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <section className="newsblock" id="tintuc">
      <div className="myContainer">
        <NavigationTab items={items} />
        <div className="tab-content newsblock__content">
          <div
            className="newsblock__panel tab-pane fade show active"
            id="news"
            role="tabpanel"
            aria-labelledby="news-tab"
          >
            {news.loading && <div>Loading data ...</div>}
            {news.error && (
              <div>Có lỗi trong khi lấy dữ liệu, xin hãy thử lại sau</div>
            )}
            {news.posts && news.posts.length > 0 && (
              <div>
                <TogglePostProvider initialPosts={news.posts}>
                  <NewsGruop />

                  <BtnViewMore />
                </TogglePostProvider>
              </div>
            )}
            {/* {
              <TogglePostProvider initialPosts={newDatapromotion}>
                <NewsGruop />

                <BtnViewMore />
              </TogglePostProvider>
            } */}
          </div>
          <div
            className="newsblock__panel tab-pane fade "
            id="review"
            role="tabpanel"
            aria-labelledby="review-tab"
          >
            {review.loading && <div>Loading data ...</div>}
            {review.error && (
              <div>Có lỗi trong khi lấy dữ liệu, xin hãy thử lại sau</div>
            )}
            {review.posts && review.posts.length > 0 && (
              <div>
                <TogglePostProvider initialPosts={review.posts}>
                  <NewsGruop />

                  <BtnViewMore />
                </TogglePostProvider>
              </div>
            )}
          </div>
          <div
            className="newsblock__panel tab-pane fade "
            id="promotion"
            role="tabpanel"
            aria-labelledby="promotion-tab"
          >
            {renderNewsPromotion()}
            <div className="buttonViewMore_container">
              <button className="btnViewMore">Xem Thêm</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default News;
