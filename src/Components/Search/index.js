import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import SelectItem from "./SelectItem";
import UnSelectUI from "./UnSelectUI";
import LinkButton from "../LinkButton";
import { actFetchDetailMovie } from "../../containers/Home/DetailPage/modules/action";

/**
 * đưa tất cả các cụm rạp của tất cả các hệ thống thành 1 mảng để xử lý
 */
const getAllListCumRap = (heThongRapChieu = []) => {
  if (heThongRapChieu && heThongRapChieu.length > 0) {
    return heThongRapChieu.reduce(
      (acc, item) => acc.concat(item.cumRapChieu),
      []
    );
  }
  return [];
};

const getCumRapDuocChon = (listCumRapChieu = [], tenCumRap) => {
  if (listCumRapChieu && listCumRapChieu.length > 0) {
    return listCumRapChieu.find((cumRap) => {
      return cumRap.tenCumRap === tenCumRap;
    }); // {.....}
  }
};

const getDanhSachGioChieuTheoNgay = (cumRapDuocChon = {}, ngayChieu) => {
  console.log(cumRapDuocChon);
  return cumRapDuocChon.lichChieuPhim.filter((item) => {
    return (
      new Date(item.ngayChieuGioChieu).toLocaleDateString("it-IT") === ngayChieu
    );
  });
};

const getMaLichChieuTheoGioChieu = (time = [], gioChieu) => {
  let lichChieu = time.find((time) => {
    return (
      new Date(time.ngayChieuGioChieu).toLocaleTimeString("it-IT") === gioChieu
    );
  });
  return lichChieu.maLichChieu;
};

const initialState = {
  // state thay đổi khi handleChange
  movieSelect: "", //Ted part 2
  cinemaSelect: "", // CGV- SƯ vạn hạnh
  daySelect: "", // 1/1/2019
  timeSelect: "", //

  //state truyền vào as props (thay đổi phụ thuộc vào nhóm State trên)
  listCumRapChieu: [], //luôn reset lại theo phim đã chọn []<object>
  cumRapDuocChon: {},
  times: [], //chứa ds thông tin lịch chiếu theo ngày đã chọn []<obj>

  //state kiểm tra
  isCompleted: false,

  //router to:
  maLichChieu: "",
};

function Search(props) {
  const { listMovie, heThongRapChieu, getThongTinLichChieuPhim } = props;
  const [state, setState] = useState(initialState);

  //khi API trả về thì cập nhật danh sách cumRap có chiếu phim đã chọn
  useEffect(() => {
    setState({ ...state, listCumRapChieu: getAllListCumRap(heThongRapChieu) });
    return () => {
      //clean up sau khi navigate
      setState({ ...initialState });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heThongRapChieu]);

  const handleChange = (e) => {
    e.persist();

    //value là tenPhim, tenCumRap, 1/1/2019, 10:10:00, tùy vào name
    const { name, value, selectedIndex } = e.target; // selectedIndex thứ tự trong select của e.target
    const { id } = e.target.childNodes[selectedIndex]; // trả về một tập hợp (danh sách) các nút con của phần tử. childNodes[0]cũng giống như firstChild.
    switch (name) {
      case "movieSelect":
        getThongTinLichChieuPhim(id);

        setState({
          ...state,
          [name]: value,
          //reset lại các giá trị select của các ô dưới nó trong trường hợp user chọn lại
          cinemaSelect: "",
          daySelect: "",
          timeSelect: "",

          cumRapDuocChon: {},
          times: [],

          maLichChieu: "",
        });

        break;
      case "cinemaSelect":
        setState({
          ...state,
          [name]: value,
          cumRapDuocChon: getCumRapDuocChon(state.listCumRapChieu, value),

          //reset
          daySelect: "",
          timeSelect: "",
          times: [],
          maLichChieu: "",
        });
        break;
      case "daySelect":
        setState({
          ...state,
          [name]: value,
          times: getDanhSachGioChieuTheoNgay(state.cumRapDuocChon, value),
          //reset
          timeSelect: "",
          maLichChieu: "",
        });
        break;
      case "timeSelect":
        setState({
          ...state,
          [name]: value,
          maLichChieu: getMaLichChieuTheoGioChieu(state.times, value),
        });
        break;
      default:
        break;
    }

    //chọn xong timeSelect mới có maLichChieu nên chỉ cần kiểm tra tồn tại maLichChieu thì cho submit
    setState((prevState) => {
      if (prevState.maLichChieu && prevState.maLichChieu.length > 0) {
        return {
          ...prevState,
          isCompleted: true,
        };
      }
      return {
        ...prevState,
        isCompleted: false,
      };
    });
  };

  const {
    movieSelect,
    cinemaSelect,
    daySelect,

    listCumRapChieu,
    cumRapDuocChon,
    times,

    isCompleted,
    maLichChieu,
  } = state;
  console.log(cumRapDuocChon);

  return (
    <section className="search myContainer">
      <form className="search__form">
        <SelectItem
          label="Phim"
          name="movieSelect"
          list={listMovie}
          handleChange={handleChange}
        />

        {/* RENDER CINEMASELECT GROUP */}
        {movieSelect.length > 0 ? (
          <SelectItem
            name="cinemaSelect"
            label="Rạp"
            list={listCumRapChieu}
            handleChange={handleChange}
          />
        ) : (
          <UnSelectUI
            name="cinemaSelect"
            label="Rạp"
            message="Vui lòng chọn phim"
          />
        )}

        {/* RENDER DAYSELECT GROUP */}
        {cinemaSelect.length > 0 ? (
          <SelectItem
            name="daySelect"
            label="Ngày chiếu"
            list={cumRapDuocChon.lichChieuPhim}
            handleChange={handleChange}
          />
        ) : (
          <UnSelectUI
            name="daySelect"
            label="Ngày chiếu"
            message="Vui lòng chọn phim và rạp"
          />
        )}

        {/* RENDER TIMESELECT GROUP */}
        {daySelect.length > 0 ? (
          <SelectItem
            name="timeSelect"
            label="Giờ chiếu"
            handleChange={handleChange}
            list={times}
          />
        ) : (
          <UnSelectUI
            name="timeSelect"
            label="Giờ chiếu"
            message="Vui lòng chọn phim, rạp và ngày chiếu"
          />
        )}

        <div className="search__group search__button">
          {/* <button className="btnBuyTicket">MUA VÉ NGAY</button> */}

          <LinkButton
            type="button"
            disabled={!isCompleted}
            className="btnBuyTicket"
            to={`/booking/${maLichChieu}`}
          >
            MUA VÉ NGAY
          </LinkButton>
        </div>
      </form>
    </section>
  );
}

Search.propTypes = {
  listMovie: PropTypes.array.isRequired,
  heThongRapChieu: PropTypes.array,
  getThongTinLichChieuPhim: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    listMovie: state.listMovieReducer.listMovie,
    heThongRapChieu: state.detailMovieReduver.detailMovie.heThongRapChieu,
  };
};

const mapDispatchToProps = (dispath) => {
  return {
    //gọi khi chọn tên phim
    getThongTinLichChieuPhim: (maphim) => {
      dispath(actFetchDetailMovie(maphim));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
