import React, {
  useMemo,
  useState,
  useCallback,
  useContext,
  createContext,
} from "react";
import PropTypes from "prop-types";
import { chunkArray } from "../utils/movie";

const TogglePostContext = createContext();
//console.log(TogglePostContext);

export function TogglePostProvider(props) {
  const {
    postSize,
    initialPosts,
    indexShow: initialIndexShow,
    children,
  } = props;
  /* console.log(postSize);
  console.log(initialIndexShow);
  console.log(initialPosts);
  console.log(children); */

  const oriPosts = useMemo(
    () => chunkArray([...initialPosts].reverse(), postSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialPosts.length]
  );

  //Lấy phần tử đầu tiên
  const [indexShow, setIndexShow] = useState(initialIndexShow);

  //console.log("indexShow", indexShow);

  //console.log("indexShow", indexShow);
  const showMore = useCallback(() => {
    //bé hơn length của array mới showmore được
    if (indexShow < oriPosts.length - 1) {
      setIndexShow((idx) => idx + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexShow, initialPosts.length]);

  const showLess = useCallback(() => {
    // lớn hơn index 0 mới less dc

    if (indexShow > 0) {
      setIndexShow((idx) => idx - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexShow]);

  const contexValue = {
    oriPosts,
    indexShow,
    showMore,
    showLess,
  };

  return (
    <TogglePostContext.Provider value={contexValue}>
      {/* <ToggleDispatchContext> */}

      {children}
      {/* </ ToggleDispatchContext> */}
    </TogglePostContext.Provider>
  );
}

export function useTogglePost() {
  const context = useContext(TogglePostContext);

  if (context === undefined) {
    throw new Error("useItemState must be used within a CountProvider");
  }
  return context;
}

TogglePostProvider.propTypes = {
  initialIndexShow: PropTypes.number,
  postSize: PropTypes.number,
  initialPosts: PropTypes.array,
};

TogglePostProvider.defaultProps = {
  indexShow: 0,
  postSize: 8,
  initialPosts: [],
};
