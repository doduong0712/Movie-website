import React from "react";

import { useSelector } from "react-redux";

import DiscussHeader from "./DiscussHeader";
import DiscussGroup from "./DiscussGroup";

import { FAKE_IMG_USER } from "../../constants/config";
import { TogglePostProvider } from "../../context/TogglePostContext";

const avatar = require("../../images/avatar.png");

function DiscussSection() {
  const isLoggedIn = useSelector((state) => state.userLoginReducer.isLoggedIn);

  const reviews = useSelector((state) => state.reviewsReducer.post);

  return (
    <>
      <section className="discuss myContainer">
        <div
          className="discuss__click"
          data-toggle="modal"
          data-target="#reviewInput"
        >
          <div className="discuss__item">
            <DiscussHeader
              hasInfo={false}
              src={isLoggedIn ? FAKE_IMG_USER : avatar}
            />
          </div>
        </div>
        <div className="discuss__area clearfix">
          <TogglePostProvider initialPosts={reviews} postSize={5}>
            <DiscussGroup />
          </TogglePostProvider>
        </div>
      </section>
    </>
  );
}

export default DiscussSection;
