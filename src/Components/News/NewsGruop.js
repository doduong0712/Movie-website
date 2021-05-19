import React, { Fragment } from "react";
import { useTogglePost } from "../../context/TogglePostContext";

import NewsItems from "./NewsItems";

function NewsGruop() {
  // const context = useContext(Context);
  const { indexShow, oriPosts } = useTogglePost();

  return oriPosts.map((post, idx) => (
    <Fragment key={idx}>
      {idx <= indexShow
        ? post.map((post, index) => (
            <NewsItems
              key={post.id}
              index={8 * idx + index}
              post={post}
              indexShow={idx}
            />
          ))
        : null}
    </Fragment>
  ));
}

export default NewsGruop;
