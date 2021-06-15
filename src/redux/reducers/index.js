import { combineReducers } from "redux";
import listMovieReducer from "../../containers/Home/HomePage/modules/reducer";
import userLoginReducer from "../../containers/Home/LoginPage/modules/reducer";
import userSignUpReducer from "../../containers/Home/SignUpPage/modules/reducer";
import detailMovieReduver from "../../containers/Home/DetailPage/modules/reducer";
import bookingMoviePageReducer from "../../containers/Home/BookingPage/modules/reducer";
//Component
import reviewsReducer from "../../Components/DiscussSection/modules/reducer";
import listHeThongRapReducer from "../../Components/TheaterList/modules/reducer";
import buyTicketReducer from "../../Components/Seat/modules/reducer";
import authAdminReducer from "../../containers/Admin/Auth/modules/reducer";

const rootReducer = combineReducers({
  listMovieReducer,
  detailMovieReduver,
  userLoginReducer,
  userSignUpReducer,
  listHeThongRapReducer,
  reviewsReducer,
  bookingMoviePageReducer,
  buyTicketReducer,
  authAdminReducer,
});

export { rootReducer };
