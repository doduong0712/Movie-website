import { useEffect } from "react";
const background = require("../images/background.jpg");

const useSetBackground = () => {
  useEffect(() => {
    document.body.style.background = `url(${background}) center `;

    return () => {
      document.body.style.background = "none";
    };
  });
};
export default useSetBackground;
