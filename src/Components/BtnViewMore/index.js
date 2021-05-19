import React, { useMemo } from "react";
import { useTogglePost } from "../../context/TogglePostContext";

function BtnViewMore() {
  const { oriPosts, indexShow, showMore, showLess } = useTogglePost();

  const renderBtn = useMemo(() => {
    if (indexShow === 0) {
      return (
        <button className="btnViewMore" onClick={() => showMore()}>
          Xem Thêm
        </button>
      );
    }
    if (indexShow === oriPosts.length - 1) {
      return (
        <button className="btnViewMore" onClick={() => showLess()}>
          Thu Gọn
        </button>
      );
    }
    if (indexShow > 0) {
      return (
        <>
          <button className="btnViewMore" onClick={() => showMore()}>
            Xem Thêm
          </button>
          <button className="btnViewMore" onClick={() => showLess()}>
            Thu Gọn
          </button>
        </>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexShow]);

  return <div className="buttonViewMore_container">{renderBtn}</div>;
}

export default BtnViewMore;
