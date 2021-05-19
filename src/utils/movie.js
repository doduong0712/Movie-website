//helper function transform image url from http to https
export const prefixHttp = (urlString = "") => {
  if (!urlString.includes("https://")) {
    return urlString.replace("http://", "https://");
  }
  return urlString;
};

export const chunkArray = (myArray = [], chunk_size = 8) => {
  let result = [];

  while (myArray.length) {
    result.push(myArray.splice(0, chunk_size));
  }

  return result;
  // var result = chunkArray([1,2,3,4,5,6,7,8], 3);
  //  Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
};
