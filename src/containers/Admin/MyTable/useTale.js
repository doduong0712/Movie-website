import { useState, useCallback } from "react";

function useTable(tableType) {
  const [data, setData] = useState([]);
  const [isChanged, setIsChanged] = useState(true);

  const callAPI = useCallback(
    (api, body) => {
      // console.log("api call");
      //no api endpoint
      if (api === undefined) return;

      //post,put,delete
      if (body !== null) {
        return api(body);
      }

      return (
        api()
          // api(body,...option)
          .then((res) => {
            setData(res);

            console.log(res);

            //chỉ gọi lại api get với table Movie
            if (tableType === "Movie Table") {
              setIsChanged(false);
            }
          })
          .catch((error) => {
            alert(error.response.data);
          })
      );
    },
    [tableType]
  );

  return {
    data,
    isChanged,
    callAPI,
  };
}

export default useTable;
