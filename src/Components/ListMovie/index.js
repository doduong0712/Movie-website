import PropTypes from "prop-types";
import React from "react";
import NavigationTab from "../NavigationTab";
import { connect } from "react-redux";
import TabShowingOrComing from "./TabShowingOrComing";

const chunkyArray = (myArray, chunkySize) => {
  let result = [];

  while (myArray.length) {
    result.push(myArray.splice(0, chunkySize));
  }
  return result;
};

const items = {
  showing: "Đang Chiếu",
  coming: "Sắp Chiếu",
};

function ListMovie(props) {
  const { listMovie } = props;

  const mylist = [...listMovie];

  const movieArray = chunkyArray(mylist, 24);

  return (
    <section className="listmovie " id="lichchieu">
      <div className="myContainer">
        <NavigationTab items={items} />
        <div className="tab-content  listmovie_content">
          <div
            className="listmovie-panel tab-pane fade show active"
            id="showing"
            role="tabpanel"
            aria-labelledby="showing-tab"
          >
            <TabShowingOrComing movie={movieArray[0]} />
          </div>
          <div
            className="listmovie-panel tab-pane fade"
            id="coming"
            role="tabpanel"
            aria-labelledby="coming-tab"
          >
            <TabShowingOrComing movie={movieArray[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}

ListMovie.propTypes = {
  listMovie: PropTypes.array.isRequired,
};

ListMovie.defaultProps = {
  listMovie: [],
};

const mapStateToProps = (state) => {
  return {
    listMovie: state.listMovieReducer.listMovie,
  };
};

export default connect(mapStateToProps, null)(ListMovie);
