import { lazy } from "react";
const HomePage = lazy(() => import("./../containers/Home/HomePage"));
const DetailPage = lazy(() => import("./../containers/Home/DetailPage/index"));

const HomeRoutes = [
  {
    exact: true,
    path: "/",
    component: HomePage,
  },
  {
    exact: true,
    path: "/phim/:slug", //slug: maPhim-biDanh . 1322-ted-part-2
    component: DetailPage,
  },
];

export { HomeRoutes };
