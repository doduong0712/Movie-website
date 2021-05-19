import axios from "axios";
const instance = axios.create({
  baseURL: "https://5eea03dfb13d0a00164e40ad.mockapi.io/api",
});

const newsAPI = {
  /**
   * News tab
   */
  getNewsPost: () => {
    const uri = "/dienanh";
    return instance.get(uri);
  },

  /**
   * Review Tab
   */

  getReviewPost: () => {
    const uri = "/review";
    return instance.get(uri);
  },
  /**
   * Review (Discuss) in detail page
   */

  getDiscussPost: () => {
    const uri = "/discuss";
    return instance.get(uri);
  },
};

export default newsAPI;
